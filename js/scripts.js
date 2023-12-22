// height = inches

let pokemonRepository = (function (){

let pokemonList = [
    { name: 'Ivysaur', height: 3.03, type:['Grass','Poison']},
    { name: 'Charmeleon', height: 3.07, type:['Fire']},
    { name:'Blastoise', height: 5.03, type:['Water']} ,
    { name:'Metapod', height: 2.04, type:['Bug']},
    { name:'Pikachu', height: 1.04, type:['Electric']}
]; 
    function add(pokemon) {
        if (typeof pokemon === 'object') {
            pokemonList.push(pokemon);
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
        button.addEventListener('click', function () {
            showDetails(pokemon);
        })
        function showDetails(pokemon) {
            console.log(pokemon);

        }
    }

return{
    add:add,
    getAll: getAll,
    addListItem: addListItem,
    filterByName:filterByName
};
})();

// add a new object(pokemon) to the pokemonList
pokemonRepository.add({
    name: 'Kakuna', height: 2.00, type: ['Bug', 'Poison']
});
// print the list of names from pokemonList and coresponding height of that name 
pokemonRepository.getAll().forEach(function (pokemon) {

    pokemonRepository.addListItem(pokemon);

});
let filterByNameResult = pokemonRepository.filterByName('Ivysaur');
console.log(filterByNameResult[0]);





