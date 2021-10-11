import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  addGameToLibrary,
  removeGameFromLibrary,
  selectLibraryGames,
} from '../features/library/librarySlice';

const Button = ({ associatedSlice, gameData, type }) => {
  const libraryGames = useSelector(selectLibraryGames);
  const dispatch = useDispatch();

  const onClickAddGame = () => {
    if (associatedSlice === 'library') {
      dispatch(addGameToLibrary(gameData));
    }

    // if (associatedSlice === 'wishlist') {
    //   // something else
    // }
  };

  const onClickRemoveGame = () => {
    if (associatedSlice === 'library') {
      dispatch(removeGameFromLibrary(gameData));
    }

    // if (associatedSlice === 'wishlist') {
    //   // something else
    // }
  };

  const renderedButton = () => {
    // need another way to check if libraryGames includes gameData since it is now an object with a different reference
    if (
      libraryGames.find((game) => game.slug === gameData.slug) &&
      associatedSlice === 'library'
    ) {
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
