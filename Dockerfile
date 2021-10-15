# Base image
FROM node

# Make the app directory
RUN mkdir -p /home/node/express-app

# Working directory
WORKDIR /home/node/express-app

# Node Environment
ARG NODE_ENV

COPY package.json .

# Node environment check
COPY node-env-check.sh .
RUN chmod +x node-env-check.sh
RUN sh node-env-check.sh

COPY . .

CMD ["node", "server.js"]