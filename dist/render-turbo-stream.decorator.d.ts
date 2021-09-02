export declare const turboStreamViewMetadataKey: string;
export declare const turboStreamActionMetadataKey: string;
export declare const turboStreamTargetMetadataKey: string;
interface RenderTurboStreamOptions {
    action: 'append' | 'prepend' | 'replace' | 'update' | 'remove' | 'before' | 'after';
    target: string;
}
export default function RenderTurboStream(view: string, options: RenderTurboStreamOptions): <TFunction extends Function, Y>(target: object | TFunction, propertyKey?: string | symbol | undefined, descriptor?: TypedPropertyDescriptor<Y> | undefined) => void;
export declare function RenderTurboStreamAppend(view: string, options: Omit<RenderTurboStreamOptions, 'action'>): <TFunction extends Function, Y>(target: object | TFunction, propertyKey?: string | symbol | undefined, descriptor?: TypedPropertyDescriptor<Y> | undefined) => void;
export declare function RenderTurboStreamPrepend(view: string, options: Omit<RenderTurboStreamOptions, 'action'>): <TFunction extends Function, Y>(target: object | TFunction, propertyKey?: string | symbol | undefined, descriptor?: TypedPropertyDescriptor<Y> | undefined) => void;
export declare function RenderTurboStreamReplace(view: string, options: Omit<RenderTurboStreamOptions, 'action'>): <TFunction extends Function, Y>(target: object | TFunction, propertyKey?: string | symbol | undefined, descriptor?: TypedPropertyDescriptor<Y> | undefined) => void;
export declare function RenderTurboStreamUpdate(view: string, options: Omit<RenderTurboStreamOptions, 'action'>): <TFunction extends Function, Y>(target: object | TFunction, propertyKey?: string | symbol | undefined, descriptor?: TypedPropertyDescriptor<Y> | undefined) => void;
export declare function RenderTurboStreamRemove(options: Omit<RenderTurboStreamOptions, 'action'>): <TFunction extends Function, Y>(target: object | TFunction, propertyKey?: string | symbol | undefined, descriptor?: TypedPropertyDescriptor<Y> | undefined) => void;
export declare function RenderTurboStreamBefore(view: string, options: Omit<RenderTurboStreamOptions, 'action'>): <TFunction extends Function, Y>(target: object | TFunction, propertyKey?: string | symbol | undefined, descriptor?: TypedPropertyDescriptor<Y> | undefined) => void;
export declare function RenderTurboStreamAfter(view: string, options: Omit<RenderTurboStreamOptions, 'action'>): <TFunction extends Function, Y>(target: object | TFunction, propertyKey?: string | symbol | undefined, descriptor?: TypedPropertyDescriptor<Y> | undefined) => void;
export {};
