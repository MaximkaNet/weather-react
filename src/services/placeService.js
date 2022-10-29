import tzloopup from 'tz-lookup';
export const getPlaces = async (placeName) => {
  const host = "https://nominatim.openstreetmap.org/search?";
  const response = await fetch(`${host}q=${placeName.replace(' ', '+')}&format=json&addressdetails=1`).then(res => res.json());
  let res = [];

  response.forEach(e => {
    const timezone = tzloopup(e.lat, e.lon);

    //conditions
    const addressCon = e.address.town || e.address.city || e.address.village;
    const typeCon = e.type === "town" || e.type === "village" || e.type === "city";

    // console.log(addressCon);
    // console.log(typeCon);
    if (addressCon && typeCon)
      res.push({
        name: e.address.town || e.address.city || e.address.village,
        country: e.address.country,
        state: e.address.state,
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