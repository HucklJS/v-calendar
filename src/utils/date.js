const DAYS_IN_WEEK = 7

function getDayOfWeek(day) {
  return day === 0 ? 7 : day;
}

export function getDayOfFirstDayOfMonth(year, month) {
  const date = new Date(year, month, 1);
  return getDayOfWeek(date.getDay())
}

export function getDayOfLastDayOfMonth(year, month) {
  const date = new Date(year, month + 1, 0);
  return getDayOfWeek(date.getDay())
}

export function getLastDayOfMonth(year, month) {
  const date = new Date(year, month + 1, 0);
  return date.getDate();
}

export function getPrevDaysOfFirstWeek(day) {
  return new Array(day - 1).fill('')
}

export function getNextDaysOfLastWeek(day) {
  return new Array(DAYS_IN_WEEK - day).fill('')
}

export function divideDaysIntoWeeks(days) {
  let i = 0
  const weeks = []
  while (i < days.length) {
    weeks.push(days.slice(i, i + DAYS_IN_WEEK))
    i += DAYS_IN_WEEK
  }
  return weeks
}