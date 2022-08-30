import { addTxt, loadTheData } from './modules/addDataModule.js';
import './style.css';

const saveBtn = document.getElementById('saveBtn');
const resetBtn = document.getElementById('resetBtn');
const arrayLst = localStorage.getItem('todo') ? JSON.parse(localStorage.getItem('todo')) : [];

let iD = 1;
saveBtn.addEventListener('click', (e) => {
  e.preventDefault();
  if (addTxt.value !== '') {
    const tskObj = {
      description: `${addTxt.value}`,
      completed: false,
      index: iD,
    };
    arrayLst.push(tskObj);

    const localTasks = localStorage.getItem('todo') ? JSON.parse(localStorage.getItem('todo')) : [];
    localTasks.push(tskObj);

    for (let j = 0; j < localTasks.length; j += 1) {
      localTasks[j].index = j + 1;
    }
    localStorage.setItem('todo', JSON.stringify(localTasks));
  }
  iD += 1;
  loadTheData();
});

resetBtn.addEventListener('click', (e) => {
  e.preventDefault();
  const mutedItem = arrayLst.filter((m) => m.completed === false);

  for (let x = 0; x < mutedItem.length; x += 1) {
    mutedItem[x].index = x + 1;
  }
  localStorage.setItem('todo', JSON.stringify(mutedItem));
  loadTheData();
});