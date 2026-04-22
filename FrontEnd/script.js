let body = document.querySelector("body")
let gallery = document.querySelector(".gallery")
let h2 = document.querySelector("#portfolio h2")


fetch("http://localhost:5678/api/categories")
.then (response => response.json())
.then (categories => {
    const divFilter = document.createElement("div")
    divFilter.classList.add("div-filter")

    const tous = document.createElement("button")
    tous.innerText = "Tous"
    tous.classList.add("filter-button", "active")
    tous.dataset.id = 0
    divFilter.appendChild(tous)
    categories.forEach(categorie => {
        const filter = document.createElement("button")
        filter.innerText = categorie.name
        filter.classList.add("filter-button")
        filter.dataset.id = categorie.id
        divFilter.appendChild(filter)
        
    })
    h2.insertAdjacentElement("afterend", divFilter)

    const boutons = divFilter.querySelectorAll("button")
    boutons.forEach(bouton => {
        bouton.addEventListener("click", () =>{
            boutons.forEach(btn => btn.classList.remove("active"))
            gallery.innerHTML = ""
            bouton.classList.add("active")
            if (bouton.dataset.id === "0") {
                afficherWorks(allWorks)
            } else {
                const filteredWorks = allWorks.filter(work => work.categoryId === parseInt(bouton.dataset.id))
                afficherWorks(filteredWorks)
            }
        })
    })
})

function afficherWorks(works) {
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
}
    fetch("http://localhost:5678/api/works")
    .then (response => response.json())
    .then (works => {
        console.log(works[0])
        allWorks = works
        afficherWorks(allWorks)
})



divFilter.addEventListener("click", () => {
    
})



