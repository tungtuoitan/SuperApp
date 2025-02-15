import './App.css';
import {NavProvider} from './COMPS/SideNav/NavStore';
import { Main } from './COMPS/Main';

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