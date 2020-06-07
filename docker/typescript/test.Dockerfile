FROM node:10
WORKDIR /usr/src/app
CMD ["npm", "run", "test"]
COPY package.json .
RUN npm install
COPY . .
