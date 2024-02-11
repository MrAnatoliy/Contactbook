FROM node:20

COPY ./server .
COPY .env .
COPY package.json .
COPY package-lock.json .

WORKDIR .

EXPOSE 3001

RUN npm install
CMD ["node","server"]
