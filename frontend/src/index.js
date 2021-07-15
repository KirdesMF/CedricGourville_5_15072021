document.body.style.background = 'red';

function getImages(teddies) {
   teddies.forEach((teddy) => {
      document.body.innerHTML += `<img src="${teddy.imageUrl}" />`;
   });
}

function fetchTeddies() {
   const url = 'http://localhost:3000/api/teddies';

   fetch(url)
      .then((res) => res.json())
      .then((data) => getImages(data))
      .catch((err) => console.log(err));
}
fetchTeddies();
