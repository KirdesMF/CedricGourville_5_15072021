function getImages(teddies) {
   const container = document.querySelector('.container');

   teddies.forEach((teddy) => {
      container.innerHTML += `<img src="${teddy.imageUrl}" />`;
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
