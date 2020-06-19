const router = require('koa-router')()
const SERVER_CONF = require('../settings/server_config')
const dateUtil = require('../utils/datetime')

router.prefix('/users')

router.get('/login', async function (ctx, next) {
  await ctx.render('login', {
    title: SERVER_CONF.title,
    server_year: dateUtil.getNowYear()
  })
})

module.exports = router
