const { Telegraf, Markup, Scenes, session } = require("telegraf");
require("dotenv").config();
const FirstQuest = require("./scenes/FirstQuest");
const SecondQuest = require("./scenes/SecondQuest");
const ThirdQuest = require("./scenes/ThirdQuest");
const Finish = require("./scenes/Finish");

const bot = new Telegraf(process.env.BOT_TOKEN);

const stage = new Scenes.Stage([FirstQuest, SecondQuest, ThirdQuest, Finish]);
bot.use(session());
bot.use(stage.middleware());

bot.hears("Историческая справка", async (ctx) => {
	try {
		await ctx.replyWithPhoto(
			{
				source: "./img/main.jpg",
			},
			{
				caption:
					"<b>Историческая справка</b>\nГомельский партизанский отряд «Большевик» начал действовать с 17 августа 1941 года.  Во время оборонительных боев за Гомель он первоначально насчитывал около 50 человек. Отряд обосновался на 9-м км шоссе Гомель — Чернигов, в районе Щекотовской дачи у «Партизанской кринички». Партизаны «Большевика» проводили диверсии на железных дорогах и основных автомагистралях, полностью парализовали движение судов по реке Сож. В ноябре 1943 года во время Гомельско-Речицкой операции партизаны бригады «Большевик», речицкой бригады «Железняк», бригады имени П.К. Пономоренко и 108-го отряда имени Котовского перерезали дорогу Гомель-Шатилки, напали на вражеский гарнизон в деревне Горваль и захватили несколько десятков вражеских автомашин. Вместе с частями Красной Армии партизаны участвовали в операции «Багратион».",
				parse_mode: "HTML",
				disable_notification: true,
			}
		);
	} catch (error) {}
});

bot.hears("Тест", async (ctx) => {
	await ctx.scene.enter("FirstQuest");
});

bot.start(async (ctx) => {
	try {
		await ctx.reply(
			"Выберите категорию, по которой хотите получить информацию о Партизанской Крыничке",
			Markup.keyboard([
				["Историческая справка", "Наши герои"],
				["Где находится?"],
				["Тест"],
			])
				.oneTime()
				.resize()
		);
	} catch (error) {
		console.log(error);
	}
});

bot.launch();

// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
