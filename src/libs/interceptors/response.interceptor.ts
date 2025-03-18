import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { IResponseBody } from '../interfaces/response.interface';

// 최종 응답 형태 변환용 인터셉터.
@Injectable()
export class ResponseInterceptor<T>
  implements NestInterceptor<T, IResponseBody<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<IResponseBody<T>> {
    return next.handle().pipe(
      map((data: T) => {
        return {
          msg: 'success',
          data,
        };
      }),
    );
  }
}
