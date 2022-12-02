import { Schema, model } from 'mongoose';

const PrivacyPolicySchema = new Schema({
    policyText: String,
    id : Number
});

export default model("PrivacyPolicy", PrivacyPolicySchema);