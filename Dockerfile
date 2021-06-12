FROM node:14

WORKDIR /www

RUN npm install -g typescript ts-node

ENV PORT 8080
ENV NODE_ENV production
ENV DB_SERVER starwarsdb.cowbr3k8zikh.us-east-2.rds.amazonaws.com
ENV DB_PORT 3306
ENV DB_USER root
ENV DB_PASS password
ENV DB_NAME starwars_db

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080

#start command
CMD ["ts-node", "./src/bin/index.ts"]
