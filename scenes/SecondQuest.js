const { Markup, Composer, Scenes, Context, session } = require("telegraf");

const secondQuest = new Scenes.BaseScene("SecondQuest");

secondQuest.enter(async (ctx) => {
	await ctx.reply(
		"Вопрос 2: \n В каком городе расположена партизанская криничка?",
		Markup.inlineKeyboard([
			[
				Markup.button.callback("Минск", "no2"),
				Markup.button.callback("Гомель", "yes2"),
			],
			[
				Markup.button.callback("Пинск", "no2"),
				Markup.button.callback("Жлобин", "no2"),
			],
		])
	);
});

secondQuest.action("yes2", async (ctx) => {
	try {
		await ctx.answerCbQuery();
		const markNow = ctx.scene.state.mark;
		await ctx.reply(
			"Ответ верный! \n Давайте пойдем ответим на следующий вопрос!"
		);
		await ctx.scene.enter("ThirdQuest", { mark: markNow + 1 });
		return ctx.scene.leave();
	} catch (error) {
		console.log(error);
	}
});

secondQuest.action("no2", async (ctx) => {
	try {
		await ctx.answerCbQuery();
		const markNow = ctx.scene.state.mark;
		await ctx.reply(
			"Ответ неверный! \n Давайте пойдем ответим на следующий вопрос!"
		);
		await ctx.scene.enter("ThirdQuest", { mark: markNow });
		return ctx.scene.leave();
	} catch (error) {
		console.log(error);
	}
});

module.exports = secondQuest;
