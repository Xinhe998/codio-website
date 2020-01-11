import React from 'react';
import './index.scss';

const List = ({ items }) => {
  return items.map((item) => (
    <div className="list-item">
      <div>
        {item.link ? (
          <a href={item.link}>{item.title}</a>
        ) : (
          <span>{item.title}</span>
        )}

        {item.desc && <span>{item.desc}</span>}
      </div>
      {item.action && <div className="list-item-actions">{item.action}</div>}
    </div>
  ));
};
export default List;
