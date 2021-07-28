<template>
  <div class="calendar">
    <h2 class="calendar-info">
      {{this.currentConfig.months[this.currentDate.getMonth() + 1]
      + ' '
      + this.currentDate.getFullYear()}}
    </h2>
    <table class="calendar-table">
      <thead>
        <tr>
          <th v-for="dayName in currentConfig.weekDays" :key="dayName">
            {{dayName}}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="week in weeks" :key="JSON.stringify(week)">
          <td v-for="(day, i) in week" :key="i" class="td"
              :class="{
                active: day === currentDate.getDate(),
                empty: day === ''
              }"
          >
            {{day}}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  import {
    divideDaysIntoWeeks,
    getDayOfFirstDayOfMonth,
    getDayOfLastDayOfMonth,
    getLastDayOfMonth, getNextDaysOfLastWeek,
    getPrevDaysOfFirstWeek
  } from "../utils/date"
  import {range} from "../utils/range"
  import Ru from "../locale-configs/ru"

  export default {
    name: 'App',
    props: {
      date: {
        type: String,
        //2012-01-26
        default: new Date().getFullYear()
          + '-' + (new Date().getMonth() + 1)
          + '-' + new Date().getDate()
      }
    },
    computed: {
      currentDate() {
        return new Date(Date.parse(this.date))
      },
      currentConfig() {
        return Ru
      },
      currentDay() {
        const date = this.currentDate
        return date.getDate()
      },
      weeks() {
        const date = this.currentDate

        const firstDay = 1
        const dayOfFirstDay = getDayOfFirstDayOfMonth(
          date.getFullYear(),
          date.getMonth()
        )
        const lastDay = getLastDayOfMonth(
          date.getFullYear(),
          date.getMonth()
        )
        const dayOfLastDay = getDayOfLastDayOfMonth(
          date.getFullYear(),
          date.getMonth()
        )

        // Add empty strings at the start of first week
        const days = [
          ...getPrevDaysOfFirstWeek(dayOfFirstDay),
          ...range(firstDay, lastDay + 1),
          ...getNextDaysOfLastWeek(dayOfLastDay)
        ]

        return divideDaysIntoWeeks(days)
      },
    }
  }
</script>

<style>
.calendar {
  max-width: 250px;
  border: 1px solid black;
}
.calendar-info {
  text-align: center;
}
.calendar-table {
  width: 100%;
}
.td {
  text-align: center;
}
.td:hover {
  background-color: gray;
  cursor: pointer;
}
.td.active {
  background-color: green;
  color: white;
}
.td.empty:hover {
  background-color: initial;
  cursor: initial;
}
</style>