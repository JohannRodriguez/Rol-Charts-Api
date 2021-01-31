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
        <div className={
          path.includes(props.session.user.username)
          && !path.includes('characters') ?
          'highlight link' : 'link'}
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
        <div className={path.includes('characters') ? 'highlight link' : 'link'}
          onClick={() => {props.history.push(`${props.session.user.username}/characters`)}}>
          <svg viewBox="0 0 100 100">
            <g>
              <path d="M50 2 c-55 0, -30 78, -45 91 q-5 5, 5 5
              h85 q5 0 ,0 -5 c-15 -15, 5 -93, -45 -91z
              M50 8 c35 0, 35 60, 0 65
              c-35 -5, -35 -65, 0 -65z
              M38 18 l-5 9 q5 5, 10 0 l-5 -9z
              M62 18 l-5 9 q5 5, 10 0 l-5 -9z
              M38 34.5 c-7 0, -7 6, 0 6 c7 0, 7 -6, 0 -6 z
              M62 34.5 c-7 0, -7 6, 0 6 c7 0, 7 -6, 0 -6 z
              M38 61 l5 -13 q-5 -5, -10 0 l5 13z
              M62 61 l5 -13 q-5 -5, -10 0 l5 13z
              M45 58 c0 7, 10 7, 10 0z
              "></path>
            </g>
          </svg>
          <span>{lang('characters')}</span>
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
          <svg viewBox="0 0 100 100">
            <g>
              <path d="
              M50 1 h-25 q-9 0, -9 9 v83
              q0 10, 10 0 l24 -30 l24 30
              q10 10, 10 0 v-83
              q0 -9, -9 -9z
              "></path>
            </g>
          </svg>
          <span>{lang('bookmarks')}</span>
        </div>
        <div className={path.includes('marketplace') ? 'highlight link' : 'link'}
          onClick={() => {redirect('marketplace')}}>
          <svg viewBox="0 0 100 100">
            <g>
              <path d="
                M15 4 l-14 27 c0 10, 19 10, 19 0
                c0 10, 19 10, 19 0c0 10, 19 10, 19 0c0 10, 19 10, 19 0c0 10, 19 10, 19 0
                l-14 -27 q-3 -4, -6 -3 h-55 q-3 0, -6 3 z
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
          <svg viewBox="0 0 100 100">
            <g>
              <path d="
              M50 4 c-50 0, -15 50, -46 75
              h93 c-31 -15, 4 -75,-46 -75z
              M30 79 c0 25, 40 25, 40 0z
              "></path>
            </g>
          </svg>
          <span>{lang('notifications')}</span>
        </div>
        <div className={path.includes('settings') ? 'highlight link' : 'link'}
          onClick={() => {redirect('settings?tab=account')}}>
          <svg viewBox="0 0 100 100">
            <g>
              <path d="
              M50 1 c-65 0, -65 98, 0 98
              c65 0, 65 -98, 0 -98z
              M50 40 c15 0, 15 20, 0 20 c-15 0, -15 -20, 0 -20z
              M50 18 c15 0, 15 20, 0 20 c-15 0, -15 -20, 0 -20z
              M50 62 c15 0, 15 20, 0 20 c-15 0, -15 -20, 0 -20z
              "></path>
            </g>
          </svg>
          <span>{lang('settings')}</span>
        </div>
      </div>
    </nav>
  )
};

export default NavBar;
