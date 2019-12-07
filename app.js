const express = require("express")
const app = new express()
var http = require("http").createServer(app)
const io = require("socket.io")(http)


var usuarios = {}

app.use(express.static(__dirname))
app.get('/',(req,res)=>{
    res.sendFile('index.html',{root: __dirname})
})


io.on('connection',(socket)=>{
    socket.on('message',(msg)=>{
        let ret = {}
        ret.from = usuarios[socket.id]
        ret.mensagem = msg
        io.sockets.emit('atualiza_mensagem',ret)
    })
    socket.on('login',(usuario)=>{
        if(usuario.length == 0){
           
            socket.emit('retorno','Precisa ter pelo menos 1 letra')
            console.log("here")
        }else{
            usuarios[socket.id] = usuario
            socket.emit('retorno',true)
            io.sockets.emit('listaConectados',usuarios)
            //console.log(usuarios)
        }
       
    }) 
    socket.on('disconnect',()=>{
        delete usuarios[socket.id]
        io.sockets.emit('listaConectados',usuarios)
    })
})



http.listen(3000,()=>{
    console.log("listening")
})