<p align="center">
  <img src="./img/turbo.svg" width="400">
  <img src="./img/nest.svg" width="100">
</p>
<p align="center">
  Use <a href="https://turbo.hotwire.dev/">Turbo</a> in your <a href="https://nestjs.com/">NestJS</a> app! 🚀
</p>
<p align="center">
  <a href="https://www.npmjs.com/package/turbo-nest" target="_blank"><img src="https://img.shields.io/npm/v/turbo-nest.svg" alt="NPM Version" /></a>
  <a href="https://snyk.io/test/github/john-goldsmith/turbo-nest?targetFile=package.json" target="_blank"><img src="https://snyk.io/test/github/john-goldsmith/turbo-nest/badge.svg?targetFile=package.json" alt="Known Vulnerabilities" /></a>
</p>
<hr>

A Nest plugin that wraps your existing server-side templates to make them Turbo-compatible.

Intended to be used in [MVC Nest apps](https://docs.nestjs.com/techniques/mvc). This plugin makes use of Nest's platform-agnosticism techniques, so all templating engines are supported (assuming that they've been properly configured in your app)

Supports both [Express](https://expressjs.com/)- and [Fastify](https://www.fastify.io/)-based apps.

# Installation
Install the package in your existing Nest app:

```
npm install --save turbo-nest
```

# Usage
This package exports two primary method decorators...

* `@RenderTurboFrame()`
* `@RenderTurboStream()`

...and a few shorthand method decorators:

* `@RenderTurboStreamAppend()`
* `@RenderTurboStreamPrepend()`
* `@RenderTurboStreamReplace()`
* `@RenderTurboStreamUpdate()`
* `@RenderTurboStreamRemove()`

```typescript
import { RenderTurboFrame, RenderTurboStream } from 'turbo-nest';
```

## `@RenderTurboFrame(view: string, options: RenderTurboFrameOptions)`

Given a template file like this...

```js
// profile.ejs

<p><%= firstName %></p>
```

...and a typical controller like this...

```typescript
// users.controller.ts

@Controller()
class UsersController {

  /**
   * 🚨 Important note for Fastify apps:
   * depending on how your app configures
   * the view engine, you may need to include
   * the template file extension, e.g.,
   * `@RenderTurboFrame('profile.ejs', { options })
   */
  @RenderTurboFrame('profile', {
    id: 'profile-frame', // Required
  })
  @Get()
  getProfile() {
    return {
      firstName: 'John'
    }
  }
}
```

...expect an HTTP response like this:

```text
Content-Type: text/html;

<turbo-frame id="profile-frame">
  <p>John</p>
</turbo-frame>
```

All [Turbo Frame HTML attributes](https://turbo.hotwire.dev/reference/frames#html-attributes) are supported, including [`id`](https://turbo.hotwire.dev/reference/frames#basic-frame), [`src`](https://turbo.hotwire.dev/reference/frames#lazy-loaded-frame), [`target`](https://turbo.hotwire.dev/reference/frames#frame-that-drives-navigation-to-replace-whole-page), `loading`, `busy`, `disabled`, `autoscroll`, and `autoscrollBlock`.

See the [`RenderTurboFrameOptions`](./src/render-turbo-frame.decorator.ts#L19-L28) interface for type definitions.

## `@RenderTurboStream(view: string, options: RenderTurboStreamOptions)`

Given a template file like this...

```js
// todo.ejs

<li><%= todo %></li>
```

...and a typical controller like this...

```typescript
// users.controller.ts

@Controller()
class UsersController {

  /**
   * 🚨 Important note for Fastify apps:
   * depending on how your app configures
   * the view engine, you may need to include
   * the template file extension, e.g.,
   * `@RenderTurboStream('todo.ejs', { options })
   */
  @RenderTurboStream('todo', {
    action: 'append', // Required
    target: 'todo-frame' // Required
  })
  @Get()
  getTodo() {
    return {
      todo: 'buy milk'
    }
  }
}
```

...expect an HTTP response like this:

```text
Content-Type: text/vnd.turbo-stream.html;

<turbo-stream action="append" target="todo-frame">
  <template>
    <li>buy milk</li>
  </template>
</turbo-stream>
```

See the [`RenderTurboStreamOptions`](./src/render-turbo-stream.decorator.ts#L13-L16) interface for type definitions.

## `@RenderTurboStreamAppend(view: string, options: Omit<RenderTurboStreamOptions, 'action'>)`
This is a convenience decorator that's equivalent to `@RenderTurboStream('view', { action: 'append', ...options })`

See the [Turbo documentation](https://turbo.hotwire.dev/reference/streams#append) for additional info.

## `@RenderTurboStreamPrepend(view: string, options: Omit<RenderTurboStreamOptions, 'action'>)`
This is a convenience decorator that's equivalent to `@RenderTurboStream('view', { action: 'prepend', ...options })`

See the [Turbo documentation](https://turbo.hotwire.dev/reference/streams#prepend) for additional info.

## `@RenderTurboStreamReplace(view: string, options: Omit<RenderTurboStreamOptions, 'action'>)`
This is a convenience decorator that's equivalent to `@RenderTurboStream('view', { action: 'replace', ...options })`

See the [Turbo documentation](https://turbo.hotwire.dev/reference/streams#replace) for additional info.

## `@RenderTurboStreamUpdate(view: string, options: Omit<RenderTurboStreamOptions, 'action'>)`
This is a convenience decorator that's equivalent to `@RenderTurboStream('view', { action: 'update', ...options })`

See the [Turbo documentation](https://turbo.hotwire.dev/reference/streams#update) for additional info.

## `@RenderTurboStreamRemove(options: Omit<RenderTurboStreamOptions, 'action'>)`
This is a convenience decorator that's equivalent to `@RenderTurboStream({ action: 'remove', ...options })`.

⚠️ Note that unlike the other `@RenderTurboStream` decorators, the `view` argument is omitted here because, per the [Turbo documentation](https://turbo.hotwire.dev/reference/streams#remove), inner HTML is not needed.

# Found a bug? 🪲
[File an issue](https://github.com/john-goldsmith/turbo-nest/issues/new)!
