import React, { useState, useCallback } from 'react';
import { useSelector } from 'react-redux';

import { selectLibraryGames } from '../features/library/librarySlice';
import Button from './Button';

const ButtonDropdown = ({ gameData, type }) => {
  const [open, setOpen] = useState(false);
  const libraryGames = useSelector(selectLibraryGames);

  const handleOpening = () => setOpen(!open);

  const closeDropdown = useCallback(() => setOpen(false), []);

  const renderButtonContent = () => {
    if (libraryGames.find((game) => game.slug === gameData.slug)) {
      return (
        <>
          In library...{' '}
          <i className="fas fa-sort-down btn-dropdown__open__icon" />
        </>
      );
    } else {
      return (
        <>
          Add to library...{' '}
          <i className="fas fa-sort-down btn-dropdown__open__icon" />
        </>
      );
    }
  };

  return (
    <div className={`btn-dropdown__container btn-dropdown__container--${type}`}>
      <button
        className={`btn-add btn-add__${type} btn-dropdown__open`}
        onClick={handleOpening}
      >
        {renderButtonContent()}
      </button>
      <ul
        className={`btn-dropdown__list ${
          open ? 'btn-dropdown__list--open' : 'btn-dropdown__list--closed'
        }`}
      >
        <Button
          associatedSlice="library"
          type="large"
          gameData={gameData}
          libraryCategory="uncategorized"
          additionalHandler={closeDropdown}
        />
        <Button
          associatedSlice="library"
          type="large"
          gameData={gameData}
          libraryCategory="finished"
          additionalHandler={closeDropdown}
        />
        <Button
          associatedSlice="library"
          type="large"
          gameData={gameData}
          libraryCategory="bought"
          additionalHandler={closeDropdown}
        />
        <Button
          associatedSlice="library"
          type="large"
          gameData={gameData}
          libraryCategory="dropped"
          additionalHandler={closeDropdown}
        />
      </ul>
    </div>
  );
};

export default ButtonDropdown;
