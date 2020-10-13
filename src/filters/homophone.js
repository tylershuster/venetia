const fetch = require('node-fetch');

module.exports = async (planets, callback) => {
  const passes = [];
  let index = 0;
  for (const planet of planets) {
    const parts = planet.replace('~', '').split('-');
    const minScore = 92;
    // progress.update(index, { checking: planet });
    const firstMatches = await fetch(`https://api.datamuse.com/words?sl=${parts[0]}&max=1`)
      .then(r => r.json())
      .catch(e => console.log('error', e));
    const secondMatches = await fetch(`https://api.datamuse.com/words?sl=${parts[1]}&max=1`)
      .then(r => r.json())
      .catch(e => console.log('error', e));
    if (
      (firstMatches.length && firstMatches[0].score > minScore)
      || (secondMatches.length && secondMatches[0].score > minScore)) {
      // found++;
      // progress.update(index, { found });
      passes.push(planet);
      let line = planet + ' (';
      let matchCount = 0;
      if(firstMatches.length && firstMatches[0].score > minScore) {
        line += firstMatches[0].word;
        matchCount++;
      } else {
        line += parts[0];
      }
      line += '-';
      if(secondMatches.length && secondMatches[0].score > minScore) {
        line += secondMatches[0].word;
        matchCount++;
      } else {
        line += parts[1];
      }
      line += ')';
      line += ` (${matchCount} matches)`;
      callback(line);
    }
    // index++;
  }

  return passes;
};