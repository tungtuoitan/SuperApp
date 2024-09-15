import './App.css';
import { Main } from './components/Main';
import { NavigationProvider } from './components/Navigation/store/NavigationStore';

function App() {
  
  return (
    <div className="App">
      <NavigationProvider>
        <Main />
      </NavigationProvider>
    </div>
  );
}

export default App;