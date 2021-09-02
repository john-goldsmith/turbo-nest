"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RenderTurboStreamAfter = exports.RenderTurboStreamBefore = exports.RenderTurboStreamRemove = exports.RenderTurboStreamUpdate = exports.RenderTurboStreamReplace = exports.RenderTurboStreamPrepend = exports.RenderTurboStreamAppend = exports.turboStreamTargetMetadataKey = exports.turboStreamActionMetadataKey = exports.turboStreamViewMetadataKey = void 0;
var common_1 = require("@nestjs/common");
var render_turbo_stream_interceptor_1 = __importDefault(require("./render-turbo-stream.interceptor"));
function key() {
    var parts = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        parts[_i] = arguments[_i];
    }
    var namespaceParts = ['turbo', 'stream'];
    return __spreadArray(__spreadArray([], namespaceParts), parts).join(':');
}
exports.turboStreamViewMetadataKey = key('view');
exports.turboStreamActionMetadataKey = key('action');
exports.turboStreamTargetMetadataKey = key('target');
function helper(view, options) {
    return common_1.applyDecorators(common_1.SetMetadata(exports.turboStreamViewMetadataKey, view), common_1.SetMetadata(exports.turboStreamActionMetadataKey, options.action), common_1.SetMetadata(exports.turboStreamTargetMetadataKey, options.target), common_1.UseInterceptors(render_turbo_stream_interceptor_1.default));
}
function RenderTurboStream(view, options) {
    return helper(view, options);
}
exports.default = RenderTurboStream;
function RenderTurboStreamAppend(view, options) {
    return helper(view, __assign(__assign({}, options), { action: 'append' }));
}
exports.RenderTurboStreamAppend = RenderTurboStreamAppend;
function RenderTurboStreamPrepend(view, options) {
    return helper(view, __assign(__assign({}, options), { action: 'prepend' }));
}
exports.RenderTurboStreamPrepend = RenderTurboStreamPrepend;
function RenderTurboStreamReplace(view, options) {
    return helper(view, __assign(__assign({}, options), { action: 'replace' }));
}
exports.RenderTurboStreamReplace = RenderTurboStreamReplace;
function RenderTurboStreamUpdate(view, options) {
    return helper(view, __assign(__assign({}, options), { action: 'update' }));
}
exports.RenderTurboStreamUpdate = RenderTurboStreamUpdate;
function RenderTurboStreamRemove(options) {
    return common_1.applyDecorators(common_1.SetMetadata(exports.turboStreamActionMetadataKey, 'remove'), common_1.SetMetadata(exports.turboStreamTargetMetadataKey, options.target), common_1.UseInterceptors(render_turbo_stream_interceptor_1.default));
}
exports.RenderTurboStreamRemove = RenderTurboStreamRemove;
function RenderTurboStreamBefore(view, options) {
    return helper(view, __assign(__assign({}, options), { action: 'before' }));
}
exports.RenderTurboStreamBefore = RenderTurboStreamBefore;
function RenderTurboStreamAfter(view, options) {
    return helper(view, __assign(__assign({}, options), { action: 'after' }));
}
exports.RenderTurboStreamAfter = RenderTurboStreamAfter;
//# sourceMappingURL=render-turbo-stream.decorator.js.map