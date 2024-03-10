let searchBtn = document.getElementById("user-btn");
searchBtn.addEventListener("click", () => {
    fetch('https://randomuser.me/api')
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            if (data.results[0].gender === 'female') {
                document.body.style.backgroundColor = "#ff5f96";
            }
            else {
                document.body.style.backgroundColor = '#5a72e9';
            }

            result.innerHTML = `
                <img src="${data.results[0].picture.large}" class="large-img">
                <div class="wrapper">
                    <div class="data-wrapper">
                        <h4>Name:</h4>
                        <span>${data.results[0].name.first} ${data.results[0].name.last}</span>
                    </div>
                </div>
                <div class="wrapper">
                    <div class="data-wrapper">
                        <h4>Email:</h4>
                        <span>${data.results[0].email}</span>
                    </div>
                </div>
                <div class="wrapper">
                    <div class="data-wrapper">
                        <h4>Phone:</h4>
                        <span>${data.results[0].phone}</span>
                    </div>
                </div>
                <div class="wrapper">
                    <div class="data-wrapper">
                        <h4>Location:</h4>
                        <span>${data.results[0].location.city} ${data.results[0].location.country}</span>
                    </div>
                </div>
                <div class="wrapper">
                    <div class="data-wrapper">
                        <h4>Age:</h4>
                        <span>${data.results[0].dob.age}</span>
                    </div>
                </div>
                    `;
        })
});