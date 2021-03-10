# Wizardoc

Wizardoc is a WEBAPP for managing documents and knowledge.

## QuickStart

U can just use the following commands to quickly launch this project.

```bash
# Link to client/server
yarn bootstrap

# Compile lerna packages
yarn compile
```

The application using node server as a middleware for forward all request from client and process data of response.

```shell
┌───────────────────┐          ┌───────────────────┐          ┌───────────────────┐
│                   │  <-----  │                   │  <-----  │                   │
│       WEBAPP      │          │  Node Middleware  │          │     API Server    │
│                   │  ----->  │                   │  ----->  │                   │
└───────────────────┘          └───────────────────┘          └───────────────────┘
```

So u should start node server before client.

```bash
# Start application
yarn server:start & yarn client:start
```

## Endpoint configs

Each project(Client or Server) has a configuration directory named `.config`, you can update the config files inside the directory to change config of endpoint.

## 🎯 TroubleShooting

Troubleshooting is process of diagnosing of the source of a problem, here r the problems that may be encountered in the project. If u find anything that's not on record here, u can give us feedback via [Issue](https://github.com/wizardoc/wizard/issues)🐛.

### 📦Start website by Parcel@2

Normally, u can just need to run `parcel public/index.html` to start Node server that with the website, unfortunately except this command u have to specify a PATH to help Node to find the position of `node_modules` because of the parcel@2 don't support `cross-dependency` of monorepo by Lerna, in this case, we specify the `NODE_PATH` as `../` to ensure the website can run without monorepo support of Parcel@2.
