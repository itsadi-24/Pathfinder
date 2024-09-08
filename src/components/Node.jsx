import React from 'react';

function Node({ pv }) {
  const {
    x,
    y,
    isStart,
    isEnd,
    isWall,
    onMouseDown,
    onMouseEnter,
    onMouseUp,
    setStartEndNode,
  } = pv;

  const allowDrop = (e) => {
    e.preventDefault();
  };

  const drag = (e) => {
    e.dataTransfer.setData('myID', e.target.id);
  };

  const drop = (e) => {
    e.preventDefault();
    const data = e.dataTransfer.getData('myID');
    const dom = document.getElementById(data);
    const id = parseInt(dom.attributes.data_type.value);
    if (
      e.target.attributes.data_type.value !== '3' ||
      e.target.attributes.wall.value === 'true'
    )
      return;

    const r = parseInt(e.target.attributes.data_x.value);
    const c = parseInt(e.target.attributes.data_y.value);
    setStartEndNode(id, r, c);
  };

  let classNode = isStart
    ? 'START_NODE cursor-grab'
    : isEnd
    ? 'END_NODE cursor-grab'
    : isWall
    ? 'obtacle'
    : '';
  let typeId = isStart ? '1' : isEnd ? '2' : '3';

  if (isStart || isEnd) {
    return (
      <div
        className={`square ${classNode}`}
        id={`row${x}_col${y}`}
        data_x={x}
        data_y={y}
        data_type={typeId}
        wall='false'
        draggable='true'
        onDragStart={drag}
        onDrop={drop}
        onDragOver={allowDrop}
      ></div>
    );
  } else {
    return (
      <div
        onMouseDown={(e) => {
          e.preventDefault();
          onMouseDown(x, y);
        }}
        onMouseEnter={(e) => {
          e.preventDefault();
          onMouseEnter(x, y);
        }}
        onMouseUp={(e) => {
          e.preventDefault();
          onMouseUp();
        }}
        className={`square ${classNode}`}
        id={`row${x}_col${y}`}
        data_x={x}
        data_y={y}
        data_type={typeId}
        wall={isWall.toString()}
        onDrop={drop}
        onDragOver={allowDrop}
      ></div>
    );
  }
}

export default Node;
