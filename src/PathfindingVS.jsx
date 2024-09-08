import '../src/styles/PathfindingVS.css';
import { useEffect, useState } from 'react';
import basicMaze from './algorithm/maze/basic-maze';
import BFS from './algorithm/path/bfs';
import DFS from './algorithm/path/dfs';
import Dijkstra from './algorithm/path/dijkstra';
import Randomized_dfs from './algorithm/maze/randomized_dfs';
import recursiveDivision from './algorithm/maze/recursive_division';
import { KruskalAlgorithm } from './algorithm/maze/kruskal-algorithm';
import { PrimsAlgorithm } from "./algorithm/maze/prim's-algorithm";
import { CustomCheckbox } from './components/CustomCheckbox.jsx';
import { Button, InfoButton } from './components/Button.jsx';
import { ChevronDownIcon, Github, Linkedin } from 'lucide-react';
import SocialButton from './SocialButton.jsx';
import HeaderUnderline from './HeaderUnderline.jsx';
import Footer from './components/Footer.jsx';
import InfoOverlay from './InfoOverlay';

var rows = 13;
var cols = 31;

const CELL_SIZE = 30;
const PADDING = 200;
const MAX_ROW = Math.floor((window.innerHeight - PADDING) / CELL_SIZE);
if (MAX_ROW > rows) rows = MAX_ROW >= 19 ? 19 : MAX_ROW; // Rows = [13, 19]

var START_NODE_ROW = 4,
  START_NODE_COL = 6;
var END_NODE_ROW = rows - 6,
  END_NODE_COL = cols - 6;
var INIT_START_ROW = START_NODE_ROW,
  INIT_START_COL = START_NODE_COL;
var INT_END_ROW = END_NODE_ROW,
  INIT_END_COL = END_NODE_COL;

const FAST = 5;
const AVERAGE = 15;
const SLOW = 50;
var animateTime = AVERAGE; // default

