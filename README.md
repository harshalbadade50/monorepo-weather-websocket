## Monorepo Atchitecture
This is monorepo architecture.
it consists of 3 apps inside ```/apps``` folder:
1. **client**
2. **server**
3. **websocketserver**

Pre-requisites - ``` node, typescript, npm ```

Git clone this repo and after cloning:

```npm install ``` -> in root folder of this repo to install dependencies. This will install dependencies for all 3 services

Now start the **client, server and websocketserver** services separately in command prompt

### run (each command in different command prompt):

```
npm run dev --workspace=server
npm run dev --workspace=websocketserver
npm run dev --workspace=client
```
