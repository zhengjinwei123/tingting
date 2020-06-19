const router = require('koa-router')()
const SERVER_CONF = require('../settings/server_config')

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: SERVER_CONF.title
  })
})

module.exports = router
