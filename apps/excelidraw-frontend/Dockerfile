FROM node:20-alpine AS production
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json ./
COPY apps/excelidraw-frontend ./apps/excelidraw-frontend
COPY packages/common ./packages/common
COPY packages/db ./packages/db
COPY packages/typescript-config ./packages/typescript-config

RUN corepack enable && pnpm install --frozen-lockfile --prod=false && pnpm build

WORKDIR /app/apps/excelidraw-frontend
EXPOSE 3000

CMD ["sh", "-c", "cd /app/apps/excelidraw-frontend && pnpm start"]
