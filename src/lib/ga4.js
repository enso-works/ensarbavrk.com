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

const trackGAEvent = (category, action, label) => {
  console.log('GA event:', category, ':', action, ':', label);
  // Send GA4 Event
  ReactGA.event({
    category: category,
    action: action,
    label: label,
  });
};

export default initializeGA;
export { initializeGA, trackGAEvent };
