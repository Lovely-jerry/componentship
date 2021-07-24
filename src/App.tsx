import React from 'react';
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import Menu from './components/Menu/menu'
import MenuItem from './components/Menu/menuItem'
import SubMenu from './components/Menu/subMenu';
import Icon from './components/Icon/icon'
import Button from './components/Button/button'
import Transition from './components/Transition/transition'
import Input from './components/Input/input'

library.add(fas);

function App() {
  const [show, setShow] = React.useState(false)
  return (
    <div className="App">
      <Input placeholder='请输入' />
      <Input size='lg' disabled={true} placeholder='我是被禁用的' />
      <Input icon='coffee' placeholder='我是图标输入框' />
      <Input placeholder='我是前缀输入框' prepand='https://' />
      <Input placeholder='我是后缀输入框' append='.com' />
      <Icon size='10x' icon='coffee' theme='info' />
      <Menu defaultIndex='0' defaultOpenSubMenus={['2']} onSelect={(index) => console.log(index)}>
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
      <Button btnType="primary" onClick={() => setShow(!show)}>toggle</Button>
      <Transition
        in={show}
        timeout={500}
        animation='zoom-in-left'
      >
        <div>
          <p>my name is alien</p>
          <p>my name is alien</p>
          <p>my name is alien</p>
          <p>my name is alien</p>
          <p>my name is alien</p>
        </div>
      </Transition>
      <Transition
        in={show}
        timeout={300}
        animation='zoom-in-bottom'
        wrapper
      >
        <Button size='lg' btnType='danger'>i am a show button</Button>
      </Transition>

    </div>
  );
}

export default App;
