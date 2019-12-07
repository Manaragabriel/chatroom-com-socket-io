var socket = io()


 
$("#enviaBtn").click(function(){
    socket.emit('message',$("#mensagem").val())
    $("#mensagem").val('')
})

$("#loginBtn").click(function(){
    
    socket.emit('login',$("#usuario").val())
})


$(document).ready(function(){
    
    socket.on('atualiza_mensagem',function(msg){
        $(".messages").append(`<p>${msg.from}: ${msg.mensagem}</p>`)
        
    })
    socket.on('retorno',function(msg){
        if(msg == true){
            $(".login-screen").hide()
            $(".message-box").show()
            $(".message-box").css({'display':'flex'})
            $(".chat-input").show()

        }else{
            alert(msg)
        }
        console.log(msg)
    })

    socket.on('listaConectados',function(usuarios){
        var userList= ''
        for(var id in usuarios){
            userList += `<p>${usuarios[id]}</p>`
        }
        $(".users").html(userList)
        
    })
   
})
