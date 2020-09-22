import React from 'react';

const ButtonClearSessionCache = (props) => {
  const { handleClearCacheClick } = props;
  return(
    <div className="button-cache-div">
        <button 
          className="button-query" 
          onClick={handleClearCacheClick}
        >Clear Session Cache</button>
    </div>
  )
}

export default ButtonClearSessionCache;