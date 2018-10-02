class VNode {
    constructor(tag, props, children) {
        this.tag = tag
        this.props = props
        this.children = children
    }
}

function createElement(tag, props, children) {
    return new VNode(tag, props, children)
}


function render(virtualDom) {
    let tag = virtualDom.tag
    let props = virtualDom.props
    let children = virtualDom.children

    let el = document.createElement(tag)

    Object.keys(props).forEach(prop => {
        el.setAttribute(prop, props[prop])
    })

    children.forEach(child => {
        if (child instanceof VNode) {
            el.appendChild(render(child))
        } else {
            el.appendChild(document.createTextNode(child))
        }
    })

    return el;
}

function renderDOM(el, root) {
    if (Object.prototype.toString.call(root) === '[object String]') {
        document.querySelector(root).appendChild(el)
    } else {
        root.appendChild(el)
    }
}
export { createElement, render, renderDOM, VNode }