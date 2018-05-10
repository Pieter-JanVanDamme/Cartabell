import { Entry } from "../entry.model";

export class Marker {
    private _id : string;
    private _color: string;
    private _name: string;

    constructor(color: string, name: string){
        // checking name.length in the form!
        this._color = color;
        this._name = name;
    }

    get color() : string {
        return this._color;
    }

    get name() : string {
        return this._name;
    }

    toJSON() {
        return {
            _id : this._id,
            color : this._color,
            name : this._name
        }
    }   
    
    static fromJSON(json: any): Marker {
        const mrkr = new Marker(
          json.color,
          json.name
        );
        mrkr._id = json._id;
        return mrkr;
      }
}