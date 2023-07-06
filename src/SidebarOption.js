import React from 'react'
import './SidebarOption.css';

function SidebarOption({title,Icon,playlist}) {
  return (
    <div className='sidebaroption' >
       {Icon && <Icon className="sidebarOption_icons"></Icon>}
       {Icon ? <h4>{title}</h4> : <p>{title}</p>}
    </div>
  );
}

export default SidebarOption;