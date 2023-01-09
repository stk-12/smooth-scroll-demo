import '../css/style.scss';
import SmoothScroll from './SmoothScroll';

class Main {
  constructor() {
    this.element = document.querySelector('.scroll');

    this.viewport = {
      width: window.innerWidth,
      height: window.innerHeight,
    }
    
    this.scroll = {
      height: 0,
      limit: 0,
      hard: 0,
      soft: 0,
      ease: 0.05
    }
    
    this.smoothScroll = new SmoothScroll({
      element: this.element, 
      viewport: this.viewport, 
      scroll: this.scroll
    });    
    
    this.init();
  }
 
  
  init() {
    this.addEventListeners();
    this.onResize();
    // this.onScroll();
    this.update();
  }
  
  addEventListeners() {
    window.addEventListener('resize', this.onResize.bind(this));
    // window.addEventListener('scroll', this.onScroll.bind(this));
  }
  
  // onScroll() {
    
  // }
  
  onResize() {
    this.viewport = {
      width: window.innerWidth,
      height: window.innerHeight
    }
    this.smoothScroll.onResize();
  }
  
  update() {

    this.smoothScroll.update();

    requestAnimationFrame(this.update.bind(this));
  }
  
}

new Main();

