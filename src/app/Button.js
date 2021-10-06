import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  addGameToLibrary,
  removeGameFromLibrary,
  selectLibraryGames,
} from '../features/library/librarySlice';

const Button = ({ associatedSlice, gameSlug, type }) => {
  const libraryGames = useSelector(selectLibraryGames);
  const dispatch = useDispatch();

  const onClickAddGame = () => {
    if (associatedSlice === 'library') {
      dispatch(addGameToLibrary(gameSlug));
    }

    // if (associatedSlice === 'wishlist') {
    //   // something else
    // }
  };

  const onClickRemoveGame = () => {
    if (associatedSlice === 'library') {
      dispatch(removeGameFromLibrary(gameSlug));
    }

    // if (associatedSlice === 'wishlist') {
    //   // something else
    // }
  };

  const renderedButton = () => {
    if (libraryGames.includes(gameSlug) && associatedSlice === 'library') {
      return (
        <button
          onClick={onClickRemoveGame}
          className={`btn-add btn-added__${associatedSlice} btn-add__${type}`}
        >
          In library
        </button>
      );
    }

    // if (wishlistGames.includes(gameSlug) && associatedSlice === 'wishlist') {
    //   return (
    //     <button
    //       onClick={onClickRemoveGame}
    //       className={`btn-add btn-added__${associatedSlice} btn-add__${type}`}
    //     >
    //       In wishlist
    //     </button>
    //   );
    // }

    return (
      <button
        onClick={onClickAddGame}
        className={`btn-add btn-add__${associatedSlice} btn-add__${type}`}
      >
        Add to {associatedSlice}
      </button>
    );
  };

  return renderedButton();
};

export default Button;
