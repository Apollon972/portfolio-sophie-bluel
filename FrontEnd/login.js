const form = document.querySelector(".login")
const passwordInput = document.querySelector("form #password")

form.addEventListener("submit", (event) => {
    event.preventDefault()
    console.log("form soumis")
    const email = document.getElementById("email").value
    const password = document.getElementById("password").value
    console.log(email,password)
    fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: {"Content-type" : "application/json"},
    body: JSON.stringify({email, password})
    })
    .then (response => {
        if (response.ok) {
            return response.json()
        } else {
            const oldError = document.querySelector(".error-message")
            if (oldError) oldError.remove()
            let error = document.createElement("p")
            error.classList.add("error-message")
            error.innerText = " Email ou mot de passe incorrect"
            passwordInput.insertAdjacentElement("afterend" , error)
        }
    })
    .then (data => {
        sessionStorage.setItem("token", data.token)
        window.location.href = "index.html"
    })
    
    

})

