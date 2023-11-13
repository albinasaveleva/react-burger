import React, {FC} from "react";
import { RingLoader } from 'react-spinners';

import preloaderStyle from './preloader.module.css';

const Preloader: FC = () => {
  return (
    <div className={preloaderStyle.container}>
      <RingLoader color="#4C4CFF" />
    </div>
  )
};

export default Preloader;