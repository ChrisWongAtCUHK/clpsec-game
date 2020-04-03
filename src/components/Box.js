import React from 'react';
import './colors.css';
import './Box.css';

const Box = ({ color, count }) => {
  return <div className={`text-center w-25 p-3 box ${color}`}>{count}</div>;
};

export default Box;
