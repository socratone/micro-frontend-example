import React, { Suspense } from 'react';
import { createRoot } from 'react-dom/client';

// Components 앱에서 불러온다.
const Button = React.lazy(() => import('components/Button'));

// Clear the existing HTML content
document.body.innerHTML = '<div id="app"></div>';

// Render your React component instead
const root = createRoot(document.getElementById('app'));
root.render(
  <div>
    <h1>메인 앱</h1>
    <img src="./assets/images/fish.png" />
    <Suspense fallback={null}>
      <Button>클릭</Button>
    </Suspense>
  </div>
);
