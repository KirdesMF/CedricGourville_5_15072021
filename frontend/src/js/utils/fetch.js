export async function getDatasApi(path) {
   try {
      const res = await fetch(`http://localhost:3000/api/${path}`);
      if (!res.ok) {
         console.log(res.status);
         return;
      }

      return res.json();
   } catch (err) {
      console.log(err);
   }
}

export async function getImagesApi(path, id) {
   try {
      const res = await fetch(`http://localhost:3000/api/${path}/${id}`);

      if (!res.ok) {
         console.log(res.status);

         return;
      }

      return res.json();
   } catch (err) {
      console.log(err);
   }
}

const options = {
   method: 'post',
   body: 'test',
   headers: new Headers({
      'Content-Type': 'application/json',
   }),
};

export async function postCommand(path) {
   const testData = {
      contact: {
         firstName: 'jean',
         lastName: 'jardin',
         address: 'ok',
         city: 'Paris',
         email: '',
      },
      products: [],
   };
   try {
      const res = await fetch(`http://localhost:3000/api/${path}/order/`, {
         method: 'POST',
         body: JSON.stringify(testData),
         headers: { 'Content-Type': 'application/json; charset=utf-8' },
      });

      const json = await res.json();
   } catch (error) {
      console.log(`bad ${error}`);
   }
}
