import { formatAddress } from "../../utils/data_utils";
import { MapContainer, TileLayer, Marker } from 'react-leaflet'
import { Icon } from 'leaflet';

const WeatherInfo = ({ info }) => {
  return (<>
    <div className="weather_info">
      <div className="weather_container">
        <div className="weather_main_info">
          <div className="weather_main_info_title">
            <h1 className="place_name">{info.place.name}</h1>
            <span className="place_additional">{formatAddress(info.place.country, info.place.state, info.place.district)}</span>
          </div>
          <span className="temperature">{info.temperature}°</span>
          <span className="status">{info.status}</span>
        </div>
        <img src={info.statusImg} alt="status img" className="status_img" />
      </div>
      {
        info.additionalInfo != null && <div className="weather_additional_info">
          {
            Object.keys(info.additionalInfo).map((key) => <div key={key} className="weather_additional_info_item">
              <span className="additional_info_item_key">
                {key[0].toUpperCase() + key.replace(/-_/, ' ').slice(1)}:
              </span>
              <span className="additional_info_item_value">
                {info.additionalInfo[key]}
              </span>
            </div>
            )
          }
        </div>
      }
      <MapContainer center={[info.place.lat, info.place.lon]} zoom={12} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[info.place.lat, info.place.lon]} />
      </MapContainer>
    </div>
  </>)
}
export default WeatherInfo;