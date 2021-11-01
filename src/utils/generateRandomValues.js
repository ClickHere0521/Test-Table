export const generateRandomDouble = (min, max) => {
  if (min > max) {
    throw new Error('Minimum value should be smaller than maximum value.');
  } else {
    return (min + (max - min) * Math.random()).toFixed(2);
  }
}

export const generateRandomString = (length) => {
  let result = '';
  let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let charactersLength = characters.length;
  for ( let i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;        
}

export const generateRandomInt = (min, max) => {
  if (min > max) {
    throw new Error('Minimum value should be smaller than maximum value.');
  } else {
    return min + Math.floor((max - min) * Math.random());
  }
}

export const generateRandomMonth = () => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return months[Math.floor(Math.random() * 12)];
}

export const generateRandomDay = () => {
  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  return days[Math.floor(Math.random() * 7)];
}