module.exports = async (planets, callback) => {
  console.log('planets', planets);
  for (let planet of planets) {
    console.log(planet);
    await callback(planet);
  }
  return planets;
};