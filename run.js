const inquirer = require('inquirer');
const _cliProgress = require('cli-progress');
const progress = new _cliProgress.Bar({
  format: 'progress [{bar}] {percentage}% | ETA: {eta}s | {value}/{total} | Found: {found} | Checking: {checking}'
}, _cliProgress.Presets.shades_classic);

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
        {value: 'homophone', name: 'Planets containing only portions that sound like English words'}
      ]
    }
  ])
  .then(generatePlanetNames);
