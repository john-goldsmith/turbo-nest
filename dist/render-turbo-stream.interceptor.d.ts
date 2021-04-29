import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Reflector, HttpAdapterHost } from '@nestjs/core';
import { Observable } from 'rxjs';
export default class RenderTurboStreamInterceptor implements NestInterceptor {
    private reflector;
    private httpAdapterHost;
    constructor(reflector: Reflector, httpAdapterHost: HttpAdapterHost);
    intercept(context: ExecutionContext, next: CallHandler): Observable<any>;
}
