// Import Packages
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

// Import Components

const NavBar = props => {
  const [lang] = useTranslation('navbar');
  const [path, setPath] = useState(props.location.pathname.split('/'));

  useEffect(() => {
    if (props.location.pathname.split('/').join('') != path.join('')) {
      setPath(props.location.pathname.split('/'));
    }
  });

  const redirect = target => {
    props.history.push(`/${target}`);
  };

  

  return (
    <nav>
      <div className="links">
        <p>Logo</p>
        <div className={path.includes(props.session.user.username) ? 'highlight link' : 'link'}
          onClick={() => {redirect(props.session.user.username)}}>
          <svg viewBox="0 0 24 24">
            <g>
              <path fill="currentColor" d="M19.75 22H4.25C3.01 22 2 20.99 2 19.75V4.25C2 3.01 3.01 2 4.25 2h15.5C20.99 2 22 3.01 22 4.25v15.5c0 1.24-1.01 2.25-2.25 2.25zM4.25 3.5c-.414 0-.75.337-.75.75v15.5c0 .413.336.75.75.75h15.5c.414 0 .75-.337.75-.75V4.25c0-.413-.336-.75-.75-.75H4.25z"></path>
            </g>
          </svg>
          <span>{props.session.user.username}</span>
        </div>
        <div className={path.join('').length === 0 ? 'highlight link' : 'link'}
          onClick={() => {redirect('')}}>
          <svg viewBox="0 0 100 100">
            <g>
              <path d="M20 99 L25 99 C35 99, 35 99, 36 90 L40 70 C42 60, 58 60, 60 70 L64 90 C65 99, 65 99, 75 99 L80 99 C85 99, 85 99, 85 90 L85 45 L91 49.5 C97 52, 101 44, 95 39.5 L57.5 5 C52 0, 48 0, 42.5 5 L5 39.5 C-1 44, 3 52, 9 49.5 L15 45 L15 90 C15 99, 15 99, 20 99z M50 58 C36 58, 36 37, 50 37 C64 37, 64 58, 50 58z"></path>
            </g>
          </svg>
          <span>{lang('dashboard')}</span>
        </div>
        <div className={path.includes('friends') ? 'highlight link' : 'link'}
          onClick={() => {redirect('friends')}}>
          <svg viewBox="0 0 100 100">
          <g>
              <path d="M9.5 90 h50
                c10 0, 10 -10, 7 -15
                c-14 -32, -50 -32, -64 0
                c-3 5, -3 15, 7 15z
                M34.5 45 c17 0, 25 -35, 0 -35
                c-25 0, -17 35, 0 35z
                
                M70 45 c14 0, 22 -30, 0 -31
                c-22 1, -14 31, 0 31z
                M73 80 h22
                c5 0, 5 -5, 3 -10
                c-12 -27, -37 -22, -46 -13.4
                c11 8, 15.4 20, 16.5 23.5z
                "></path>
              </g>
          </svg>
          <span>{lang('friends')}</span>
        </div>
        <div className={path.includes('bookmarks') ? 'highlight link' : 'link'}
          onClick={() => {redirect('bookmarks')}}>
          <svg viewBox="0 0 24 24">
            <g>
              <path fill="currentColor" d="M19.9 23.5c-.157 0-.312-.05-.442-.144L12 17.928l-7.458 5.43c-.228.164-.53.19-.782.06-.25-.127-.41-.385-.41-.667V5.6c0-1.24 1.01-2.25 2.25-2.25h12.798c1.24 0 2.25 1.01 2.25 2.25v17.15c0 .282-.158.54-.41.668-.106.055-.223.082-.34.082zM12 16.25c.155 0 .31.048.44.144l6.71 4.883V5.6c0-.412-.337-.75-.75-.75H5.6c-.413 0-.75.338-.75.75v15.677l6.71-4.883c.13-.096.285-.144.44-.144z"></path>
            </g>
          </svg>
          <span>{lang('bookmarks')}</span>
        </div>
        <div className={path.includes('marketplace') ? 'highlight link' : 'link'}
          onClick={() => {redirect('marketplace')}}>
          <svg viewBox="0 0 100 100">
            <g>
              <path d="
                M15 1 h70 l14 34 h-99 l15 -34z

                M5 60 v28 c0 7, 3 10, 10 10
                h 35 c7 0, 10 -7, 10 -10
                v-18 c2 -18, 22 -18, 24 0 
                v18 c-0.5 13, 13.5 13, 13 0 v-26
                c0 -7, -3 -15, -15 -15 h-21
                c-7 0, -15 0, -15 15 v12
                q0 5, -5 5 h-17 q-5 0, -5 -5 v-20
                q0 -5, -5 -5 h-4 q-5 0, -5 5 z

              "></path>
            </g>
          </svg>
          <span>{lang('marketplace')}</span>
        </div>
        <div className="link">
          <svg viewBox="0 0 24 24">
            <g>
              <path fill="currentColor" d="M21.697 16.468c-.02-.016-2.14-1.64-2.103-6.03.02-2.532-.812-4.782-2.347-6.335C15.872 2.71 14.01 1.94 12.005 1.93h-.013c-2.004.01-3.866.78-5.242 2.174-1.534 1.553-2.368 3.802-2.346 6.334.037 4.33-2.02 5.967-2.102 6.03-.26.193-.366.53-.265.838.102.308.39.515.712.515h4.92c.102 2.31 1.997 4.16 4.33 4.16s4.226-1.85 4.327-4.16h4.922c.322 0 .61-.206.71-.514.103-.307-.003-.645-.263-.838zM12 20.478c-1.505 0-2.73-1.177-2.828-2.658h5.656c-.1 1.48-1.323 2.66-2.828 2.66zM4.38 16.32c.74-1.132 1.548-3.028 1.524-5.896-.018-2.16.644-3.982 1.913-5.267C8.91 4.05 10.397 3.437 12 3.43c1.603.008 3.087.62 4.18 1.728 1.27 1.285 1.933 3.106 1.915 5.267-.024 2.868.785 4.765 1.525 5.896H4.38z"></path>
            </g>
          </svg>
          <span>{lang('notifications')}</span>
        </div>
        <div className={path.includes('settings') ? 'highlight link' : 'link'}
          onClick={() => {redirect('settings?tab=account')}}>
          <svg viewBox="0 0 24 24">
            <g>
              <path fill="currentColor" d="M12 22.75C6.072 22.75 1.25 17.928 1.25 12S6.072 1.25 12 1.25 22.75 6.072 22.75 12 17.928 22.75 12 22.75zm0-20C6.9 2.75 2.75 6.9 2.75 12S6.9 21.25 12 21.25s9.25-4.15 9.25-9.25S17.1 2.75 12 2.75z"></path>
              <path fill="currentColor" d="M16.5 10.25c-.965 0-1.75.787-1.75 1.75s.784 1.75 1.75 1.75c.964 0 1.75-.786 1.75-1.75s-.786-1.75-1.75-1.75zm0 2.5c-.414 0-.75-.336-.75-.75 0-.413.337-.75.75-.75s.75.336.75.75c0 .413-.336.75-.75.75zm-4.5-2.5c-.966 0-1.75.787-1.75 1.75s.785 1.75 1.75 1.75 1.75-.786 1.75-1.75-.784-1.75-1.75-1.75zm0 2.5c-.414 0-.75-.336-.75-.75 0-.413.337-.75.75-.75s.75.336.75.75c0 .413-.336.75-.75.75zm-4.5-2.5c-.965 0-1.75.787-1.75 1.75s.785 1.75 1.75 1.75c.964 0 1.75-.786 1.75-1.75s-.787-1.75-1.75-1.75zm0 2.5c-.414 0-.75-.336-.75-.75 0-.413.337-.75.75-.75s.75.336.75.75c0 .413-.336.75-.75.75z"></path>
            </g>
          </svg>
          <span>{lang('settings')}</span>
        </div>
      </div>
    </nav>
  )
};

export default NavBar;
// fill="currentColor"
