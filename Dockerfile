FROM node:latest

WORKDIR D:\School\2022-2023\SlimiiProject\UsageLogServer\server

COPY package*.json ./

RUN npm install

COPY . .

ENV URL="http://localhost"
ENV DEV_ENV=false
ENV SERVER_PORT=3001

ENV DATABASE_HOST="vanderborght.dev"
ENV DATABASE_USERNAME="gulsumbi_admin"
ENV DATABASE_PASSWORD="7pv90v?6N"
ENV DATABASE_NAME="ITCASETest"
ENV DATABASE_PORT=3306

ENV MAIL_HOST="smtp.gmail.com"
ENV MAIL_PORT=587
ENV MAIL_USERNAME="slimmiiproject@gmail.com"
ENV MAIL_PASSWORD="ojpgavlrlresxlwi"

EXPOSE 3000
EXPOSE 3001

CMD [ "npm", "run","start" ]