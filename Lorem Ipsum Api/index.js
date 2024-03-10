let loremGenerateBtn = document.getElementById("generate-btn");
let loremCopy = document.getElementById("copy-button");
let paraDisplay = document.getElementById("para");

let options = {
    method: "GET",
    headers: { 'X-Api-Key': apiKey },
};

let url = "https://api.api-ninjas.com/v1/loremipsum?paragraphs=";

let generatePara = () => {
    let noOfPara = document.getElementById("no-of-para").value;
    let finalUrl = url + noOfPara;
    fetch(finalUrl, options)
        .then((res) => res.json())
        .then((data) => { 
            paraDisplay.innerText=data.text;
        });

};

loremCopy.addEventListener("click",()=>{
    navigator.clipboard.writeText(paraDisplay.innerText);
    alert("Text copied succesfull");
});



/*If you wanna try to run this project, please open this block comment and remove the paragraph from id=para in html file!!!Also add your apikey to api-key.js file!!!!
loremGenerateBtn.addEventListener("click", generatePara);
window.addEventListener("load", generatePara); */