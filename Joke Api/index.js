const jokeArea = document.getElementById("joke");
const jokeButton = document.getElementById("btn");
const url = "https://v2.jokeapi.dev/joke/Programming,Miscellaneous,Dark,Pun,Spooky,Christmas?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&type=single";

let joke = () => {
    fetch(url)
        .then((resp) => resp.json())
        .then((data) => {
            jokeArea.innerHTML = `${data.joke}`;
        });
}

btn.addEventListener("click", joke);