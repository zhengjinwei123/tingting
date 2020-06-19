
let server_config = {
    session: {
        key: 'koa:sess',
        maxAge: 86400000,
        overwrite: true,
        httpOnly: false,
        signed: true,
        rolling: false,
        renew: false
    },
    title: "宝贝计划"
}

module.exports = server_config