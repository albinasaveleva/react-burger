import React from "react";
import { RingLoader } from 'react-spinners';

import preloaderStyle from './preloader.module.css';

function Preloader() {
  return (
    <div className={preloaderStyle.container}>
      <RingLoader color="#4C4CFF" />
    </div>
  )
};

export default React.memo(Preloader);