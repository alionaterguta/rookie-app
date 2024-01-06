// height = inches

let pokemonRepository = (function (){

let pokemonList = []; 
let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=40';

let modalContainer = document.querySelector('#modal-container');

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

        addEventListenerToButton(button, pokemon); //does need change ??
    }

    function addEventListenerToButton(button, pokemon) {
        button.addEventListener('click', function (e) {
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
        
    //add a modal when an event occurs
    function showDetails(item) {
        pokemonRepository.loadDetails(item).then(function () {
            
            // Clear all existing modal content
            modalContainer.innerHTML = '';

            let modal = document.createElement('div')
            modal.classList.add('modal');

            let closeButtonElement = document.createElement('button');
            closeButtonElement.classList.add('modal-close');
            closeButtonElement.innerText = 'Close';
            closeButtonElement.addEventListener('click', hideModal); 

            // Adding an event listener to the window for keydown events
            window.addEventListener('keydown', (e) => {
            // Checking if the pressed key is the 'Escape' key
            // and if the modal container has the 'is-visible' class   
                if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
            // If both conditions are met, call the hideModal function
            hideModal();
                }
            });

            modalContainer.addEventListener('click', (e) => {
            // Since this is also triggered when clicking INSIDE the modal
            // We only want to close if the user clicks directly on the overlay
            let target = e.target;
                if (target === modalContainer) {
                  hideModal();
                }
            });

            let imgElement = document.createElement('img');
            imgElement.src = item.imgUrl;     // Set the source (src) attribute // 'path/to/your/image.jpg'; 
            imgElement.alt = item.name;

            let titleElement = document.createElement('h1');
            titleElement.innerText = item.name; 
            
            let contentElement = document.createElement('p');
            contentElement.innerText = 'Height: ' + item.height + "'"; 

                        
            modal.appendChild(closeButtonElement);
            modal.appendChild(imgElement);
            modal.appendChild(titleElement);
            modal.appendChild(contentElement); 

            let containerTypes = document.createElement('div');
            containerTypes.classList.add('type-container')
            modal.appendChild(containerTypes);

            item.types.forEach((element) => {

                let typeElement = document.createElement('button');
                typeElement.classList.add('type-content');
                typeElement.innerText=element.type.name;
                containerTypes.appendChild(typeElement);
            });
            modalContainer.appendChild(modal);

            modalContainer.classList.add('is-visible');
        });
    }

    function hideModal() {
        modalContainer.classList.remove('is-visible'); 
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





