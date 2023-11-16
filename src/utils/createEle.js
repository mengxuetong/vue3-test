function createEle(vnode) {

    // 文本节点
    if (typeof vnode === 'string') {
        return document.createTextNode(vnode)
    }

    // 创建元素节点
    const el = document.createElement(vnode.tag)

    // 遍历props,设置属性与值，
    for (let key in vnode.props) {
        el.setAttribute(key, vnode.props[key])
    }

    // 如果children 是数组
    if (Object.prototype.toString.call(vnode.children).slice(8,13) === 'Array') {
        vnode.children.forEach(child => {
            const childEle = createEle(child)
            el.appendChild(childEle)
        })
    } 
    // 如果children 是 string or Object
    else {
        const childEle = createEle(vnode.children)
        el.appendChild(childEle)
    }
    return el
}
function createVNode(tag, props, children) {
    return {
        tag,
        props,
        children
    }
}
createEle(createVNode('ul', {class: 'flex-center'}, [createVNode('li',{class: 'text-center'},'text 文本')]))