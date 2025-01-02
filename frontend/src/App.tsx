import './App.css';
import { Main } from './COMPS/Main';
import { NavProvider } from './COMPS/Nav/NavStore';

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