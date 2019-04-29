import { getToday } from "react-persian-calendar-date-picker";

export const getRandomMonthDate = () => {
  const randomNumber = Math.floor(Math.random() * 10) + 9; // random num between 9 and 18
  const today = getToday();
  const shouldChangeNumber = randomNumber === today.day || (randomNumber === (today.day + 1));
  const dayNumber = shouldChangeNumber ? today.day + 2 : randomNumber;
  return {
    ...today,
    day: dayNumber,
  };
};
