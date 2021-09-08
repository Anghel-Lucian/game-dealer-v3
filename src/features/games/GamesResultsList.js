import React from 'react';
import { useSelector } from 'react-redux';
import { selectTyping } from './gamesSlice';

const GamesResultsList = () => {
  const typing = useSelector(selectTyping);

  if (!typing) {
    return <div>Typing is now false, so component appears</div>;
  }

  return <div></div>;
};

export default GamesResultsList;
