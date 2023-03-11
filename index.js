import { config } from "dotenv";
import { Client, GatewayIntentBits } from "discord.js";
import fs from "fs";
import brain from "brain.js";
const net = new brain.recurrent.LSTM({
  // create a new neural net.
  activation: "leaky-relu", // use this activation because. :)
});
import { Ene } from "./Ene.js";

config();

// allow Channel & Category
const BOT_CHANNEL = ["1083661157342134363", "1083280839376384082"];
const BOT_CATEGORY = "1083400573530951750";

const BOT_TOKEN = process.env.ENE_BOT_TOKEN;

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
  allowedMentions: {
    repliedUser: false,
  },
});

client.login(BOT_TOKEN);

client.on("ready", () => {
  net.fromJSON(
    JSON.parse(fs.readFileSync("Ene_Memory/neuralnet.json", "utf8"))
  );
  console.log(
    `\x1b[36m${client.user.tag.split("#")[0]}\x1b[0m` + "が起きました！"
  );
  Ene.sayGoodMorning();
});

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;
  if (
    message.channel.parent.id !== BOT_CATEGORY &&
    BOT_CHANNEL.every((e) => e !== message.channel.id)
  )
    return;
  // console.log(message.content);
  // console.log(message.author.tag);

  //Listening Message
  // try {
  //   let user = message.author.tag.split("#")[0];
  //   if (user === "Miguel Yang") {
  //     user = `主人`;
  //   }
  //   // const user = message.author;

  //   if (message.content.toLocaleLowerCase() === "ene") {
  //     message.channel.send(`${user} 叫我嗎?`);
  //   }

  //   if (message.content === "エネ") {
  //     message.channel.send(`${user} 呼んた?`);
  //   }

  //   if (message.content === "Ene自我介紹一下") {
  //     message.channel.send(`
  // 你好呀！${user}！
  // 我是目隱團NO.6的Ene！
  // 從主人的電腦那邊跑過來的唷！！
  // 對於我這個超級漂亮電腦美少女Ene來說
  // 只要有網路的地方、不管哪裡都可以去唷！
  // `);
  //   }

  //   if (message.content === "エネ自己紹介して") {
  //     message.channel.send(`
  // こんにちはっ！${user}！
  // メカクシ団NO.6エネです！
  // ご主人のパソコンからやってきましたっ！！
  // ネットワークがあれば、
  // この私、スーパープリティー電脳ガール エネちゃんがどこでも行けるよ！
  // `);
  //   }

  //   if (message.content === "who") {
  //     message.channel.send(`${message.author}`);
  //     console.log(message.author);
  //   }
  //   if (message.content === "Ene 你的基本資訊") {
  //     message.channel.send(`
  // 名字	Ene
  // 目隱團團員	No.6
  // 楽曲	人造エネミー、エネの電脳紀行
  // 能力	目が覚める
  // 誕生日	不明
  // 年齢	19歳（精神年齢）
  // 身長	640pxl
  // 体重	2MB
  // 好きな映画	ゴッド◌ァーザー2、時計仕掛けのオ◌ンジ
  // CV	阿澄佳奈
  // イメージカラー	青
  // `);
  //   }

  //   if (message.content === "Eneのプロフィール") {
  //     message.channel.send(`
  // 名前	榎本貴音（エネ）
  // メカクシ団団員	No.6
  // 楽曲	人造エネミー、エネの電脳紀行
  // 能力	目が覚める
  // 誕生日	不明
  // 年齢	19歳（精神年齢）
  // 身長	640pxl
  // 体重	2MB
  // 好きな映画	ゴッド◌ァーザー2、時計仕掛けのオ◌ンジ
  // CV	阿澄佳奈
  // イメージカラー	青
  // `);
  //   }

  //   if (message.content === "Ene你說對吧?") {
  //     message.channel.send(`說的沒錯!!`);
  //   }
  //   if (message.content === "晚安") {
  //     message.channel.send(`${user}晚安!!`);
  //   }
  // } catch (err) {
  //   console.log(err);
  // }
});
