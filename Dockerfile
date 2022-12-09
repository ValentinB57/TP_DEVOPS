from node:18
workdir /app

COPY package.json .
COPY package-lock.json .
RUN npm ci

COPY ./src/* .
CMD ["index.js"]