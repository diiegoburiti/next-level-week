//const states = document.querySelector('select[name=uf]');
const urlStates = 'https://servicodados.ibge.gov.br/api/v1/localidades/estados/'
const ufSelect = document.querySelector('select[name=uf]');

ufSelect.addEventListener('change', getCities);

async function populateUfs() {

  let dataResponse = await fetch(urlStates)
  let states = await dataResponse.json()
  for (state of states) {
    ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`;
  }
}

populateUfs();

async function getCities(event) {
  const citySelect = document.querySelector('select[name=city]');
  const stateInput = document.querySelector('[name=state]');

  const indexOfSelectedState = event.target.selectedIndex;
  stateInput.value = event.target.options[indexOfSelectedState].text
  const ufValue = event.target.value;
  const urlCities = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/distritos`;

  let dataResponse = await fetch(urlCities);
  let cities = await dataResponse.json();
  for (city of cities) {
    citySelect.innerHTML += `<option value="${city.id}">${city.nome}</option>`;
  };
  citySelect.disabled = false;
}
