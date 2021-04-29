export declare const turboFrameViewMetadataKey: string;
export declare const turboFrameIdMetadataKey: string;
export declare const turboFrameSrcMetadataKey: string;
export declare const turboFrameLoadingMetadataKey: string;
export declare const turboFrameBusyMetadataKey: string;
export declare const turboFrameDisabledMetadataKey: string;
export declare const turboFrameTargetMetadataKey: string;
export declare const turboFrameAutoscrollMetadataKey: string;
export declare const turboFrameAutoscrollBlockMetadataKey: string;
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
export default function RenderTurboFrame(view: string, options: RenderTurboFrameOptions): <TFunction extends Function, Y>(target: object | TFunction, propertyKey?: string | symbol | undefined, descriptor?: TypedPropertyDescriptor<Y> | undefined) => void;
export {};
