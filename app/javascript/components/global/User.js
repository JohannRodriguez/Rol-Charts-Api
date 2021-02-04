import React from 'react';
import svg from '../../packs/svg.json';

const User = props => {
  return (
    <div className="um-pd">
      <img alt="Profile image" src={props.img}/>
      <div>
        <p>{props.name}</p>
        <svg viewBox="0 0 100 100"><g><path d={svg.friends}/></g></svg>
      </div>
    </div>
  )
};

export default User;
