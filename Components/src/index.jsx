import React from 'react';
import { createRoot } from 'react-dom/client';
import Button from './components/Button/Button.jsx';

// Clear the existing HTML content
document.body.innerHTML = '<div id="app"></div>';

// Render your React component instead
const root = createRoot(document.getElementById('app'));
root.render(
  <div>
    <h1>Component</h1>
    <h2>버튼 컴포넌트 예제</h2>
    <Button>클릭</Button>
  </div>
);
