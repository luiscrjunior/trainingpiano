import React, { useEffect } from 'react';

import ReactGA from 'react-ga';
import ReactPixel from 'react-facebook-pixel';

export default ({ setup = false } = {}) => {

  const trackEvent = ({ action = '', value = {}, numericValue = 0, nonInteraction = false }) => {
    ReactGA.event({ category: 'App', action: action, value: numericValue, nonInteraction: nonInteraction });
    ReactPixel.trackCustom(action, value);
  };

  useEffect(() => {
    if (setup) {
      ReactGA.initialize('UA-171111912-1');
      ReactPixel.init('1475213622668870', null, { autoConfig: false });
    }
  }, []);

  useEffect(() => {
    ReactGA.pageview(window.location.pathname);
    ReactPixel.pageView();
  }, [window.location.pathname]);

  return { trackEvent };

};
