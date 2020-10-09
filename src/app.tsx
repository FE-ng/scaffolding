import React, { Suspense, useState } from 'react';

const ComputedOne = React.lazy(() => import('Components/Header'));
const ComputedTwo = React.lazy(() => import('Components/Footer'));

function App() {
  const [showTwo, setShowTwo] = useState<boolean>(false);

  return (
    <div className='app'>
      <Suspense fallback={<div>Loading...</div>}>
        <ComputedOne />
        {showTwo && <ComputedTwo />}
        <button type='button' onClick={() => setShowTwo(true)}>
          显示footer
        </button>
      </Suspense>
    </div>
  );
}

export default App;
