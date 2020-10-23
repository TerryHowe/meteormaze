# Meteor Maze

Giving the 3D Maze a shot using Meteor.

                                   /
                                  / 
    --+                          +  
      |\                        /|  
      | \                      / |  
      |  +                    +  |  
      |  |                    |  |  
      |  |                    |  |  
      |  |                    |  |  
      |  |                    |  |  
      |  |                    |  |  
      |  |                    |  |  
      |  |                    |  |  
      |  +                    +  |  
      | /                      \ |  
      |/                        \|  
    --+                          +  
                                  \ 
                                   \


# Start Development Server

   meteor run

# Docker build

   docker build --tag terrylhowe/meteormaze:latest .

# Docker run

    docker run -e "MONGO_URL=mongodb://${MONGO_USER}:${MONGO_PASSWORD}@ds161001.mlab.com:61001/maze" terrylhowe/meteormaze

For demonstration, you may use the read only user eddie:

    export MONGO_URL="mongodb://eddie:1L1M8vWhsiK2fvD7@maze-shard-00-00.k3aki.mongodb.net:27017,maze-shard-00-01.k3aki.mongodb.net:27017,maze-shard-00-02.k3aki.mongodb.net:27017/maze?ssl=true&replicaSet=atlas-2dai9a-shard-0&authSource=admin&retryWrites=true&w=majority"
