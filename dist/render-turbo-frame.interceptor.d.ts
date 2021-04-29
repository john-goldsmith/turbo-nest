import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { HttpAdapterHost, Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
export default class RenderTurboFrameInterceptor implements NestInterceptor {
    private reflector;
    private httpAdapterHost;
    constructor(reflector: Reflector, httpAdapterHost: HttpAdapterHost);
    intercept(context: ExecutionContext, next: CallHandler): Observable<any>;
}
