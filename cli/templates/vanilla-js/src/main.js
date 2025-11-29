import './style.css'
import { setupCounter } from './counter.js'

document.querySelector('#app').innerHTML = `
  <h1>{{display_name}}</h1>
  <button id="counter" type="button"></button>
`

setupCounter(document.querySelector('#counter'))
