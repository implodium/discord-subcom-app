FROM node:10
WORKDIR /usr/src/app/
EXPOSE 9229
COPY . .
RUN npm install
RUN npm run compile
# app-in-docker is necessary because of the jetbrains workdir overwrite
CMD ["npm", "run", "app-in-docker"]