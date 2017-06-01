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

