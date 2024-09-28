export function constants() {
  const classNames = {
    active: '--active',
    boxShadow: 'box-shadow',
    hidden: 'hidden'
  }

  const windowTypes = {
    notepad: 'notepad',
    terminal: 'terminal',
    folder: 'folder',
    help: 'help',
    contact: 'contact',
    system: 'system'
  }

  return {
    classNames,
    windowTypes
  };
}