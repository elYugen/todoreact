import React from 'react';
import './Bucketlist.css';

function Bucketlist() {
  return (
    <><div className="boxCtn">
    <div className="boxBck" style={{ backgroundColor: "#4cc0ee"}}>
      <div className="ctnPrBox">
      <button className="boutonBck"><img className="iconeHabits" src="plus-solid.svg" alt="plus icon"/></button>
      </div>
    </div>
    </div>
    </>
  );
};

export default Bucketlist;