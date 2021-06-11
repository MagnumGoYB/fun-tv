import Cursor from './cursor'
// Initialize custom cursor
const cursor = new Cursor(document.querySelector('.cursor'))
// Mouse effects on all links
document.querySelectorAll('a').forEach((link) => {
  link.addEventListener('mouseenter', () => cursor.enter())
  link.addEventListener('mouseleave', () => cursor.leave())
})
