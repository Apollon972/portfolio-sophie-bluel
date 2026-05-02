let body = document.querySelector("body")
let gallery = document.querySelector(".gallery")
let h2 = document.querySelector("#portfolio h2")
let allWorks = []
const token = sessionStorage.getItem("token")
const divFilter = document.querySelector(".div-filter")



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

    if (token) {
        divFilter.style.display = "none"
    }

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

function afficherWorksModale(works) {
        const modalGallery = document.querySelector(".modal-gallery")
        modalGallery.innerHTML= ""

        works.forEach(work => {
        const figure = document.createElement("figure")
        const image = document.createElement("img")
        const trashIcon = document.createElement("i")

        figure.classList.add("modal-figure")
        image.src = work.imageUrl
        image.alt = work.title
        trashIcon.classList.add("fa-solid", "fa-trash-alt")
        trashIcon.dataset.id = work.id

        trashIcon.addEventListener("click", (e) => {
            const id = e.target.dataset.id

                fetch(`http://localhost:5678/api/works/${id}`, {
                    method: "DELETE",
                    headers: {
                        "Authorization": `Bearer ${token}`
    }
})
    .then (response => {
        if (response.ok) {
            console.log("supprimé")
            figure.remove()
            allWorks = allWorks.filter(work => work.id !== parseInt(id))
            gallery.innerHTML = ""
            afficherWorks(allWorks)
            
        } else {
            console.log("erreur : ", response.status)
          }
     })
})
        figure.appendChild(image)
        figure.appendChild(trashIcon)
        modalGallery.appendChild(figure)
        })
}


    fetch("http://localhost:5678/api/works")
    .then (response => response.json())
    .then (works => {
        allWorks = works
        afficherWorks(allWorks)
})

if (token){
    const loginLink = document.querySelector(".login-link")
    loginLink.innerText = "logout"

    const modal = document.querySelector(".modal")
    const modalWrapper = document.querySelector(".modal-wrapper")
    const btnClose = document.querySelector(".btn-close")
    const editMod = document.createElement("div")
    const editModName = document.createElement("p")
    const editName = document.createElement("button")
    const titleWrapper = document.createElement("div")

    titleWrapper.classList.add("title-wrapper")
    editMod.classList.add("edit-mod")
    editModName.classList.add("edit-mod-name")
    editName.classList.add("edit-name")
    editName.innerHTML = '<i class="fa-regular fa-pen-to-square"></i> modifier'
    editModName.innerHTML = '<i class="fa-regular fa-pen-to-square"></i> Mode édition'

    editName.addEventListener("click", (e) => {
        modal.style.display = "flex"
        afficherWorksModale(allWorks)
    })
    btnClose.addEventListener("click" , (e) =>{
        modal.style.display = "none"
    })
    modal.addEventListener("click" , (e) => {
        modal.style.display = "none"
    })
    modalWrapper.addEventListener("click" , (e) => {
        e.stopPropagation()
    })
    window.addEventListener("keydown" , (e) => {
        if (e.key === "Escape" && modal.style.display === "flex") {
            modal.style.display = "none"
        }
    })
    editMod.appendChild(editModName)
    h2.before(titleWrapper)
    titleWrapper.appendChild(h2)
    titleWrapper.appendChild(editName) 
    body.insertAdjacentElement("afterbegin" , editMod)
    
    
    loginLink.addEventListener("click", (event) => {
        event.preventDefault()
        sessionStorage.removeItem("token")
        window.location.reload()
    })
}



