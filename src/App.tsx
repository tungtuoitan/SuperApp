import './App.css';
import {NavProvider} from './Components/MainNav/NavStore';
import { Main } from './Components/Main';

function App() {
  
  return (
    <div className="App" style={{
      overflow: 'hidden', 
      height: '100vh',  // <-- This is the key
      width: '100%', 
      margin: 0,
      padding: 0,
      // border: '10px solid black',
      overflowX: 'hidden',
    }}>
      <NavProvider>
        <Main />
      </NavProvider>
    </div>
  );
}

export default App;