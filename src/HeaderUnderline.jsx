const HeaderUnderline = () => (
  <div className='relative h-4 mx-auto mt-2 w-96'>
    <svg
      className='absolute top-0 left-0 w-full h-full'
      viewBox='0 0 384 16'
      preserveAspectRatio='none'
    >
      <path
        d='M0,8 Q96,0 192,8 T384,8'
        fill='none'
        stroke='#00FFFF'
        strokeWidth='4'
        strokeLinecap='round'
      >
        <animate
          attributeName='d'
          values='M0,8 Q96,0 192,8 T384,8;M0,8 Q96,16 192,8 T384,8;M0,8 Q96,0 192,8 T384,8'
          dur='10s'
          repeatCount='indefinite'
        />
      </path>
    </svg>
    <svg
      className='absolute top-0 left-0 w-full h-full'
      viewBox='0 0 384 16'
      preserveAspectRatio='none'
    >
      <path
        d='M0,8 Q96,16 192,8 T384,8'
        fill='none'
        stroke='#EC4899'
        strokeWidth='4'
        strokeLinecap='round'
      >
        <animate
          attributeName='d'
          values='M0,8 Q96,16 192,8 T384,8;M0,8 Q96,0 192,8 T384,8;M0,8 Q96,16 192,8 T384,8'
          dur='10s'
          repeatCount='indefinite'
        />
      </path>
    </svg>
  </div>
);

export default HeaderUnderline;
