let getFactBtn = document.getElementById("get-fact-btn");
let ranFactBtn = document.getElementById("ran-fact-btn");
let fact = document.querySelector(".fact");
let url = "http://numbersapi.com/";

let fetchFact = (num) => {
  let finalUrl = url + num; //input olarak alınan numara url sonuna ekleniyor ve istenen numaraya gidiyoruz
  fetch(finalUrl)
    .then((resp) => resp.text())
    .then((data) => {
      fact.style.display = "block";  //numarayı aldıktan sonra numara hakkındaki bilgi alanı lok element haline gelerek içine ilgili numara ve onun hakkında bilgi yazılır ve containera eklenir
      fact.innerHTML = `<h2>${num}</h2>
      <p>${data}</p>`;
      document.querySelector(".container").append(fact);
    });
};
let getFact = () => {
  let num = document.getElementById("num").value;
  if (num) { //girilen değer nuumara mı yoksa değil mi kontrolü ve buna bağlı olarak girilen numara final url'sine eklenir
    if (num >= 0 && num <= 300) {
      fetchFact(num);
    }
    else {
      fact.style.display = "block";
      fact.innerHTML = `<p class="msg"> Please enter a number between 0 to 300.</p>`;
    }
  }
  else { //input alanı bosa burası çalışır
    fact.style.display = "block";
    fact.innerHTML = `<p class="msg">The input field cannot be empty</p>`;
  }
};

let getRandomFact = () => { //bazen numaradan bağımsız numaradan bilgi almak istersek bu fonksiyon çalışacak 
  let num = Math.floor(Math.random() * 301);
  fetchFact(num);
};

getFactBtn.addEventListener("click", getFact);
ranFactBtn.addEventListener("click", getRandomFact);
window.addEventListener("load", getRandomFact);