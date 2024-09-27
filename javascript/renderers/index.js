
import { constants } from "../constants/index.js";
const { classNames, windowTypes } = constants();

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
    window.appendChild(_generateWindowOptions(program));

    if (program.hasAddressBar) {
      window.appendChild(_generateWindowAddressBar(program));
    }

    window.appendChild(_generateWindowContent(program));

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
      window.style.top = '0.25rem';
      window.style.left = '0.25rem';
      window.style.height = 'calc(100svh - 3.5rem)';
      window.style.width = '98%';
    }

    window.style.zIndex = ++startZIndex;
    window.addEventListener('click', handlers.windowClickHandler);

    document.querySelector('.desktop').appendChild(window);

    switch (program.type) {
      case windowTypes.terminal:
        _generateExperienceContent(program);
        break;

      case windowTypes.help:
        break;

      case windowTypes.notepad:
        _generateNotepadContent(program);
        break;

      case windowTypes.folder:
        break;
    }
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

  async function _generateExperienceContent(program) {
    const target = document.querySelector('.desktop__window__content--black');

    for (let i = 0; i < program.content.length; i++) {
      if (i === 0) {
        const
          command = document.createElement('p'),
          text = 'fetch work_history...';

        command.innerHTML = 'C:\\KIMDOWS> ';
        target.appendChild(command);

        await _print(text, command, 25);
      }

      const
        job = program.content[i],
        container = document.createElement('div');

      container.className = 'terminal__job';
      target.append(container);

      const
        name = document.createElement('p'),
        position = document.createElement('p'),
        dates = document.createElement('p'),
        duties = document.createElement('ul');

      name.className = 'terminal--cyan';
      position.className = 'terminal--green';
      dates.className = 'terminal--green';

      container.appendChild(name);
      container.appendChild(position);
      container.appendChild(dates);
      container.appendChild(duties);

      await _print(job.name, name, 10);
      await _print(job.position, position, 10);

      const duration = job.start + ' - ' + job.end;

      await _print(duration, dates);

      for (let j = 0; j < job.duties.length; j++) {
        const
          list = document.createElement('li'),
          duty = job.duties[j];

        duties.appendChild(list);

        await _print(duty, list, 1);
      }
    }
  }

  async function _generateNotepadContent(program) {
    const
      target = document.querySelector('.desktop__window__content--white'),
      line = document.createElement('p'),
      text = document.createElement('div');

    line.className = 'notepad__line';
    text.appendChild(line);

    text.className = 'notepad';
    target.appendChild(text);

    for (let i = 0; i < program.content.length; i++) {
      const
        date = document.createElement('p'),
        description = document.createElement('p'),
        name = document.createElement('p'),
        school = program.content[i];

      name.className = 'notepad__line notepad__line--name';
      date.className = 'notepad__line';
      description.className = 'notepad__line notepad__line--spacer';

      text.appendChild(name);
      await _print(school.name, name, 50);

      text.appendChild(date);
      await _print(school.completionYear, date, 50);

      text.appendChild(description);
      await _print(school.description, description, 50);
    }
  }

  function _generateWindowAddressBar(program) {
    const
      addressBar = document.createElement('div'),
      container = document.createElement('div'),
      content = document.createElement('div'),
      control = document.createElement('div'),
      image = document.createElement('img'),
      title = document.createElement('div');

    container.className = 'desktop__window__address-container';
    container.innerHTML = 'Address';

    addressBar.className = 'desktop__window__address-bar box-shadow--active--light';

    content.className = 'desktop__window__address-bar__content';

    image.className = 'desktop__window__address-bar__image';
    image.src = program.icon;
    image.alt = program.name;
    content.appendChild(image);

    title.className = 'desktop__window__address-bar__title';
    title.innerHTML = program.name;
    content.appendChild(title);

    control.className = 'desktop__window__address-bar__control box-shadow--light';

    addressBar.appendChild(content);
    addressBar.appendChild(control);

    container.appendChild(addressBar);

    return container;
  }

  function _generateWindowContent(program) {
    const
      container = document.createElement('div');

    container.className = 'desktop__window__content box-shadow--active--light';

    switch (program.type) {
      case windowTypes.terminal:
        container.classList.add('desktop__window__content--black');
        break;

      case windowTypes.help:
        container.classList.add('desktop__window__content--gray');
        break;

      case windowTypes.notepad:
      case windowTypes.folder:
        container.classList.add('desktop__window__content--white');
        break;
    }

    return container;
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

  function _generateWindowOptions(program) {
    const container = document.createElement('div');

    container.className = 'desktop__window__option-container';

    program.options.forEach((option) => {
      const item = document.createElement('div');

      item.className = 'desktop__window__option';
      item.innerHTML = option;

      container.appendChild(item);
    });

    return container;
  }

  async function _print(text, target, speed) {
    for (let i = 0; i < text.length; i++) {
      const character = text[i];

      target.innerHTML += character;
      await _sleep(speed);
    }
  }

  function _sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  return {
    renderDesktopIcons,
    renderDesktopWindow,
    renderStartBarProgram,
    renderStartMenuPrograms
  };
}

