import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor
} from '@nestjs/common';
import { Reflector, HttpAdapterHost } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  turboStreamViewMetadataKey,
  turboStreamActionMetadataKey,
  turboStreamTargetMetadataKey
} from './render-turbo-stream.decorator';

const turboStreamContentType = 'text/vnd.turbo-stream.html';

@Injectable()
export default class RenderTurboStreamInterceptor implements NestInterceptor {
  constructor(
    private reflector: Reflector,
    private httpAdapterHost: HttpAdapterHost
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const handler = context.getHandler();
    const response = context.switchToHttp().getResponse();
    const view = this.reflector.get<string>(
      turboStreamViewMetadataKey,
      handler
    );
    const action = this.reflector.get<string>(
      turboStreamActionMetadataKey,
      handler
    );
    const target = this.reflector.get<string>(
      turboStreamTargetMetadataKey,
      handler
    );

    return next.handle().pipe(
      map(async (locals) => {
        let wrappedHtml = '';
        function wrapHtml(html: string) {
          if (action === 'remove') {
            wrappedHtml = `<turbo-stream ${joinedAttributes}></turbo-stream>`;
          } else {
            wrappedHtml = `<turbo-stream ${joinedAttributes}><template>${html.trim()}</template></turbo-stream>`;
          }
        }
        const attributes = [`action="${action}"`, `target="${target}"`];
        const joinedAttributes = attributes.join(' ');
        const isExpress =
          this.httpAdapterHost.httpAdapter.getType() === 'express';
        this.httpAdapterHost.httpAdapter.setHeader(
          response,
          'Content-Type',
          turboStreamContentType
        );
        if (isExpress) {
          this.httpAdapterHost.httpAdapter
            .getInstance()
            .render(view, locals, (err: unknown, html: string) => {
              wrapHtml(html);
            });
        } else {
          const html = await this.httpAdapterHost.httpAdapter
            .getInstance()
            .view(view, locals);
          wrapHtml(html);
        }
        return wrappedHtml;
      })
    );
  }
}
