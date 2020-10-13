const { hex2patp, patq2hex, isValidPatq } = require('urbit-ob');

module.exports = function (star) {
  const hex = patq2hex(star);
  let planets = [];

  for (let i = 1; i <= 0xFFFF; i++) {
    const s = i.toString(16).padStart(4, '0') + hex;
    const p = hex2patp(s);
    planets.push(p);
  }

  planets.sort();
  return planets;
}