// Para hacer referencia a todos los botones y elementos del html desde aqui usando el id......
var elms = ['titulo', 'range', 'rangeValue', 'timeMax', 'play', 'paus', 'range_vol',
    'can_anterior', 'can_siguiente', 'atras_tiempo', 'adel_tiempo', 'vol_up', 'vol_off',
    'oculta_Ctrles', 'muestra_Ctrles', 'player_div'];
elms.forEach(function (elm) {
    window[elm] = document.getElementById(elm);
});

//Añadimos que el icono de cada caratula ejecute la funcion reproducir al hacer clic
var btns_caratula = document.querySelectorAll("article i");
btns_caratula.forEach(function (btn) {
    btn.addEventListener('click', reproducir);
});

play.addEventListener('click', reproducir);
pause.addEventListener('click', reproducir);
// range.addEventListener('input', cambiaOutput);

//Cambiar el volumen haciendo click en el range de volumen
range_vol.onclick = function () {
    player[cancionSonando].howl.volume(range_vol.value);
    if (range_vol.value == 0) {
        vol_off.style.display = "initial";
        vol_up.style.display = "none";
    } else {
        vol_up.style.display = "initial";
        vol_off.style.display = "none";
    }
}

//...Mutear con el botón del volumen....
vol_up.onclick = cambiaIconoVol;
vol_off.onclick = cambiaIconoVol;

//Al clickear en adelantar cancion / retrasar cancion:
atras_tiempo.addEventListener('click', modificarTiempo);
adel_tiempo.addEventListener('click', modificarTiempo);

//Al clickear en pasar cancion derecha / izquierda
can_anterior.addEventListener('click', cambiaCancion);
can_siguiente.addEventListener('click', cambiaCancion);

//Al hacer click en el range, cambiamos el tiempo de la cancion
range.onclick = function () {
    player[cancionSonando].howl.seek(range.value);
}

//Al clickear en los botones de ocultar/mostrar el player
oculta_Ctrles.addEventListener('click', displayPlayer);
muestra_Ctrles.addEventListener('click', displayPlayer);

//Este intervalo se produce y va actualizando el range con el tiempo de la canción
setInterval(() => {
    updateRange();
}, 500);

//VARIABLES GENERALES...............
let cancionSonando = 0;

//Con esta libreria Howler, creamos un howl para cada canción con todos los parametros que queramos pasarle...
//Estos Howls tendrán por defecto unos métodos para su manejo además de unos eventos programables según lo que suceda,
//por ejemplo, onend se ejecuta cuando la cancion termine
//INICIALIZAMOS EL OBJETO DE TIPO PLAYER Y LE PASAMOS LA PLAYLIST con los howler que hemos creado
var player = {
    1: {
        num: 1,
        title: 'Drive',
        howl: new Howl({
            src: ['multimedia/Oh Wonder - Drive.mp3'],
            volume: 0.3,
            onend: function () {
                cambiaPlayPause('pause');
                actualizaNota('oculta');
            }
        })
    },
    2: {
        num: 2,
        title: 'What Could I Do',
        howl: new Howl({
            src: ['multimedia/Callen - What Could I Do.mp3'],
            volume: 0.3,
            onend: function () {
                cambiaPlayPause('pause');
                actualizaNota('oculta');
            }
        })
    },
    3: {
        num: 3,
        title: 'Sorry',
        buffer: true,
        howl: new Howl({
            src: ['multimedia/Halsey - Sorry.mp3'],
            volume: 0.3,
            onend: function () {
                cambiaPlayPause('pause');
                actualizaNota('oculta');
            }
        })
    },
    4: {
        num: 4,
        title: 'Please, Listen Close',
        howl: new Howl({
            src: ['multimedia/Please Listen Close by Cameron Sanderson.mp3'],
            volume: 0.3,
            onend: function () {
                cambiaPlayPause('pause');
                actualizaNota('oculta');
            }
        })
    },
    5: {
        num: 5,
        title: 'The Woods',
        howl: new Howl({
            src: ['multimedia/the woods – hollow coves.mp3'],
            volume: 0.3,
            onend: function () {
                cambiaPlayPause('pause');
                actualizaNota('oculta');
            }
        })
    },
    6: {
        num: 6,
        title: 'Sing of the moon',
        howl: new Howl({
            src: ['multimedia/The Collection - Sing of the Moon.mp3'],
            volume: 0.3,
            onend: function () {
                cambiaPlayPause('pause');
                actualizaNota('oculta');
            }
        })
    },
    7: {
        num: 7,
        title: 'Better With You',
        howl: new Howl({
            src: ['multimedia/Virginia To Vegas - better with you.mp3'],
            volume: 0.3,
            onend: function () {
                cambiaPlayPause('pause');
                actualizaNota('oculta');
            }
        })
    },
    8: {
        num: 7,
        title: 'Teaser Indie Air',
        howl: new Howl({
            src: ['multimedia/cancion_relajante.mp3'],
            volume: 0.3,
            onend: function () {
                cambiaPlayPause('pause');
                actualizaNota('oculta');
            }
        })
    }
};

