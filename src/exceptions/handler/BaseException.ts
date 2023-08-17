import { ErrorDetail } from "@/common/interface/Error";
import HttpStatusCode from "@/common/constants/HttpStatusCode";
import _isArray from "lodash/isArray";

export interface ExceptionArgs {
  description: string | ErrorDetail;
  statusCode: HttpStatusCode;
}

export default class BaseException extends Error {
  public readonly statusCode: HttpStatusCode;
  public readonly errors: ErrorDetail | ErrorDetail[];

  constructor(private args: ExceptionArgs) {
    const { description, statusCode } = args;

    const error = _isArray(description)
      ? description.map(({ msg }) => ({
          errorCode: msg.code,
          errorMessage: msg.msg,
        }))
      : description;
    super(JSON.stringify(error));
    this.errors = error as unknown as BaseException["errors"];

    Object.setPrototypeOf(this, new.target.prototype);
    this.statusCode = statusCode;
  }
}
