import React from 'react';
import svg from '../../packs/svg.json';

const Header = props => {
  const redirect = target => {
    props.history.push(`/${target}`);
  };

  return (
    <header className="gh-dfd c-mh">
      <div onClick={() => redirect(`${props.user}/characters`)} className={props.path.includes('characters') ? 'highlight': ''}>
        <svg viewBox="0 0 100 100"><g><path d={svg.house} /></g></svg>
      </div>
      <div onClick={() => redirect('new_character')} className={props.path.includes('new_character') ? 'highlight': ''}>
        <svg viewBox="0 0 100 100"><g><path d={svg.house} /></g></svg>
      </div>
      <div>
        <svg viewBox="0 0 100 100"><g><path d={svg.house} /></g></svg>
      </div>
      <div>
        <svg viewBox="0 0 100 100"><g><path d={svg.house} /></g></svg>
      </div>
      <div>
        <svg viewBox="0 0 100 100"><g><path d={svg.house} /></g></svg>
      </div>
    </header>
  )
};

export default Header;
