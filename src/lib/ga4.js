import ReactGA from 'react-ga4';

const initializeGA = () => {
  ReactGA.initialize('G-85C2W1D4ES');
};

export const EventMap = {
  BLOG: {
    category: 'Blog',
    action: 'click',
    label: 'open blog post from index.js',
  },
};


export default initializeGA;
export { initializeGA };
