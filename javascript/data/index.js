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

  const windowType = {
    notepad: 'notepad',
    terminal: 'terminal',
    folder: 'folder'
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
      ]
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
      ]
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
      ]
    },
    {
      name: 'Contact Info',
      icon: 'assets/outlook.png',
      options: [
        windowOptions.file,
        windowOptions.edit,
        windowOptions.view,
        windowOptions.help
      ]
    },
  ];

  return {
    programs
  }
}