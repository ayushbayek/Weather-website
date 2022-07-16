const weatherForm = document.getElementById("weatherForm");
const search = document.getElementById("location");
const output = document.getElementById("output");

weatherForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const location = search.value;

  const url = "http://localhost:3000/weather?address=" + location;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      if (data.error) {
        // console.log(data.error);
        output.textContent = data.error;
      } else {
        // console.log(data);
        output.innerHTML = `${data.forecast}<br><br>
        Location: ${data.location}`;
      }
    });
});
