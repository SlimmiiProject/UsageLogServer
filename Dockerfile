FROM node:18

WORKDIR /server

COPY ./server/package*.json  ./

RUN npm install -f
RUN npm install typescript -g 
RUN npm i --save-dev @types/node -g

COPY . /server

ENV URL="http://localhost"
ENV SERVER_PORT=3001

EXPOSE 3001

CMD [ "npm", "run","start-linux" ]