import { Mongo } from 'meteor/mongo';
 
export const Rooms = new Meteor.Collection("rooms", 
{
    transform:function(entry)
    {
        entry.getBackwardDirection = function(direction) {
          switch (direction) {
          case 'N':
            return('S');
          case 'E':
            return('W');
          case 'S':
            return('N');
          default:
            return('E');
          }
        };
        entry.getLeftDirection = function(direction) {
          switch (direction) {
          case 'N':
            return('W');
          case 'E':
            return('N');
          case 'S':
            return('E');
          default:
            return('S');
          }
        };
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
        entry.goForward = function(direction) {
          return(this.passages[direction]);
        };
        entry.goBackward = function(direction) {
          return(this.passages[this.getBackwardDirection(direction)]);
        };
        entry.goLeft = function(direction) {
          return(this.passages[this.getLeftDirection(direction)]);
        };
        entry.goRight = function(direction) {
          return(this.passages[this.getRightDirection(direction)]);
        };
        entry.toString = function() {
          return(this.x.toString() + "," + this.y.toString());
        };
        entry.getKey = function() {
          return(this.x.toString() + "," + this.y.toString());
        };
        return entry;
    }
});

if (Meteor.isServer) {
  Meteor.publish('rooms', function roomssPublication() {
    return Rooms.find();
  });
}
