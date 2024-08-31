const https = require("https");

const token = "7448589482:AAHEyeEeySbeZAE9bkyP_DtITZMSfw2cdFk";
const url = "https://e9da-39-41-177-70.ngrok-free.app/webhook";
const apiUrl = `https://api.telegram.org/bot${token}/setWebhook?url=${url}`;

https
  .get(apiUrl, (res) => {
    let data = "";

    res.on("data", (chunk) => {
      data += chunk;
    });

    res.on("end", () => {
      console.log("Response:", data);
    });
  })
  .on("error", (e) => {
    console.error("Error:", e.message);
  });
