//const states = document.querySelector('select[name=uf]');
const urlStates = 'https://servicodados.ibge.gov.br/api/v1/localidades/estados/'
const ufSelect = document.querySelector('select[name=uf]');

ufSelect.addEventListener('change', getCities);

function populateUfs(params) {
  fetch(urlStates)
    .then((res) => res.json())
    .then(states => {
      for (state of states) {
        ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`;
      }
    });
}
populateUfs();

function getCities(event) {
  const citySelect = document.querySelector('select[name=city]');
  const stateInput = document.querySelector('[name=state]');
  console.log(stateInput, citySelect);
  
  const indexOfSelectedState = event.target.selectedIndex;
  stateInput.value = event.target.options[indexOfSelectedState].text
  const ufValue = event.target.value;
  const urlCities = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/distritos`;

  fetch(urlCities)
    .then((res) => res.json())
    .then(cities => {
      for (city of cities) {
        citySelect.innerHTML += `<option value="${city.id}">${city.nome}</option>`;
      };
      citySelect.disabled = false;
    });
}