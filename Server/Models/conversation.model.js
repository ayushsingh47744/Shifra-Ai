// // Server/Models/conversation.model.js
// import mongoose from "mongoose";

// const messageSchema = new mongoose.Schema(
//   {
//     role: { type: String, enum: ["user", "assistant"], required: true },
//     text: { type: String, required: true },
//   },
//   { timestamps: true, _id: false }
// );

// const conversationSchema = new mongoose.Schema(
//   {
//     userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
//     visitorId: { type: String, required: true }, // browser session id
//     messages: { type: [messageSchema], default: [] },
//   },
//   { timestamps: true }
// );

// const Conversation = mongoose.model("Conversation", conversationSchema);
// export default Conversation;
import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    role: { type: String, enum: ["user", "assistant"], required: true },
    text: { type: String, required: true },
  },
  { timestamps: true, _id: false }
);

const conversationSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    visitorId: { type: String, required: true }, // browser session id
    messages: { type: [messageSchema], default: [] },
    status: { type: String, enum: ["ongoing", "completed"], default: "ongoing" },
  },
  { timestamps: true }
);

const Conversation = mongoose.model("Conversation", conversationSchema);
export default Conversation;