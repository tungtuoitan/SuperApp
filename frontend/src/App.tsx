import './App.css';
import { Main } from './COMPS/Main';
import { NavigationProvider } from './COMPS/Navigation/NavigationStore';

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
      <NavigationProvider>
        <Main />
      </NavigationProvider>
    </div>
  );
}

export default App;