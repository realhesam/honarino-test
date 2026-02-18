FROM node:lts-alpine AS deps
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

FROM node:lts-alpine AS builder
WORKDIR /app

RUN ls

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build

FROM node:lts-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

RUN chown -R node:node ./

USER node

EXPOSE 3000

CMD ["node", "server.js"]
