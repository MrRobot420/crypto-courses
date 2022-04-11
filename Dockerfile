FROM node:alpine

# Create WORKDIR for container
WORKDIR /usr/src/app

# Only COPY package.json to work dir
COPY package.json .

# Install all dependencies (including typescript)
RUN npm install && npm install typescript -g

# Add all other source code to work dir
ADD . /usr/src/app

# Compile the ts project to js
RUN npm run tsc

# Start the node.js server
CMD [ "npm", "start" ]