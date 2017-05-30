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

  constructor($scope) {
    $scope.viewModel(this);
    this.direction = 'N';
    this.view = this.render(this.direction);
  }

  get_room() {
    let rooms = Rooms.find().fetch();
    rooms.forEach(function(room) {
      Object.keys(room.passages).forEach(function(key) {
        room.passages[key] = rooms[room.passages[key]];
      });
    });
    return(rooms[0]);
  }

  render(direction) {
    let room = this.get_room();
    if (typeof room == 'undefined') {
      return '';
    }
    if (direction == 'undefined') {
      this.direction = 'E';
    }
    else {
      this.direction = direction;
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
    return(result.join(""));
  }

  addTask(newTask) {
    this.newTask = '';
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
    this.view = this.render(this.direction);
  }
}
 
export default angular.module('maze', [
  angularMeteor
])
  .component('textView', {
    templateUrl: 'imports/components/textView/textView.html',
    controller: ['$scope', TextViewCtrl]
  });
