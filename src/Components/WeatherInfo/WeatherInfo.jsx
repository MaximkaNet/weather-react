const WeatherInfo = ({ placeName, temperature, status, statusImg, additionalInfo }) => {
  return (<>
    <div className="weather_info">
      <div className="weather_container">
        <div className="weather_main_info">
          <h1 className="place_name">{placeName}</h1>
          <span className="temperature">{temperature}°</span>
          <span className="status">{status}</span>
        </div>
        <img src={statusImg} alt="status img" className="status_img" />
      </div>
      {
        additionalInfo != null && <div className="weather_additional_info">
          {
            Object.keys(additionalInfo).map((key) => <div key={key} className="weather_additional_info_item">
              <span className="additional_info_item_key">
                {key[0].toUpperCase() + key.slice(1)}:
              </span>
              <span className="additional_info_item_value">
                {additionalInfo[key]}
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