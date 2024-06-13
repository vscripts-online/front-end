ARG NODE_VERSION=20.7.0

FROM node:${NODE_VERSION}-alpine as build

ARG NEXT_PUBLIC_VERCEL_URL
ENV NEXT_PUBLIC_VERCEL_URL=${NEXT_PUBLIC_VERCEL_URL}

ARG VITE_AUTH_HOST
ENV VITE_AUTH_HOST=${VITE_AUTH_HOST}

ARG VITE_AUTH_CLIENT_ID
ENV VITE_AUTH_CLIENT_ID=${VITE_AUTH_CLIENT_ID}

ARG VITE_AUTH_CALLBACK
ENV VITE_AUTH_CALLBACK=${VITE_AUTH_CALLBACK}

WORKDIR /app

COPY ./package.json /app/package.json
COPY ./package-lock.json /app/package-lock.json

RUN npm i

COPY . .

RUN npm run build

FROM nginx:alpine

COPY ./nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build /app/dist /usr/share/nginx/html