"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var common_1 = require("@nestjs/common");
var core_1 = require("@nestjs/core");
var operators_1 = require("rxjs/operators");
var render_turbo_frame_decorator_1 = require("./render-turbo-frame.decorator");
var RenderTurboFrameInterceptor = /** @class */ (function () {
    function RenderTurboFrameInterceptor(reflector, httpAdapterHost) {
        this.reflector = reflector;
        this.httpAdapterHost = httpAdapterHost;
    }
    RenderTurboFrameInterceptor.prototype.intercept = function (context, next) {
        var _this = this;
        var handler = context.getHandler();
        var response = context.switchToHttp().getResponse();
        var view = this.reflector.get(render_turbo_frame_decorator_1.turboFrameViewMetadataKey, handler);
        var id = this.reflector.get(render_turbo_frame_decorator_1.turboFrameIdMetadataKey, handler);
        var src = this.reflector.get(render_turbo_frame_decorator_1.turboFrameSrcMetadataKey, handler);
        var loading = this.reflector.get(render_turbo_frame_decorator_1.turboFrameLoadingMetadataKey, handler);
        var busy = this.reflector.get(render_turbo_frame_decorator_1.turboFrameBusyMetadataKey, handler);
        var disabled = this.reflector.get(render_turbo_frame_decorator_1.turboFrameDisabledMetadataKey, handler);
        var target = this.reflector.get(render_turbo_frame_decorator_1.turboFrameTargetMetadataKey, handler);
        var autoscroll = this.reflector.get(render_turbo_frame_decorator_1.turboFrameAutoscrollMetadataKey, handler);
        var autoscrollBlock = this.reflector.get(render_turbo_frame_decorator_1.turboFrameAutoscrollBlockMetadataKey, handler);
        return next.handle().pipe(operators_1.map(function (locals) { return __awaiter(_this, void 0, void 0, function () {
            function wrapHtml(html) {
                var attributes = ["id=\"" + id + "\""];
                if (src)
                    attributes.push("src=\"" + src + "\"");
                if (loading)
                    attributes.push("loading=\"" + loading + "\"");
                if (busy)
                    attributes.push('busy');
                if (disabled)
                    attributes.push('disabled');
                if (target)
                    attributes.push("target=\"" + target + "\"");
                if (autoscroll)
                    attributes.push('autoscroll');
                if (autoscroll && autoscrollBlock)
                    attributes.push("data-autoscroll-block=\"" + autoscrollBlock + "\"");
                var joinedAttributes = attributes.join(' ');
                wrappedHtml = "<turbo-frame " + joinedAttributes + ">" + html.trim() + "</turbo-frame>";
            }
            var wrappedHtml, isExpress, html;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        wrappedHtml = '';
                        isExpress = this.httpAdapterHost.httpAdapter.getType() === 'express';
                        this.httpAdapterHost.httpAdapter.setHeader(response, 'Content-Type', 'text/html');
                        if (!isExpress) return [3 /*break*/, 1];
                        this.httpAdapterHost.httpAdapter
                            .getInstance()
                            .render(view, locals, function (err, html) {
                            wrapHtml(html);
                        });
                        return [3 /*break*/, 3];
                    case 1: return [4 /*yield*/, this.httpAdapterHost.httpAdapter
                            .getInstance()
                            .view(view, locals)];
                    case 2:
                        html = _a.sent();
                        wrapHtml(html);
                        _a.label = 3;
                    case 3: return [2 /*return*/, wrappedHtml];
                }
            });
        }); }));
    };
    RenderTurboFrameInterceptor = __decorate([
        common_1.Injectable(),
        __metadata("design:paramtypes", [core_1.Reflector,
            core_1.HttpAdapterHost])
    ], RenderTurboFrameInterceptor);
    return RenderTurboFrameInterceptor;
}());
exports.default = RenderTurboFrameInterceptor;
//# sourceMappingURL=render-turbo-frame.interceptor.js.map