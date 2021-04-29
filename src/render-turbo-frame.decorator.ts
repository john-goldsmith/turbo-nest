import { applyDecorators, SetMetadata, UseInterceptors } from '@nestjs/common';
import RenderTurboFrameInterceptor from './render-turbo-frame.interceptor';

function key(...parts: string[]): string {
  const namespaceParts = ['turbo', 'frame'];
  return [...namespaceParts, ...parts].join(':');
}

export const turboFrameViewMetadataKey = key('view');
export const turboFrameIdMetadataKey = key('id');
export const turboFrameSrcMetadataKey = key('src');
export const turboFrameLoadingMetadataKey = key('loading');
export const turboFrameBusyMetadataKey = key('busy');
export const turboFrameDisabledMetadataKey = key('disabled');
export const turboFrameTargetMetadataKey = key('target');
export const turboFrameAutoscrollMetadataKey = key('autoscroll');
export const turboFrameAutoscrollBlockMetadataKey = key('autoscrollBlock');

interface RenderTurboFrameOptions {
  id: string;
  src?: string;
  loading?: 'eager' | 'lazy';
  busy?: boolean;
  disabled?: boolean;
  target?: string | '_top';
  autoscroll?: boolean;
  autoscrollBlock?: 'end' | 'start' | 'center' | 'nearest';
}

export default function RenderTurboFrame(
  view: string,
  options: RenderTurboFrameOptions
) {
  return applyDecorators(
    SetMetadata(turboFrameViewMetadataKey, view),
    SetMetadata(turboFrameIdMetadataKey, options.id),
    SetMetadata(turboFrameSrcMetadataKey, options.src),
    SetMetadata(turboFrameLoadingMetadataKey, options.loading),
    SetMetadata(turboFrameBusyMetadataKey, options.busy),
    SetMetadata(turboFrameDisabledMetadataKey, options.disabled),
    SetMetadata(turboFrameTargetMetadataKey, options.target),
    SetMetadata(turboFrameAutoscrollMetadataKey, options.autoscroll),
    SetMetadata(turboFrameAutoscrollBlockMetadataKey, options.autoscrollBlock),
    UseInterceptors(RenderTurboFrameInterceptor)
  );
}
