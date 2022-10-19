const { Markup, Composer, Scenes, Context, session } = require("telegraf");

const secondQuest = new Scenes.BaseScene("SecondQuest");

secondQuest.enter(async (ctx) => {
	await ctx.reply(
		"Вопрос 2: \n В каком городе расположена партизанская криничка?",
		Markup.inlineKeyboard([
			[
				Markup.button.callback("Минск", "no"),
				Markup.button.callback("Гомель", "yes"),
			],
			[
				Markup.button.callback("Пинск", "no"),
				Markup.button.callback("Жлобин", "no"),
			],
		])
	);
});

secondQuest.action("yes", async (ctx) => {
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

secondQuest.action("no", async (ctx) => {
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
