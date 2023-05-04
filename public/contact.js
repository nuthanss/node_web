function fetchJson() {
  const authHeader = "Basic " + btoa("admin:admin");
  fetch("https://server-json-y3ww.onrender.com/posts", {
    headers: {
      "Content-Type": "application/json",
      Authorization: authHeader,
    },
  })
    .then((res) => res.json())
    .then((data) => console.log(data))
    .catch((error) => console.log(error));
}

fetchJson();

// fetch("/port", {})
//   .then((res) => res.json())
//   .then((data) => console.log(data))
//   .catch((error) => console.log(error));
