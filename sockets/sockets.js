const{ io } = require("../index");

//Mensajes de Sockets
//const bands = new Bands();

/*bands.addBand(new Band(  'Breaking Benjamin'));
bands.addBand(new Band(  'Bon Jovi'));
bands.addBand(new Band(  'Heroes del Silencio'));
bands.addBand(new Band(  'Metalica'));*/

//console.log(bands);


io.on('connection', client => {

    console.log('Cliente conectado');
    //client.emit('active-bands', bands.getBands());

    client.on('disconnect', () => { 

        console.log("Cliente desconectado");

    });
    /*
    client.on('mensaje', (  payload ) => {
      console.log("Mensaje!!!", payload);
      io.emit("mensaje", {admin: "Nuevo mensaje" });
    })

   client.on('emitir-mensaje',(payload) => {
    client.broadcast.emit('nuevo-mensaje', payload); //emite menos al que lo lo emitio
   })

   client.on('vote-band', ( payload ) => {
      bands.voteBand(payload.id);
      io.emit('active-bands', bands.getBands());
   })

   //Escuchar add-band
   client.on('add-band', ( payload ) =>{
    const newBand = new Band( payload.name );
     bands.addBand(newBand);
     io.emit('active-bands',bands.getBands());
   })

   client.on('delete-band', ( payload ) => {
     bands.deleteBand(payload.id);
     io.emit('active-bands', bands.getBands());
   })*/


  });
