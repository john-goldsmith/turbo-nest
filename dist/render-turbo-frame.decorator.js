"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.turboFrameAutoscrollBlockMetadataKey = exports.turboFrameAutoscrollMetadataKey = exports.turboFrameTargetMetadataKey = exports.turboFrameDisabledMetadataKey = exports.turboFrameBusyMetadataKey = exports.turboFrameLoadingMetadataKey = exports.turboFrameSrcMetadataKey = exports.turboFrameIdMetadataKey = exports.turboFrameViewMetadataKey = void 0;
var common_1 = require("@nestjs/common");
var render_turbo_frame_interceptor_1 = __importDefault(require("./render-turbo-frame.interceptor"));
function key() {
    var parts = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        parts[_i] = arguments[_i];
    }
    var namespaceParts = ['turbo', 'frame'];
    return __spreadArray(__spreadArray([], namespaceParts), parts).join(':');
}
exports.turboFrameViewMetadataKey = key('view');
exports.turboFrameIdMetadataKey = key('id');
exports.turboFrameSrcMetadataKey = key('src');
exports.turboFrameLoadingMetadataKey = key('loading');
exports.turboFrameBusyMetadataKey = key('busy');
exports.turboFrameDisabledMetadataKey = key('disabled');
exports.turboFrameTargetMetadataKey = key('target');
exports.turboFrameAutoscrollMetadataKey = key('autoscroll');
exports.turboFrameAutoscrollBlockMetadataKey = key('autoscrollBlock');
function RenderTurboFrame(view, options) {
    return common_1.applyDecorators(common_1.SetMetadata(exports.turboFrameViewMetadataKey, view), common_1.SetMetadata(exports.turboFrameIdMetadataKey, options.id), common_1.SetMetadata(exports.turboFrameSrcMetadataKey, options.src), common_1.SetMetadata(exports.turboFrameLoadingMetadataKey, options.loading), common_1.SetMetadata(exports.turboFrameBusyMetadataKey, options.busy), common_1.SetMetadata(exports.turboFrameDisabledMetadataKey, options.disabled), common_1.SetMetadata(exports.turboFrameTargetMetadataKey, options.target), common_1.SetMetadata(exports.turboFrameAutoscrollMetadataKey, options.autoscroll), common_1.SetMetadata(exports.turboFrameAutoscrollBlockMetadataKey, options.autoscrollBlock), common_1.UseInterceptors(render_turbo_frame_interceptor_1.default));
}
exports.default = RenderTurboFrame;
//# sourceMappingURL=render-turbo-frame.decorator.js.map