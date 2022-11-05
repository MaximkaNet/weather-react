import tzloopup from 'tz-lookup';
import { formatSearchValue } from '../utils/data_utils';

const HOST_SEARCH = "https://nominatim.openstreetmap.org/search?";
const HOST_DETAILS = "https://nominatim.openstreetmap.org/details?";

export const getPlaces = async (placeName) => {

  let formattedPlaceName = formatSearchValue(placeName);

  const query = `${HOST_SEARCH}q=${formattedPlaceName}&format=json&addressdetails=1&limit=50`;
  const response = await fetch(query).then(res => res.json());
  let res = [];
  response.forEach(e => {
    const timezone = tzloopup(e.lat, e.lon);

    //conditions
    const addressCon = e.address.town || e.address.city || e.address.village || e.address.hamlet;
    const typeCon = e.type === "town" || e.type === "village" || e.type === "city" || e.type === "administrative" || e.type === "hamlet";

    // console.log(addressCon);
    // console.log(typeCon);
    if (addressCon && typeCon)
      res.push({
        place_id: e.place_id,
        name: addressCon,
        country: e.address.country,
        state: e.address.state,
        district: e.address.district,
        lat: e.lat,
        lon: e.lon,
        timezone: timezone
      });
  })
  return res ? res : {
    error: true,
    reason: 'Not found'
  };
}

export const getPlaceById = async (place_id) => {
  const query = `${HOST_DETAILS}place_id=${place_id}&addressdetails=1&format=json`;
  const response = await fetch(query).then(res => res.json());
  let address = {
    name: null,
    country: null,
    state: null,
    district: null
  };
  response.address.forEach((item) => {
    if (item.type === "town" || item.type === "village" || item.type === "city" || (item.type === "administrative" && item.place_type === null) || item.type === "hamlet")
      address.name = item.localname;
    else if (item.type === "administrative" && item.place_type === "district")
      address.district = item.localname;
    else if (item.type === "administrative" && item.place_type === "state")
      address.state = item.localname;
    else if (item.type === "country")
      address.country = item.localname;
  });

  let coordinates = { lon: response.geometry.coordinates[0], lat: response.geometry.coordinates[1] };
  throw "Get timezone from IP client"
  const timezone = tzloopup(coordinates.lat, coordinates.lon);
  console.log(timezone);
  let res = {
    place_id: place_id,
    name: address.name,
    country: address.country,
    state: address.state,
    district: address.district,
    lon: coordinates.lon,
    lat: coordinates.lat,
    timezone: timezone
  };
  console.log(res);
  return res;
}