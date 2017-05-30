import { Mongo } from 'meteor/mongo';
 
export const Rooms = new Meteor.Collection("rooms", 
{
    transform:function(entry)
    {
        entry.getRightDirection = function(direction) {
          switch (direction) {
          case 'N':
            return('E');
          case 'E':
            return('S');
          case 'S':
            return('W');
          default:
            return('N');
          }
        };
        entry.goLeft = function(){ return(undefined);};
        entry.goRight = function(direction) {
          return(this.passages[this.getRightDirection(direction)]);
        };
        entry.goForward = function(direction) {
          return(this.passages[direction]);
        };
        entry.toString = function() {
          return(this.x.toString() + "," + this.y.toString());
        };
        return entry;
    }
});
