import { Mongo } from 'meteor/mongo';
 
export const Rooms = new Meteor.Collection("rooms", 
{
    transform:function(entry)
    {
        entry.goLeft = function(){ return(undefined);};
        entry.goRight = function(){ return(undefined);};
        entry.goForward = function(){ return(undefined);};
        entry.toString = function(){ return(this.x.toString() + "," + this.y.toString());};
        return entry;
    }
});
