FROM node:10
WORKDIR /usr/src/app/
EXPOSE 9229
COPY . .
RUN npm install
CMD ["npm", "run", "app"]