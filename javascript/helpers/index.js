import { data } from '../data/index.js';
const { programs } = data();

import { constants } from "../constants/index.js";
const { classNames } = constants();

export function helpers() {
  function activateProgram(program) {
    const
      windowTitles = document.querySelectorAll('.desktop__window__header__title'),
      startBarTitles = document.querySelectorAll('.start-bar__program__title');


    for (let i = 0; i < windowTitles.length; i++) {
      const title = windowTitles[i];

      if (title.innerHTML === program.name) {
        //desktop window
        const windowContainer = title.parentNode.parentNode;

        //if it was minimized
        windowContainer.classList.remove(classNames.hidden);

        //bring to front
        windowContainer.style.zIndex = ++startZIndex;
      }
    }

    for (let i = 0; i < startBarTitles.length; i++) {
      const
        title = startBarTitles[i],
        programContainer = title.parentNode;

      if (title.innerHTML === program.name) {
        //activate program
        programContainer.classList.remove(classNames.boxShadow);
        programContainer.classList.add(classNames.boxShadow + classNames.active);
      } else {
        //deactive all others
        programContainer.classList.remove(classNames.boxShadow + classNames.active);
        programContainer.classList.add(classNames.boxShadow);
      }
    }
  }

  function deactivateOtherDesktopIcons(activeDesktopIcon) {
    const allDesktopIcons = document.querySelectorAll('.desktop__icon');

    if (!allDesktopIcons.length) {
      return;
    }

    return allDesktopIcons.forEach((icon) => {
      if (icon == activeDesktopIcon) {
        return;
      }

      icon.querySelector('img').classList.remove('desktop__icon__image' + classNames.active);
      icon.querySelector('div').classList.remove('desktop__icon__title' + classNames.active);
    });
  }

  function deactivateStartButton() {
    const
      button = document.querySelector('.start-bar__start-button'),
      menu = document.querySelector('.start-bar__start-menu');

    if (button.className.includes(classNames.active)) {
      button.classList.toggle(classNames.boxShadow);
      button.classList.toggle(classNames.boxShadow + classNames.active);
      menu.classList.toggle(classNames.hidden);
    }
  }

  function desktopIconIsActive(icon) {
    return icon.children[0].className.includes(classNames.active);
  }

  function getProgramByProgramName(programName) {
    return programs.filter((item) => {
      return item.name == programName;
    })[0];
  }

  function programWindowIsOpen(program) {
    const
      windowTitles = document.querySelectorAll('.desktop__window__header__title');

    for (let i = 0; i < windowTitles.length; i++) {
      const title = windowTitles[i].innerHTML;

      if (title === program.name) {
        return true;
      }
    }

    return false;
  }

  function toggleDesktopIconActiveState(icon) {
    icon.querySelector('img').classList.toggle('desktop__icon__image' + classNames.active);
    icon.querySelector('div').classList.toggle('desktop__icon__title' + classNames.active);
  }

  return {
    activateProgram,
    deactivateOtherDesktopIcons,
    deactivateStartButton,
    desktopIconIsActive,
    getProgramByProgramName,
    programWindowIsOpen,
    toggleDesktopIconActiveState
  }
}