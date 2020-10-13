module.exports = async (planets, callback) => {
  for (let planet of planets) {
    await callback(planet);
  }
  return planets;
};