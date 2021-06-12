FROM node:14

WORKDIR /www

RUN npm install -g typescript ts-node

ENV PORT 8080

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080

#start command
CMD ["ts-node", "./src/bin/index.ts"]
