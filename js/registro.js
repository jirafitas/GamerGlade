const registrate = document.querySelector('#registrate');

//Agregar un evento para el envio del formulario
registrate.addEventListener('submit', (e) => {
    e.preventDefault()

    //Obtener los valores del formulario
    const name = document.querySelector('#nombre').value
    const email = document.querySelector('#correo').value
    const password = document.querySelector('#contraseña').value

    const users = JSON.parse(localStorage.getItem('users')) || []

    const isUserRegistered = users.find(user => user.email === email)

    if (isUserRegistered) {
        Swal.fire({
            icon: 'error',
            title: 'Error de datos',
            text: 'El correo que ingresaste ya esta registrado'
        })
        return
    }

users.push({name, email, password})
localStorage.setItem('users', JSON.stringify(users))

Swal.fire({
    icon: 'success',
    title: 'Registro exitoso',
    text: 'Tu registro se ha realizado con exito'
}).then(() => {
    window.location.href = 'index.html'
})   
})
