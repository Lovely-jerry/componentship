import React from 'react';

import Button from './components/Button/button'

function App() {
  return (
    <div className="App">
      <Button autoFocus classnames="custom" />
      <Button btnType='primary' onClick={()=>console.log('123456')}>primary btn</Button>
      <Button size='lg' btnType="danger">lg btn</Button>
      <Button disabled size='sm'>sm btn</Button>
      <Button btnType='link'target='_blank' href='http://www.baidu.com'>百度</Button>
      <Button btnType='link' href='http://www.goole.com' disabled>谷歌</Button>
    </div>
  );
}

export default App;
