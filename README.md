<div>
  <p align="center"><img src="https://github.com/wizaaard/wizard/blob/master/doc/wizard.png" alt="fre logo" width="180"></p>
  <h1 align="center" style="font-size:100px;">Wizard</h1>
</div>
<p align="center">A document of code manager platform</p>
<p align="center">
  <img src="https://img.shields.io/github/license/flat-dev-ti/Flat.svg?style=flat-square">
  <img src="https://img.shields.io/badge/TypeScript-3.2-blue.svg?style=flat-square">
</p>

# Wizard

🍳A document of code manager platform.

## Features

- Online document editing
- Permission to operate
- Modify record view
- Multi-person writing

## Technology

<div>
  <img src="https://github.com/wizaaard/wizard/blob/master/doc/react.png" height="80">
  <img src="https://github.com/wizaaard/wizard/blob/master/doc/golang.png" height="120">
</div>

- FN: `React` `Mobx` `Typescript` `styled-components`
- Middleware: `Node` -> `ssr`
- BN: `Goland`
- Cache DB: `Redis`
- Primary DB: `PostgreSQL`

## Dev

Client 文件目录结构:

```js
├── build // dist
├── public // 静态目录存放
├── src
│   ├── app
│   │   ├── ui // 业务无关组件
│   │   ├── assets  // 静态素材
│   │   ├── components // 业务组件
│   │   ├── constant // 常量文件
│   │   ├── index.tsx // bootstrap
│   │   ├── pages // 完整的页面
│   │   ├── routes // 抽象通用的路由
│   │   ├── services // 前端 service
│   │   ├── store // mobx 的 store
│   │   ├── theme // 全局注入的一些样式，包括 styled-components 和 material-design
│   │   └── utils // 工具
│   ├── index.tsx // 启始文件，实际导出真实 index.tsx
│   ├── ssr // 存放 ssr 必须文件
│   └── test // jest 测试
```

## DI

service 可通过封装的 `react-ts-di` 进行注入

```ts
@Injectable()
class Foo {}

------

@Inject
foo!:Foo
```

store 通过 `InjectStore` 来进行注入，其实跟 `react-ts-di` 做了同样的事情，不过维护了两个单例池，考虑是否有必要单独抽出来

```ts
export class MainTabs {
 @observable
 tabTag: number = 0;

 @action
 changeTab(): void {
   this.tabTag = 1;
 }
}

------

@InjectStore
tabs!: MainTabs
```

## TODO

- [ ] three.js 应用 - 衍生出一些小游戏彩蛋
- [ ] three.js main panel
