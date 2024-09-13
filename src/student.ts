import * as mongodb from "mongodb";

export interface Student{
    id: mongodb.ObjectId;
    name: string;
    age:Number;
    marks:Marks;
    status : 'pass' | 'fail';
    meetParents : Boolean;    
}

interface Marks {
    math : Number;
    eng : Number;
    science: Number;
    total : Number;
}