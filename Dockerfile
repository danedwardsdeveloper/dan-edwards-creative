# syntax = docker/dockerfile:1
ARG NODE_VERSION=22.2.0
FROM node:${NODE_VERSION}-slim as base
LABEL fly_launch_runtime="Next.js"
WORKDIR /app

ENV BARE_DOMAIN="dandigresses.co.uk"

ARG PNPM_VERSION=9.12.0
RUN npm install -g pnpm@$PNPM_VERSION
FROM base as build
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y build-essential node-gyp pkg-config python-is-python3
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile --prod=false
COPY . .
RUN pnpm run build
RUN pnpm prune --prod
FROM base
COPY --from=build /app/.next/standalone /app
COPY --from=build /app/.next/static /app/.next/static
COPY --from=build /app/public /app/public
EXPOSE 3000
CMD [ "node", "server.js" ]
