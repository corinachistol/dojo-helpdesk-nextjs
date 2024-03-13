FROM node:18-alpine

# Install json-server globally
RUN npm install -g json-server

RUN npm install -g nodemon

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

RUN npm run build

COPY .next ./.next

# Start both Next.js and json-server
CMD ["npm", "run", "dev"]