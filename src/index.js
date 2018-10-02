import { createElement, render, renderDOM } from './element'
import { diff } from './diff'
import { patch } from './patch'

// let VDom1 = createElement('ul', { class: 'list' }, [
//     createElement('li', { class: 'item' }, [
//         createElement('a', { href: '#' }, ['link']),
//     ]),
//     createElement('li', { class: 'item', style: "color:red" }, ['b']),
//     createElement('li', { class: 'item' }, ['c']),
// ])

let VDom1 = createElement('ul', { class: 'lists', style: "color:red" }, [
    createElement('li', { class: 'item' }, ['a']),
    createElement('li', { class: 'item' }, ['b']),
    createElement('li', { class: 'item' }, ['c']),
])

let VDom2 = createElement('ul', { class: 'lists', 'data-key': 'aaa' }, [
    createElement('li', { class: 'item', style: "color:black" }, ['aa']),
    createElement('li', { class: 'item' }, ['1']),
    createElement('li', { class: 'item' }, ['bb'])
])


let el = render(VDom1)

renderDOM(el, '#app')
let patchs = diff(VDom1, VDom2);
patch(el, patchs);

