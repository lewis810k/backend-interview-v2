import {
  ArgumentsHost,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { IResponseBody } from '../interfaces/response.interface';

export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const response = host.switchToHttp().getResponse();

    const exceptionMessage = exception.getResponse()['message'];
    const msg =
      Array.isArray(exceptionMessage) && exceptionMessage.length > 0
        ? exceptionMessage[0]
        : exception.message;

    const responseBody: IResponseBody<any> = {
      msg,
      data: null,
    };

    response.status(status).json(responseBody);
  }
}
