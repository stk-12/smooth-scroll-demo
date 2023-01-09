import gsap from 'gsap';

export default class {
  constructor({ element, sections, viewport, scroll }) {
    this.element = element;
    this.sections = sections;
    this.viewport = viewport;
    this.scroll = scroll;

    this.elements = {
      scrollContent: this.element.querySelector('.scroll__content')
    }

    this.posSections = [];
  }

  setSizes() {
    this.scroll.height = this.elements.scrollContent.getBoundingClientRect().height;
    this.scroll.limit = this.elements.scrollContent.clientHeight - this.viewport.height;

    document.body.style.height = `${this.scroll.height}px`;
  }

  setSection() {
    this.posSections = [];
    this.sections.forEach((section) => {
      this.posSections.push(section.offsetTop);
    });
  }

  scrollSection(section) {
    window.scrollTo({
      top: this.posSections[section],
      behavior: 'smooth'
    });
  }

  update() {
    this.scroll.hard = window.scrollY;
    this.scroll.hard = gsap.utils.clamp(0, this.scroll.limit, this.scroll.hard);
    this.scroll.soft = gsap.utils.interpolate(this.scroll.soft, this.scroll.hard, this.scroll.ease);

    if (this.scroll.soft < 0.01) {
      this.scroll.soft = 0;
    }  

    this.elements.scrollContent.style.transform = `translateY(${-this.scroll.soft}px)`;
  }    

  onResize() {
    this.viewport = {
      width: window.innerWidth,
      height: window.innerHeight
    }

    this.setSizes();
    this.setSection();
  }
}