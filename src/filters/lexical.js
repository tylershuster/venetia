const checkWord = require('check-word');

const wordList = checkWord('en'); // Sorry everyone else

module.exports = async (planets, callback) => planets.filter((planet, index) => {
  const passes = planet
      .replace('~', '')
      .split('-')
      .filter(part => wordList.check(part)).length === 2;
  if(passes) {
    found++;
    await callback(planet);
  }
  progress.update(index, { found });
  return passes;
});