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
    const typeCon = item.type === "town"
      || item.type === "village"
      || item.type === "city"
      || item.type === "hamlet"
      || item.type === "administrative";
    const placeTypeCon = item.place_type === "town"
      || item.place_type === "village"
      || item.place_type === "city"
      || item.place_type === "hamlet"
      || item.place_type === "administrative"
      || item.place_type === null;

    if (typeCon && placeTypeCon)
      address.name = item.localname;
    else if (item.type === "administrative"
      && item.place_type === "district")
      address.district = item.localname;
    else if (item.type === "administrative"
      && item.place_type === "state")
      address.state = item.localname;
    else if (item.type === "country")
      address.country = item.localname;
  });

  let coordinates = { lon: response.geometry.coordinates[0], lat: response.geometry.coordinates[1] };
  // throw "Get timezone from IP client"

  //local time
  const { timezone } = await getCurrentPlaceInfo();
  //local time in selected place
  const timezone_place = tzloopup(coordinates.lat, coordinates.lon);
  const res = {
    place_id: place_id,
    name: address.name,
    country: address.country,
    state: address.state,
    district: address.district,
    lon: coordinates.lon,
    lat: coordinates.lat,
    timezone: timezone,
    timezone_place: timezone_place
  };
  return res;
}

export const getCurrentPlaceInfo = async () => {

  const { ip } = await fetch('https://api.ipify.org/?format=json').then(res => res.json());

  // IP info is not correct!

  const geoplugin = `https://ipapi.co/${ip}/json/`;

  const response = await fetch(geoplugin).then(res => res.json());

  const place = {
    name: response.city,
    country: null,
    state: null,
    district: null,
    lat: response.latitude, lon: response.longitude,
    timezone: response.timezone
  }
  return place;
}

export const getPlaceInfo = async (placeName, found) => {
  if (placeName === undefined && found == null) {
    return await getCurrentPlaceInfo();
  }

  if (found == null) {
    let searchQuery = placeName.split('-');
    let res;
    if (searchQuery.length === 2) {
      res = await getPlaceById(searchQuery[1]);
      return res ? res : {
        error: true,
        reason: 'Not found'
      };
    }
    res = await getPlaces(searchQuery[0]);
    return res ? res[0] : {
      error: true,
      reason: 'Not found'
    };
  }
  return found;
}
