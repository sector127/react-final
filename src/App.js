import { AuthProvider } from './providers/AuthProvider';
import { Routes } from './Routes';

import { CountryProvider } from './providers/CountryProvider';

import './App.css';

function App() {
  return (
    <AuthProvider>
      <CountryProvider>
        <Routes />
      </CountryProvider>
    </AuthProvider>
  );
}

export default App;
