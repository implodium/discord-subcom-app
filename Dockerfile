FROM node:alpine
WORKDIR . .
CMD ["node", "./dist/Main"]
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run compile