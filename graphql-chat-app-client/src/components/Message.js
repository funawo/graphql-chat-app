import React from 'react';
import './Message.css'

const Message = ({ row }) => {
  return (
    <div className="message">
      <div className="meta">
        <span>{row.user}</span>
        <span>{row.postedAt}</span>
      </div>
      <div>
        {row.body.split('\n').map((bodyRow, index) => (<React.Fragment key={index}>{bodyRow}<br /></React.Fragment>))}
      </div>
    </div>
  );
};

export default Message;