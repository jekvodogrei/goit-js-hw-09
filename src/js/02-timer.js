import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  startBtn: document.querySelector('[data-start]'),
  spanDays: document.querySelector('[data-days]'),
  spanHours: document.querySelector('[data-hours]'),
  spanMinutes: document.querySelector('[data-minutes]'),
  spanSeconds: document.querySelector('[data-seconds]'),
};

let selectedDate = null;
let intervalId = null;

refs.startBtn.setAttribute('disabled', true);

flatpickr('#datetime-picker', {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    selectedDate = selectedDates[0];

    if (selectedDate.getTime() < new Date().getTime()) {
      Notify.failure('Please choose a date in the future');
      refs.startBtn.setAttribute('disabled', true);
      return;
    }
    refs.startBtn.removeAttribute('disabled');
  },
});

refs.startBtn.addEventListener('click', onStartBtnClick);

function onStartBtnClick() {
  intervalId = setInterval(() => {
    if (selectedDate <= Date.now()) {
      clearInterval(intervalId);
      return;
    }
    const { days, hours, minutes, seconds } = convertMs(selectedDate - new Date().getTime());
    refs.spanDays.innerHTML = addLeadingZero(days);
    refs.spanHours.innerHTML = addLeadingZero(hours);
    refs.spanMinutes.innerHTML = addLeadingZero(minutes);
    refs.spanSeconds.innerHTML = addLeadingZero(seconds);
  }, 1000);
  refs.startBtn.setAttribute('disabled', true);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, 0);
}
