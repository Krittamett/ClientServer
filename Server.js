var net = require('net');

var HOST = '127.0.0.1';
var PORT = '6969';
var clients = {
                "ABC" :0, 
                "DEF" :7, 
                "XYZ" :3    }

var server = net.createServer();
server.listen(PORT,HOST);
var data_in = Object.keys(clients);
var name;
var input;

server.on('connection',function(sock){

    console.log('Connected : ' + sock.remoteAddress + ' : ' + sock.remotePort );
    sock.write('Who are you : ');
    
    
    sock.on('data',function(data){
        
        if (data == 'BYE') {
            sock.destroy();
        }
        else if(isNaN(parseInt(data))){
            input = data.toString()
            name = data_in.filter(dt => dt == input).toString()
            if(clients[input] == undefined){
                sock.write('Not Found !!!!!!!!!!!!!!\nWho are you : ');
            }
            else sock.write(`Your Score : ${clients[input]} \nGet Command : `);
            
        }
        else if(!isNaN(parseInt(data))){
            clients[name] = clients[name] +  parseInt(data); 
            sock.write(`Your score is ${clients[name]}\nGet Command : `);
        } 
        
        

    });


    sock.on('close',function(data){
        console.log('CLOSED : ' + sock.remoteAddress + ' ' + sock.remoteport);
    });
});