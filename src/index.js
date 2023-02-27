import './style.css';
let usersData;
let curentState;
let numOfPage = document.getElementById('counter');
let nameOfCharacters = document.getElementById('nameOfCharacters');

//BUTTON_FETCH++++++++++++++++++++++++++++++++++++++++++

async function serchHerroHendler() {
  let nameOff = nameOfCharacters.value;
  console.log(nameOfCharacters);
  let checked = document.querySelector('input[name="status"]:checked');
  let statusOff;
  if (checked) {
    statusOff = checked.value;
    curentState = `https://rickandmortyapi.com/api/character?page=1&name=${nameOff}&status=${statusOff}`;
  } else if (!checked) {
    curentState = `https://rickandmortyapi.com/api/character?page=1&name=${nameOff}`;
  }
  displayList();
  currentPage();
}
serchHerroHendler();

//CurentPage===================================
function currentPage() {
  console.log(curentState);
  const urlParams = new URL(curentState);
  console.log(urlParams);
  const currentPage = urlParams.searchParams.get('page');
  numOfPage.innerHTML = currentPage;
  console.log(currentPage);
}
currentPage();

//Fetch!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
async function getCharacters() {
  console.log(curentState);
  const responce = await fetch(curentState);
  const data = await responce.json();
  usersData = data;
  curentState = data.info;
  console.log(curentState);
  console.log(usersData);
  return data;
}

// Show on display!!!!!!!!!!++++++++++++++++
async function displayList() {
  usersData = await getCharacters();
  console.log(usersData);
  const todoList = document.getElementById('persons-list-wrapper');
  todoList.innerHTML = `<h1>The Rick and Morty API</h1>`;

  usersData.results.forEach((item) => {
    todoList.innerHTML += `<div data-fullname='${item.name}' data-image='${item.image}' class="div"> ${item.id} ${item.name} ${item.status} <button btn-name="delete">delete</button> </div>`;
    let elem = document.querySelectorAll('.div');
    console.log(item.name);
    console.log(item.image);

    let selected = document.getElementById('selected');
    elem.forEach((item) => {
      item.addEventListener('click', () => {
        selected.innerHTML = `${item.dataset.fullname}`;
      });
    });
    let pressedOnCherw = document.getElementById('main-right');
    let selectedImg = document.getElementById('info-block__selected');
    let img = document.getElementById('img-conteiner');
    const actionList = {
      delete: (element) => {
        element.remove();
      },
    };
    let currentSelection = undefined;
    elem.forEach((item) => {
      item.addEventListener('click', (event) => {
        const carRec = event.target;
        const action = event.target.getAttribute('btn-name');

        if (action in actionList) {
          actionList[action](carRec.parentElement);
        }
        if (currentSelection) {
          currentSelection.classList.remove('selected1');
        }
        if (event.target.classList.contains('div')) {
          currentSelection = event.target;
          event.target.classList.add('selected1');
        }
        pressedOnCherw.classList.add('pressed');
        selectedImg.innerHTML = `${item.dataset.fullname}`;
        img.innerHTML = `<img src=${item.dataset.image} alt=${item.dataset.name}>`;

        event.stopPropagation();
      });
    });
  });
}
displayList();

// Buttuns next and prev!!!!!!!!!!!!!!!!!!!!!!!!!!!
document.getElementById('next').onclick = () => {
  if (curentState.next !== null) {
    curentState = curentState.next;
    console.log(curentState);

    currentPage();
    getCharacters();
    displayList();
  }
};
document.getElementById('prev').onclick = () => {
  if (curentState.prev !== null) {
    curentState = curentState.prev;
    console.log(curentState);

    currentPage();
    getCharacters();
    displayList();
  }
};

// delete and close

function returnAll() {
  window.location.reload();
}
let pressedOnCherw = document.getElementById('main-right');
const outSpice = document.getElementsByTagName('body');
outSpice[0].addEventListener('click', () => {
  closeDialoge();
});
function closeDialoge(event) {
  pressedOnCherw.classList.remove('pressed');
  event.stopPropagation();
}

function closePicture(event) {
  pressedOnCherw.classList.remove('pressed');
  event.stopPropagation();
}
