import angular from 'angular';
import angularMeteor from 'angular-meteor';
import template from './textView.html';
import { Rooms } from '../../api/rooms.js';
 
const VIEW = `
                                 
                                 
                                 
                                 
                                 
                                 
                                 
                                 
                                 
                                 
                                 
                                 
                                 
                                 
                                 
                                 
                                 
                                 
                                 
`;
const LEFT = `
 \\                               
  \\                              
   +                             
   |                             
   |                             
   |                             
   |                             
   |                             
   |                             
   |                             
   |                             
   |                             
   |                             
   |                             
   |                             
   |                             
   +                             
  /                              
 /                               
`;
const RIGHT = `
                                /
                               / 
                              +  
                              |  
                              |  
                              |  
                              |  
                              |  
                              |  
                              |  
                              |  
                              |  
                              |  
                              |  
                              |  
                              |  
                              +  
                               \\ 
                                \\
`;
const FORWARD = `
                                 
                                 
   +--------------------------+  
   |                          |  
   |                          |  
   |                          |  
   |                          |  
   |                          |  
   |                          |  
   |                          |  
   |                          |  
   |                          |  
   |                          |  
   |                          |  
   |                          |  
   |                          |  
   +--------------------------+  
                                 
                                 
`;
const LEFT_FORWARD_RIGHT = `
                                 
                                 
 --+                             
   |                             
   |                             
   |                             
   |                             
   |                             
   |                             
   |                             
   |                             
   |                             
   |                             
   |                             
   |                             
   |                             
 --+                             
                                 
                                 
`;
const RIGHT_FORWARD_LEFT = `
                                 
                                 
                              +--
                              |  
                              |  
                              |  
                              |  
                              |  
                              |  
                              |  
                              |  
                              |  
                              |  
                              |  
                              |  
                              |  
                              +--
                                 
                                 
`;
const FORWARD_FORWARD = `
                                 
                                 
                                 
                                 
                                 
      +--------------------+     
      |                    |     
      |                    |     
      |                    |     
      |                    |     
      |                    |     
      |                    |     
      |                    |     
      +--------------------+     
                                 
                                 
                                 
                                 
                                 
`;
const FORWARD_LEFT = `
                                 
                                 
   +                             
   |\\                            
   | \\                           
   |  +                          
   |  |                          
   |  |                          
   |  |                          
   |  |                          
   |  |                          
   |  |                          
   |  |                          
   |  +                          
   | /                           
   |/                            
   +                             
                                 
                                 
`;
const FORWARD_RIGHT = `
                                 
                                 
                              +  
                             /|  
                            / |  
                           +  |  
                           |  |  
                           |  |  
                           |  |  
                           |  |  
                           |  |  
                           |  |  
                           |  |  
                           +  |  
                            \\ |  
                             \\|  
                              +  
                                 
                                 
`;
const FORWARD_LEFT_FORWARD_RIGHT = `
                                 
                                 
                                 
                                 
                                 
    --+                          
      |                          
      |                          
      |                          
      |                          
      |                          
      |                          
      |                          
    --+                          
                                 
                                 
                                 
                                 
                                 
`;
const FORWARD_RIGHT_FORWARD_LEFT = `
                                 
                                 
                                 
                                 
                                 
                           +--   
                           |     
                           |     
                           |     
                           |     
                           |     
                           |     
                           |     
                           +--   
                                 
                                 
                                 
                                 
                                 
`;

class TextViewCtrl {

  constructor($scope, $document) {
    $scope.viewModel(this);
    this.view = '';
    this.x = 0;
    this.y = 0;
    this.direction = 'N';
    this.rooms = {};
    this.subscribe('rooms', function() {
      this.createRoomMap();
      this.view = this.render();
    });
    var that = this;
    $document.bind("keydown", function(event) {
      $scope.$apply(function(){
        that.handleKeyDown(event);
      });
    });
  }

  createRoomMap() {
    let roomy = Rooms.find().fetch();
    roomy.forEach(function(room) {
      Object.keys(room.passages).forEach(function(key) {
        room.passages[key] = roomy[room.passages[key]];
      });
    });
    this.rooms = {}
    roomy.forEach(r => {
      this.rooms[r.getKey()] = r;
    });
  }

