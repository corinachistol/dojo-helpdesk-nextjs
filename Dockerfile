FROM node:18-alpine

RUN npm install -g nodemon

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

RUN npm run build

COPY .next ./.next

CMD ["npm", "run", "dev"]