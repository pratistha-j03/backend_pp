import mongoose from 'mongoose';

const ServiceSchema = new mongoose.Schema(
  {
    title:{
      type: String,
      required: true,
      trim: true
    },
    description:{
      type: String,
      required: true,
      trim: true
    },
    icon:{
      type: String,
      default: ""
    },
    image:{
      type: String,
      default: ""
    }
  },
  {timestamps: true}
);

export const Service = mongoose.model('Service', ServiceSchema);