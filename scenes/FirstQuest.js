const { Markup, Composer, Scenes, Context, session } = require("telegraf");

const firstQuest = new Scenes.BaseScene("FirstQuest");

firstQuest.enter(async (ctx) => {
	await ctx.reply(
		'Вопрос 1: \n С какого года партизанский отряд "Большевик" начал базироваться партизанской криничке?',
		Markup.inlineKeyboard([
			[
				Markup.button.callback("1944", "no1"),
				Markup.button.callback("1999", "no1"),
			],
			[
				Markup.button.callback("1788", "no1"),
				Markup.button.callback("1941", "yes1"),
			]
		])
	);
});

firstQuest.action("yes1", async (ctx) => {
	try {
		await ctx.answerCbQuery();
		await ctx.reply("Ответ верный! \n Давайте пойдем ответим на следующий вопрос!");
		await ctx.scene.enter("SecondQuest", { mark: 1 });
		return ctx.scene.leave();
	} catch (error) {
		console.log(error);
	}
});

firstQuest.action("no1", async (ctx) => {
	try {
		await ctx.answerCbQuery();
		await ctx.reply("Ответ неверный! \n Давайте пойдем ответим на следующий вопрос!");
		await ctx.scene.enter("SecondQuest", { mark: 0 });
		return ctx.scene.leave();
	} catch (error) {
		console.log(error);
	}
});

module.exports = firstQuest;
