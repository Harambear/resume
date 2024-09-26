window.startZIndex = 1;

import { handlers } from './handlers/index.js';
const {
  startMenuItemClickHandler,
  desktopIconClickHandler,
  startButtonHandler,
  deactivateAll
} = handlers();

import { renderers } from './renderers/index.js';
const {
  renderDesktopIcons,
  renderStartMenuPrograms
} = renderers();

import { data } from './data/index.js';
const { programs } = data();

renderDesktopIcons(programs, desktopIconClickHandler);
renderStartMenuPrograms(programs, startMenuItemClickHandler);
document.querySelector('.start-bar__start-button').addEventListener('click', startButtonHandler);
document.querySelector('.background').addEventListener('click', deactivateAll);

window.addEventListener('load', () => {
  document.querySelector('.desktop').style.display = 'flex';
});