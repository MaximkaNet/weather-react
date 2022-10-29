export const handleHourly = () => {
  const items = document.querySelectorAll('.hourly_item_inactive');
  let totalHeight = 0;
  items.forEach(e => {
    totalHeight += e.clientHeight;
    totalHeight += parseInt(window.getComputedStyle(e).marginBottom);
  })
  document.querySelector('.weather_hourly').scrollTo(0, totalHeight);
}