<div>
  <p align="center"><img src="https://github.com/wizaaard/wizard/blob/master/client/src/app/assets/static/wizard-card-variant.png"></p>
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

## 贡献指南
关于贡献时的一些快速上手指南。
`Wizardoc` 是一个技术驱动的文档管理平台，它体现在文档和知识管理的互相结合，其中包括前端组件文档，Swagger API 文档，markdown 文档，还可以陆续加入流程图等，这些都在新的 Feature 当中！

在生活中我很鼓励大家去多写文档，这样带来的维护成本是最小的，可能需要一个平台，这是 `Wizard` 在做的一部分事情。在另一方面，我认为一个框架或语言的上手曲线和难易程度在一部分层面上取决于该框架或语言的 API 文档，另一方面是拥有大量的学习总结和踩坑博文，但技术分享的博文和文档其实是相当相似的。`Wizard` 以组织的单位来划分作者，你可以属于多个组织，在组织中，你撰写的开放的文档即是分享的内容！

我是一个很喜欢写博客的人，从几年前就有这个习惯，于是我想有一个大家一起维护的博客平台，这就是 Wizard Public Space！它是一个开放的领域，这里堆积着各种各样的开放文档，它是另一种形式的博客平台，于此同时，你可以开放你组织内部的规范到社区，欢迎你这样做！

### 开头的话
`Wizard` 还很不成熟，从各个方面，架构上，业务上，思考上，都很不成熟，我想让它变的更好，在近段时间，我一直在思考最佳的解决方案，不断的重构，我认为这是一种对待工程最好的方式。

谢谢你 `Clone Wizard`，我希望能和大家一起思考问题，一起寻找最佳的解决问题的方式，这个项目一开始就不是为了业务，我希望大家能在贡献之余从中学到以前很难学到的东西，或者带给 Wizard 令人激动的新功能！这是 Wizard 成立的初衷。

