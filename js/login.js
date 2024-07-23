const loginForm = document.querySelector('#login')

loginForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const email = document.querySelector('#correo').value
    const password = document.querySelector('#contraseña').value
    const users = JSON.parse(localStorage.getItem('users')) || []
    const validUser = users.find(user => user.email === email && user.password === password)
    
    if (!validUser) {
        Swal.fire({
            icon: 'error',
            title: 'Error de datos',
            text: "El usuario y /o contraseña son incorrectos"
        })
        return
    }
    Swal.fire({
        icon: 'success',
        title: 'Inicio de sesion exitoso',
        text: `Bienvenido ${validUser.name}`
    })
    localStorage.setItem('login_success', JSON.stringify(validUser))
    window.open('https://buy.stripe.com/test_aEUaGE2vQffsf3a5kl', 'blank')
})