# Wizardoc

Wizardoc is a WEBAPP for managing documents and knowledge.

## QuickStart

U can just use the following commands quickly lunch this project.

```bash
# Compile lerna packages
yarn compile

# Link to client/server
yarn bootstrap
```

Notice: The application using node server as a middleware for forward all request from client and process data of response.
<br />

>

<div style="display:flex;justify-content: space-between; padding: 10px 0;align-items: center;width: 500px;">
<div style="width:100px;height: 50px;line-height: 50px;text-align:center;border: 1px solid #3970f5;border-radius:3px;">WEBAPP</div> <div><div><--</div><div>--></div></div>
<div style="width:100px;height: 50px;line-height: 50px;text-align:center;border: 1px solid #3970f5;border-radius:3px;">Node</div> <div><div><--</div><div>--></div></div>
<div style="width:100px;height: 50px;line-height: 50px;text-align:center;border: 1px solid #3970f5;border-radius:3px;">Server</div>
</div>
<br />

So u should start node server before client.

```bash
# start application
yarn server:start & yarn client:start
```
