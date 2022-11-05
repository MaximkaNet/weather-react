const PlaceMap = ({ lat, lon }) => {
  return <>
    <iframe
      width="425"
      height="350"
      frameborder="0"
      scrolling="no"
      marginheight="0"
      marginwidth="0"
      src="https://www.openstreetmap.org/export/embed.html?bbox=35.405502319335945%2C49.55862522643672%2C36.171798706054695%2C49.83045336851287&amp;layer=mapnik"
      style="border: 1px solid black"
    />
    <br />
    <small>
      <a href="https://www.openstreetmap.org/#map=11/49.6947/35.7887">View Larger Map</a>
    </small>
  </>
}