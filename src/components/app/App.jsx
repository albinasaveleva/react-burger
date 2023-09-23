import React from 'react';
import styles from './App.module.css';

import AppHeader from '../app-header/app-header.jsx';
import Constructor from '../constructor/constructor';


import data from '../../utils/data';

function App() {
  return (
    <div className={styles.App}>
      <AppHeader />
      <Constructor data={data} />
    </div>
  );
}

export default App;