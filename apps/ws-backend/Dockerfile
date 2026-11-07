FROM node:20-alpine AS production
WORKDIR /app

ENV NODE_ENV=production
ENV WS_PORT=8080

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json ./
COPY apps/ws-backend ./apps/ws-backend
COPY packages/common ./packages/common
COPY packages/backend-common ./packages/backend-common
COPY packages/db ./packages/db
COPY packages/typescript-config ./packages/typescript-config

RUN corepack enable && pnpm install --frozen-lockfile --prod=false && pnpm build

WORKDIR /app/apps/ws-backend
EXPOSE 8080

CMD ["sh", "-c", "cd /app/packages/db && pnpm prisma generate --schema=./prisma/schema.prisma && cd /app/apps/ws-backend && pnpm run start"]
