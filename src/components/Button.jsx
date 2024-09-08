import { Info } from 'lucide-react';
import { forwardRef } from 'react';

export const Button = forwardRef(
  ({ label, className, isBgColor, ...props }, ref) => {
    const baseClasses =
      'px-4 py-3 h-min text-sm font-semibold rounded-lg transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 shadow-md';
    const coloredClasses =
      'bg-indigo-500 text-white hover:bg-indigo-600 focus:ring-indigo-400';
    const outlineClasses =
      'bg-transparent text-indigo-300 border border-indigo-300 hover:bg-indigo-900 focus:ring-indigo-400';
    return (
      <button
        ref={ref}
        className={`${baseClasses} ${
          isBgColor ? coloredClasses : outlineClasses
        } ${className}`}
        {...props}
      >
        <span className='relative'>
          {label}
          <span className='absolute bottom-0 left-0 w-full h-0.5 bg-current transform scale-x-0 transition-transform duration-300 origin-left group-hover:scale-x-100'></span>
        </span>
      </button>
    );
  }
);
export const InfoButton = ({ onClick }) => (
  <button
    onClick={onClick}
    className='inline-flex items-center justify-center w-10 h-10 ml-2 text-white transition-all duration-300 bg-gray-800 rounded-full hover:bg-gray-700 hover:scale-110'
    aria-label='Algorithm Information'
  >
    <Info size={20} />
  </button>
);

Button.displayName = 'Button';

export default Button;
