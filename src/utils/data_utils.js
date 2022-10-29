export const useDateCoverter = (date, locale) => {
  return `${date.toLocaleDateString(locale, { weekday: 'short' })} ${date.getDate()}. ${date.toLocaleDateString(locale, { month: 'short' })}`
}

export const useTemperatureSign = (value) => {
  return value === 0 ? value
    : value > 0 ?
      `+${value}`
      : value
}

export const useDayName = (date) => {
  const currentDate = (new Date()).setHours(0, 0, 0, 0);
  const cmpDate = date.setHours(0, 0, 0, 0);
  const msInDay = 86400000;

  if (cmpDate < currentDate && Math.abs(currentDate - cmpDate) === msInDay) return 'Yesterday';
  else if (cmpDate === currentDate) return 'Today';
  else if (cmpDate > currentDate && Math.abs(currentDate - cmpDate) === msInDay) return 'Tomorrow';
}

export const floorValue = (value) => {
  return Math.floor(value);
}

export const getHourlyBy = (hourly, date) => {
  date.setHours(0, 0, 0, 0);
  let result = [];

  hourly.forEach(item => {
    if (item.time.getDate() == date.getDate()
      && item.time.getMonth() == date.getMonth()
      && item.time.getFullYear() == date.getFullYear())
      result.push(item);
  })

  return result;
}
export const getDailyBy = (daily, date) => {
  date.setHours(0, 0, 0, 0);
  let result;
  daily.forEach(item => {
    if (item.time.getDate() == date.getDate()
      && item.time.getMonth() == date.getMonth()
      && item.time.getFullYear() == date.getFullYear())
      result = item;
  })

  return result;
}