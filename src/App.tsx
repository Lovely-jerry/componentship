import React from 'react';
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import Menu from './components/Menu/menu'
import MenuItem from './components/Menu/menuItem'
import SubMenu from './components/Menu/subMenu';
import Icon from './components/Icon/icon'

library.add(fas);

function App() {
  return (
    <div className="App">
      <Icon size='10x' icon='coffee' theme='info' />
      <Menu defaultIndex='0' mode='vertical' defaultOpenSubMenus={['2']} onSelect={(index) => console.log(index)}>
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
