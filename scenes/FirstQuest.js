const { Markup, Composer, Scenes, Context, session } = require("telegraf");

const firstQuest = new Scenes.BaseScene('FirstQuest');

firstQuest.enter(async (ctx) => {
    await ctx.reply('Вопрос 1');
    await ctx.reply('Стул деревянный?', Markup.inlineKeyboard([[Markup.button.callback('Да', 'yes1'), Markup.button.callback('Нет', 'no1')]]));
})

firstQuest.action('yes1', async (ctx) => {
    try {
        await ctx.answerCbQuery();
        await ctx.reply('Ответ верный! \n Давай следующий!');
        await ctx.scene.enter("SecondQuest", {mark: 1});
        return ctx.scene.leave();
    } catch (error) {
        console.log(error);
    }
});

firstQuest.action('no1', async (ctx) => {
    try {
        await ctx.answerCbQuery();
        await ctx.reply('Ответ неверный! \n Давай следующий!');
        await ctx.scene.enter("SecondQuest", {mark: 0});
        return ctx.scene.leave();
    } catch (error) {
        console.log(error);
    }
});

module.exports = firstQuest;
