FROM node:10
WORKDIR /usr/src/app/
EXPOSE 9229
COPY . .
RUN npm install
RUN npm run compile
CMD ["npm", "run", "app"]