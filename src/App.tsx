import './App.css';
import { NavProvider } from './contexts/NavigationContext';
import { Main } from './Components/Main';

function App() {
  return (
    <div
      className="App"
      style={{
        overflow: 'hidden',
        height: '100vh',
        width: '100%',
        margin: 0,
        padding: 0,
        overflowX: 'hidden',
      }}
    >
      <NavProvider>
        <Main />
      </NavProvider>
    </div>
  );
}

export default App;
