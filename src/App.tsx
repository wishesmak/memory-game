import React from 'react';
import { Header, Board, Footer } from './components';

function App() {
  return (
    <div className="App">
      <Header />
      <div className="wrapper">
        <Board />
      </div>
      <Footer />
    </div>
  );
}

export default App;
