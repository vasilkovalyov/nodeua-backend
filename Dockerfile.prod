# Stage 1: Build
FROM node:20-alpine AS build

WORKDIR /usr/src/app

ENV HUSKY=0

COPY package*.json ./
COPY tsconfig.json ./

RUN npm ci

COPY . .

RUN npx tsc

# Stage 2: Production
FROM node:20-alpine AS production

WORKDIR /usr/src/app

ENV NODE_ENV=production
ENV HUSKY=0

COPY package*.json ./

RUN npm ci --only=production --ignore-scripts && npm cache clean --force

COPY --from=build /usr/src/app/build ./build

EXPOSE 8080

CMD ["node", "build/server.js"]