import Exercise from '../core/exercise';
import Solution from './solution';

const ProgressBarExercise = () => {
  return (
    <div className="progress-bar-exercise">
      <Exercise
        solution={<Solution breakpoints={[5, 8, 12]} />}
        specsUrl="https://github.com/futurestay/frontend-challenges/issues/1"
        title="Progress Bar Exercise"
      />
    </div>
  );
};

export default ProgressBarExercise;
