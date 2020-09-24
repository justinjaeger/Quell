# start with this "base" image -- build on top of it
FROM node:10.1

# all subsequent commands use this directory
WORKDIR /usr/src/app/

# COPY . "all" and put it inside the listed directory
COPY . /usr/src/app/

# RUN builds your application -- download all your dependencies and build
# RUN cd demo
RUN npm install
RUN npm run build

EXPOSE 3000

# going to run node and this source
ENTRYPOINT [ "node", "./server/server.js" ]

# CMD specifies which command to run with the container