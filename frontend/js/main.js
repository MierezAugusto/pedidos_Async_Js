window.onload = () => {
  const app = document.getElementById("root");
  const container = document.createElement("div");
  container.setAttribute("class", "container");
  app.appendChild(container);
  const PORT = 3031

  fetch(`http://localhost:${PORT}/api/movies`)
    .then(response => {
      return response.json()
    })
    .then(peliculas => {

      /* Codigo que debemos usar para mostrar los datos en el frontend */
      let data = peliculas.data;

      if(!localStorage.getItem("favorita")){
        let favoritas = []
        localStorage.setItem("favorita", JSON.stringify(favoritas))
      }
      if(JSON.parse(localStorage.getItem("favorita"))<1){
        let a =document.querySelector("#Favoritas")
        a.style.display = "none"
      }else{
        let a =document.querySelector("#Favoritas")
        a.style.display ="block"
      }
      data.forEach((movie) => {
        const card = document.createElement("div");
        card.setAttribute("class", "card");

        const h1 = document.createElement("h1");
        h1.textContent = movie.title;

        const p = document.createElement("p");
        p.textContent = `Rating: ${movie.rating}`;

        const bttn = document.createElement("button")
        bttn.innerText = "Favorita"
        bttn.setAttribute("class","botonAgregar")
        bttn.setAttribute("id", movie.id)

        let favoritas = JSON.parse(localStorage.getItem("favorita"))

        if (favoritas.find(favorita=>favorita.id ===movie.id)){
          bttn.classList.add("disabled")
        }

        bttn.addEventListener("click",(e)=>{
          e.preventDefault()
          let favorita = JSON.parse(localStorage.getItem("favorita"))
          
          if(!favorita.find(element=>element.id === +e.target.id)){
            favorita.push(movie)
            bttn.classList.add("disabled")
          }else{
            favorita = favorita.filter(element=>element.id!==+e.target.id)
            bttn.classList.remove("disabled")
          }

          if(favorita<1){
            let a =document.querySelector("#Favoritas")
            a.style.display = "none"
          }else{
            let a =document.querySelector("#Favoritas")
            a.style.display ="block"
          }
          
          localStorage.setItem("favorita", JSON.stringify(favorita))
          console.log(favorita)
        })



        container.appendChild(card);
        card.appendChild(h1);
        card.appendChild(p);


        if (movie.genre !== null) {
          const genero = document.createElement("p");
          genero.textContent = `Genero: ${movie.genre.name}`;
          card.appendChild(genero);
        }

        if (movie.length !== null) {
          const duracion = document.createElement("p");
          duracion.textContent = `Duración: ${movie.length}`;
          card.appendChild(duracion);
        }
        
        card.appendChild(bttn)
      });

    })
};
