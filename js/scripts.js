// height = inches

let pokemonRepository = (function (){

let pokemonList = [
    { name: 'Ivysaur', height: 3.03, type:['Grass','Poison']},
    { name: 'Charmeleon', height: 3.07, type:['Fire']},
    { name:'Blastoise', height: 5.03, type:['Water']} ,
    { name:'Metapod', height: 2.04, type:['Bug']},
    { name:'Pikachu', height: 1.04, type:['Electric']}
]; 
function add(pokemon){
    if (typeof pokemon === 'object') {
        pokemonList.push(pokemon);  
    }  
}
function getAll(){
    return pokemonList;
}
return{
    add:add,
    getAll: getAll
}
})();

// add a new object(pokemon) to the pokemonList
pokemonRepository.add({
    name: 'Kakuna', height: 2.00, type: ['Bug', 'Poison']
});
// print the list of names from pokemonList and coresponding height of that name 
pokemonRepository.getAll().forEach(function (pokemon) {
    // print a message if the height is bigger than 5 
    if (pokemon.height > 5) {
        document.write('<p>', pokemon.name + ' - ' + pokemon.height + ' Wow, that\'s big!; </p>');
    } else {
        document.write('<p>', pokemon.name + ' - ' + pokemon.height + '; </p>');
    }
});





