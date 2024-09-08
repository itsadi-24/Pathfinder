/* eslint-disable react/prop-types */
import { X, ExternalLink } from 'lucide-react';

const algorithmInfo = {
  bfs: {
    name: 'Breadth-First Search (BFS)',
    description:
      'A graph traversal algorithm that explores all the vertices of a graph or tree level by level. It uses a queue to keep track of the next vertex to visit.',
    timeComplexity: 'O(V + E)',
    spaceComplexity: 'O(V)',
    link: 'https://en.wikipedia.org/wiki/Breadth-first_search',
  },
  dfs: {
    name: 'Depth-First Search (DFS)',
    description:
      'A graph traversal algorithm that explores as far as possible along each branch before backtracking. It uses a stack (either explicitly or through recursion) to keep track of the path.',
    timeComplexity: 'O(V + E)',
    spaceComplexity: 'O(V)',
    link: 'https://en.wikipedia.org/wiki/Depth-first_search',
  },
  dijkstra: {
    name: "Dijkstra's Algorithm",
    description:
      'An algorithm for finding the shortest paths between nodes in a graph, which may represent, for example, road networks. It uses a priority queue to efficiently find the shortest path to the next vertex.',
    timeComplexity: 'O((V + E) log V) with a priority queue',
    spaceComplexity: 'O(V)',
    link: 'https://en.wikipedia.org/wiki/Dijkstra%27s_algorithm',
  },
};

const InfoOverlay = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80'>
      <div className='relative w-full max-w-3xl p-8 bg-gray-900 rounded-lg shadow-lg overflow-y-auto max-h-[90vh] transition-transform transform-gpu'>
        <button
          onClick={onClose}
          className='absolute text-gray-400 transition-colors duration-200 top-4 right-4 hover:text-gray-100'
        >
          <X size={24} />
        </button>
        <h2 className='mb-6 text-3xl font-semibold text-gray-100'>
          Graph Algorithms Information 📝
        </h2>
        <div className='space-y-8'>
          {Object.values(algorithmInfo).map((algo) => (
            <div
              key={algo.name}
              className='p-6 transition-transform transform bg-gray-800 rounded-lg shadow-md hover:scale-105'
            >
              <h3 className='mb-3 text-2xl font-semibold text-gray-100'>
                {algo.name}
              </h3>
              <p className='mb-4 text-gray-300'>{algo.description}</p>
              <p className='mb-4 text-sm text-gray-400'>
                Time Complexity: {algo.timeComplexity} | Space Complexity:{' '}
                {algo.spaceComplexity}
              </p>
              <a
                href={algo.link}
                target='_blank'
                rel='noopener noreferrer'
                className='inline-flex items-center text-blue-400 transition-colors duration-200 hover:text-blue-300'
              >
                Learn More <ExternalLink size={16} className='ml-1' />
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InfoOverlay;
