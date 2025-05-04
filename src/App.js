import { useEffect } from 'react';
import './App.css';
import { useTelegram } from './hooks/useTelegram';


function App() {
    const {onToggleButton, tg} = useTelegram()
  

  useEffect(()=>{
    tg.ready();

  },[])


  return (
    <div className="App">
      work
      <button onClick={onToggleButton}>Close</button>
    </div>
  );
}

export default App;
