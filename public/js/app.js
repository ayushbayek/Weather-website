const weatherForm = document.getElementById("weatherForm");
const search = document.getElementById("location");
const output = document.getElementById("output");

weatherForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const location = search.value;

  const url = "/weather?address=" + location;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      if (data.error) {
        // console.log(data.error);
        output.textContent = data.error;
      } else {
        // console.log(data);
        output.innerHTML = `Location: ${data.location}<br><br>${data.forecast}
        <br><br> Humidity: ${data.humidity}%`;
      }
    });
});
