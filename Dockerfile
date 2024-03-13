ARG NODE_VERSION=20.7.0

FROM node:${NODE_VERSION}-alpine as build

ARG VITE_API_URL=http://localhost:3000

WORKDIR /app

COPY ./package.json /app/package.json
COPY ./package-lock.json /app/package-lock.json

RUN npm ci

COPY . .

RUN npm run build

FROM nginx:alpine

COPY ./nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build /app/dist /usr/share/nginx/html