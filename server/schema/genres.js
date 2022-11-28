import { Schema, model } from 'mongoose';

const GenreSchema = new Schema({
    genre_id: Number,
    title:String,
    parent:Number,
});

export default model("Genre",GenreSchema);