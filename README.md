# Venetia

Venetia is a simple command-line utility for generating a list of planet names issuable from an Urbit star.

## Installation

Clone this repository and run `npm install` in the directory.

## Running

In the directory run `node index.js` and follow the prompts.

You will be asked two questions:

1. The name of the star you would like to check. Enter the full name, e.g. `~marpem`
2. The output format. You may output 1) all planets, 2) planets with an English word in their name, or 3) planets with only English words in their name. Options 2) and 3) may take a significant amount of time to process.

The list of planets will be saved in the directory as `planets.txt`, a comma-separated list of names.
