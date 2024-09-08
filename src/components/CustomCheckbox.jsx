import { forwardRef } from 'react';

export const CustomCheckbox = forwardRef(
  ({ label, checked, ...props }, ref) => {
    const baseClasses =
      'inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 shadow-md';
    const activeClasses =
      'bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500';
    const inactiveClasses =
      'bg-transparent text-gray-200 border border-gray-300 hover:bg-gray-100 hover:text-black focus:ring-indigo-500';

    return (
      <div className='m-2'>
        <button
          ref={ref}
          className={`${baseClasses} ${
            checked ? activeClasses : inactiveClasses
          }`}
          {...props}
        >
          {label}
        </button>
      </div>
    );
  }
);

CustomCheckbox.displayName = 'CustomCheckbox';

export default CustomCheckbox;
