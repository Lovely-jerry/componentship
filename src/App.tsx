import React from 'react';
import Menu from './components/Menu/menu'
import MenuItem from './components/Menu/menuItem'
import SubMenu from './components/Menu/subMenu';

function App() {
  return (
    <div className="App">
      <Menu defaultIndex={0} mode='vertical' onSelect={(index)=>console.log(index)}>
        <MenuItem>
          cool link 1
        </MenuItem>
        <MenuItem disabled>
          cool link 2
        </MenuItem>
        <SubMenu title='dropdown'>
            <MenuItem>dropdown 1</MenuItem>
            <MenuItem>dropdown 2</MenuItem>
        </SubMenu>
        <MenuItem>
          cool link 3
        </MenuItem>
      </Menu>
    </div>
  );
}

export default App;
