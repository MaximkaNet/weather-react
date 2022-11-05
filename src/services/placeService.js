import tzloopup from 'tz-lookup';
import { formattingSearchValue } from '../utils/data_utils';

export const getPlaces = async (placeName) => {
  const host = "https://nominatim.openstreetmap.org/search?";

  let formattedPlaceName = formattingSearchValue(placeName);

  const query = `${host}q=${formattedPlaceName}&format=json&addressdetails=1&limit=50`;
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