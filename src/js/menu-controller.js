import { calcWinsize } from './utils'
import { gsap } from 'gsap'
import MenuItem from './menu-item'

// Calculate the viewport size
let winsize = calcWinsize()
window.addEventListener('resize', () => (winsize = calcWinsize()))

export default class MenuController {
  constructor(el) {
    this.DOM = { el: el }
    // Set of small images each selected menu item has on the background
    this.DOM.galleries = [
      ...document.querySelectorAll('.bg-gallery-wrap > .bg-gallery')
    ]
    // Content DOM
    this.DOM.pagePreview = document.querySelector('.page-preview')
    this.DOM.content = [...this.DOM.pagePreview.querySelectorAll('.content')]
    // array of all MenuItems
    this.menuItems = []
    this.DOM.el.querySelectorAll('.menu-item').forEach((item, pos) => {
      this.menuItems.push(
        new MenuItem(item, this.DOM.galleries[pos], this.DOM.content[pos])
      )
    })

    this.init()
  }

  init() {
    // Current menu item index (starting with the first one).
    this.current = 0
    // Highlight the current menu item
    this.menuItems[this.current].highlight()
    // Init/Bind events
    this.initEvents()
  }

  initEvents() {
    for (const [pos, item] of this.menuItems.entries()) {
      // Click/Select a menu item
      item.DOM.el.addEventListener('click', (ev) => {
        ev.preventDefault()
        if (pos === this.current || this.isAnimating) return

        const direction = this.current < pos ? 'up' : 'down'

        this.toggleMenuItems(item, direction)

        // Update current value
        this.current = pos
      })

      // click on the menu item's explore
      // item.DOM.cta.addEventListener('click', (ev) => {
      //   if (this.isAnimating) return
      //   this.showContent(item)
      // })

      // Click on the back control when at the page preview
      // item.contentPage.DOM.backCtrl.addEventListener('click', (ev) => {
      //   ev.preventDefault()
      //   this.showMenu(item)
      // })
    }
  }

  // Click/Select a menu item
  // Animate all the bg images out and animate the new menu item's in
  toggleMenuItems(upcomingItem, direction = 'up') {
    const currentItem = this.menuItems[this.current]
    const dir = direction === 'up' ? 1 : -1

    currentItem.toggleCurrent()
    upcomingItem.toggleCurrent()

    gsap
      .timeline({
        defaults: {
          duration: 1,
          ease: 'expo.inOut'
        },
        onStart: () => (this.isAnimating = true),
        onComplete: () => (this.isAnimating = false)
      })
      .to(
        upcomingItem.DOM.title,
        {
          ease: 'expo.in',
          duration: 0.5,
          y: dir * -100 + '%'
        },
        0
      )
      .to(
        upcomingItem.DOM.title,
        {
          ease: 'expo',
          duration: 0.8,
          startAt: { y: dir * 100 + '%' },
          y: '0%'
        },
        0.5
      )
      .to(
        currentItem.DOM.deco,
        {
          scaleY: 0,
          opacity: 0
        },
        0
      )
      .to(
        currentItem.DOM.cta,
        {
          y: '100%',
          opacity: 0
        },
        0
      )
      .to(
        currentItem.DOM.galleryItems,
        {
          y: dir * -winsize.height * 1.2,
          stagger: dir * 0.05,
          rotation: gsap.utils.random(-30, 30)
        },
        0
      )
      .addLabel('upcomingImages', 0.1)
      .to(
        upcomingItem.DOM.deco,
        {
          startAt: { scaleY: 0 },
          scaleY: 1,
          opacity: 1
        },
        'upcomingImages'
      )
      .to(
        upcomingItem.DOM.cta,
        {
          startAt: { y: dir * 100 + '%' },
          y: '0%',
          opacity: 1
        },
        'upcomingImages'
      )
      .to(
        upcomingItem.DOM.galleryItems,
        {
          startAt: {
            y: dir * winsize.height * 1.2,
            rotation: gsap.utils.random(-30, 30)
          },
          y: 0,
          opacity: 1,
          rotation: 0,
          stagger: dir * 0.05
        },
        'upcomingImages'
      )
  }
}
