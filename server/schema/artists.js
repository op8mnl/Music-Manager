import { Schema, model } from 'mongoose';

const ArtistSchema = new Schema({
    id: Number,
    startYear:String,
    endYear:String,
    name:String,
    favourites: Number,
    location: String,
});

export default model("Artist", ArtistSchema);