export default class ContentPage {
  constructor(el) {
    this.DOM = {
      el: el
    }
    this.DOM.backCtrl = this.DOM.el.querySelector('.content-back')
    this.DOM.title = this.DOM.el.querySelector('.content-title')
    this.DOM.titleInner = this.DOM.title.querySelector('span')
    this.DOM.gallery = this.DOM.el.querySelector('.gallery')
    this.DOM.galleryItems = this.DOM.gallery.querySelectorAll('.gallery-figure')
    this.bgcolor = this.DOM.el.dataset.bgcolor
  }
}
