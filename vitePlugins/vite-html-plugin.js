module.exports = (options) => {
    return {
        transformIndexHtml(html, ctx) {
            const reg = /\<\%\=(.+?)\%\>/g // 解析：<%= %>
            // const regMustache = /\{\{(.+?)\}\}/g // 解析：{{ }}
            return html.replace(reg, function(_, val) {
                console.log('_', _)
                console.log('val', val)
                let key = val.trim()
                let value = getValueByPath(options.inject.data, key)
                return value
            })
        },
        enforce: 'pre'
    }
}
function getValueByPath(data, key) {
    let value = data
    let prop
    let props = key.split('.')
    while(prop = props.shift()) {
        value = value[prop]
    }
    return value
}