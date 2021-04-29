import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor
} from '@nestjs/common';
import { HttpAdapterHost, Reflector } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  turboFrameAutoscrollBlockMetadataKey,
  turboFrameAutoscrollMetadataKey,
  turboFrameBusyMetadataKey,
  turboFrameDisabledMetadataKey,
  turboFrameIdMetadataKey,
  turboFrameLoadingMetadataKey,
  turboFrameSrcMetadataKey,
  turboFrameTargetMetadataKey,
  turboFrameViewMetadataKey
} from './render-turbo-frame.decorator';

@Injectable()
export default class RenderTurboFrameInterceptor implements NestInterceptor {
  constructor(
    private reflector: Reflector,
    private httpAdapterHost: HttpAdapterHost
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const handler = context.getHandler();
    const response = context.switchToHttp().getResponse();
    const view = this.reflector.get<string>(turboFrameViewMetadataKey, handler);
    const id = this.reflector.get<string>(turboFrameIdMetadataKey, handler);
    const src = this.reflector.get<string>(turboFrameSrcMetadataKey, handler);
    const loading = this.reflector.get<string>(
      turboFrameLoadingMetadataKey,
      handler
    );
    const busy = this.reflector.get<boolean>(
      turboFrameBusyMetadataKey,
      handler
    );
    const disabled = this.reflector.get<boolean>(
      turboFrameDisabledMetadataKey,
      handler
    );
    const target = this.reflector.get<string>(
      turboFrameTargetMetadataKey,
      handler
    );
    const autoscroll = this.reflector.get<boolean>(
      turboFrameAutoscrollMetadataKey,
      handler
    );
    const autoscrollBlock = this.reflector.get<string>(
      turboFrameAutoscrollBlockMetadataKey,
      handler
    );
    return next.handle().pipe(
      map(async (locals) => {
        let wrappedHtml = '';
        function wrapHtml(html: string) {
          const attributes = [`id="${id}"`];
          if (src) attributes.push(`src="${src}"`);
          if (loading) attributes.push(`loading="${loading}"`);
          if (busy) attributes.push('busy');
          if (disabled) attributes.push('disabled');
          if (target) attributes.push(`target="${target}"`);
          if (autoscroll) attributes.push('autoscroll');
          if (autoscroll && autoscrollBlock)
            attributes.push(`data-autoscroll-block="${autoscrollBlock}"`);
          const joinedAttributes = attributes.join(' ');
          wrappedHtml = `<turbo-frame ${joinedAttributes}>${html.trim()}</turbo-frame>`;
        }
        const isExpress =
          this.httpAdapterHost.httpAdapter.getType() === 'express';
        this.httpAdapterHost.httpAdapter.setHeader(
          response,
          'Content-Type',
          'text/html'
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
