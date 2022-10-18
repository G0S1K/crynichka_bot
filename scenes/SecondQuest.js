const { Markup, Composer, Scenes, Context, session } = require("telegraf");

const secondQuest = new Scenes.BaseScene('SecondQuest');

secondQuest.enter(async ctx => {
    await ctx.reply('Вопрос 2');
    await ctx.reply('Есть ли у меня телефон?', Markup.inlineKeyboard([[Markup.button.callback('Да', 'yes2'), Markup.button.callback('Нет', 'no2')]]));
})

secondQuest.action('yes2', async (ctx) => {
    try {
        await ctx.answerCbQuery();
        const markNow = ctx.scene.state.mark;
        await ctx.reply('Ответ верный! \n Давай следующий!');
        await ctx.scene.enter("ThirdQuest", {mark: markNow + 1});
        return ctx.scene.leave();
    } catch (error) {
        console.log(error);
    }
});

secondQuest.action('no2', async (ctx) => {
    try {
        await ctx.answerCbQuery();
        const markNow = ctx.scene.state.mark;
        await ctx.reply('Ответ неверный! \n Давай следующий!');
        await ctx.scene.enter("ThirdQuest", {mark: markNow});
        return ctx.scene.leave();
    } catch (error) {
        console.log(error);
    }
});

module.exports = secondQuest;