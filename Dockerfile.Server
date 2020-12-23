FROM node:latest as dep_cache
LABEL younccat "zzhbbdbbd@163.com"

WORKDIR /deps

# subpackages
COPY lerna.json ./
COPY yarn.lock ./
COPY package.json ./
COPY ./tsconfig.react.json ./
COPY packages ./packages
COPY shared ./shared

RUN mkdir server

COPY server/package.json server/package.json

RUN yarn

FROM node:latest

WORKDIR /node_middlewares

COPY . .
COPY --from=dep_cache /deps/node_modules ./node_modules
COPY --from=dep_cache /deps/server/node_modules ./server/node_modules
COPY --from=dep_cache /deps/packages ./packages
COPY --from=dep_cache /deps/shared ./shared

WORKDIR /node_middlewares/server

RUN yarn build

ENTRYPOINT [ "yarn", "start:prod" ]

EXPOSE 3000
