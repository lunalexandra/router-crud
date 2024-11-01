import { useEffect, useState } from "react";
import { declension } from "./declension";

interface DateProps {
  date: number;
}

export const FormattedDate: React.FC<DateProps>  = ({ date }) => {
  console.log(date);
  const [timeText, setTimeText] = useState("");

  const updateTimeText = () => {
    const time = new Date(date);
    const currentTime = new Date();
    const timeAgo = (currentTime.getTime() - time.getTime()) / 60000; // в минутах

    let newTimeText;
    if (timeAgo < 60) {
      newTimeText = `${Math.floor(timeAgo)} ${declension(
        Math.floor(timeAgo),
        "минута",
        "минуты",
        "минут"
      )} назад`;
    } else if (timeAgo < 1440) {
      newTimeText = `${Math.floor(timeAgo / 60)} ${declension(
        Math.floor(timeAgo / 60),
        "час",
        "часа",
        "часов"
      )} назад`;
    } else {
      newTimeText = `${Math.floor(timeAgo / 1440)} ${declension(
        Math.floor(timeAgo / 1440),
        "день",
        "дня",
        "дней"
      )} назад`;
    }

    setTimeText(newTimeText);
  };

  useEffect(() => {
    updateTimeText(); // Инициализация текста при первом рендере
    const intervalId = setInterval(updateTimeText, 60000); // Обновление каждую минуту

    return () => clearInterval(intervalId); // Очистка при размонтировании
  }, [date]);

  return <span className="time">{timeText}...</span>;
};
