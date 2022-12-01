import { Schema, model } from 'mongoose';

const AUPSchema = new Schema({
    policyText: String,
    id : Number
});

export default model("AUP", AUPSchema);