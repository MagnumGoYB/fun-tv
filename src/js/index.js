import Cursor from './cursor'
import MenuController from './menu-controller'
import { preloadImages } from './utils'

Promise.all([preloadImages('.gallery-figure-img')]).then(() => {
  // Remove loader (loading class)
  document.body.classList.remove('loading')

  // Initialize custom cursor
  const cursor = new Cursor(document.querySelector('.cursor'))

  // Initialize the MenuController
  // eslint-disable-next-line no-new
  new MenuController(document.querySelector('.menu'))

  // Mouse effects on all links
  document.querySelectorAll('a').forEach((link) => {
    link.addEventListener('mouseenter', () => cursor.enter())
    link.addEventListener('mouseleave', () => cursor.leave())
  })
})
