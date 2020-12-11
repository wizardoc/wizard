# Wizardoc

Wizardoc is a WEBAPP for managing documents and knowledge.

## QuickStart

U can just use the following commands quickly launch this project.

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
