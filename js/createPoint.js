//const states = document.querySelector('select[name=uf]');
const urlStates = 'https://servicodados.ibge.gov.br/api/v1/localidades/estados/'
const ufSelect = document.querySelector('select[name=uf]');

ufSelect.addEventListener('change', getCities);

async function populateUfs() {

  const dataResponse = await fetch(urlStates)
  const states = await dataResponse.json()
  for (state of states) {
    ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`;
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
