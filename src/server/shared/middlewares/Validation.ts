import { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import { AnyObject, Maybe, ObjectSchema, ValidationError } from 'yup';

type TProperty = 'body' | 'query' | 'header' | 'params';
type TGetSchema = <T extends Maybe<AnyObject>>(schema: ObjectSchema<T>) => ObjectSchema<T>;
type TAllSchemas = Record<TProperty, ObjectSchema<AnyObject>>;
type TGetAllSchemas = (getSchema: TGetSchema) => Partial<TAllSchemas>
type TValidation = (getAllSchemas: TGetAllSchemas) => RequestHandler;

export const validation: TValidation = (getAllSchemas) => async (request, response, next) => {
    const schemas = getAllSchemas((schema) => schema);
    const errorsResult: Record<string, Record<string, string>> = {};

    Object.entries(schemas).forEach(([key, schema]) => {
        try {
            schema.validateSync(request[key as TProperty], { abortEarly: false });
        } catch (error) {
            const yupError = error as ValidationError;
            const errors: Record<string, string> = {};

            yupError.inner.forEach((error) => {
                if (!error.path) {
                    return;
                }

                errors[error.path] = error.message;
            });

            errorsResult[key] = errors;
        }
    });

    return Object.entries(errorsResult).length === 0
        ? next()
        : response.status(StatusCodes.BAD_REQUEST).json({ errors: errorsResult });
};

