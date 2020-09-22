import React from 'react';
import Trend from 'react-trend';

const Graph = (props) => {
  const { fetchTimeIntegers } = props;
  return(
    <div className="graph-div">
      <h3>Response Speed:</h3>
      <Trend
        className="trend"
        // smooth
        // autoDraw
        // autoDrawDuration={3000}
        // autoDrawEasing="ease-out"
        data={fetchTimeIntegers}
        gradient={['#7dd0e9', '#40677a', '#082032']}
        radius={0.9}
        strokeWidth={4}
        strokeLinecap={'round'}
      />
    </div>
  )
}

export default Graph;