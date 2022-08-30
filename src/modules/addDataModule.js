const addTxt = document.getElementById('entry-to-do');
const theList = document.getElementById('the-list');

function loadTheData() {
  theList.innerHTML = '';
  const listTheArray = localStorage.getItem('todo') ? JSON.parse(localStorage.getItem('todo')) : [];

  for (let i = 0; i < listTheArray.length; i += 1) {
    const div1 = document.createElement('div');
    div1.classList.add('task');

    const tick = document.createElement('input');
    tick.setAttribute('type', 'checkbox');
    tick.id = i + 1;
    tick.classList.add('check');
    if (listTheArray[i].completed) {
      tick.checked = true;
    }

    const descripn = document.createElement('input');
    descripn.value = `${listTheArray[i].description}`;
    descripn.setAttribute('type', 'text');
    if (listTheArray[i].completed) {
      descripn.style.textDecorationLine = 'line-through';
    }

    descripn.setAttribute('readOnly', 'readOnly');
    descripn.classList.add('description');

    const editTip = document.createElement('button');
    editTip.id = i + 1;
    editTip.innerHTML = 'Edit';
    editTip.classList.add('editBn');

    const containerDiv = document.createElement('div');
    containerDiv.id = i + 1;
    containerDiv.classList.add('containerDiv');

    containerDiv.appendChild(tick);
    containerDiv.appendChild(descripn);
    containerDiv.appendChild(editTip);
    theList.appendChild(containerDiv);

    addTxt.value = '';

    tick.addEventListener('input', (event) => {
      if (tick.checked) {
        const checkedId = event.target.id;
        const todo = JSON.parse(localStorage.getItem('todo'));
        todo[checkedId - 1].completed = true;
        descripn.style.textDecorationLine = 'line-through';
        localStorage.setItem('todo', JSON.stringify(todo));
      } else if (!tick.checked) {
        const idNoChecked = event.target.id;
        const todo = JSON.parse(localStorage.getItem('todo'));
        todo[idNoChecked - 1].completed = false;
        descripn.style.textDecorationLine = 'none';
        localStorage.setItem('todo', JSON.stringify(todo));
      }
      window.location.reload();
    });

    editTip.addEventListener('click', (event) => {
      if (editTip.textContent === 'Edit') {
        descripn.removeAttribute('readonly');
        descripn.focus();
        editTip.innerHTML = 'Save';
        editTip.style.color = 'grey';
      } else {
        const edited = descripn.value;
        const idNumber = event.target.id;
        descripn.setAttribute('readonly', 'readonly');
        editTip.innerHTML = 'Edit';
        editTip.style.color = 'black';

        const todo = JSON.parse(localStorage.getItem('todo'));
        todo[idNumber - 1].description = `${edited}`;
        localStorage.setItem('todo', JSON.stringify(todo));
      }
    });
  }
}

window.addEventListener('load', () => {
  loadTheData();
});

export {
  addTxt, loadTheData,
};