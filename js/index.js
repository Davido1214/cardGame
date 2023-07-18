const pokedex = document.getElementById("pokedex")
  
const fetchPokemon = () => {
    const pokemonCount = 12
    
    const fetchSinglePokemon = (pokemonId) => {
        const url = `https://pokeapi.co/api/v2/pokemon/${pokemonId}`;
        return fetch(url)
        .then(res=> {
            return res.json();
        })
        .then(data => {
            const rngSprite = () => {
                const sprites = Object.values(data.sprites);
                //pokemon["image"] = sprites;
                // if the image is null randomize again
                const randomIndex = Math.floor(Math.random() * sprites.length);
    
                // rng sprite result
                let setSprite = sprites[randomIndex];
    
                //check if null
                if (setSprite === null) {
                    return rngSprite();
                }
                else if (randomIndex >= 7) {
                    return rngSprite();
                }
                else {
                    return setSprite;
                }
    
    
            };
    
            const generateWeightedRandomNumber = () => {
                const maxNumber = 100;
                const exponent = -0.3; // Adjust this value to control the distribution
              
                // Calculate the weights based on the exponent
                const weights = Array.from({ length: maxNumber }, (_, i) => Math.pow(i + 1, exponent));
              
                // Calculate the sum of weights
                const totalWeight = weights.reduce((sum, weight) => sum + weight, 0);
              
                // Generate a random value within the total weight range
                const randomValue = Math.random() * totalWeight;
              
                let cumulativeWeight = 0;
                for (let number = 1; number <= maxNumber; number++) {
                  cumulativeWeight += weights[number - 1];
                  if (randomValue <= cumulativeWeight) {
                    return number;
                  }
                }
              
                // If the loop completes without returning a number, fallback to the max number
               
                return maxNumber;
                
              };
    
              randomNumber = generateWeightedRandomNumber();
    
            const rngMoves = () => {
                const moves = data.moves.map(moves => moves.move.name)
                const randomMoves = []
                
    
                while(randomMoves.length < 4) {
                    const randomIndex = Math.floor(Math.random()* moves.length)
                    const randomMove = data.moves.map(moves => moves.move.name)[randomIndex]
    
                    if(!randomMoves.includes(randomMove)) {
                        randomMoves.push(randomMove)
                    }
                }
                
                
                return randomMoves;
            }
    
            
            const pokemon = {
                name: data.name,
                id: data.id,
                lbs: data.weight,
                type: data.types.map((type) => type.type.name).join(", "),
                image: rngSprite(),
                hp: data.stats[0].base_stat,
                moves: rngMoves()
                
                
    
            };
    
            const rarity = () => {
                if(randomNumber <= 35){
                    pokemon.rarity = "Common"
                }
                else if(randomNumber <= 50){
                    pokemon.rarity = "Uncommon"
                }
                else if(randomNumber <= 80){
                    pokemon.rarity = "Rare"
                }
                else if(randomNumber <= 95){
                    pokemon.rarity = "Legendary"
                }
                else{
                    pokemon.rarity = "Mythic"
                }
            }

       rngMoves()
       rarity()
    

    const displayPokemon = () => {
        const parentContainer = document.getElementById("pokedex")
        var objectContainer = document.createElement("section")

        //style
        
        objectContainer.classList.add("card")

        for (var key in pokemon) {
            if (key === "image") {
                var img = document.createElement("img");
                
                img.src = pokemon[key];
                img.classList.add("rarity")
                

                objectContainer.appendChild(img)
                
            }
            //objectContainer.classList("border-white", "border-solid", "rounded")
            parentContainer.appendChild(objectContainer);
        }

        for(var key in pokemon){

            if(key === "name"){
                var name = document.createElement("p")
                name.textContent = pokemon[key]
                name.classList.add("name")
                objectContainer.appendChild(name);

            }

            if(key === "id"){
                var id = document.createElement("p");
                id.textContent = key + " : " + pokemon[key];
                id.classList.add("id")
                objectContainer.appendChild(id)
            }

            if(key === "lbs"){
                var lbs = document.createElement("p");
                lbs.textContent= key + " : " + pokemon[key];
                lbs.classList.add("lbs");
                objectContainer.appendChild(lbs)
            }

            if(key === "type"){
                var type = document.createElement("p");
                type.textContent = key + " : " + pokemon[key];
                type.classList.add("type");
                objectContainer.appendChild(type);
            }

            if(key === "hp"){
                var hp = document.createElement("p");
                hp.textContent = key + " : " + pokemon[key];
                hp.classList.add("hp");
                objectContainer.appendChild(hp);
            }

            if(key === "moves"){
                var moves = document.createElement("ul");
                moves.textContent = "moves: "
                moves.classList.add("moves");
                pokemon[key].forEach((move) => {
                    var moveItem = document.createElement("li");
                    moveItem.textContent = move;
                    moves.appendChild(moveItem)
                });

                
                objectContainer.appendChild(moves);                
            }
            


            if(key === "rarity") {

                
                var p = document.createElement("p");
                
                switch(pokemon[key]) {
                    case "Common":
                        p.textContent = "Common"
                        p.classList.add("text-white","capitalize","font-sans","font-bold", "text-2xl",);
                        break;
                    case "Uncommon":
                        p.textContent = "Uncommon"
                         p.classList.add("text-emerald-500","capitalize","font-sans","font-bold", "text-2xl",);
                        break;
                    case "Rare":
                        p.textContent = "Rare"
                        p.classList.add("text-indigo-700","capitalize","font-sans","font-bold", "text-2xl",);
                        break;
                        
                    case "Legendary":
                        p.textContent = "Legendary"
                        p.classList.add("text-purple-700","capitalize","font-sans","font-bold", "text-2xl",);
                         break;
                    case "Mythic":
                        p.textContent = "Mythic"
                        p.classList.add("text-amber-600","capitalize","font-sans","font-bold", "text-2xl",);
                        break;
                        default:
                            break;
                }
                
                objectContainer.appendChild(p);
                
            }
        };

       

        
            
    };



            displayPokemon()
        });
    }


    // Generate a weighted random number
  const generateRandomPokemon = () => {
    const pokemonPromises = [];

    for (let i = 0; i < pokemonCount; i++) {
      const randomPokemonId = Math.floor(Math.random() * 898) + 1; // Generate a random Pokémon ID between 1 and 898
      pokemonPromises.push(fetchSinglePokemon(randomPokemonId));
    }

    return Promise.all(pokemonPromises);
  };

generateRandomPokemon().then((pokemonArray) => {
    //console.log
})
} 


  

const mainBtn = document.getElementById("mainBtn");
mainBtn.addEventListener("click", function(){
    fetchPokemon();
    mainBtn.remove();
});


