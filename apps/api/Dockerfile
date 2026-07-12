# API Fastify — imagem de produção (Cloudflare Containers / Node)
# Ver ADR-0008 e docs/guides/deploy.md
# Contexto de build: raiz do monorepo

FROM node:22-alpine
WORKDIR /app

ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=8787

RUN corepack enable && corepack prepare pnpm@11.5.2 --activate

COPY package.json pnpm-workspace.yaml pnpm-lock.yaml ./
COPY apps/api/package.json ./apps/api/
COPY packages/shared/package.json ./packages/shared/

RUN pnpm install --frozen-lockfile --filter @kleilson/api...

COPY packages/shared ./packages/shared
COPY apps/api ./apps/api

WORKDIR /app/apps/api
EXPOSE 8787
USER node
CMD ["pnpm", "exec", "tsx", "index.ts"]
