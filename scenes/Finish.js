const { Markup, Composer, Scenes, Context, session } = require("telegraf");

const finish = new Scenes.BaseScene("Finish");

finish.enter(async (ctx) => {
	const markNow = ctx.scene.state.mark;
	await ctx.reply(`Вы закончили тест! Ваша оценка: ${markNow}`);
    return ctx.scene.leave();
});

module.exports = finish;
