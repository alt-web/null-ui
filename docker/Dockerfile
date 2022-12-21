FROM node:19-alpine AS builder

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install

ENV NEXT_TELEMETRY_DISABLED 1

COPY . .
RUN npm run build

FROM node:19-alpine

WORKDIR /app
COPY package.json package-lock.json ./
ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN npm install --omit=dev

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

COPY ./next.config.js ./
COPY /.env.production .

EXPOSE 3000

LABEL org.opencontainers.image.source https://github.com/alt-web/null-ui

ENTRYPOINT ["npm", "start"]