  getRoom() {
    return(this.rooms[this.x.toString() + "," + this.y.toString()]);
  }

  render() {
    let room = this.getRoom();
    if (typeof room === 'undefined') {
      this.header = 'no where';
      return 'nada';
    }

    let t = [VIEW.split("")]
    let left_room = room.goLeft(this.direction)
    let forward_room = room.goForward(this.direction)
    let right_room = room.goRight(this.direction)
    if (typeof left_room === 'undefined') {
      t.push(LEFT.split(""))
    }
    else {
      if (typeof left_room.goForward(this.direction) === 'undefined') {
        t.push(LEFT_FORWARD_RIGHT.split(""))
      }
    }
    if (typeof forward_room === 'undefined') {
      t.push(FORWARD.split(""))
    }
    else {
      let forward_left_room = forward_room.goLeft(this.direction)
      if (typeof forward_left_room === 'undefined') {
        t.push(FORWARD_LEFT.split(""))
      }
      else {
        if (typeof forward_left_room.goForward(this.direction) === 'undefined') {
          t.push(FORWARD_LEFT_FORWARD_RIGHT.split(""))
        }
      }
      if (typeof forward_room.goForward(this.direction) === 'undefined') {
        t.push(FORWARD_FORWARD.split(""))
      }
      let forward_right_room = forward_room.goRight(this.direction)
      if (typeof forward_right_room === 'undefined') {
        t.push(FORWARD_RIGHT.split(""))
      }
      else {
        if (typeof forward_right_room.goForward(this.direction) === 'undefined') {
          t.push(FORWARD_RIGHT_FORWARD_LEFT.split(""))
        }
      }
    }
    if (typeof right_room === 'undefined') {
      t.push(RIGHT.split(""))
    }
    else {
      if (typeof right_room.goForward(this.direction) === 'undefined') {
        t.push(RIGHT_FORWARD_LEFT.split(""))
      }
    }
    let zip= rows=>rows[0].map((_,c)=>rows.map(row=>row[c]))
    let z = zip(t);
    let result = z.map(row => {return row.reduce((a,b) => {return a>b?a:b;})});
    this.header = this.direction + " from " + room.getKey();
    return(result.join(""));
  }

  handleKeyDown(e) {
    switch (e.key) {
    case 'w':
      this.goForward();
      this.view = this.render();
      break;
    case 'a':
      this.goLeft();
      this.view = this.render();
      break;
    case 's':
      this.goBackward();
      this.view = this.render();
      break;
    case 'd':
      this.goRight();
      this.view = this.render();
      break;
    default:
      return;
    }
    return;
  }

  goForward() {
    let room = this.getRoom();
    if (typeof room === 'undefined') {
      return;
    }
    let destination = room.goForward(this.direction)
    if (typeof destination === 'undefined') {
      return;
    }
    this.x = destination.x;
    this.y = destination.y;
  }

  goBackward() {
    let room = this.getRoom();
    if (typeof room === 'undefined') {
      return;
    }
    let destination = room.goBackward(this.direction)
    if (typeof destination === 'undefined') {
      return;
    }
    this.x = destination.x;
    this.y = destination.y;
  }

  goLeft() {
    switch (this.direction) {
    case 'N':
      this.direction = 'W';
      break;
    case 'E':
      this.direction = 'N';
      break;
    case 'S':
      this.direction = 'E';
      break;
    default:
      this.direction = 'S';
      break;
    }
  }

  goRight() {
    switch (this.direction) {
    case 'N':
      this.direction = 'E';
      break;
    case 'E':
      this.direction = 'S';
      break;
    case 'S':
      this.direction = 'W';
      break;
    default:
      this.direction = 'N';
      break;
    }
  }
}
 
export default angular.module('maze', [
  angularMeteor
])
  .component('textView', {
    templateUrl: 'imports/components/textView/textView.html',
    controller: ['$scope', '$document', TextViewCtrl]
  });
