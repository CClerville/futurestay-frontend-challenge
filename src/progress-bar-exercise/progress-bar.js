import { useEffect, useState } from 'react';
import { MAX_PROGRESSION } from '../constants';

import './progress-bar.scss';

const ProgressBar = ({ className, progress, ...rest }) => {
  const [fadeCls, setFadeCls] = useState('');
  const progression = progress / MAX_PROGRESSION;

  useEffect(() => {
    let intervalId;
    if (progress > 0 && progress < MAX_PROGRESSION) {
      setFadeCls('fadeIn');
    }

    // disappear 3 seconds after completetion
    if (progress >= MAX_PROGRESSION) {
      intervalId = setTimeout(() => setFadeCls('fadeOut'), 3000);
    }

    return () => clearInterval(intervalId);
  }, [progress]);

  return (
    <div className={`progress-bar-container ${fadeCls} ${className}`} {...rest}>
      <div
        className="progress-bar"
        role="progressbar"
        aria-valuenow={progress}
        aria-valuemin="0"
        aria-valuemax={MAX_PROGRESSION}
        style={{ transform: `scaleX(${progression})` }}></div>
    </div>
  );
};

export default ProgressBar;
