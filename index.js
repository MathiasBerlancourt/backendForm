require("dotenv").config();

const express = require("express");
const cors = require("cors");
const formData = require("form-data");
const Mailgun = require("mailgun.js");

const app = express();
app.use(express.json());
app.use(cors());
console.log("mailgun url :", process.env.MAILGUN_DOMAIN_URL);
// MAILGUN
const mailgun = new Mailgun(formData);
const client = mailgun.client({
  username: "Mathias",
  key: process.env.API_KEY_MAILGUN,
});

app.post("/form", async (req, res) => {
  try {
    console.log(req.body);
    const { firstname, lastname, email, subject, message } = req.body;
    const messageData = {
      from: `${firstname} ${lastname} <mathias.berlancourt@gmail.com>`,
      to: email,
      subject: subject,
      text: message,
    };
    const response = await client.messages.create(
      process.env.MAILGUN_DOMAIN_URL,
      messageData
    );
    res.status(200).json(messageData);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
app.get("/", (req, res) => {
  res.json({ message: "server is up" });
});

app.listen(process.env.PORT, () => {
  console.log("✅ SERVER STARTED ✅");
});
