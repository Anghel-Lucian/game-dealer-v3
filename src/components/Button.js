import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  addGameToLibrary,
  removeGameFromLibrary,
  selectCategorizedGames,
} from '../features/library/librarySlice';

const Button = ({
  associatedSlice,
  gameData,
  type,
  libraryCategory,
  additionalHandler,
}) => {
  const categorizedGames = useSelector(selectCategorizedGames);
  const dispatch = useDispatch();

  const onClickAddGame = () => {
    if (associatedSlice === 'library') {
      dispatch(addGameToLibrary({ gameData, libraryCategory }));
      additionalHandler();
    }

    // if (associatedSlice === 'wishlist') {
    //   // something else
    // }
  };

  const onClickRemoveGame = () => {
    if (associatedSlice === 'library') {
      dispatch(removeGameFromLibrary({ gameData, libraryCategory }));
      additionalHandler();
    }

    // if (associatedSlice === 'wishlist') {
    //   // something else
    // }
  };

  const renderedButton = () => {
    if (
      associatedSlice === 'library' &&
      categorizedGames[libraryCategory]?.find(
        (game) => game.slug === gameData.slug
      )
    ) {
      return (
        <button
          onClick={onClickRemoveGame}
          className={`btn-add btn-added__${associatedSlice} btn-add__${type}`}
        >
          In {libraryCategory}
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
        Add to {libraryCategory ? libraryCategory : associatedSlice}
      </button>
    );
  };

  return renderedButton();
};

export default Button;
