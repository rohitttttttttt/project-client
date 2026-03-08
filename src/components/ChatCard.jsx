import React, { useState, useEffect } from 'react';

function ChatCard({ decider , message}) {
  let [flag, setFlag] = useState(decider);

  useEffect(() => {
    setFlag(decider);
  }, [decider]);

  return (
    <div
      style={{
        backgroundColor: flag ? '#28a745' : '#00bfff', 
        color: '#333',
        padding: '8px 12px',
        borderRadius: '12px',
        margin: '8px 0',
        maxWidth: '40%',
        wordWrap: 'break-word',
        alignSelf: !flag ? 'flex-start' : 'flex-end', 
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
      }}
    >
      <p style={{ margin: 0 , color:"#FFFFFF"}}>
        {message}
      </p>
    </div>
  );
}

export default ChatCard;
