import React from 'react';

const GridItem = ({ image }) => {
  return (
    <div className="grid-items card shadow-sm rounded-3 overflow-hidden">
      <div className="card-body">
        <img   src={image} className=""/>
      </div>
      <div className="card-footer d-flex justify-content-between">
        <span className="btn btn-white border shadow-sm dragHandle">=</span>
        <p className='text-black'>hello</p>
      </div>
    </div>
  );
};

export default GridItem;