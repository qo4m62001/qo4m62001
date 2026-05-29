const express = require("express");
const line = require("@line/bot-sdk");
const app = express();
const config = {
 channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
 channelSecret: process.env.CHANNEL_SECRET,
};
const client = new line.Client(config);
app.post("/webhook", line.middleware(config), async (req, res) => {
 const events = req.body.events;
 for (const event of events) {
 // 有新成員加入群組
 if (event.type === "memberJoined") {
 await client.replyMessage(event.replyToken, {
 type: "text",
 text:
`歡迎加入群組 🎉
https://forms.gle/dRWpU2PvgAGptNDS9
要預約的請從這邊直接預約就可以囉
沒有出現的時段就是被預約走了
可以一次多選
沒有限定一次一個`
 });
 }
 }
 res.sendStatus(200);
});
const port = process.env.PORT || 3000;
app.listen(port, () => {
 console.log("running on " + port);
});

