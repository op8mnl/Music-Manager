import { Schema, model } from 'mongoose';

const DMCAPolicySchema = new Schema({
    policyText: String,
    id : Number
});

export default model("DMCAPolicy", DMCAPolicySchema);