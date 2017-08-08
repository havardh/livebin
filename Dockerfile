FROM node:8.2.1

WORKDIR /app

ADD . /app

RUN npm install

EXPOSE 80

ENV PORT 80

CMD ["npm", "start"]
