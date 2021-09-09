const miMundo=(()=>{
    let deck=[],
     tipo=['C','D','H','S'],
    especiales=['A','J','Q','K'];
    
    let puntosJugadores=[],
        puntosSmall=document.querySelectorAll("small");
    const btnPedir=document.querySelector("#btnPedir"),
        btnDetener= document.querySelector("#btnDetener"),
         btnNuevo=document.querySelector("#btnNuevo");
    
    const divCartasJugadores=document.querySelectorAll(".divCartas");

    const crearDeck=function (){
        deck=[];
    for(let i=2; i<=10;i++){
        for (const iterator of tipo) {
            deck.push(i+iterator);
        }
    }
    
    for (const todo of tipo) {
        for (const toda of especiales) {
            deck.push(toda+todo);
        }
    }
    
    return _.shuffle(deck);
    }
    
    
    const inicializar=(numJugadores=2)=>{
        puntosJugadores=[];
        for (let index = 0; index < numJugadores; index++) {
            puntosJugadores.push(0);}
            btnPedir.disabled=false;
            btnDetener.disabled=false;
            puntosSmall.forEach(item=>item.innerText=0);
            divCartasJugadores.forEach(item=>item.innerHTML="");

    
            
        
        deck= crearDeck();
    };
    
    const pedirCarta=()=>{
        if(deck.length===0){
            throw "No hay cartas en el deck";
        }
         
        return deck.pop();
    }
    //pedirCarta();
    
    const valorCarta=(carta)=>{
        const valor=carta.substring(0,carta.length-1);
        return (isNaN(valor)) ? (valor==='A') ? 11 : 10
        : +valor;
    }
    
    // Eventos
    btnPedir.addEventListener("click",()=>{
        const carta=pedirCarta();
        const puntosJugador=acumularPuntos(carta,0);
        crearCarta(carta,0);
      
    
    
        if(puntosJugador>21){
            btnDetener.disabled=true;
            btnPedir.disabled=true;
            turnoComputadora(puntosJugador);
        }else if(puntosJugador==21){
            btnPedir.disabled=true;
            btnDetener.disabled=true;
            turnoComputadora(puntosJugadores[0]);
        }
    });

    const acumularPuntos=(carta,turno)=>{
        puntosJugadores[turno] =puntosJugadores[turno]+valorCarta(carta);
       
       
        puntosSmall[turno].innerText=puntosJugadores[turno];
        return puntosJugadores[turno];

    }

    const crearCarta=(carta,turno)=>{
        const imgCarta=document.createElement("img"); 
        imgCarta.src=`assets/cartas/${carta}.png`;
        imgCarta.classList.add("carta");
        divCartasJugadores[turno].append(imgCarta);
    }
    const determinarGanador=()=>{
        const [puntosMinimos, puntosComputadora]= puntosJugadores;
        setTimeout(() => {
            (puntosComputadora===puntosMinimos)? alert("Empate"): puntosMinimos>21 ? alert("Gana la computadora"): puntosComputadora>21 ? alert("Gana el jugador") : (puntosComputadora>puntosMinimos && puntosComputadora <=21) ? alert("La computadora gana"): alert("El jugador gana");
           }, 100); 
    }
    const turnoComputadora=(puntosMinimos)=>{
        let puntosComputadora=0;
        do{
            const carta=pedirCarta();
            puntosComputadora=acumularPuntos(carta,puntosJugadores.length-1);
            crearCarta(carta,puntosJugadores.length-1)
        }while((puntosComputadora<puntosMinimos) && (puntosMinimos<=21))
        determinarGanador();
      
    }
    
        btnDetener.addEventListener("click",()=>{
        btnPedir.disabled=true;
        btnDetener.disabled=true;
        turnoComputadora(puntosJugadores[0]);
    })
    
    btnNuevo.addEventListener("click", ()=>{
      
        inicializar();


    })  ;
    return {
        nuevoJuego: inicializar
    };
})();