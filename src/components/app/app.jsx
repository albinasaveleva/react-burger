import React from 'react';
import styles from './app.module.css';

import AppHeader from '../app-header/app-header.jsx';
import Main from '../main/main';


import data from '../../utils/data';

function App() {
  return (
    <div className={styles.app}>
      <AppHeader />
      <Main data={data} />
    </div>
  );
}

export default App;