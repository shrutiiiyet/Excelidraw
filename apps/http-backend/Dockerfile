FROM node:20-alpine AS production
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3001

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json ./
COPY apps/http-backend ./apps/http-backend
COPY packages/common ./packages/common
COPY packages/backend-common ./packages/backend-common
COPY packages/db ./packages/db
COPY packages/typescript-config ./packages/typescript-config

RUN corepack enable && pnpm install --frozen-lockfile --prod=false && pnpm build

WORKDIR /app/apps/http-backend
EXPOSE 3001

CMD ["sh", "-c", "cd /app/packages/db && pnpm prisma generate --schema=./prisma/schema.prisma && cd /app/apps/http-backend && pnpm run start"]
