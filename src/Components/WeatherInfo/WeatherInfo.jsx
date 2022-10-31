const WeatherInfo = ({ info }) => {
  return (<>
    <div className="weather_info">
      <div className="weather_container">
        <div className="weather_main_info">
          <h1 className="place_name">{info.place}</h1>
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
                {key[0].toUpperCase() + key.slice(1)}:
              </span>
              <span className="additional_info_item_value">
                {info.additionalInfo[key]}
              </span>
            </div>
            )
          }
        </div>
      }
    </div>
  </>)
}
export default WeatherInfo;