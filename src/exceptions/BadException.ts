import BaseException from '@/exceptions/handler/BaseException'
import HttpStatusCode from '@/constants/HttpStatusCode'
import { ErrorDetail } from '@/@types/ErrorDetail'

export default class BadRequestException extends BaseException {
  constructor(description: string | ErrorDetail) {
    super({
      description,
      statusCode: HttpStatusCode.BAD_REQUEST,
    })
  }
}
