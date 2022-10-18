const { Markup, Scenes, session } = require("telegraf");

const thirdQuest = new Scenes.BaseScene('ThirdQuest');

thirdQuest.enter(async ctx => {
    await ctx.reply('Вопрос 3');
    await ctx.reply('Слушаю ли я сейчас музыку?', Markup.inlineKeyboard([[Markup.button.callback('Да', 'yes3'), Markup.button.callback('Нет', 'no3')]]));
})

thirdQuest.action('yes3', async (ctx) => {
    try {
        await ctx.answerCbQuery();
        await ctx.reply('Ответ верный! \n Давай следующий!');
        await ctx.reply(`${ctx.scene.state.mark}`);
        return ctx.scene.leave();
    } catch (error) {
        console.log(error);
    }
});

thirdQuest.action('no3', async (ctx) => {
    try {
        await ctx.answerCbQuery();
        await ctx.reply('Ответ неверный! \n Давай следующий!');
        await ctx.reply(`${ctx.scene.state.mark}`);
        return ctx.scene.leave();
    } catch (error) {
        console.log(error);
    }
});

module.exports = thirdQuest;