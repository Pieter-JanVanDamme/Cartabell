import { Marker } from './marker/marker.model';

export class Entry {
    private _id: string;
    private _title: string;
    private _keynote : boolean;
    private _dateCreated : Date = new Date();
    private _dateModified : Date;
    private _contents : string;
    private _markers = new Array<Marker>();
    private _author : string;
    private _collaborators : string[];

    constructor(title : string, contents : string, keynote : boolean = false, markers = null,
            author : string = "", collaborators : string[] = [], id : string = undefined,
            dateModified = new Date()){
        this._title = title;
        this._contents = contents;
        this._keynote = keynote;
        this._markers = markers;
        this._author = author.toLowerCase();
        this._collaborators = collaborators;
        this._id = id;
        this._dateModified = dateModified;
    }

    get id() : string {
        return this._id;
    }

    get author() : string {
        return this._author;
    }

    get collaborators() : string[] {
        return this._collaborators;
    }

    addToCollaborators(user : string){
        this._collaborators.push(user);
    }

    removeFromCollaborators(user : string){
        this._collaborators.splice(this._collaborators.indexOf(user), 1);
    }

    get title() : string {
        return this._title;
    }

    set title(newTitle : string) {
        this._title = newTitle;
    }

    get keynote() : boolean {
        return this._keynote;
    }

    get dateCreated() : Date {
        return this._dateCreated;
    }

    get dateModified() : Date {
        return this._dateModified;
    }

    updateDateModified() {
        this._dateModified = new Date();
    }

    get contents() : string {
        return this._contents;
    }

    set contents(newContents : string) {
        this._contents = newContents;
    }

    get markers() : Array<Marker> {
        return this._markers;
    }

    addMarker(marker : Marker){
        this._markers.push(marker);
    }

    removeMarker(marker : Marker){
        let index = this._markers.indexOf(marker, 0);
        if(index > -1){
          this._markers.splice(index,1);
        }
    }

    toggleKeynote(){
        this._keynote = !this._keynote;
    }

    toJSON() {
        return {
          title: this._title,
          contents: this._contents,
          keynote: this._keynote,
          dateCreated: this._dateCreated,
          markers: this._markers.map(mrkr => mrkr.toJSON()),
          author: this._author,
          collaborators: this._collaborators,
          _id: this._id, // !!!
          dateModified: this._dateModified
        };
    }   
    
    static fromJSON(json: any): Entry {
        const entr = new Entry(
          json.title,
          json.contents,
          json.keynote,
          json.markers.map(Marker.fromJSON),
          json.author,
          json.collaborators,
          json._id,
          json.dateModified
        );
        return entr;
      }

}
