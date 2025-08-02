This is monorepo architecture.
it consists of 3 apps inside /apps folder
1. client
2. server
3. websocketserver

Pre-requisites - node, typescript, npm
Git clone this repo
npm install -> in root folder of this repo to install dependencies

now run (each command in different command prompt):
npm run dev --workspace=server
npm run dev --workspace=websocketserver
npm run dev --workspace=client

to start server, client and websocketserver services.
