class Nav {
  constructor() {
    this.hamburger = document.getElementById('hamburger');
    this.closeBtn = document.getElementById('close-btn');
    this.navOverlay = document.getElementById('nav-overlay');

    this.attachListeners();
  }

  attachListeners() {
    this.hamburger.addEventListener('click', this.onHamburgerClick.bind(this));
    this.closeBtn.addEventListener('click', this.onNavCloseClick.bind(this));
  }

  onHamburgerClick() {
    this.navOverlay.style['display'] = 'block';
    this.hamburger.style['display'] = 'none';
  }

  onNavCloseClick() {
    this.navOverlay.style['display'] = 'none';
    this.hamburger.style['display'] = 'block';
  }
}

class Display {
  constructor() {
    this.ingredientId = 0;

    this.ingredients = document.getElementById('ingredients');
    this.arrowContainer = document.getElementById('arrow-container');

    this.leftEnabled = document.getElementById('arrow-left-enabled');
    this.leftDisabled = document.getElementById('arrow-left-disabled');
    this.rightEnabled = document.getElementById('arrow-right-enabled');
    this.rightDisabled = document.getElementById('arrow-right-disabled');

    this.descriptions = document.getElementById('descriptions');

    this.contactForm = document.getElementById('contact');

    this.attachListeners();
  }

  attachListeners() {
    this.arrowContainer.addEventListener('click', this.onArrowClick.bind(this));
    this.descriptions.addEventListener('touchstart', this.onDescriptionTouch.bind(this));
  }

  onContactSubmit(e) {
    e.preventDefault();
  }

  onArrowClick(e) {
    const arrow = e.target;

    if (arrow.classList.contains('arrow') && arrow.id.endsWith('enabled')) {
      const prevElements = this.getIngredientsById(this.ingredientId);
      prevElements.forEach(el => el.classList.add('hidden'));

      this.incrementId(arrow);
      this.toggleArrowVisibility(this.ingredientId);

      const nextElements = this.getIngredientsById(this.ingredientId);
      nextElements.forEach(el => el.classList.remove('hidden'));
    }
  }

  onDescriptionTouch(e) {

  }

  toggleArrowVisibility(id) {
    const direction = this.toggleDirection(id);

    let enabled;
    let disabled

    switch (direction) {
      case 'left':
        [enabled, disabled] = [this.leftEnabled, this.leftDisabled];
        break;
      case 'right':
        [enabled, disabled] = [this.rightEnabled, this.rightDisabled]
        break;
      default:
        return;
    }

    [enabled, disabled].forEach(arrow => { arrow.classList.toggle('hidden') });
  }

  toggleDirection(id) {
    let direction;

    if (id > 0 && this.leftEnabled.classList.contains('hidden') || id === 0) {
      direction = 'left';
    } else if (id < 3 && this.rightEnabled.classList.contains('hidden') || id === 3) {
      direction = 'right';
    } else {
      direction = 'none';
    }

    return direction;
  }

  incrementId(buttonPressed) {
    let id = this.ingredientId;

    buttonPressed.id === 'arrow-right-enabled' ? id += 1 : id -= 1;

    if (id > 3) {
      id = 0;
    } else if (id < 0) {
      id = 3;
    }

    this.ingredientId = id;
  }

  getIngredientsById(id) {
    const header = document.querySelector(`h3[data-header-id="${this.ingredientId}"`);
    const description = document.querySelector(`div[data-desc-id="${this.ingredientId}"`);

    return [header, description];
  }
}

document.addEventListener('DOMContentLoaded', function() {
  const nav = new Nav();

  switch (window.location.pathname) {
    case '/':
      const home = new Display();
      break;
    case '/about':
      // const about = new About();
      break;
    case '/blog':
      // const blog = new Blog();
      break;
  }
});
