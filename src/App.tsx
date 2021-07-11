import React from 'react';
import Menu from './components/Menu/menu'
import MenuItem from './components/Menu/menuItem'

function App() {
  return (
    <div className="App">
      <Menu defaultIndex={0} mode='vertical' onSelect={(index)=>console.log(index)}>
        <MenuItem index={0}>
          cool link 1
        </MenuItem>
        <MenuItem disabled index={1}>
          cool link 2
        </MenuItem>
        <MenuItem index={2}>
          cool link 3
        </MenuItem>
      </Menu>
    </div>
  );
}

export default App;
