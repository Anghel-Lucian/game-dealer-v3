export const filterCharacters = function (string) {
  let filteredString = [];
  string.split(' ').forEach((stringEl) => {
    filteredString.push(
      stringEl
        .split('')
        .filter((char) => char.match(/^[a-zA-Z0-9]+$/))
        .join('')
    );
  });

  return filteredString.join('-');
};
