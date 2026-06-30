import mongoose from 'mongoose';
const ContactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
        default: "",
    },
    subject: {
        type: String,
        required: true,
        default: "",
    },
    message: {
        type: String,
        required: true,
        default: "",
    },
    isRead: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });

export const Contact = mongoose.model('Contact', ContactSchema);