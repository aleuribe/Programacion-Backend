const socket = io.connect()


//Para el chat
function sendMessage(e) {
    let datetime = new Date().toLocaleString('en-GB', {timezone: 'UTC'})

    const mensaje = {
        author: $("#username").val(),
        text: $("#text").val(),
        datetime: datetime
    }
    socket.emit('newMessage', mensaje)
    $("text").value=''
    return false
}

socket.on('messages', data => {
    render(data)
})

//Para el form
//Emito cuando haga click en submit
$("#form").submit( function(e) {
    e.preventDefault()
    data = {
        title: $("#title").val(),
        price: $("#price").val(),
        thumbnail: $("#thumbnail").val()
    }
    
    socket.emit("newProduct", data)
})

//Escucho nuevos cambios del socket products y vuelvo a cargar listado
socket.on('products', data => {
    console.log(data)
    renderList([data])
})