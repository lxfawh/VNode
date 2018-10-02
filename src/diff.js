import * as patchType from './patchType'
let Index = 0;

function diff(oldDOM, newDOM) {
    let patchs = {}
    let index = 0
    TreeWalker(oldDOM, newDOM, patchs, index)// 遍历dom数
    // console.log({patchs})
    return patchs;
}

function TreeWalker(oldNode, newNode, patchs, index) {
    let curPatch = []
    if (!newNode) { //节点被移除
        curPatch.push({ type: patchType.REMOVE })
    } else if (oldNode.tag === newNode.tag) {//标签相同，则比较属性
        let props = diffProps(oldNode.props, newNode.props)
        if (Object.keys(props).length > 0) {
            curPatch.push({ type: patchType.ATTR, props })
        }
        if (isString(oldNode) && isString(newNode)) { //子节点为文本内容
            if (oldNode !== newNode) {
                curPatch.push({ type: patchType.TEXT, text: newNode })
            }
        } else {
            // diffChild(oldNode.children, newNode.children, patchs, index) 
            oldNode.children.forEach((item, i) => {//遍历子节点
                TreeWalker(item, newNode.children[i], patchs, ++Index)
            })
        }

    } else { //节点被替换
        curPatch.push({ type: patchType.REPLACE, newNode })
    }

    if (curPatch.length > 0) {
        patchs[index] = curPatch
    }
}

function diffProps(oldProps, newProps) {
    let patch = {}
    for (let key in oldProps) { //比较属性是否改变

        if (oldProps[key] !== newProps[key]) {
            patch[key] = newProps[key]
        }
    }
    for (let key in newProps) { //比较属性是否新增
        if (!oldProps.hasOwnProperty(key)) {
            patch[key] = newProps[key]
        }
    }
    return patch;
}

function isString(node) {
    return Object.prototype.toString.call(node) === '[object String]'
}
export { diff }