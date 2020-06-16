import React from 'react';
import '../node_modules/@atlaskit/css-reset/dist/bundle.css';
import './App.css';
import { withAuthenticator } from '@aws-amplify/ui-react'
import Projects from './Projects';

function App() {
  return (
    <div className="App">
      <Projects></Projects>
    </div>
  );
}

export default withAuthenticator(App);
