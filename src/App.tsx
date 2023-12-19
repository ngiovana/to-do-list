import { Header } from './components/Header';
import { CreateTask } from './components/CreateTask';

import styles from './App.module.css';

import './global.css';

function App() {

  return (
    <div className={styles.background}>
      <Header />
      
      <div className={styles.wrapper}>
        <CreateTask />
      </div>
    </div>
  )
}

export default App
