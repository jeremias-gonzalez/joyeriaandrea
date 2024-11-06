// App.js
import React from 'react';
import { DataProvider } from './components/DataContext/DataContext';

import Home from './components/Home/Home';

function App() {
  return (
    <DataProvider>

      <Home />
      {/* Aquí puedes agregar otros componentes */}
    </DataProvider>
  );
}

export default App;
