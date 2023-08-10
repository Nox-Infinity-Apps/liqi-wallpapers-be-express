import { Response } from 'express'
import HttpStatusCode from '@/common/constants/HttpStatusCode'
import { logger } from '@/common/logger/logger'
import { isArray } from 'lodash'
import BaseException from './BaseException'
import { ErrorDetail } from '@/common/interface/Error'

class BaseExceptionHandler {
  public handleError(error: Error | BaseException, response?: Response): void {
    if (this.isTrustedError(error) && response) {
      this.handleTrustedError(error as BaseException, response)
    } else {
      this.handleUntrustedError(error as Error, response)
    }
  }

  public isTrustedError(error: Error | BaseException): boolean {
    if (error instanceof BaseException) {
      return true
    }
    return false
  }

  private handleTrustedError(error: BaseException, response: Response): void {
    const statusCode = error.statusCode
    let errors: ErrorDetail[] = []
    errors = !isArray(error.errors) ? [error.errors] : error.errors
    const responseData = {
      errors,
    }
    if (statusCode === HttpStatusCode.INTERNAL_SERVER_ERROR) {
      logger.error(errors[0].errorMessage)
      errors[0].errorMessage = 'Internal Server Error'
    }
    response.status(statusCode).json(responseData)
  }

  private handleUntrustedError(error: Error, response?: Response): void {
    const statusCode = HttpStatusCode.INTERNAL_SERVER_ERROR

    const errorDetail: ErrorDetail = {
      errorCode: 'Internal Server Error',
      errorMessage: 'Internal server error',
    }
    const responseData = {
      errors: [errorDetail],
    }
    logger.error(error.message)
    if (response) {
      response.status(statusCode).json(responseData)
    }
  }
}

export default new BaseExceptionHandler()
