import { constants } from '../constants/index.js';
const { classNames } = constants();

import { helpers } from '../helpers/index.js';
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
          controls: {
            minimizeClickHandler,
            maximizeClickHandler,
            resetSizeClickHandler,
            closeClickHandler
          }
        });
      }
    }

    return toggleDesktopIconActiveState(currentIcon);
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
        controls: {
          minimizeClickHandler,
          maximizeClickHandler,
          resetSizeClickHandler,
          closeClickHandler
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

    //save position
    window.dataset.positionTop = position.top;
    window.dataset.positionLeft = position.left;
    window.dataset.height = window.offsetHeight;
    window.dataset.width = window.offsetWidth;

    //maximize
    window.style.top = '0';
    window.style.left = '0';
    window.style.height = '100%';
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