//FUNCIONES...............................
function reproducir(evento) {
    let idBoton = evento.target.id;

    //Si se pulsan los botones inferiores de play y pause
    if (idBoton == 'play' || idBoton == 'pause') {
        if (cancionSonando == 0) {
            player[1].howl.play();
            cancionSonando = 1;
            cambiaPlayPause('play');
            ActTiempoTitulo();
            actualizaNota('muestra');

        } else if (idBoton == 'pause') {
            player[cancionSonando].howl.pause();
            cambiaPlayPause('pause');
            actualizaNota('oculta');
        } else {
            player[cancionSonando].howl.play();
            cambiaPlayPause('play');
            actualizaNota('muestra');
        }
    } else { //Si se pulsa el icono de cada carátula
        let howlCancion = player[idBoton].howl;
        if (cancionSonando == 0) { //Si no hay canción sonando
            howlCancion.play();
            cancionSonando = idBoton;
            cambiaPlayPause('play');
            ActTiempoTitulo();
            actualizaNota('muestra');
        } else if (cancionSonando == idBoton) { //Si la canción que está sonando en la misma que la pulsada
            if (howlCancion.playing()) {
                howlCancion.pause();
                cambiaPlayPause('pause');
                actualizaNota('oculta');
            } else {
                howlCancion.play();
                cambiaPlayPause('play');
                actualizaNota('muestra');
            }
            
        } else { //Si la canción que está sonanando no es la misma que la pulsada
            player[cancionSonando].howl.stop();
            player[idBoton].howl.play();
            actualizaNota('oculta');
            reseteaBtnCaratula();
            cancionSonando = idBoton;
            ActTiempoTitulo();
            actualizaNota('muestra');
            cambiaPlayPause('play');
        }
        // cancionSonando = idBoton;
    }
    player[cancionSonando].howl.volume(range_vol.value);

}


//...Funcion que cambia el boton play por el pause....
function cambiaPlayPause(botonSelec) {
    let iconNota = (document.querySelector("i[title='" + player[cancionSonando].title + "']"));
    
    if (botonSelec == 'play') {
        play.style.display = "none";
        pause.style.display = "initial";
        iconNota.classList.remove("fontawesome-play");
        iconNota.classList.add("fontawesome-pause");
        
    } else {
        pause.style.display = "none";
        play.style.display = "initial";
        iconNota.classList.remove("fontawesome-pause");
        iconNota.classList.add("fontawesome-play");
    }
}

//Cambia a play el boton de la caratula de la cancion anterior
function reseteaBtnCaratula() {
    let iconNota = (document.querySelector("i[title='" + player[cancionSonando].title + "']"));
    iconNota.classList.remove("fontawesome-pause");
    iconNota.classList.add("fontawesome-play");
}


//....Muestra la duración final y actualiza el range......
function ActTiempoTitulo() {
    let duracionCancion = Math.floor(player[cancionSonando].howl.duration());
    range.max = duracionCancion;
    timeMax.value = calculateTime(duracionCancion);
    titulo.textContent = player[cancionSonando].title;
}

//..Actualiza el output del range según la duración....
function cambiaOutput() {
    rangeValue.value = calculateTime(range.value);

}

