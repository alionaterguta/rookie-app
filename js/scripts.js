// height = inches

let pokemonRepository = (function (){

let pokemonList = []; 
let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=40';

    function add(pokemon) {
        if (typeof pokemon === 'object' &&
         'name' in pokemon &&
         'detailsUrl' in pokemon
         ) {
            pokemonList.push(pokemon);
        } else{
            console.log('Pokemon is not correct')
        }
    }

    function getAll() {
        return pokemonList;
    } 
    
    function filterByName(name){
        return pokemonList.filter(function(pokemon){
          return pokemon.name === name;
        });                           
      }
    
        // add <li> to <ul> and <button> with innerText 
    function addListItem(pokemon) {
        let pokemonList = document.querySelector('.pokemon-list');
        let li = document.createElement('li');
        pokemonList.appendChild(li);
        li.classList.add('pokemon-name-list');

        let button = document.createElement('button');
        button.innerText = pokemon.name;
        li.appendChild(button);
        
        button.classList.add('pokemon-name-button');

        addEventListenerToButton(button, pokemon);
    }

    function addEventListenerToButton(button, pokemon) {
        button.addEventListener('click', function (event) {
            showDetails(pokemon);
        });
    }

    function loadList() {
        return fetch(apiUrl).then(function (response) {
            return response.json();
        }).then(function (json) {
            json.results.forEach(function (item) {
                let pokemon = {
                    name: item.name, 
                    detailsUrl: item.url // in json list each item returns a key. name, url
                };
                add(pokemon);
                console.log(pokemon);
            });
        }).catch(function (e) {
            console.error(e);
        })
    }
    function loadDetails(item) {
        let url = item.detailsUrl;
        return fetch(url).then(function (response) {
            return response.json();
        }).then(function (details) {
            // details to the item is added
            item.imgUrl = details.sprites.front_default;
            item.height = details.height;
            item.types = details.types; // add a for loop to iterate trough each type!!!
        }).catch(function (e) {
            console.error(e);
        });
    }

    function showDetails(item) {
        pokemonRepository.loadDetails(item).then(function(){
            console.log(item);
        }); 
    }

return{
    add:add,
    getAll: getAll,
    addListItem: addListItem,
    filterByName:filterByName,
    loadList: loadList,
    loadDetails: loadDetails
};
})();

// print the list of names from pokemonList (from apiUrl) and show details when button clicked 
pokemonRepository.loadList().then(function () {

    pokemonRepository.getAll().forEach(function (pokemon) {

        pokemonRepository.addListItem(pokemon);

    });
});

// let filterByNameResult = pokemonRepository.filterByName('Ivysaur', 'Pikachu');
// console.log(filterByNameResult[0]);





