import { constants } from "../constants/index.js";
const { windowTypes } = constants();

export function data() {
  const windowOptions = {
    edit: 'Edit',
    favorites: 'Favorites',
    file: 'File',
    go: 'Go',
    help: 'Help',
    search: 'Search',
    tools: 'Tools',
    view: 'View'
  }

  const programs = [
    {
      name: 'My Computer',
      icon: 'assets/computer.png',
      options: [
        windowOptions.file,
        windowOptions.edit,
        windowOptions.view,
        windowOptions.tools,
        windowOptions.help
      ],
      type: windowTypes.folder,
      hasAddressBar: true,
    },
    {
      name: 'About Me',
      icon: 'assets/help-book.png',
      class: '--line-below',
      options: [
        windowOptions.file,
        windowOptions.view,
        windowOptions.help
      ],
      type: windowTypes.help,
    },
    {
      name: 'Stack',
      icon: 'assets/hard-disk.png',
      options: [
        windowOptions.file,
        windowOptions.edit,
        windowOptions.view,
        windowOptions.help
      ],
      type: windowTypes.folder,
      hasAddressBar: true,
    },
    {
      name: 'Experience',
      icon: 'assets/console-prompt.png',
      options: [
        windowOptions.file,
        windowOptions.edit,
        windowOptions.view,
        windowOptions.tools,
        windowOptions.help
      ],
      type: windowTypes.terminal,
    },
    {
      name: 'Education',
      icon: 'assets/notepad.png',
      class: '--line-below',
      options: [
        windowOptions.file,
        windowOptions.edit,
        windowOptions.search,
        windowOptions.help
      ],
      type: windowTypes.notepad,
    },
    {
      name: 'Contact Info',
      icon: 'assets/outlook.png',
      options: [
        windowOptions.file,
        windowOptions.edit,
        windowOptions.view,
        windowOptions.help
      ],
      type: windowTypes.help,
    },
  ];

  return {
    programs,
  }
}