//Funcion que devuelve el tiempo en minutos y segundos
const calculateTime = (secs) => {
    const minutes = Math.floor(secs / 60);
    const seconds = Math.floor(secs % 60);
    const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${minutes}:${returnedSeconds}`;
}

//Muestra la nota musical en la canción está sonando...
function actualizaNota(estado) {
    let iconNota = (document.querySelector("i[title='" + player[cancionSonando].title + "'] + span"));
    if (estado == 'muestra') {
        iconNota.style.display = "block";
        iconNota.style.animation = "mueveNota 2s ease infinite";
    } else {
        iconNota.style.display = "none";
    }
}

//Vamos actualizando el range según haya canción sonando y pase el tiempo......
function updateRange() {
    if (cancionSonando != 0 && player[cancionSonando].howl.playing()) {
        range.value = player[cancionSonando].howl.seek();
        cambiaOutput();
        handleInputChange();
    }
}

//......Actualizamos el fondo gradiente del progreso del range..................
function handleInputChange() {
    let target = range;
    const min = range.min;
    const max = range.max;
    const val = range.value;

    target.style.backgroundSize = (val - min) * 100 / (max - min) + '% 100%';
}

//.....Funcion que cambia el icono del volumen segun si mutea o no.............
function cambiaIconoVol(evento) {
    if (cancionSonando != 0) {
        let btn_volActual = evento.target;
        if (btn_volActual.id == 'vol_up') {
            player[cancionSonando].howl.volume(0);
            btn_volActual.style.display = "none";
            vol_off.style.display = "initial";
            range_vol.value = 0;
        } else {
            player[cancionSonando].howl.volume(0.5);
            btn_volActual.style.display = "none";
            vol_up.style.display = "initial";
            range_vol.value = parseFloat(0.5);
        }
    }
}

//..Funcion que avanza o retrocede segundos en la canción según el botón pulsado....
function modificarTiempo(evento) {
    if (cancionSonando != 0) {
        let btn_pulsado = evento.target;
        let cancion = player[cancionSonando].howl;
        if (btn_pulsado.id == "adel_tiempo") {
            if ((cancion.seek() + 10) >= cancion.duration()) {
                cancion.seek(cancion.duration());
            } else {
                cancion.seek(cancion.seek() + 10);
            }
        } else {
            if ((cancion.seek() - 10) <= 0) {
                cancion.seek(0);
            } else {
                cancion.seek(cancion.seek() - 10);
            }
        }
        updateRange();
    }
}

//...Funcion que cambia de cancion de entre todas las disponibles............
function cambiaCancion(evento) {
    if (cancionSonando != 0) {
        let btn_pulsado = evento.target.id;
        player[cancionSonando].howl.stop();
        actualizaNota('oculta');
        reseteaBtnCaratula();

        if (btn_pulsado == "can_anterior") {
            if (cancionSonando == 1) {
                cancionSonando = 8;
            } else {
                cancionSonando --;
            }
        } else {
            if (cancionSonando == 8) {
                cancionSonando = 1;
            } else {
                cancionSonando ++;
            }
        }

        player[cancionSonando].howl.play();
        cambiaPlayPause('play');
        ActTiempoTitulo();
        actualizaNota('muestra');
    } else {
        player[1].howl.play();
        cambiaPlayPause('play');
        cancionSonando = 1;
        ActTiempoTitulo();
        actualizaNota('muestra');
    }
    player[cancionSonando].howl.volume(range_vol.value);
}

//....Muestra / Oculta controles de audio............
function displayPlayer(evento) {
    let btn_pulsado = evento.target;
    controls.style.animation  = "";

    if(btn_pulsado.id == 'oculta_Ctrles'){
        player_div.style.display = "none";
        btn_pulsado.style.display = "none";
        muestra_Ctrles.style.display = "initial";
        controls.style.animation  = "ocultaPlayer 0.5s linear 1 forwards";
    }else{
        controls.style.animation  = "muestraPlayer 0.5s linear 1 forwards";
        player_div.style.display = "initial";
        btn_pulsado.style.display = "none";
        oculta_Ctrles.style.display = "initial";
    }
}
