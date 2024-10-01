
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

    window.appendChild(_generateWindowHeader(program.name, handlers.windowControls));

    if (program.options.length) {
      window.appendChild(_generateWindowOptions(program));
    }

    if (program.hasAddressBar) {
      window.appendChild(_generateWindowAddressBar(program));
    }

    window.appendChild(_generateWindowContent(program));

    const windowCount = document.querySelectorAll('.desktop__window').length;

    window.style.width = program.width;

    if (program.height) {
      window.style.height = program.height;
    }

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

      case windowTypes.notepad:
        _generateNotepadContent(program);
        break;

      case windowTypes.folder:
        _generateFolderContent(program, handlers.contentControls);
        break;

      case windowTypes.help:
        _generateHelpContent(program, handlers.contentControls);
        break;

      case windowTypes.system:
        _generateSystemContent(program, handlers.contentControls);
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

  function _generateHelpContent(program, handlers) {
    const
      contents = program.content,
      target = document.querySelector('.desktop__window__content--help'),
      tree = document.createElement('div'),
      text = document.createElement('div');

    tree.className = 'help__tree box-shadow--active--light';
    target.appendChild(tree);
    target.appendChild(text);

    contents.forEach((content, index) => {
      const
        treeItem = document.createElement('div'),
        treeIcon = document.createElement('img'),
        treeTitle = document.createElement('p');

      treeItem.dataset.tag = content.tag;
      treeItem.addEventListener('click', handlers.helpTreeItemClickHandler)

      treeItem.className = 'help__tree-item';
      treeIcon.className = 'help__tree-item__image';
      treeTitle.className = 'help__tree-item__title';

      treeIcon.src = program.icon;
      treeIcon.alt = content.title;

      treeTitle.innerHTML = content.title;

      treeItem.appendChild(treeIcon);
      treeItem.appendChild(treeTitle);

      tree.appendChild(treeItem);

      const
        textContainer = document.createElement('div'),
        textContainerTitle = document.createElement('p');

      textContainer.dataset.tag = content.tag;
      textContainer.className = 'help__text-container box-shadow--active--light hidden';

      if (index === 0) {
        textContainer.classList.remove('hidden');
      }

      target.appendChild(textContainer);

      textContainerTitle.className = 'help__text__title';
      textContainerTitle.innerHTML = content.title;

      textContainer.appendChild(textContainerTitle);

      content.data.forEach((text) => {
        const textItem = document.createElement('p');

        textItem.className = 'help__text';
        textItem.innerHTML = text;

        textContainer.appendChild(textItem);
      });
    });
  }

  function _generateFolderContent(program, handlers) {
    const
      content = program.content,
      target = document.querySelector('.desktop__window__content--folder'),
      tree = document.createElement('div'),
      files = document.createElement('div');

    tree.className = 'folder__tree box-shadow--active--light';
    target.appendChild(tree);

    const
      treeRoot = document.createElement('div'),
      treeRootIcon = document.createElement('img'),
      treeRootTitle = document.createElement('p');

    treeRoot.className = 'folder__tree-root';
    treeRoot.dataset.tag = content.tag;
    treeRootIcon.className = 'folder__tree-root__image';
    treeRootTitle.className = 'folder__tree-root__title';

    treeRootIcon.src = content.icon;
    treeRootTitle.innerHTML = content.title;

    treeRoot.appendChild(treeRootIcon);
    treeRoot.appendChild(treeRootTitle);
    treeRoot.addEventListener('click', handlers.folderTreeRootClickHandler);

    tree.appendChild(treeRoot);

    const treeItems = document.createElement('div');
    treeItems.className = 'folder__tree-item-container';
    tree.appendChild(treeItems);

    const initialFileContainer = document.createElement('div');
    initialFileContainer.className = 'folder__file-container';
    initialFileContainer.dataset.tag = content.tag;
    files.appendChild(initialFileContainer);

    content.items.forEach((item) => {
      const
        fileContainer = document.createElement('div'),
        treeItem = document.createElement('div'),
        treeIcon = document.createElement('img'),
        treeTitle = document.createElement('div'),
        fileItem = document.createElement('div'),
        fileImage = document.createElement('img'),
        fileTitle = document.createElement('div');

      fileItem.className = 'folder__file__icon';
      fileItem.dataset.tag = item.tag;
      initialFileContainer.appendChild(fileItem);
      fileItem.addEventListener('click', handlers.folderItemClickHandler);

      fileImage.className = 'folder__file__icon__image';
      fileImage.src = item.icon;
      fileImage.alt = item.title;
      fileItem.appendChild(fileImage);

      fileTitle.className = 'folder__file__icon__title';
      fileTitle.innerHTML = item.title;
      fileItem.appendChild(fileTitle);

      fileContainer.className = 'folder__file-container hidden';
      fileContainer.dataset.tag = item.tag;

      treeItem.className = 'folder__tree-item hidden';
      treeItem.dataset.tag = item.tag;
      treeItem.addEventListener('click', handlers.folderTreeItemClickHandler)
      treeItems.appendChild(treeItem);

      treeIcon.className = 'folder__tree-item__image';
      treeIcon.src = item.icon;
      treeItem.appendChild(treeIcon);

      treeTitle.className = 'folder__tree-item__title';
      treeTitle.innerHTML = item.title;
      treeItem.appendChild(treeTitle);

      files.appendChild(fileContainer);

      item.items.forEach((iconItem) => {
        const
          icon = document.createElement('div'),
          iconImage = document.createElement('img'),
          iconTitle = document.createElement('div');

        icon.className = 'folder__file__icon';

        iconImage.className = 'folder__file__icon__image';
        iconImage.src = iconItem.icon;
        iconImage.alt = iconItem.title;
        icon.appendChild(iconImage);

        iconTitle.className = 'folder__file__icon__title';
        iconTitle.innerHTML = iconItem.title;
        icon.appendChild(iconTitle);

        fileContainer.appendChild(icon);
      });
    });


    files.className = 'folder__file-wrapper box-shadow--active--light';
    target.appendChild(files);
  }

  async function _generateNotepadContent(program) {
    const
      target = document.querySelector('.desktop__window__content--notepad'),
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

  function _generateSystemContent(program, handlers) {
    const
      target = document.querySelector('.desktop__window__content--system'),
      tabs = document.createElement('div');

    tabs.className = 'system__tab-container';
    target.appendChild(tabs);

    for (let i = 0; i < program.content.length; i++) {
      const
        tabData = program.content[i],
        tabButton = document.createElement('div'),
        tabContent = _generateTabContent(tabData, handlers.computerButtonClickHandler);

      tabButton.className = 'system__tab__button';
      tabButton.dataset.tag = tabData.tag;
      tabButton.addEventListener('click', handlers.systemTabClickHandler);

      if (i === 0) {
        tabButton.classList.add('system__tab__button--active');
        tabContent.classList.remove('hidden');
      }

      target.appendChild(tabContent);

      tabButton.innerHTML = tabData.title;
      tabs.appendChild(tabButton);
    }
  }

  function _generateTabContent(tab, handler) {
    const
      content = document.createElement('div');

    content.className = 'system__tab__content hidden system__tab__content--' + tab.tag;
    content.dataset.tag = tab.tag;

    if (tab.tag === 'general') {
      const
        container = document.createElement('div'),
        computer = document.createElement('div'),
        screen = document.createElement('div'),
        image = document.createElement('div'),
        button = document.createElement('div'),
        stand = document.createElement('div'),
        base = document.createElement('div'),
        textContainer = document.createElement('div');

      content.appendChild(container);

      container.className = 'computer-container';
      computer.className = 'computer box-shadow';
      screen.className = 'computer__screen box-shadow--active';
      image.className = 'computer__screen__image box-shadow--light';
      button.className = 'computer__button';
      button.addEventListener('click', handler);

      screen.appendChild(image);

      computer.appendChild(screen);
      computer.appendChild(button);

      container.appendChild(computer);

      stand.className = 'computer__stand';
      base.className = 'computer__base box-shadow';

      container.appendChild(stand);
      container.appendChild(base);

      textContainer.className = 'text-container';

      const textSection = document.createElement('div');
      textSection.className = 'text__section box-shadow--active--light';

      tab.data.forEach((text) => {
        const paragraph = document.createElement('p');
        paragraph.className = 'text__section__text';
        paragraph.innerHTML = text;

        textSection.appendChild(paragraph);
      });

      textContainer.appendChild(textSection);

      content.appendChild(textContainer);
    } else if (tab.tag === 'facts') {
      const
        title = document.createElement('div'),
        container = document.createElement('div');

      container.className = 'facts-container box-shadow--active--light';

      title.className = 'facts__title';
      title.innerHTML = 'Ki Jung...';

      container.appendChild(title);

      tab.data.forEach((text) => {
        const paragraph = document.createElement('p');
        paragraph.className = 'facts__text';
        paragraph.innerHTML = text;

        container.appendChild(paragraph);
      });

      content.appendChild(container);
    } else if (tab.tag === 'contact') {
      const container = document.createElement('div');

      tab.data.forEach((contact) => {
        const
          image = document.createElement('img'),
          item = document.createElement('div'),
          text = document.createElement('div');

        item.className = 'contact';

        container.className = 'contact-container box-shadow--active--light';
        container.appendChild(item);

        image.className = 'contact__image';
        image.src = contact.icon;
        image.alt = contact.alt;
        item.appendChild(image);

        text.className = 'contact__text';

        if (contact.text.includes('.com')) {
          const anchor = document.createElement('a');

          let prefix = 'https://';

          if (contact.text.includes('@')) {
            prefix = 'mailto:';
          }

          anchor.href = prefix + contact.text;
          anchor.target = '_blank';
          anchor.innerHTML = contact.text;

          text.appendChild(anchor);
        } else {
          text.innerHTML = contact.text;
        }

        item.appendChild(text);
      });

      content.appendChild(container);
    }

    return content;
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

      case windowTypes.system:
        container.className = 'desktop__window__content box-shadow--light';
        container.classList.add('desktop__window__content--system');
        break;

      case windowTypes.help:
        container.classList.add('desktop__window__content--help');
        break;

      case windowTypes.folder:
        container.classList.add('desktop__window__content--folder');
        break;

      case windowTypes.notepad:
        container.classList.add('desktop__window__content--notepad');
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

