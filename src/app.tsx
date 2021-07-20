/*
 * @Author: your name
 * @Date: 2020-10-09 17:06:36
 * @LastEditTime: 2021-07-16 16:09:04
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /scaffolding/src/app.tsx
 */
/* eslint-disable no-buffer-constructor */
import React, { Suspense } from 'react';
import './index.less';

import Crypto from 'crypto-js';
import axios from 'axios';

const ComputedOne = React.lazy(() => import('Components/Header'));
const ComputedTwo = React.lazy(() => import('Components/Footer'));

const { useState, useEffect } = React;

function covertObjectToBinary(objTarget: any) {
  let output = '';
  const input = JSON.stringify(objTarget); // convert the json to string.
  // loop over the string and convert each charater to binary string.
  for (const element of input) {
    output += `${element.charCodeAt(0).toString(2)} `;
  }
  return output.trimEnd();
}

function convertBinaryToObject(str: any) {
  const newBin = str.split(' ');
  const binCode = [];
  // eslint-disable-next-line no-restricted-syntax
  for (const element of newBin) {
    binCode.push(String.fromCharCode(Number.parseInt(element, 2)));
  }
  const jsonString = binCode.join('');
  return JSON.parse(jsonString);
}
// console.log('covertObjectToBinary =>', covertObjectToBinary(obj));
// console.log('convertBinaryToObject =>', convertBinaryToObject(covertObjectToBinary(obj)));
const str2ab = (str: string) => {
  const buf = new ArrayBuffer(str.length * 2); // 每个字符占用2个字节
  const bufView = new Uint8Array(buf);
  for (let i = 0, strLen = str.length; i < strLen; i++) {
    bufView[i] = str.charCodeAt(i);
  }
  return bufView;
};
const concatenate = (ResultConstructor: any, ...arrays: any[]) => {
  let totalLength = 0;
  for (const arr of arrays) {
    totalLength += arr.length;
  }
  const result = new ResultConstructor(totalLength);
  let offset = 0;
  for (const arr of arrays) {
    result.set(arr, offset);
    offset += arr.length;
  }
  return result;
};
function App() {
  return (
    <div className='app'>
      {/* <Suspense fallback={<div>Loading...</div>}>
        <ComputedOne />
        {showTwo && <ComputedTwo />}
        <button type='button' onClick={() => setShowTwo(true)}>
          显示footer
        </button>
      </Suspense> */}
      wss testf1312fadfdfffasfasfasd
    </div>
  );
}

export default App;
