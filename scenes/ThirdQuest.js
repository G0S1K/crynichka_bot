const { Markup, Scenes, session } = require("telegraf");

const thirdQuest = new Scenes.BaseScene("ThirdQuest");

thirdQuest.enter(async (ctx) => {
	await ctx.reply(
		"Вопрос 3: \n В каком году во время Гомельско-Речицкой операции партизаны бригады «Большевик», речицкой бригады «Железняк», бригады имени П.К. Пономоренко и 108-го отряда имени Котовского перерезали дорогу Гомель-Шатилки, напали на вражеский гарнизон в деревне Горваль и захватили несколько десятков вражеских автомашин?",
		Markup.inlineKeyboard([
			[
				Markup.button.callback("1941", "no"),
				Markup.button.callback("1942", "no"),
			],
			[
				Markup.button.callback("2022", "no"),
				Markup.button.callback("1943", "yes"),
			],
		])
	);
});

thirdQuest.action("yes", async (ctx) => {
	try {
		await ctx.answerCbQuery();
        const markNow = ctx.scene.state.mark;
		await ctx.reply(
			"Ответ верный! \n Давайте пойдем ответим на следующий вопрос!"
		);
        await ctx.scene.enter("Finish", { mark: markNow + 1 });
		return ctx.scene.leave();
	} catch (error) {
		console.log(error);
	}
});

thirdQuest.action("no", async (ctx) => {
	try {
		await ctx.answerCbQuery();
        const markNow = ctx.scene.state.mark;
		await ctx.reply(
			"Ответ неверный! \n Давайте пойдем ответим на следующий вопрос!"
		);
		await ctx.scene.enter("Finish", { mark: markNow});
		return ctx.scene.leave();
	} catch (error) {
		console.log(error);
	}
});

module.exports = thirdQuest;
