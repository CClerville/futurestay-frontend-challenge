import { useState } from 'react';

import './request-button.scss';

const RequestButton = ({
  className,
  text,
  onMouseUp,
  onMouseDown,
  ...rest
}) => {
  const [clickCls, setClickCls] = useState('');

  const handleOnMouseup = (e) => {
    setClickCls('');
    onMouseUp?.();
  };

  const handleOnMouseDown = (e) => {
    setClickCls('click');
    onMouseDown?.();
  };

  return (
    <button
      className={`request-button ${className} ${clickCls}`}
      onMouseUp={handleOnMouseup}
      onMouseDown={handleOnMouseDown}
      onTransitionEnd={() => console.log('GOT HERE')}
      {...rest}>
      {text}
    </button>
  );
};

export default RequestButton;
