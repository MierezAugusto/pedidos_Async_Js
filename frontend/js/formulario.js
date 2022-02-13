window.onload = () => {
    const PORT = 3031
    fetch(`http://localhost:${PORT}/api/movies`)
        .then(result => result.json())
        .then(peliculas => {


            const $ = (cosa) => {
                return document.querySelector(cosa)
            }

            const title = $("#title")
            const rating = $("#rating")
            const awards = $("#awards")
            const release_date = $("#release_date")
            const length = $("#length")
            const editar = $("#editar")
            const crear = $("#crear")
            const eliminar = $("#eliminar")

            
            let pelicula
            let find

            title.addEventListener("input", (e) => {
                pelicula = e.target.value
                find = peliculas.data.find(peli => peli.title.toLowerCase() === pelicula.toLowerCase())
                if (find !== undefined) {
                    rating.setAttribute("value", find.rating)
                    awards.setAttribute("value", find.awards)
                    const date = find.release_date.split("T")[0];
                    release_date.setAttribute("value", date)
                    length.setAttribute("value", find.length)
                }

            })

            editar.addEventListener("click", (e) => {
                e.preventDefault()
                if(find!==undefined){
                const body = {
                    title: title.value,
                    rating: rating.value,
                    awards: awards.value,
                    release_date: release_date.value,
                    length: length.value,
                }

                fetch(`http://localhost:${PORT}/api/movies/update/${find.id}`, {
                    method: "PUT",
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(body)
                })
                .then(response=>response.json())
                .then(response=>{
                    let body=$("body")
                    const editar = document.createElement("h2")
                    editar.innerText = "se edito la pelicula correctamente"
                    body.appendChild(editar)
                })
            }
            })

            crear.addEventListener("click",(e)=>{
                e.preventDefault()
                const body = {
                    title: title.value,
                    rating: rating.value,
                    awards: awards.value,
                    release_date: release_date.value,
                    length: length.value,
                    genre_id:1 
                }

                fetch(`http://localhost:${PORT}/api/movies/create`, {
                    method: "POST",
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(body)
                })
                .then(response=>response.json())
                .then(response=>{
                    console.log(response)
                })


            })
            eliminar.addEventListener("click",(e)=>{
                e.preventDefault()
                fetch(`http://localhost:${PORT}/api/movies/delete/${find.id}`,{
                    method: "DELETE",
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json"
                    },
                })
                .then(response=>response.json())
                .then(response=>{
                    console.log(response)
                })
                
            })



        })


}