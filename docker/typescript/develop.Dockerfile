FROM node:alpine
WORKDIR /usr/src/app/
EXPOSE 9229
# app-in-docker is necessary because of the jetbrains workdir overwrite
CMD ["npm", "run", "app-in-docker"]
COPY package*.json ./
RUN npm install

COPY . .
RUN npm run compile