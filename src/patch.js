import { VNode, render, setAttr } from './element'
import * as patchType from './patchType'

let patches;
let index = 0;
function patch(el, patch) {
    patches = patch

    TreeWalker(el)
}

function TreeWalker(el) {
    let curPatch = patches[index++]
    el.childNodes.forEach(child => TreeWalker(child))

    if (curPatch) {
        doPatch(el, curPatch)
    }

}

function doPatch(node, patches) {
    patches.forEach(patch => {
        switch (patch.type) {
            case patchType.ATTR:
                let props = patch.props
                for (let key in props) {
                    if (props[key]) {
                        setAttr(node, key, props[key])
                    }
                }
                break;
            case patchType.TEXT:
                node.textContent = patch.text
                break;
            case patchType.REPLACE:
                let newNode
                if (patch.newNode instanceof VNode) {
                    newNode = render(patch.newNode)
                } else {
                    newNode = document.createTextNode(patch.newNode)
                }
                node.parentNode.repalceChild(node, newNode)
                break;
            case patchType.REMOVE:
                node.parentNode.removeChild(node)
                break;
        }
    })
}

export { patch }