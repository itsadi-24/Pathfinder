const Footer = () => {
  return (
    <div className='w-full mt-6 text-center -translate-y-3'>
      <a
        href='https://www.adiprasan.me/'
        target='_blank'
        rel='noopener noreferrer'
        className='inline-block text-2xl font-medium text-gray-300 transition-all duration-300 hover:scale-105 hover:text-white group'
        style={{ fontFamily: 'Brush Script MT, cursive' }}
      >
        Made with 💖 by Adi
        <span className='block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-white'></span>
      </a>
    </div>
  );
};

export default Footer;
