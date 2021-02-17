const navbarData = props => {
  return [
    {
      name: 'home',
      redirect: '',
      current: {
        argument: [],
        method: (path, arg) => {
          let current = false;
          if (path.join('').length === 0) current = true;
          return current;
        },
      },
    },
    {
      name: 'characters',
      redirect: `${props.session.user.username}/characters`,
      current: {
        argument: ['characters', 'new_character'],
        method: (path, arg) => {
          let current = false;
          arg.map(e => {
            if (path.filter(a => a).includes(e)) current = true;
          });
          return current;
        },
      },
    },
    {
      name: 'friends',
      current: {
        argument: [],
        method: () => {},
      },
    },
    {
      name: 'bookmarks',
      current: {
        argument: [],
        method: () => {},
      },
    },
    {
      name: 'marketplace',
      current: {
        argument: [],
        method: () => {},
      },
    },
    {
      name: 'notifications',
      current: {
        argument: [],
        method: () => {},
      },
    },
    {
      name: 'settings',
      redirect: 'settings',
      current: {
        argument: 'settings',
        method: (path, arg) => {
          let current = false;
          if (path.filter(a => a).includes(arg)) current = true;
          return current;
        },
      },
    },
  ];
} 

export default navbarData;
