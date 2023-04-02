export const getTrucks = async () => {
  const response = await fetch("https://intense-thicket-16951.herokuapp.com/api/v1/food_trucks");
  const data = await response.json();
  return data;
};