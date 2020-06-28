FROM node:alpine
WORKDIR . .
CMD ["npm", "run", "app-in-docker"]
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run compile