import React from 'react';

interface IInterface {
  value: string;
  name: string;
  c?: string;
}
const arr: IInterface = {
  value: '22',
  name: '23432',
};

const Header = () => {
  console.log(arr?.c);
  return <header>我是头部123456</header>;
};

export default Header;
