FROM ianwalter/puppeteer:latest

# RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /app
ADD . /app
# COPY package*.json ./

# USER node
RUN npm install

# COPY --chown=node:node . .

CMD npm run docker-test &