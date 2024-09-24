
import { constants } from "../constants/index.js";
const { classNames } = constants();

export function renderers() {
  function renderDesktopIcons(programs, clickHandler) {
    const desktop = document.querySelector('.desktop');

    return programs.forEach((program) => {
      const icon = document.createElement('div');
      icon.classList.add('desktop__icon');

      const image = document.createElement('img');
      image.classList.add('desktop__icon__image');
      image.src = program.icon;
      image.alt = program.name;

      const title = document.createElement('div');
      title.classList.add('desktop__icon__title');
      title.innerHTML = program.name;

      icon.appendChild(image);
      icon.appendChild(title);
      icon.addEventListener('click', clickHandler);

      desktop.appendChild(icon);
    });
  }

  function renderDesktopWindow(program, handlers) {
    const window = document.createElement('div');

    window.className = 'desktop__window ' + classNames.boxShadow;
    window.appendChild(_generateWindowHeader(program.name, handlers.controls));

    const windowCount = document.querySelectorAll('.desktop__window').length;

    if (innerWidth >= 650 && innerWidth < 768) {
      window.style.top = (3 + windowCount) + 'rem';
      window.style.left = (5 + windowCount) + 'rem';
    } else if (innerWidth >= 768 && innerWidth < 1024) {
      window.style.top = (5 + windowCount) + 'rem';
      window.style.left = (7 + windowCount) + 'rem';
    } else if (innerWidth >= 1024) {
      window.style.top = (5 + windowCount) + 'rem';
      window.style.left = (10 + windowCount) + 'rem';
    } else {
      window.style.top = 0;
      window.style.left = 0;
      window.style.height = '100%';
      window.style.width = '100%';
    }

    window.style.zIndex = ++startZIndex;

    document.querySelector('.desktop').appendChild(window);

    window.addEventListener('click', handlers.windowClickHandler);
  }

  function renderStartBarProgram(program, clickHandler) {
    const
      activeProgram = document.querySelector('.start-bar__program.box-shadow--active'),
      image = document.createElement('img'),
      item = document.createElement('div'),
      startBarProgramContainer = document.querySelector('.start-bar__program-container'),
      title = document.createElement('div');

    if (activeProgram) {
      activeProgram.classList.remove(classNames.boxShadow + classNames.active);
      activeProgram.classList.add(classNames.boxShadow);
    }

    item.className = 'start-bar__program ' + classNames.boxShadow + classNames.active;
    item.addEventListener('click', clickHandler);

    image.className = 'start-bar__program__icon';
    image.src = program.icon;
    image.alt = program.name;
    item.appendChild(image);

    title.className = 'start-bar__program__title';
    title.innerHTML = program.name;
    item.appendChild(title);

    startBarProgramContainer.appendChild(item);
    item.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
  }

  function renderStartMenuPrograms(programs, clickHandler) {
    const
      startMenu = document.querySelector('.start-bar__start-menu__program__container'),
      startMenuCopyright = document.querySelector('.start-bar__start-menu__title__copyright');

    startMenuCopyright.innerHTML = new Date().getFullYear();

    return programs.forEach((program) => {
      const item = document.createElement('div');
      item.className = 'start-bar__start-menu__program';

      if (program.class) {
        item.classList.add(item.className + program.class);
      }

      const image = document.createElement('img');
      image.className = 'start-bar__start-menu__program__icon';
      image.src = program.icon;
      image.alt = program.name;

      const title = document.createElement('div');
      title.className = 'start-bar__start-menu__program__title';
      title.innerHTML = program.name;

      item.appendChild(image);
      item.appendChild(title);
      item.addEventListener('click', clickHandler);

      startMenu.appendChild(item);
    });
  }

  function _generateWindowHeader(programName, handlers) {
    const
      header = document.createElement('div'),
      title = document.createElement('div'),
      controlContainer = document.createElement('div'),
      baseClassName = 'desktop__window__header';

    header.className = baseClassName;

    title.className = baseClassName + '__title';
    title.innerHTML = programName;
    header.appendChild(title);

    controlContainer.className = baseClassName + '__control-container';

    const
      minimize = document.createElement('div'),
      maximize = document.createElement('div'),
      resetSize = document.createElement('div'),
      close = document.createElement('div');

    minimize.className = 'desktop__window__header__control desktop__window__header__control--minimize box-shadow';
    minimize.addEventListener('click', handlers.minimizeClickHandler);

    maximize.className = 'desktop__window__header__control desktop__window__header__control--maximize box-shadow';
    maximize.addEventListener('click', handlers.maximizeClickHandler);

    resetSize.className = 'desktop__window__header__control desktop__window__header__control--reset box-shadow hidden';
    resetSize.addEventListener('click', handlers.resetSizeClickHandler);

    close.className = 'desktop__window__header__control desktop__window__header__control--close box-shadow';
    close.addEventListener('click', handlers.closeClickHandler);

    controlContainer.appendChild(minimize);
    controlContainer.appendChild(maximize);
    controlContainer.appendChild(resetSize);
    controlContainer.appendChild(close);

    header.appendChild(controlContainer);

    return header;
  }

  return {
    renderDesktopIcons,
    renderDesktopWindow,
    renderStartBarProgram,
    renderStartMenuPrograms
  };
}

