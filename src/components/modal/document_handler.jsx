import React from 'react';

const DocumentHandler = (props) => {
  return (
    <div className='document-handler'>
      <div onClick={() => props.action(props.data, props.user)}>{props.type}</div>
    </div>
  )
}

export default DocumentHandler;
