import React from 'react';
import { useSelector } from 'react-redux';
import { withAuthenticator } from '@aws-amplify/ui-react'
import '../node_modules/@atlaskit/css-reset/dist/bundle.css';
import './App.css';
import { RootState } from './state/rootReducer';
import Projects from './component/Projects';
import Board from './component/Board';

function App() {

  const idForBoardSelector = (state: RootState) => state.projects.idForBoard

  const idForBoard = useSelector(idForBoardSelector)

  return (
    <div className="App">
      {idForBoard === -1 ? <Projects></Projects> : <Board></Board>}
    </div>
  );
}

export default withAuthenticator(App);
