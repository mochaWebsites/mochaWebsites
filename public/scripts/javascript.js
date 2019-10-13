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

class Home {
  constructor() {
    this.ingredientId = 0;

    this.ingredients = document.getElementById('ingredients');
    this.arrowContainer = document.getElementById('arrow-container');

    this.leftEnabled = document.getElementById('arrow-left-enabled');
    this.leftDisabled = document.getElementById('arrow-left-disabled');
    this.rightEnabled = document.getElementById('arrow-right-enabled');
    this.rightDisabled = document.getElementById('arrow-right-disabled');

    this.descriptions = document.getElementById('descriptions');

    this.contactForm = document.getElementById('contact-form');
    this.name = document.getElementById('contact-name');
    this.email = document.getElementById('contact-email');
    this.desc = document.getElementById('contact-desc');

    this.attachListeners();
  }

  attachListeners() {
    this.debounceOnArrowClick = this.debounce(this.onArrowClick.bind(this), 400, true);
    this.arrowContainer.addEventListener('click', this.debounceOnArrowClick.bind(this));
    this.descriptions.addEventListener('touchstart', this.onDescriptionTouch.bind(this));
    this.contactForm.addEventListener('submit', this.onContactSubmit.bind(this));
    this.name.addEventListener('input', this.onFieldInput.bind(this));
    this.email.addEventListener('input', this.onFieldInput.bind(this));
    this.desc.addEventListener('input', this.onFieldInput.bind(this));
  }

  debounce(func, waitTime, immediate) {
    let timeout;

    return function() {
      const context = this
      const args = arguments;

      const later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };

      const callNow = immediate && !timeout;

      clearTimeout(timeout);
      timeout = setTimeout(later, waitTime);

      if (callNow) func.apply(context, args);
    };
  }

  onContactSubmit(e) {
    e.preventDefault();

    const form = e.currentTarget;

    if (this.isValidForm(form)) {
      this.contactForm.submit();
    };
  }

  isValidForm(form) {
    const inputs = form.querySelectorAll('input, textarea');

    inputs.forEach(this.validateInput);

    return form.checkValidity();
  }

  validateForm(form) {

  }

  validateInput(input) {
    const message = input.nextElementSibling;
    const isValid = input.validity.valid;

    if (isValid) {
      message.classList.add('hidden');
      input.classList.remove('error');
      input.classList.add('success');
    } else {
      message.classList.remove('hidden');
      input.classList.add('error');
      input.classList.remove('success');
    }

    return isValid;
  }

  onFieldInput(e) {
    this.validateInput(e.currentTarget);
  }

  onDescInput(e) {

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

class Blog {
  constructor() {
    this.wrapPrismCode();
  }

  wrapPrismCode() {
    const codeBlocks = document.querySelectorAll('code');

    codeBlocks.forEach(codeEl => {
      const prismScript = document.createElement('script');
      const codeContents = codeEl.children;

      prismScript.setAttribute('type', 'prism-html-markup');
      codeEl.appendChild(prismScript);

      for (let i = 0; i < codeContents.length; i += 1) {
        prismScript.append(codeContents[i]);
      }
    });
  }
}

document.addEventListener('DOMContentLoaded', function() {
  const nav = new Nav();

  if (window.location.pathname.includes('blogs/')) {
    // const blog = new Blog();
  } else if (window.location.pathname === '/') {
    const home = new Home();
  }
});
