# API Fastify — imagem de produção (Cloudflare Containers / Node)
# Ver ADR-0008 e docs/guides/deploy.md

FROM node:22-alpine
WORKDIR /app

ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=8787

COPY package.json package-lock.json ./
# Inclui tsx (devDep) para entry TypeScript até haver build compile do server.
RUN npm ci && npm cache clean --force

COPY server ./server
COPY tsconfig.json ./
COPY server/tsconfig.json ./server/tsconfig.json

EXPOSE 8787
USER node
CMD ["npx", "tsx", "server/index.ts"]
