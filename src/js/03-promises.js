import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  form: document.querySelector('.form'),
  inputDelay: document.querySelector('[name="delay"]'),
  inputStep: document.querySelector('[name="step"]'),
  inputAmount: document.querySelector('[name="amount"]'),
};

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

const makePromises = () => {
  let amountNum = Number(refs.inputAmount.value);
  let delayNum = Number(refs.inputDelay.value);
  let stepNum = Number(refs.inputStep.value);

  for (let i = 1; i <= amountNum; i++) {
    createPromise(i, delayNum)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    delayNum += stepNum;
  }
};

const onFormsabmit = evt => {
  evt.preventDefault();
  makePromises();
};

refs.form.addEventListener('submit', onFormsabmit);
