FROM jshimko/meteor-launchpad:latest

ENV INSTALL_MONGO false
ENV MONGO_URL 'mongodb://${MONGO_USER}:${MONGO_PASSWORD}@ds161001.mlab.com:61001/maze'
