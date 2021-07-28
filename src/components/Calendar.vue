<template>
  <div class="calendar">
    <h2 class="calendar-info">
      {{this.currentConfig.months[this.currentDate.getMonth()]
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
      <tbody @click="onDaysClick">
        <tr v-for="week in weeks" :key="JSON.stringify(week)">
          <td v-for="(day, i) in week" :key="i"
              class="td" :data-day="day"
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
    <div class="nav-buttons">
      <button @click="goPrevMonth" class="prev-button nav-button"></button>
      <button @click="goNextMonth" class="next-button nav-button"></button>
    </div>
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
    },
    methods: {
      onDaysClick($e) {
        const td = $e.target.closest('.td')
        if (!td) return

        const day = td.dataset.day
        if (!day) return

        const year = this.currentDate.getFullYear()
        const month = this.currentDate.getMonth()
        this.$emit('set-new-date', year, month, day)
      },
      goPrevMonth() {
        const year = this.currentDate.getFullYear()
        const month = this.currentDate.getMonth()
        const newDate = new Date(year, month - 1, 1)
        this.$emit(
          'set-new-date',
          newDate.getFullYear(),
          newDate.getMonth(),
          1
        )
      },
      goNextMonth() {
        const year = this.currentDate.getFullYear()
        const month = this.currentDate.getMonth()
        const newDate = new Date(year, month + 1, 1)
        this.$emit(
          'set-new-date',
          newDate.getFullYear(),
          newDate.getMonth(),
          1
        )
      },
    },
    mounted() {
      console.log(this.currentDate)
    }
  }
</script>

<style>
.calendar {
  position: relative;
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

.nav-buttons {
  position: absolute;
  top: 29px;
  left: 0;
  right: 0;
}
.nav-button {
  width: 20px;
  height: 20px;
  background-color: transparent;
  border: none;
  outline: none;
  cursor: pointer;
}

.prev-button {
  position: absolute;
  left: 0;
}
.prev-button::after {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  border: 10px solid transparent;
  border-right: 10px solid green;
}


.next-button {
  position: absolute;
  right: 0;
}
.next-button::before {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  border: 10px solid transparent;
  border-left: 10px solid green;
}
</style>