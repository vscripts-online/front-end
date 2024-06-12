ARG NODE_VERSION=20.7.0

FROM node:${NODE_VERSION}-alpine as build

ARG VITE_API_URL=https://api-cdn.vscripts.online
ARG VITE_AUTH_HOST=http://localhost:3000
ARG VITE_AUTH_CLIENT_ID=JsrmNLUgCCXkxv6uEN4GHQ
ARG VITE_AUTH_CALLBACK=http://localhost:5173
ARG VITE_API_URL=http://localhost:3002


WORKDIR /app

COPY ./package.json /app/package.json
COPY ./package-lock.json /app/package-lock.json

RUN npm i

COPY . .

RUN npm run build

FROM nginx:alpine

COPY ./nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build /app/dist /usr/share/nginx/html