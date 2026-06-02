FROM node:22-alpine

WORKDIR /app

COPY package*.json ./
COPY nx.json ./
COPY tsconfig.base.json ./

RUN npm install

COPY . .

RUN npx nx build sist-conv-api

EXPOSE 3000

CMD ["node", "apps/sist-conv-api/dist/main.js"]
