require("dotenv").config();
const express = require("express");
const TelegramBot = require("node-telegram-bot-api");
const { MongoClient } = require("mongodb");
const chatgptService = require("./services/chatgptService");

const app = express();
const bot = new TelegramBot(process.env.TELEGRAM_TOKEN, { polling: true });
const mongoClient = new MongoClient(process.env.MONGODB_URI);
let db;

const questions = [
  "What is your family size?",
  "What's your household income?",
  "What's your gender?",
];

const userState = {};

mongoClient
  .connect()
  .then((client) => {
    db = client.db("teleChatBot");
    console.log("Connected to MongoDB");

    bot
      .setWebHook(`${process.env.NGROK_URL}/webhook`)
      .then(() => console.log("Webhook set"))
      .catch((err) => console.error("Failed to set webhook:", err));

    bot.onText(/\/start/, (msg) => {
      const chatId = msg.chat.id;
      userState[chatId] = 0; 

      const welcomeText = "Hi user, welcome to the bot!";
      bot.sendMessage(chatId, welcomeText, {
        reply_to_message_id: msg.message_id,
      });

      bot.sendMessage(chatId, questions[userState[chatId]]);
    });

   
    bot.on("message", async (msg) => {
      const chatId = msg.chat.id;

  
      if (msg.text === "/start") return;

      const userIndex = userState[chatId];

   
      const conversation = {
        userId: chatId,
        question: questions[userIndex],
        answer: msg.text,
      };

      db.collection("conversations")
        .insertOne(conversation)
        .then(() => console.log("Conversation saved to MongoDB"))
        .catch((err) => console.error("Failed to save conversation:", err));

      if (userIndex < questions.length - 1) {
        userState[chatId] += 1; 
        bot.sendMessage(chatId, questions[userState[chatId]]);
      } else {
        
        bot.sendMessage(
          chatId,
          "Thank you! We have collected all the information we need."
        );
        delete userState[chatId]; 
      }
    });
  })
  .catch((err) => console.error("MongoDB connection error:", err));

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.get("/conversations", async (req, res) => {
  try {
    const conversations = await db.collection("conversations").find().toArray();
    res.json(conversations);
  } catch (err) {
    console.error("Error fetching conversations:", err);
    res.status(500).send("Error fetching conversations");
  }
});

app.listen(3000, () => console.log("Server is running on port 3000"));
