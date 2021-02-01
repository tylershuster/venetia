const { sein, patp2hex, hex2patp, patq2hex, isValidPatq } = require('urbit-ob');
const checkWord = require('check-word');
const _cliProgress = require('cli-progress');
const fs = require('fs');
const inquirer = require('inquirer');

const words = checkWord('en'); // Sorry everyone else
const progress = new _cliProgress.Bar({
    format: 'progress [{bar}] {percentage}% | ETA: {eta}s | {value}/{total} | Found: {found}'
}, _cliProgress.Presets.shades_classic);

function generatePlanetNames({ parent, output }) {
  const hex = patq2hex(parent);
  let planets = [];

  for (let i = 1; i <= 0xFFFF; i++) {
    const s = i.toString(16).padStart(4, '0') + hex;
    const p = hex2patp(s);
    planets.push(p);
  }

  planets.sort();

  progress.start(planets.length, 0);

  let found = 0;

  const outputs = {
    all: planets => planets,
    words: planets => planets.filter((planet, index) => {
      const passes = planet
          .replace('~', '')
          .split('-')
          .filter(part => words.check(part)).length;
      if(passes) found++;
      progress.update(index, { found });
      return passes;
    }),
    lexical: planets => planets.filter((planet, index) => {
      const passes = planet
          .replace('~', '')
          .split('-')
          .filter(part => words.check(part)).length === 2;
      if(passes) found++;
      progress.update(index, { found });
      return passes;
    }),
    double: planets => planets.filter((planet, index) => {
      const parts = planet
          .replace('~', '')
          .split('-');
      if ( parts[0] == parts[1] ) {
	      found++;
	      progress.update(index, { found });
	      return planet;
      }
      return false;
    }),
    default: planets => planets
  };

  const filteredPlanets = outputs[output] ? outputs[output](planets) : outputs.default(planets);

  fs.writeFile(__dirname + "/planets.txt", filteredPlanets.join('\n'), function(err) {
    if(err) {
        return console.log(err);
    }
    console.log("The file was saved!");
  });

  progress.stop();

}

inquirer
  .prompt([
    {
      type: 'string',
      message: 'Which star would you like to check?',
      name: 'parent',
      validate: function (input) {
        return (isValidPatq(input) && input.length === 7) ? true : 'Invalid star name';
      }
    },
    {
      type: 'list',
      name: 'output',
      message: 'What kind of list would you like to output?',
      default: 'all',
      choices: [
        {value: 'all', name: 'All possible planets'},
        {value: 'words', name: 'Planets with English words in their names'},
        {value: 'lexical', name: 'Planets only containing English words'},
        {value: 'double', name: 'Planets only containing doubles like ~dopzod-dopzod'}
      ]
    }
  ])
  .then(generatePlanetNames);


