import { applyDecorators, SetMetadata, UseInterceptors } from '@nestjs/common';
import RenderTurboStreamInterceptor from './render-turbo-stream.interceptor';

function key(...parts: string[]): string {
  const namespaceParts = ['turbo', 'stream'];
  return [...namespaceParts, ...parts].join(':');
}

export const turboStreamViewMetadataKey = key('view');
export const turboStreamActionMetadataKey = key('action');
export const turboStreamTargetMetadataKey = key('target');

interface RenderTurboStreamOptions {
  action: 'append' | 'prepend' | 'replace' | 'update' | 'remove' | 'before' | 'after';
  target: string;
}

function helper(view: string, options: RenderTurboStreamOptions) {
  return applyDecorators(
    SetMetadata(turboStreamViewMetadataKey, view),
    SetMetadata(turboStreamActionMetadataKey, options.action),
    SetMetadata(turboStreamTargetMetadataKey, options.target),
    UseInterceptors(RenderTurboStreamInterceptor)
  );
}

export default function RenderTurboStream(
  view: string,
  options: RenderTurboStreamOptions
) {
  return helper(view, options);
}

export function RenderTurboStreamAppend(
  view: string,
  options: Omit<RenderTurboStreamOptions, 'action'>
) {
  return helper(view, {
    ...options,
    action: 'append'
  });
}

export function RenderTurboStreamPrepend(
  view: string,
  options: Omit<RenderTurboStreamOptions, 'action'>
) {
  return helper(view, {
    ...options,
    action: 'prepend'
  });
}

export function RenderTurboStreamReplace(
  view: string,
  options: Omit<RenderTurboStreamOptions, 'action'>
) {
  return helper(view, {
    ...options,
    action: 'replace'
  });
}

export function RenderTurboStreamUpdate(
  view: string,
  options: Omit<RenderTurboStreamOptions, 'action'>
) {
  return helper(view, {
    ...options,
    action: 'update'
  });
}

export function RenderTurboStreamRemove(
  options: Omit<RenderTurboStreamOptions, 'action'>
) {
  return applyDecorators(
    SetMetadata(turboStreamActionMetadataKey, 'remove'),
    SetMetadata(turboStreamTargetMetadataKey, options.target),
    UseInterceptors(RenderTurboStreamInterceptor)
  );
}

export function RenderTurboStreamBefore(
  view: string,
  options: Omit<RenderTurboStreamOptions, 'action'>
) {
  return helper(view, {
    ...options,
    action: 'before'
  });
}

export function RenderTurboStreamAfter(
  view: string,
  options: Omit<RenderTurboStreamOptions, 'action'>
) {
  return helper(view, {
    ...options,
    action: 'after'
  });
}
