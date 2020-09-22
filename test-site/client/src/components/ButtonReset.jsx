import React from 'react';

const ButtonReset = (props) => {
  const { handleClearCacheClick } = props;
  return(
    <div className="button-clear-div">
        <button 
          className="button-query" 
          onClick={handleClearCacheClick}
        >Reset All</button>
    </div>
  )
}

export default ButtonReset;