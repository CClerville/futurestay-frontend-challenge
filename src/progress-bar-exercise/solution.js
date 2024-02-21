import { useCallback, useEffect, useState } from 'react';
import { HANG_PROGRESSION, MAX_PROGRESSION } from '../constants';
import ProgressBar from './progress-bar';
import RequestButton from './request-button';

import './solution.scss';

const Solution = () => {
  const [isRequesting, setIsRequesting] = useState(false);
  const [progression, setProgression] = useState(0);
  const [apiRequestCompleted, setApiRequestCompleted] = useState(false);

  useEffect(() => {
    let timerId;

    if (isRequesting) {
      if (progression === MAX_PROGRESSION) {
        setIsRequesting(false);
      }
      // Mock Api call
      new Promise((resolve, reject) => {
        setTimeout(() => {
          setApiRequestCompleted(true);
          resolve();
        }, 16000);
      });

      // An interval to simulate the progression bar
      timerId = setInterval(() => {
        setProgression((prevValue) => {
          if (apiRequestCompleted) {
            return MAX_PROGRESSION;
          }

          if (!apiRequestCompleted && prevValue === HANG_PROGRESSION) {
            return prevValue;
          }

          return prevValue + 1;
        });
      }, 200);
    }

    return () => clearTimeout(timerId);
  }, [isRequesting, apiRequestCompleted, progression]);

  const handleOnStartRequest = useCallback(() => {
    if (!isRequesting) {
      setProgression(0);
      setIsRequesting(true);
      setApiRequestCompleted(false);
    }
  }, [isRequesting]);

  const handleOnFinishRequest = useCallback(() => {
    setProgression(MAX_PROGRESSION);
    setIsRequesting(false);
    setApiRequestCompleted(true);
  }, []);

  return (
    <div className="solution-container">
      <div className="button-group">
        <RequestButton
          className={'start'}
          text={isRequesting ? 'Loading...' : 'Start Request'}
          onClick={handleOnStartRequest}
        />
        <RequestButton
          className={'finish'}
          text={'Finish Request'}
          onClick={handleOnFinishRequest}
        />
      </div>
      <ProgressBar progress={progression} />
    </div>
  );
};

export default Solution;
