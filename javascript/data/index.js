export function data() {
  const programs = [
    {
      name: 'My Computer',
      icon: 'assets/computer.png',
    },
    {
      name: 'About Me',
      icon: 'assets/help-book.png',
      class: '--line-below'
    },
    {
      name: 'Experience',
      icon: 'assets/console-prompt.png'
    },
    {
      name: 'Skills',
      icon: 'assets/hard-disk.png'
    },
    {
      name: 'Education',
      icon: 'assets/notepad.png',
      class: '--line-below'
    },
    {
      name: 'Contact Me',
      icon: 'assets/outlook.png'
    },
  ];
  return {
    programs
  }
}