import mongoose from "mongoose";

const ChallengerSchema = new mongoose.Schema({
    twitterHandle: {
        type: String,
        required: true,
      },
    solver: {
        type: String,
        required: true,
      },
    challenge: {
        type: String,
        required: true,
      },
    blockNumber: {
        type: Number,
        required: true,
      },
    dateCreated: {
        type: Date,
        default: Date.now,
    },
})

const Challenger = mongoose.models.Challenger || mongoose.model('Challenger', ChallengerSchema)

export default Challenger