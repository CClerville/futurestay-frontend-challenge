import { useCallback, useEffect, useState } from 'react';
import { HANG_PROGRESSION, MAX_PROGRESSION } from '../constants';
import ProgressBar from './progress-bar';
import RequestButton from './request-button';

import './solution.scss';

const Solution = ({ breakpoints }) => {
  const [isRequesting, setIsRequesting] = useState(false);
  const [progression, setProgression] = useState(0);
  const [apiRequestCompleted, setApiRequestCompleted] = useState(false);
  const [applyBreakPoints, setApplyBreakPoints] = useState(false);

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
        }, 20000);
      });

      // An interval to simulate the progression bar
      timerId = setInterval(() => {
        setProgression((prevValue) => {
          if (apiRequestCompleted) {
            return MAX_PROGRESSION;
          }

          if (
            !apiRequestCompleted &&
            prevValue >= HANG_PROGRESSION &&
            prevValue < MAX_PROGRESSION
          ) {
            return prevValue;
          }

          // if a breakpoint is reached, do a small increament to simulate slow progress
          if (applyBreakPoints && breakpoints.includes(parseInt(prevValue))) {
            return prevValue + 0.05;
          }

          return parseInt(prevValue) + 1;
        });
      }, 100);
    }

    return () => clearTimeout(timerId);
  }, [
    isRequesting,
    apiRequestCompleted,
    progression,
    breakpoints,
    applyBreakPoints,
  ]);

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

  //Toggle between breakpoint and non breakpoint progressbar
  const handleOnProgressbarClick = () => {
    setApplyBreakPoints((prevValue) => !prevValue);
  };

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
      <ProgressBar progress={progression} onClick={handleOnProgressbarClick} />
    </div>
  );
};

export default Solution;
