import { ResponseError } from "@interfaces/error";

function generateError(code: number) {
  return function (message: string) {
    const error = new Error(message) as ResponseError;
    error.statusCode = code;
    return error;
  };
}

const badRequest = generateError(400);
const unauthorized = generateError(401);
const forbidden = generateError(403);
const notFound = generateError(404);
const internalServerError = generateError(500);

export { badRequest, unauthorized, forbidden, notFound, internalServerError };
