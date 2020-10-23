FROM jshimko/meteor-launchpad:latest

ENV INSTALL_MONGO false
ENV MONGO_URL 'export MONGO_URL="mongodb://eddie:1L1M8vWhsiK2fvD7@maze-shard-00-00.k3aki.mongodb.net:27017,maze-shard-00-01.k3aki.mongodb.net:27017,maze-shard-00-02.k3aki.mongodb.net:27017/maze?ssl=true&replicaSet=atlas-2dai9a-shard-0&authSource=admin&retryWrites=true&w=majority"
