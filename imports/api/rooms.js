import { Mongo } from 'meteor/mongo';
 
export const Rooms = new Meteor.Collection("rooms", 
{
    transform:function(entry)
    {
        entry.goLeft = function(){ return(null);};
        entry.goRight = function(){ return(null);};
        entry.goForward = function(){ return(null);};
        entry.toString = function(){ return(this.x.toString() + "," + this.y.toString());};
        return entry;
    }
});
