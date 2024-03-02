let url = "https://api.genderize.io?name=";
let wrapper = document.getElementById("wrapper");
let predictGender = () => {
    let name = document.getElementById("name").value;
    let error = document.getElementById("error");
    let finalURL = url + name;
    console.log(name);
    console.log(finalURL);
    wrapper.innerHTML = "";
    error.innerHTML = "";


    if (name.length > 0 && /^[A-Za-z]+$/.test(name)) {
        fetch(finalURL)
            .then((resp) => resp.json())
            .then((data) => {
                console.log(data);
                let div = document.createElement("div");
                div.setAttribute("id", "info");
                div.innerHTML = `<h2 id="result-name">${data.name}</h2><h1 id="gender">${data.gender}</h1>`;
                wrapper.append(div);
                if (data.gender == "female") {
                    div.classList.add("female");
                } else {
                    div.classList.add("male");
                }
            });
        document.getElementById("name").value = "";
    } else {
        error.innerHTML = "Enter a valid name with no spaces";
    }
};

document.getElementById("submit").addEventListener("click", predictGender);
window.addEventListener("load", predictGender);