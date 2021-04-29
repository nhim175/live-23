const haversine = require("haversine");
const users = require("../data/users.json");

exports.getUsers = ({ lat, lng, distanceInKm = 1 }) => {
  if (lat === undefined || lng === undefined) {
    return users;
  }

  const source = { latitude: lat, longitude: lng };

  return users.filter((user) => {
    const target = { latitude: user.lat, longitude: user.lng };
    const d = haversine(source, target);
    return d < distanceInKm;
  });
};