后端 Archie 的项目在 [->> 这里 <<-](https://github.com/wizaaard/archie)。

### 贡献流程
另起一个代表功能的分支，比如

```shell
git checkout feature-login-page
```

或者修复一些 bug，比如

```shell
git checkout fix-login-bug
```

在新的分支上做相应的开发，完成后发起 `Pull Request` 合并到 `Master`，一次贡献就完成了！

### 快速开始
```shell
cd client
yarn install
yarn dll
yarn start
```

在启动之前，需要在 `/client/src/app/.config` 目录下创建 `server-config.json` 文件，这是 API 的配置文件,确定 API 请求地址，下面是一份 `server-config.json`:

```json
{
  "baseUrl": "localhost",
  "port": 4000,
  "protocol": "http",
  "mode": "dev"
}
```

### 文件目录组织结构
外层工程目录组织结构（主要是 Client 和 Server 目录，Wizard 使用 `lerna` 来做多包管理）

```js
├── .circleci
├── .vscode
├── client
├── doc
├── docker
├── server
├── client // App 主要目录
├── server // koa 服务，主要提供 SSR，现在还没搭建起来，这是近期要做的事情，有兴趣的话可以提 PR
│

```

Client 目录组织结构

```js
├── config // Webpack 配置文件存放目录
├── public  // html 模板以及一些其他的工程静态文件
├── scripts // 启动脚本，CRA 的启动脚本
├── src // 代码源文件
│    ├── app // 网站源文件
│    ├── ssr // ssr 需要的连接客户端的胶水代码
│    ├── test // 单元测试
├── static // DLL 的输出目录
```

App 目录组织结构 `/client/src/app/`

```js
├── animations // 动画 HOC
├── api // api 相关配置
├── assets // 图片字体等静态文件
├── components // 业务组件
├── configs // 放置一些业务相关的的全局配置
├── constants // 全局的常量目录
├── pages // 页面目录，所有的页面都放在这下面，页面由 "component" 搭建而成，它们放在 components 目录下，这里只是单纯的页面
├── routes // 路由
├── services // 服务，提供一些全局的服务
├── store // mobx store (准备重构废弃，先不用管这个目录)
├── theme // 全局的样式，通过 Context 向下注入，方便主题修改
├── ui //一些业务无关的通用的组件
├── utils //全局的工具
```

## Lint
lint 是我在之前公司写的一个小的 tslint rules 库 [Magicspace](https://github.com/makeflow/magicspace)

又一个约定：在一个目录下，文件如果不以 `@` 开头的话，那这个文件是必须被导出到外层的。

比如

```js
├── foo
  ├── bar.ts
  ├── index.ts
```

index.ts
```typescript
export * from './bar'
```

这样做是必须的，要不然 lint 会向你抛出错误，如果你不想将它抛出外层，你必须在文件名前面加上 `@`

```
@bar.ts
```

## 依赖注入
Wizard 的架构在这部分上借鉴了 `Angular`，组件之间的通信通过 Service 来完成。一个 Service 提供一个服务，使用了 [react-ts-di](https://github.com/youncccat/react-ts-di) 完成这部分功能，它是一个精简的轻量级的 React 的依赖注入库。

用 `@Injectable` 装饰表明它是一个 Service，下面是一个 Toast 服务，它的功能是弹出一个轻提示。

```typescript
import {Injectable} from 'react-ts-di';

import {TipStore} from '../store';
import {InjectStore} from '../utils';

@Injectable()
export class Toast {
  @InjectStore(TipStore)
  private tipStore!: TipStore;

  success(text: string): void {
    this.tipStore.addTipToQueue(text, 'success');
  }

  error(text: string): void {
    this.tipStore.addTipToQueue(text, 'error');
  }

  warning(text: string): void {
    this.tipStore.addTipToQueue(text, 'warning');
  }

  info(text: string): void {
    this.tipStore.addTipToQueue(text, 'info');
  }
}
```

在任何组件需要 Toast 的地方进行 `@Inject` 装饰，IOC 会将这个 service 的实例创建好并注入进来。

```typescript
export class User extends Component {
  @Inject
  toast!:Toast

  render(): ReactNode {
    return <div onClick={() => this.toast.success('click!')}></div>
  }
}
```

这是组件间通信共享状态的主要机制。

## 正则表达式

在 `/services` 目录下，有 RegexUtil service，它提供一些常用的正则，在业务组件不应该写 regex 字面量，应该通过在 RegexUtil service 里注册正则表达式，通过方法将它暴露出来。

## 表单

现在的表单并不齐全，表单验证 `FormControl` 在 `/ui/form-control` 下，具体使用方法见代码

## 路由

所有的路由按功能拆分在 `/routes` 目录下，如果要添加新的路由文件，只需要创建一个 `xxx-routes.ts` 在该目录下并导出就行了

```js
export xxxRoutes:Routes[] = [...]
```

这样这个 xxx routes 就已经被注册了，不需要额外的配置

路由对象如下，它声明在 `/service/route` 下

```typescript
export interface Route {
  path: string; // 路由路径
  exact?: boolean; // 是否精准匹配
  redirect?: string; // 重定向
  layout?: Layout; // 路由对应的布局
  /**
   * 当 Component 为空时，会自动填充 404
   */
  component?: ComponentType<RouteComponentProps<any>> | ComponentType<any>; // 该 path 对应的 组件
  activatedGuard?: ActivatedGuardConstructor; // 进入该路由的守卫
  deactivatedGuard?: DeactivatedGuardConstructor; // 离开该路由的守卫
  children?: Routes; // 子路由
}
```

wizard 的路由机制其实是不存在子路由的概念的，在被注册的路由被解析的时候会被全部摊平，比如:

```typescript
export const UserRoutes: Routes = [
  {
    path: '/user',
    layout: 'limpidity',
    component: Foo,
    children: [
      {
        path: '/register',
        component: Register,
      },
      {
        path: '/login',
        component: Login,
      },
      {
        path: '/email-validator',
        component: EmailValidator,
      },
    ],
  },
];
```

它会被解析成(需要注意的是，layout 的默认值是 normal，子路由没有声明 layout 的话会继承父路由的 layout):
```typescript
[
  {
    path: '/user',
    component: User,
    layout: 'limpidity',
  },
  {
    path: '/user/register',
    component: Register,
    layout: 'limpidity',
  },
  {
    path: '/user/login',
    component: Login,
    layout: 'limpidity',
  },
  {
    path: '/user/email-validator',
    component: EmailValidator,
    layout: 'limpidity',
  },
]
```

## Validator

通用的 Validator 经过抽象放在 `ui/form-control/validators` 目录下，通过 `form-control-types` 暴露出去

## Pages
- [ ] 文档页面 （3 个 tab）
  - [ ] 普通 Markdown 文档页面
  - [ ] 规范文档页面 （有 diff）
  - [ ] API 文档页面（封装 swagger）
- [ ] 组织页面
  - [ ] 组织卡片预览页面
  - [ ] 组织管理页面，Owner 才能进入
- [ ] PUBLIC SPACE
  - [ ] 公开文章区
  - [ ] 专栏导读
  - [ ] 广告区
  - [ ] 建议
- [ ] Markdown 编辑器
- [ ] 新建文档页面
  - [ ] 嵌入 markdown
- [ ] 消息系统页面
  - [ ] 消息列表
  - [ ] 消息通知 bar，需要显示条数
  - [ ] 具体消息内容
  - [ ] 只有删除行为的消息条
  - [ ] 有接受和拒绝的消息条

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
- [x] 添加 Circle CI 支持
- [ ] Docker 自动化部署

-- 优先级低区域

- [ ] three.js 应用 - 衍生出一些小游戏彩蛋
- [ ] three.js main panel

# 页面描述

## 组织文档页面

- 前端组件文档
- swagger API 文档
- markdown 文档

### 组织内

文档是通过组织管理的，一个组织有一个 owner，owner 的权限有

- 增加成员
- 通过成员申请
- 删除成员
- 设置文档权限 （读写，只读，是否公开，是否可见）
- 新建文档
- 删除文档

成员具有的权限

- 邀请成员
- 默认权限（只读）
- 新建文档

### 组织外

新建组织

### 新建文档

用户可以在组织内新建文档，新建文档的时候一般有几个选项：

- 文档类型（swagger，组件文档，markdown）

文档写完毕后的选项：

- 该文档的默认权限（默认为只读）
- 是否公开 （默认为否）
  - 如果是⬇️
  - 选择分类 （ref： 分类）

## 分类

- 随笔
  - 生活
  - 杂文
- 技术
  - 前端
  - 后端
  - 数据库
  - 架构
  - 语言类
  - 框架
  - 轮子
- 广告区 （非不正当言论）

## 文档

文档由各个分类的类型条件到具体的解析器开始渲染；

文档头部信息包括：

- 属于组织
- 作者信息
  - 头像
  - 名称
- 发表日期
- 版权声明
- 最后一次编辑日期

文档的内容包括：

- 点赞

## PUBLIC SPACE 页面

在此看到的文章都是公开的，都是大家想分享的一些东西