function PathfindingVS() {
  const [Grid, setGrid] = useState([]);
  const [isMousePress, setIsMousePress] = useState(false);
  const [animateType, setAnimateTimeType] = useState(2);
  const [pathID, setPathID] = useState(0);
  const [isInfoOpen, setIsInfoOpen] = useState(false);

  useEffect(() => {
    gridInitialize();
  }, []);

  const gridInitialize = () => {
    var grid = new Array(rows);
    for (let i = 0; i < rows; i++) grid[i] = new Array(cols);

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        grid[i][j] = new Spot(i, j);
      }
    }
    setGrid(grid);
  };

  async function animateVisitedNodes(visitedNodes) {
    for (let i = 0; i < visitedNodes.length; i++) {
      const node = visitedNodes[i];
      await waitForAnimatoin(animateTime);
      if (node.x === START_NODE_ROW && node.y === START_NODE_COL)
        document.getElementById(`row${node.x}_col${node.y}`).className =
          'node-visited START_NODE cursor-grab';
      else if (node.x === END_NODE_ROW && node.y === END_NODE_COL)
        document.getElementById(`row${node.x}_col${node.y}`).className =
          'node-visited END_NODE cursor-grab';
      else
        document.getElementById(`row${node.x}_col${node.y}`).className =
          'node-visited';
    }
  }

  async function animateShortestPath(pathNode) {
    pathNode.reverse();
    for (let i = 0; i < pathNode.length; i++) {
      const node = pathNode[i];
      await waitForAnimatoin(animateTime);
      if (i === 0)
        document.getElementById(`row${node.x}_col${node.y}`).className =
          'shortestPath START_NODE cursor-grab';
      else if (i + 1 === pathNode.length)
        document.getElementById(`row${node.x}_col${node.y}`).className =
          'shortestPath END_NODE cursor-grab';
      else
        document.getElementById(`row${node.x}_col${node.y}`).className =
          'shortestPath';
    }
  }

  const pathFinding = async () => {
    var btns = document.getElementsByClassName('btn-selector');
    document.getElementsByTagName('select')[0].disabled = true;
    for (let i = 0; i < btns.length; i++) {
      btns[i].disabled = true;
    }

    var startNode = Grid[START_NODE_ROW][START_NODE_COL];
    var endNode = Grid[END_NODE_ROW][END_NODE_COL];

    switch (pathID) {
      case 1:
        var obj = BFS(Grid, startNode, endNode, rows, cols);
        await animateVisitedNodes(obj.visitedNodes);
        await animateShortestPath(obj.path);
        break;
      case 2:
        obj = DFS(Grid, startNode, endNode, rows, cols);
        await animateVisitedNodes(obj.visitedNodes);
        await animateShortestPath(obj.path);
        break;
      default:
        obj = Dijkstra(Grid, startNode, endNode, rows, cols);
        await animateVisitedNodes(obj.visitedNodes);
        await animateShortestPath(obj.path);
        break;
    }
    document.getElementsByTagName('select')[0].disabled = false;
    for (let i = 0; i < btns.length; i++) {
      btns[i].disabled = false;
    }
  };

  const mazeGenerator = async (ar) => {
    for (var i = 0; i < ar.length; i++) {
      if (
        (ar[i].r === START_NODE_ROW && ar[i].c === START_NODE_COL) ||
        (ar[i].r === END_NODE_ROW && ar[i].c === END_NODE_COL)
      )
        continue;
      await waitForAnimatoin(animateTime);
      createWall(ar[i].r, ar[i].c);
    }
  };

  const makeAllCellAsAWall = () => {
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        if (
          !(
            (i === START_NODE_ROW && j === START_NODE_COL) ||
            (i === END_NODE_ROW && j === END_NODE_COL)
          )
        ) {
          createWall(i, j);
        }
      }
    }
  };

  const mazeHandle = async () => {
    var btns = document.getElementsByClassName('btn-selector');
    document.getElementsByTagName('select')[0].disabled = true;
    for (let i = 0; i < btns.length; i++) {
      btns[i].disabled = true;
    }

    var arr = [];
    const mazeAlgorithms = [
      basicMaze,
      Randomized_dfs,
      recursiveDivision,
      KruskalAlgorithm,
      PrimsAlgorithm,
    ];
    const randomAlgorithm =
      mazeAlgorithms[Math.floor(Math.random() * mazeAlgorithms.length)];

    if (randomAlgorithm === Randomized_dfs) {
      makeAllCellAsAWall();
    }

    arr = randomAlgorithm(rows, cols);
    await mazeGenerator(arr);

    document.getElementsByTagName('select')[0].disabled = false;
    for (let i = 0; i < btns.length; i++) {
      btns[i].disabled = false;
    }
  };

  const clearPathHandle = () => {
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        if (i === START_NODE_ROW && j === START_NODE_COL) {
          document.getElementById(`row${i}_col${j}`).className =
            'square START_NODE cursor-grab';
        } else if (i === END_NODE_ROW && j === END_NODE_COL) {
          document.getElementById(`row${i}_col${j}`).className =
            'square END_NODE cursor-grab';
        } else if (!Grid[i][j].isWall)
          document.getElementById(`row${i}_col${j}`).className = 'square';
      }
    }
  };

  const createWall = (row, col) => {
    var newGrid = [...Grid];
    var node = newGrid[row][col];
    node.isWall = !node.isWall;
    newGrid[row][col] = node;
    setGrid(newGrid);
  };

  const onMouseDown = (row, col) => {
    if (isValid(row, col)) {
      setIsMousePress(true);
      createWall(row, col);
    }
  };

  const onMouseEnter = (row, col) => {
    if (isMousePress === true && isValid(row, col)) {
      createWall(row, col);
    }
  };

  const onMouseUp = () => {
    setIsMousePress(() => false);
  };

  const animationTimeHandle = (type) => {
    if (type === 1) animateTime = FAST;
    else if (type === 2) animateTime = AVERAGE;
    else animateTime = SLOW;
    setAnimateTimeType(type);
  };

  const setStartEndNode = (id, r, c) => {
    if (id === 1) {
      let newGrid = [...Grid];
      let preStartNode = newGrid[START_NODE_ROW][START_NODE_COL];
      let curStartNode = newGrid[r][c];
      preStartNode.isStart = !preStartNode.isStart;
      curStartNode.isStart = !curStartNode.isStart;
      setGrid(newGrid);

      START_NODE_ROW = r;
      START_NODE_COL = c;
    } else {
      let newGrid = [...Grid];
      let preEndNode = newGrid[END_NODE_ROW][END_NODE_COL];
      let curEndNode = newGrid[r][c];
      preEndNode.isEnd = !preEndNode.isEnd;
      curEndNode.isEnd = !curEndNode.isEnd;
      setGrid(newGrid);

      END_NODE_ROW = r;
      END_NODE_COL = c;
    }
  };

  return (
    <>
      <div className='min-h-screen p-8 bg-gradient-to-r from-blue-800 to-purple-800'>
        <div className='relative mb-8'>
          <div className='absolute top-0 right-0 flex items-center mt-2'>
            <SocialButton
              icon={Github}
              href='https://github.com/itsadi-24'
              label='GitHub Profile'
              className='transition-transform transform hover:scale-105'
            />
            <SocialButton
              icon={Linkedin}
              href='https://www.linkedin.com/in/adi-prasan-khuntia-3944072a5/'
              label='LinkedIn Profile'
              className='transition-transform transform hover:scale-105'
            />
            <InfoButton
              onClick={() => setIsInfoOpen(true)}
              className='transition-transform transform hover:scale-105'
            />
          </div>
          <h1 className='mb-6 text-5xl font-extrabold text-center text-white'>
            Pathfinding Visualizer
          </h1>
          <HeaderUnderline className='mb-4' />
        </div>
        <div className='max-w-6xl p-8 mx-auto bg-gray-900 shadow-2xl rounded-3xl backdrop-blur-lg'>
          <div className='mb-6 path-header'>
            <div className='flex items-center justify-between gap-2 mb-4'>
              <Button
                className='btn-selector bg-slate-100 hover:bg-violet-400 hover:text-slate-100 '
                onClick={pathFinding}
                label='Find path'
              />
              <div className='relative'>
                <select
                  className='appearance-none bg-gray-800 border border-gray-700 rounded-lg text-gray-100 cursor-pointer font-medium py-2.5 px-4 pr-10 w-full transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-violet-500'
                  value={pathID}
                  onChange={(e) => setPathID(parseInt(e.target.value))}
                >
                  <option value='1'>Breadth-First Search</option>
                  <option value='2'>Depth-First Search</option>
                  <option value='3'>Dijkstra</option>
                </select>
                <ChevronDownIcon className='absolute w-5 h-5 text-gray-100 transform -translate-y-1/2 pointer-events-none right-3 top-1/2' />
              </div>
            </div>
            <div className='path-speed-btns'>
              <div className='flex flex-row flex-wrap -m-1'>
                <CustomCheckbox
                  checked={animateType == 1}
                  onClick={() => animationTimeHandle(1)}
                  label='Fast'
                />
                <CustomCheckbox
                  checked={animateType == 2}
                  onClick={() => animationTimeHandle(2)}
                  label='Average'
                />
                <CustomCheckbox
                  checked={animateType == 3}
                  onClick={() => animationTimeHandle(3)}
                  label='Slow'
                />
              </div>
            </div>
            <div className='flex justify-between gap-4 mb-4'>
              <Button
                className='text-white transition-colors border btn-selector bg-violet-600 border-violet-500 hover:bg-violet-700 hover:border-violet-600'
                onClick={mazeHandle}
                label='Generate Maze'
                isBgColor
              />
            </div>

            <div className='flex justify-between gap-2'>
              <Button
                className='text-white transition-colors bg-red-600 border border-red-500 btn-selector hover:bg-red-700 hover:border-red-600'
                onClick={() => {
                  START_NODE_ROW = INIT_START_ROW;
                  START_NODE_COL = INIT_START_COL;
                  END_NODE_ROW = INT_END_ROW;
                  END_NODE_COL = INIT_END_COL;
                  clearPathHandle();
                  gridInitialize();
                }}
                label='Reset'
              />
              <Button
                className='btn-selector bg-slate-100 hover:bg-violet-400 hover:text-slate-100'
                onClick={gridInitialize}
                label='Clear walls'
              />
              <Button
                className='btn-selector bg-slate-100 hover:bg-violet-400 hover:text-slate-100'
                onClick={clearPathHandle}
                label='Clear path'
              />
            </div>
          </div>
          <div className='grid'>
            <div
              onMouseLeave={() => {
                setIsMousePress(false);
              }}
            >
              {Grid.map((R, idx_r) => (
                <div key={idx_r} className='ROW'>
                  {R.map((Value, idx_c) => {
                    const { x, y, isStart, isEnd, isWall } = Value;
                    return (
                      <Node
                        key={idx_c}
                        pv={{
                          x,
                          y,
                          isStart,
                          isEnd,
                          isWall,
                          onMouseDown,
                          onMouseEnter,
                          onMouseUp,
                          setStartEndNode,
                        }}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
        <Footer />
        <InfoOverlay isOpen={isInfoOpen} onClose={() => setIsInfoOpen(false)} />
      </div>
    </>
  );
}

class Spot {
  constructor(i, j) {
    this.x = i;
    this.y = j;
    this.isWall = false;
    this.isStart = i === START_NODE_ROW && j === START_NODE_COL;
    this.isEnd = i === END_NODE_ROW && j === END_NODE_COL;
  }
}

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
    var data = e.data;
    var data = e.dataTransfer.getData('myID');
    var dom = document.getElementById(data);
    var id = parseInt(dom.attributes.data_type.value);
    if (
      e.target.attributes.data_type.value !== '3' ||
      e.target.attributes.wall.value === 'true'
    )
      return;

    // call the function
    var r = parseInt(e.target.attributes.data_x.value);
    var c = parseInt(e.target.attributes.data_y.value);
    setStartEndNode(id, r, c);
  };

  var classNode = isStart
    ? 'START_NODE cursor-grab'
    : isEnd
    ? 'END_NODE cursor-grab'
    : isWall
    ? 'obtacle'
    : '';
  var typeId = isStart ? '1' : isEnd ? '2' : '3';

  if (isStart || isEnd) {
    return (
      <div
        className={'square ' + classNode}
        id={'row' + x + '_col' + y}
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
          e.preventDefault(); // it is necessary
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
        className={'square ' + classNode}
        id={'row' + x + '_col' + y}
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

async function waitForAnimatoin(time) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('');
    }, time);
  });
}

const isValid = (r, c) => {
  if (
    (r === START_NODE_ROW && c === START_NODE_COL) ||
    (r === END_NODE_ROW && c === END_NODE_COL)
  )
    return 0;
  else return 1;
};

export default PathfindingVS;
