import React from 'react';
import '../node_modules/@atlaskit/css-reset/dist/bundle.css';
import './App.css';
import { withAuthenticator } from '@aws-amplify/ui-react'
import Time from './Time';

function App() {
  return (
    <div className="App">
      <Time></Time>
    </div>
  );
}

export default withAuthenticator(App)