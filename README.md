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

## Regex

正则统一封装在 `services/regex` 下，通过 `readonly` 常量暴露给外部使用，外部使用正则统一使用注入的 regex, 调用上面的方法

## Validator

通用的 Validator 经过抽象放在 `ui/form-control/validators` 目录下，通过 `form-control-types` 暴露出去

## TODO
- [ ] `PUBLIC SPACE` 可以发展为类似论坛文章一样的东西，在 UI 上用 Material Design 的 卡片
- [ ] 抽离 `卡片展示区域` 的组件，添加展示方式的功能，列表展示，卡片展示 两种
- [ ] 组织点进是该组织下的所有文档，有查看所有组织的所有文档的功能
- [ ] 在 `PUBLIC SPACE` 中设置一些 tab 用来区分小类，`建议`， `技术文章公开区域`，`专栏导读`, `广告区`
- [x] 加入 `PUBLIC SPACE`，放置一些公开的文档
- [ ] 分离出一个没有 header 和没有 footer 的 router-place，放置一些如 `登录` `注册` 之类的页面
- [x] PageHeader 加入图片元素 (效果不是太好，思考一下更好的解决方式)
- [ ] markdown 图片交互优化，点击放大
- [ ] 写文章页面，富文本编辑器调研
- [ ] 组织详情页面
- [x] 组织表结构优化，owner
- [ ] 组织概览
- [ ] 上传文件缓存，记录 hash key，通过本地对比 hash key 和 文件的链接，判断是否已经上传，返回对应的链接
- [ ] 待办事项，许多东西我们不需要及时的处理，因此可加入待办事项
- [ ] 添加七牛静态文件托管，抽离上传文件的 service
- [ ] 添加 Circle CI 支持
- [ ] Docker 自动化部署

-- 优先级低区域

- [ ] three.js 应用 - 衍生出一些小游戏彩蛋
- [ ] three.js main panel
