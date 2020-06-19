
module.exports = {

    loginCheck: async function(ctx, next) {

        const userName = ctx.session.username;
        if (ctx.url === '/users/login') {
            if (userName) {
                ctx.response.redirect('/')
                return;
            }
            await next();
            return;
        }

        if (!userName) {
            ctx.response.redirect('/users/login')
            return;
        }
        await next();
    }
}