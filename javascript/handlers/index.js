import { constants } from '../constants/index.js';
const { classNames } = constants();

import { helpers } from '../helpers/index.js';

let photoIndex = 0;

const {
  activateProgram,
  deactivateOtherDesktopIcons,
  deactivateStartBarPrograms,
  deactivateStartButton,
  desktopIconIsActive,
  getProgramByProgramName,
  programWindowIsOpen,
  toggleDesktopIconActiveState
} = helpers();

import { renderers } from '../renderers/index.js';
const {
  renderStartBarProgram,
  renderDesktopWindow
} = renderers();

export function handlers() {
  function desktopIconClickHandler(event) {
    event.stopPropagation();

    const
      currentIcon = event.currentTarget,
      title = currentIcon.querySelector('.desktop__icon__title').innerHTML;

    deactivateStartButton();
    deactivateOtherDesktopIcons(currentIcon);

    if (desktopIconIsActive(currentIcon)) {
      const program = getProgramByProgramName(title);

      if (programWindowIsOpen(program)) {
        activateProgram(program);
      } else {
        renderStartBarProgram(program, startBarProgramClickHandler);
        renderDesktopWindow(program, {
          windowClickHandler,
          windowControls: {
            minimizeClickHandler,
            maximizeClickHandler,
            resetSizeClickHandler,
            closeClickHandler
          },
          contentControls: {
            systemTabClickHandler,
            folderTreeRootClickHandler,
            folderTreeItemClickHandler,
            folderItemClickHandler,
            computerButtonClickHandler
          }
        });
      }
    }

    return toggleDesktopIconActiveState(currentIcon);
  }

  function computerButtonClickHandler(event) {
    const target = document.querySelector('.computer__screen__image');

    const images = [
      '../../assets/images/profile-picture.png',
      '../../assets/images/oodles1.jpg',
      '../../assets/images/oodles2.jpg',
      '../../assets/images/oodles3.jpg',
      '../../assets/images/pili1.jpg',
      '../../assets/images/pili2.jpg',
      '../../assets/images/pili3.jpg',
      '../../assets/images/together.jpg',
    ]

    if (photoIndex === images.length - 1) {
      photoIndex = -1;
    }

    target.style.background = `url(${images[++photoIndex]})`;
  }

  function folderTreeRootClickHandler(event) {
    const
      target = event.currentTarget,
      title = target.querySelector('.folder__tree-root__title'),
      tag = target.dataset.tag;

    title.classList.toggle('folder__tree-root__title--active');

    if (target.className.includes('active')) {
      deactivateRoot();
    } else {
      activateRoot();
    }

    highlightTreeItemByTag(tag);
    openFolderByTag(tag);
  }

  function folderTreeItemClickHandler(event) {
    const
      target = event.currentTarget,
      tag = target.dataset.tag;

    openFolderByTag(tag);
    highlightTreeItemByTag(tag);
  }

  function folderItemClickHandler(event) {
    const
      target = event.currentTarget,
      tag = target.dataset.tag;

    openFolderByTag(tag);
    highlightTreeItemByTag(tag);
    activateRoot()
  }

  function activateRoot() {
    const
      root = document.querySelector('.folder__tree-root'),
      treeItems = [...document.querySelectorAll('.folder__tree-item')];

    root.classList.add('folder__tree-root--active');

    treeItems.forEach((item) => {
      item.classList.remove('hidden');
    });
  }

  function deactivateRoot() {
    const
      root = document.querySelector('.folder__tree-root'),
      treeItems = [...document.querySelectorAll('.folder__tree-item')];

    root.classList.remove('folder__tree-root--active');

    treeItems.forEach((item) => {
      item.classList.add('hidden');
    });
  }

  function openFolderByTag(tag) {
    [...document.querySelectorAll('.folder__file-container')].forEach((container) => {
      if (container.dataset.tag === tag) {
        container.classList.remove('hidden');
      } else {
        container.classList.add('hidden');
      }
    });
  }


  function highlightTreeItemByTag(tag) {
    [...document.querySelectorAll('.folder__tree-item')].forEach((container) => {
      const title = container.querySelector('.folder__tree-item__title');

      if (container.dataset.tag === tag) {
        title.classList.add('folder__tree-item__title--active');
      } else {
        title.classList.remove('folder__tree-item__title--active');
      }
    });

    if (tag !== 'stack') {
      const treeRoot = document.querySelector('.folder__tree-root__title');

      treeRoot.classList.remove('folder__tree-root__title--active');
    }
  }

  function windowClickHandler(event) {
    event.stopPropagation();

    const
      programName = this.querySelector('.desktop__window__header__title').innerHTML,
      program = getProgramByProgramName(programName);

    deactivateStartButton();
    activateProgram(program);
  }

  function startMenuItemClickHandler(event) {
    event.stopPropagation();

    const
      programName = this.querySelector('div').innerHTML,
      program = getProgramByProgramName(programName);

    deactivateStartButton();

    if (programWindowIsOpen(program)) {
      activateProgram(program);
    } else {
      renderStartBarProgram(program, startBarProgramClickHandler);
      renderDesktopWindow(program, {
        windowClickHandler,
        windowControls: {
          minimizeClickHandler,
          maximizeClickHandler,
          resetSizeClickHandler,
          closeClickHandler
        },
        contentControls: {
          systemTabClickHandler,
          folderTreeRootClickHandler,
          folderTreeItemClickHandler,
          folderItemClickHandler,
          computerButtonClickHandler
        }
      });
    }
  }

  function startBarProgramClickHandler(event) {
    event.stopPropagation();

    const
      programName = this.querySelector('div').innerHTML,
      program = getProgramByProgramName(programName);

    return activateProgram(program);
  }

  function minimizeClickHandler(event) {
    event.stopPropagation();

    const window = this.parentNode.parentNode.parentNode;

    deactivateStartBarPrograms();

    window.classList.toggle('hidden');
  }

  function maximizeClickHandler() {
    const
      window = this.parentNode.parentNode.parentNode,
      position = window.getBoundingClientRect();

    //save position and size
    window.dataset.positionTop = position.top;
    window.dataset.positionLeft = position.left;
    window.dataset.height = window.offsetHeight;
    window.dataset.width = window.offsetWidth;

    //maximize
    window.style.top = '0';
    window.style.left = '0';
    window.style.height = 'calc(100svh - 3.5rem)';
    window.style.width = '100%';

    //change buttons
    this.nextSibling.classList.remove(classNames.hidden);
    this.classList.add(classNames.hidden);
  }

  function resetSizeClickHandler() {
    const
      window = this.parentNode.parentNode.parentNode;

    //set stored values
    window.style.top = window.dataset.positionTop + 'px';
    window.style.left = window.dataset.positionLeft + 'px';
    window.style.height = window.dataset.height + 'px';
    window.style.width = window.dataset.width + 'px';

    this.classList.add(classNames.hidden);
    this.previousSibling.classList.remove(classNames.hidden);
  }

  function closeClickHandler() {
    const
      window = this.parentNode.parentNode.parentNode,
      windowTitle = window.querySelector('.desktop__window__header__title').innerHTML,
      startBarProgramTitles = document.querySelectorAll('.start-bar__program__title');

    //remove from start bar
    for (let i = 0; i < startBarProgramTitles.length; i++) {
      const title = startBarProgramTitles[i].innerHTML;

      if (title === windowTitle) {
        document.querySelector('.start-bar__program-container').removeChild(startBarProgramTitles[i].parentNode);
      }
    }

    //remove from desktop
    window.parentNode.removeChild(window);
  }

  function systemTabClickHandler(event) {
    const
      target = event.currentTarget,
      activeButtonClass = 'system__tab__button--active';

    target.parentNode.querySelector('.' + activeButtonClass).classList.remove(activeButtonClass);

    target.classList.add('system__tab__button--active');

    const
      tag = target.dataset.tag,
      window = target.parentNode.parentNode,
      contents = [...window.querySelectorAll('.system__tab__content')];

    contents.forEach((element) => {
      if (element.dataset.tag === tag) {
        element.classList.remove('hidden');
      } else {
        element.classList.add('hidden');
      }
    });
  }

  function startButtonHandler(event) {
    event.stopPropagation();

    deactivateOtherDesktopIcons();

    const
      parent = this.parentNode,
      button = parent.querySelector('.start-bar__start-button'),
      menu = parent.querySelector('.start-bar__start-menu');

    button.classList.toggle('box-shadow');
    button.classList.toggle('box-shadow--active');

    menu.classList.toggle('hidden');
  }

  function deactivateAll() {
    const
      button = document.querySelector('.start-bar__start-button'),
      menu = document.querySelector('.start-bar__start-menu'),
      desktopIcons = document.querySelectorAll('.desktop__icon');

    for (let i = 0; i < desktopIcons.length; i++) {
      const icon = desktopIcons[i];

      icon.querySelector('.desktop__icon__image' + classNames.active)?.classList.remove('desktop__icon__image' + classNames.active);
      icon.querySelector('.desktop__icon__title' + classNames.active)?.classList.remove('desktop__icon__title' + classNames.active);
    }

    if (button.className.includes(classNames.active)) {
      button.classList.remove('box-shadow--active');
      button.classList.add('box-shadow');

      menu.classList.toggle('hidden');
    }
  }

  return {
    desktopIconClickHandler,
    startMenuItemClickHandler,
    startButtonHandler,
    deactivateAll
  }
}