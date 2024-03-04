const url = " https://pokeapi.co/api/v2/pokemon/";
const card = document.getElementById("card");
const btn = document.getElementById("btn");

let getPokeData = () => {
    //1-150 arası sayi oluşturduk
    let id = Math.floor(Math.random() * 150) + 1;

    //Oluşturduğumuz bu numara ile url'yi birleştiridk ki rastgele pokemon oluşsun
    const finalUrl=url + id;

    //Url'yi kullanıyoruz
    fetch(finalUrl)
    .then((res)=>res.json())
    .then((data)=>{
        generatePokemonCard(data)
    });
};

//Pokemon kartlarını oluşturduk
let generatePokemonCard = (data) =>{
    const hp=data.stats[0].base_stat;
    const imgSrc=data.sprites.other.dream_world.front_default;
    const pokeName=data.name[0].toUpperCase() + data.name.slice(1);
    const statAttack=data.stats[1].base_stat;
    const statDefense=data.stats[2].base_stat;
    const statSpeed=data.stats[5].base_stat;

    card.innerHTML=`
    <p class="hp">
          <span>HP</span>
            ${hp}
        </p>
        <img src=${imgSrc} />
        <h2 class="poke-name">${pokeName}</h2>
        <div class="types">
         
        </div>
        <div class="stats">
          <div>
            <h3>${statAttack}</h3>
            <p>Attack</p>
          </div>
          <div>
            <h3>${statDefense}</h3>
            <p>Defense</p>
          </div>
          <div>
            <h3>${statSpeed}</h3>
            <p>Speed</p>
          </div>
        </div>
    `;
    //Pokemonları oluştururken aldığımız dataları buraya aktardık
    appendTypes(data.types);
};

//aktarılan tüm bu dataları spanlar yaratıp ilgili yerlere aktardık
let appendTypes = (types) => {
    types.forEach((item) => {
      let span = document.createElement("SPAN");
      span.textContent = item.type.name;
      document.querySelector(".types").appendChild(span);
    });
  };

btn.addEventListener("click", getPokeData);
window.addEventListener("load", getPokeData);