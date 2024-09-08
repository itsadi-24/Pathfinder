/* eslint-disable react/prop-types */
const SocialButton = ({ icon: Icon, href, label }) => (
  <a
    href={href}
    target='_blank'
    rel='noopener noreferrer'
    className='inline-flex items-center justify-center w-10 h-10 mr-2 text-white transition-all duration-300 bg-gray-800 rounded-full hover:bg-gray-700 hover:scale-110'
    aria-label={label}
  >
    <Icon size={20} />
  </a>
);

export default SocialButton;
