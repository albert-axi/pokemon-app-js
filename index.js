let pokeArray
const pokeDetails = {}
const modal = document.querySelector('#poke-modal')

const fetchPokemon = () => {
  return fetch('https://pokeapi.co/api/v2/pokemon?limit=5')
    .then(res => res.json())
    .then(data => data)
    .catch(error => error)
}

const mapPokeDetails = () => {
  fetchPokemon()
    .then(data => {
      pokeArray = data.results

      pokeArray.forEach(pokemon => {
        if (!pokeDetails[pokemon.name]) {
          fetchPokeDetails(pokemon)
        }
      });
    })
}

const fetchPokeDetails = pokemon => {
  return fetch(pokemon.url)
    .then(res => res.json())
    .then(data => {
      pokeDetails[pokemon.name] = data
      const card = generatePokemonCard(pokeDetails[pokemon.name])
      document.querySelector('section.poke-list').append(card)
    })
}

const generatePokemonCard = pokemon => {
  const card = document.createElement('div')
  card.className = "poke-card"
  card.dataset['name'] = pokemon.name
  card.dataset['species'] = JSON.stringify(pokemon.species)

  card.innerHTML = `
    <img class="poke-card_img" data-name="${pokemon.name}" src="${pokemon.sprites.other.dream_world.front_default}" alt="${pokemon.name}" />
    <h3 data-name="${pokemon.name}" class="poke-card_h3" >${pokemon.name}</h3>
  `
  return card
}

document.querySelector('section.poke-list').addEventListener('click',event => {
  const element = event.target
  console.log(element.className)
  
  if (element.className.match('poke-card')) {
    modal.classList.toggle('hidden')
    document.querySelector('#poke-name').innerText = pokeDetails[element.dataset['name']].name

    document.querySelector('#poke-img').src = pokeDetails[element.dataset['name']].sprites.other.dream_world.front_default 

    const types = pokeDetails[element.dataset['name']].types.reduce((array, item) => {
      array.push(item.type.name) // ['grass' , 'poison']
      return array
    }, []) 

    document.querySelector('#poke-types').innerText = types.join(', ') // 'grass, poison'

  }

})


modal.addEventListener('click', event => {
  modal.classList.toggle('hidden')
})

mapPokeDetails()






