exports.getFirstDateOfWeek = (currentDate) => {
  const currentDay = currentDate.getDay();
  let numberOfDay = 0;

  if (currentDay > 2) {
    numberOfDay = 3 - currentDay;
  } else {
    numberOfDay = currentDay + 2 - 6;
  }

  let dateNextWeek = new Date(currentDate);
  dateNextWeek.setDate(dateNextWeek.getDate() + numberOfDay);
  return dateNextWeek;
};

exports.getEndDateOfWeek = (currentDate) => {
  const currentDay = currentDate.getDay();
  let numberOfDay = 0;

  if (currentDay <= 2) {
    numberOfDay = 2 - currentDay;
  } else {
    numberOfDay = 6 - currentDay + 3;
  }

  let dateNextWeek = new Date(currentDate);
  dateNextWeek.setDate(dateNextWeek.getDate() + numberOfDay);
  return dateNextWeek;
};

exports.getSessionNextWeek = (
  setCurrentWeek,
  getEndDateOfWeek,
  currentWeek
) => {
  let beginDayOfNextWeekCount = new Date(currentWeek.endDate);
  beginDayOfNextWeekCount.setDate(beginDayOfNextWeekCount.getDate() + 1);
  const specificWeek = {
    ...currentWeek,
    beginDate: beginDayOfNextWeekCount,
    endDate: getEndDateOfWeek(beginDayOfNextWeekCount),
  };
  setCurrentWeek(specificWeek);
};

exports.getSessionPreviousWeek = (setCurrentWeek, currentWeek) => {
  let endDayOfCurrentWeek = new Date(currentWeek.beginDate);
  endDayOfCurrentWeek.setDate(currentWeek.beginDate.getDate() - 1);

  let firstDayOfCurrentWeek = new Date(endDayOfCurrentWeek);
  firstDayOfCurrentWeek.setDate(endDayOfCurrentWeek.getDate() - 6);
  const specificWeek = {
    ...currentWeek,
    beginDate: firstDayOfCurrentWeek,
    endDate: endDayOfCurrentWeek,
  };
  setCurrentWeek(specificWeek);
};

exports.formatDate = (date) => {
  const month =
    date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;

  const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
  return `${day}-${month}-${date.getFullYear()}`;
};
