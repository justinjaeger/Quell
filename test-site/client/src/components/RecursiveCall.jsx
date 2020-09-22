import React from "react";
import QueryDisplay from './QueryDisplay.jsx';

const RecursiveCall = (props) => {
  const { initialQuery, type, outputFunction, sub } = props;
  let kind = 'City'

  // Render each dropdown item
  // onClick will trigger whatever func was passed into props with "item" passed in
  return (
    <>
      <QueryDisplay
          initialQuery={initialQuery}
          type={type}
          outputFunction={outputFunction}
          key={kind}
          sub={sub}
      />
    </>
  );
};

export default RecursiveCall;
