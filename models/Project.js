import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 280
    },
    email: {
      required: true,
      type: String,
      default: ''
    },
    description: {
      type: String,
      required: true,
    },
    // Save a formatted date string so it’s “already formatted” in MongoDB
    dateLabel: {
      type: String,
      default: ''
    },
    topic: {
      type: String,
      default: '',
      required: true
    },
    type :{
      type: String,
      required: true,
      default: ''
    },
    accepted :{
      type: Boolean,
      default:false
    }
  },
  { timestamps: true }
);

// Set dateLabel automatically on create/save
projectSchema.pre('save', function (next) {
  if (!this.dateLabel) {
    this.dateLabel = new Intl.DateTimeFormat('en-US', {
      weekday: 'short',
      month: 'short',
      day: '2-digit',
      year: 'numeric'
    }).format(new Date());
  }
  next();
});

export const Project = mongoose.model('Project', projectSchema);
