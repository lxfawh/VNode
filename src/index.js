import { createElement, render, renderDOM } from './element'

let vertualDom = createElement('ul', { class: 'list' }, [
    createElement('li', { class: 'item' }, [
        createElement('a', { href: '#' }, ['link']),
    ]),
    createElement('li', { class: 'item', style: "color:red" }, ['b']),
    createElement('li', { class: 'item' }, ['c']),
])

let el = render(vertualDom)
console.log(el)
renderDOM(el, '#app')
