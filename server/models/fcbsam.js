const mongoose = require("mongoose");

const fcbsamSchema = new mongoose.Schema({
  courseTitle: {
    type: String,
    required: true,
    trim: true,
  },
  credits: {
    type: Number,
    required: true,
  },
  syllabus: {
    type: String,
  },
  studyMaterials: [
    {
      moduleNo: {
        type: Number,
      },
      moduleName: {
        type: String,
      },
      moduleContent: {
        type: String,
      },
      materialLink: {
        type: String,
      },
    },
  ],
  papers: [
    {
      examType: {
        type: String,
      },
      examTypeNo: {
        type: Number,
        default: 0,
      },
      slot: {
        type: String,
      },
      year: {
        type: String,
      },
      paperMaterialLink: {
        type: String,
      },
    },
  ],
  referenceVideos: [
    {
      moduleNo: {
        type: Number,
      },
      videos: [
        {
          topic: {
            type: String,
          },
          videoLink: {
            type: String,
          },
        },
      ],
    },
  ],
});

// creating model
const fcbsam = new mongoose.model("Fcbsam", fcbsamSchema);

module.exports = fcbsam;
