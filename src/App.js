import { AuthProvider } from './providers/AuthProvider';
import { Routes } from './Routes';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
}

export default App;
