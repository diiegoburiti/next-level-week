const urlStates = 'https://servicodados.ibge.gov.br/api/v1/localidades/estados/';
const ufSelect = document.querySelector('select[name=uf]');

ufSelect.addEventListener('change', getCities);

async function populateUfs() {
  try {
    const dataResponse = await fetch(urlStates)
    const states = await dataResponse.json()
    for (state of states) {
      ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`;
    }
  } catch (error) {
    console.log(error);
  }
}

populateUfs();

async function getCities(event) {
  try {
    const citySelect = document.querySelector('select[name=city]');
    const stateInput = document.querySelector('[name=state]');

    const indexOfSelectedState = event.target.selectedIndex;
    stateInput.value = event.target.options[indexOfSelectedState].text
    const ufValue = event.target.value;
    const urlCities = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/distritos`;

    citySelect.disabled = true;
    citySelect.innerHTML = '<option value="">Selecione a Cidade</option>';

    const dataResponse = await fetch(urlCities);
    const cities = await dataResponse.json();
    cities.forEach(city => {
      citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`;
    });
    citySelect.disabled = false;
  } catch (error) {
    console.log(error);
  }
}

const itemsToColect = document.querySelectorAll('[data-id]');
//for(item of itemsToColect) {
//  item.addEventListener('click', handleSelectedItem);
//}
itemsToColect.forEach(item => item.addEventListener('click', handleSelectedItem))

const collecteditems = document.querySelector('[name=items]')
let selectedItems = [];

function handleSelectedItem(event) {
  const itemId = event.currentTarget.dataset.id;
  const itemLi = event.target;
  itemLi.classList.toggle('selected');

  const alreadySelected = selectedItems.findIndex(item => item === itemId);

  if (alreadySelected >= 0) {
    const filteredItems = selectedItems.filter(item => item != itemId);
    selectedItems = filteredItems;
  } else {
    selectedItems.push(itemId);
  }

  collecteditems.value = selectedItems
}
