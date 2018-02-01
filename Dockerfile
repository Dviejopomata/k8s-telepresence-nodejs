FROM node:9.4.0
RUN npm install nodemon -g
WORKDIR /service
COPY . ./
EXPOSE 3000
ENTRYPOINT ["nodemon","--inspect=0.0.0.0:3001", "server.js"]