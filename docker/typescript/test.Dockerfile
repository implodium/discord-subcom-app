FROM node:10
WORKDIR /usr/src/app
CMD ["npm", "run", "test-in-docker"]
COPY package*.json ./
RUN npm install
COPY . .
