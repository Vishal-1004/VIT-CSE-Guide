const mongoose = require("mongoose");

const subjectSchema = new mongoose.Schema({
  domain: {
    type: String,
  },
  content: [
    {
      courseTitle: {
        type: String,
        required: true,
        trim: true,
      },
      credits: {
        type: Number,
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
    },
  ],
});

// creating model
const subject = new mongoose.model("Subject", subjectSchema);

module.exports = subject;
