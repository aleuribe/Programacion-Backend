const socket = io.connect()

function render(data){
    const html = data.map((elem, index) => {
        return(
            `<div>
                <strong> ${elem.author}: </strong>
                <em> ${elem.text} </em>
            </div>`
        )
        }).join(' ')
        document.getElementById('messages').innerHTML=html
}

function sendMessage(e) {
    const mensaje = {
        author: document.getElementById('username').value,
        text: document.getElementById('text').value
    }
    socket.emit('newMessage', mensaje)
    return false
}

socket.on('messages', data => {
    render(data)
})

// //usando fetch para traer /form
// fetch('http://127.0.0.1:8080/form')
//     .then(res => res.text())
//     .then(data => {
//         form.innerHTML = data
//     })
//     .catch(err => console.log(err))

// //usando fetch para traer /list
// fetch('http://127.0.0.1:8080/list')
//     .then(res => res.text())
//     .then(data => {
//         list.innerHTML = data
//     })
//     .catch(err => console.log(err))