let body = document.querySelector("body")
let gallery = document.querySelector(".gallery")
let h2 = document.querySelector("#portfolio h2")




fetch("http://localhost:5678/api/categories")
.then (response => response.json())
.then (categories => {
    const div = document.createElement("div")
    const tous = document.createElement("button")
        tous.innerText = "Tous"
        tous.classList.add("filter-button-active")
        div.classList.add("div-filter")
    div.appendChild(tous)
    categories.forEach(categorie => {
        const filter = document.createElement("button")
        filter.innerText = categorie.name
        filter.classList.add("filter-button")
        div.appendChild(filter)
        
    })
    h2.insertAdjacentElement("afterend", div)
})


fetch("http://localhost:5678/api/works")
.then (response => response.json())
.then (works => {
    works.forEach(work => {
        const figure = document.createElement("figure")
        const image = document.createElement("img")
        const figcaption = document.createElement("figcaption")
        figcaption.innerText = work.title
        image.src = work.imageUrl
        image.alt = work.title
        figure.appendChild(image)
        figure.appendChild(figcaption)
        gallery.appendChild(figure)
    });
})

