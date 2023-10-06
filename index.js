const https = require("https");
const express = require("express");
const app = express();
require("dotenv").config();

const PORT = process.env.PORT || 4000;
const TOKEN = process.env.LINE_CHANNEL_ACCESS_TOKEN;
// const TOKEN =
//   "tvb2bkJUvF5ZbSzAf9WDSmfwbwRDxI/2Nlw1TROa2XbaSAXdySiT1w4OvRQrTWPcZXSWvNn1cwlZtBkjly5fhhubxbIXzxZ5sAqnk0644k4l1ShKzP2MXJxZ50Wd1L0d1Yba6vX1JVDQYA/EBH2DbgdB04t89/1O/w1cDnyilFU=";

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.post("/webhook", function (req, res) {
  res.send("HTTP POST request sent to the webhook URL!");

  //   console.log("req.body.events===> ", req.body.events[0]);
  //   console.log("userID ===> ", req.body.events[0].source.userId);
  //   console.log("input Text ===> ", req.body.events[0].message.text);

  if (req.body.events[0].type === "message") {
    const dataString = JSON.stringify({
      replyToken: req.body.events[0].replyToken,
      messages: [
        {
          type: "text",
          text: "Hello, user",
        },
        {
          type: "text",
          text: "May I help you?",
        },
      ],
    });

    const headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + TOKEN,
    };

    const webhookOptions = {
      hostname: "api.line.me",
      path: "/v2/bot/message/reply",
      method: "POST",
      headers: headers,
      body: dataString,
    };

    const request = https.request(webhookOptions, (res) => {
      res.on("data", (d) => {
        process.stdout.write(d);
      });
    });

    request.on("error", (err) => {
      console.error(err);
    });

    request.write(dataString);
    request.end();
  }
});

app.get("/", function (req, res) {
  res.status(200).send("Chatbot Tutorial");
});
//

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
