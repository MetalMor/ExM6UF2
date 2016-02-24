/**
 * JAVASCRIPT DRAG'N'DROP CLASSES
 * 
 * Fitxer amb els constructors necessaris
 * 
 * 050216
 * @author mor
 */

/**
 * Funció constructora de l'objecte que representa una imatge figura del joc.
 * 
 * @param {type} folder Carpeta a on es troba el fitxer.
 * @param {type} name Nom del fitxer.
 * @param {type} ext Extensió del fitxer.
 * @returns {Figure}
 */
function Figure(folder, name, ext) {
    /**
     * Nom del fitxer.
     */
    this.name = name;
    /**
     * Ruta del fitxer.
     */
    this.src = folder + name + ext;
}
/**
 * Funció constructora de l'objecte controlador del joc.
 * 
 * @returns {Game}
 */
function Game() {
    /**
     * Apuntador al nivell en què es troba l'aplicació.
     */
    this.currentLevel = 0;
    /**
     * Flag que indica si el nivell actual ha estat completat correctament.
     */
    this.completedLevel = true;
    /**
     * String de la ruta de la solució del nivell actual.
     */
    this.key = "any";
    /**
     * Objecte que representa el conjunt de figures possibles en el context del joc.
     */
    this.figures = new FigureSet();
    /**
     * Matriu que emmagatzema el temps emprat per completar cadascun dels nivells.
     */
    this.timeCounter = [
        "0",
        0,
        0,
        0,
        0
    ];
    /**
     * Llista de nodes a on deixar els objectes drag and drop.
     */
    this.systemNodeList = document.querySelectorAll('#b04');
    /**
     * Node que conté les imatges que el jugador pot arrossegar.
     */
    this.figureDiv = document.getElementById('player');
    /**
     * Matriu d'objectes que representen les figures que el jugador pot utilitzar.
     */
    this.figureList = [
        this.figures.circle,
        this.figures.square,
        this.figures.triangle,
        this.figures.diamond
    ];
    /**
     * Matriu d'objectes que representen les solucions de cadascun dels nivells.
     */
    this.solutionList = [
        this.figures.diamond,
        this.figures.circle,
        this.figures.triangle,
        this.figures.square
    ];
    /**
     * Funció per mostrar la resolució de les puntuacions de temps al final del joc.
     * 
     * @returns {undefined}
     */
    this.showTimeCount = function () {
        var count = this.timeCounter;
        clearInterval(window.intervalRef);
        document.getElementById('timeCount').classList.remove("hidden");
        var nodeList = document.getElementsByClassName('timeCount');
        for (var level in count) {
                nodeList[level].innerHTML = count[level].toString();
        }
    };
    /**
     * Funció per amagar el comptador de temps.
     * 
     * @returns {undefined}
     */
    this.hideTimeCount = function() {
        var timeCountDiv = document.getElementById('timeCount');
        if(!timeCountDiv.classList.contains('hidden'))
            timeCountDiv.classList.add("hidden");
    };
    /**
     * Indica que el programa es troba en estat de pausa.
     * 
     * @returns {undefined}
     */
    this.pause = function () {
        if (!window.pause)
            window.pause = true;
        else
            window.pause = false;
    }
    /**
     * Defineix l'objecte solució del nivell actual.
     * 
     * @returns {undefined}
     */
    this.setKey = function () {
        var curLvl = this.currentLevel - 1;
        this.key = this.solutionList[curLvl];
    };
    /**
     * Defineix a la seva matriu el temps emprat per completar el nivell actual.
     * 
     * @returns {undefined}
     */
    this.setTime = function () {
        if (this.currentLevel > 0) {
            console.log('time set for level: ' + this.currentLevel)
            this.timeCounter[this.currentLevel] = window.timeCount;
            window.timeCount = "0";
            document.querySelector('#time').innerHTML = window.timeCount;
        }
    };
    /**
     * Defineix el nivell en què es troba l'aplicació de forma automàtica.
     * 
     * @returns {undefined}
     */
    this.setCurrentLevel = function () {
        this.setTime();
        if (this.currentLevel === 4) {
            this.gameOver();
        }
        this.currentLevel < 4 ? 
                this.currentLevel++ : 
                this.currentLevel = 1;
        this.completedLevel = false;
    };
    /**
     * Funció per controlar quan el joc acaba.
     * 
     * @returns {undefined}
     */
    this.gameOver = function () {
        this.showTimeCount();
    };
    /**
     * Funció que carrega el nivell en què es troba l'aplicació.
     * 
     * @returns {undefined}
     */
    this.loadLevel = function () {
        var nodeList = document.querySelectorAll('.level');
        var currLvl = this.currentLevel - 1;
        var solutions = this.solutionList;
        
        console.log('loading current level: ' + this.currentLevel);
        for (var counter = 0; 
            counter < solutions.length; 
            counter++) {
                
            console.log('node to hide: ' + nodeList[counter].id);
            var nodeToHide = nodeList[counter];
            nodeToHide.classList.add('hidden');
            
        }
        nodeList[currLvl].classList.remove('hidden');
    };
}

function FigureSet() {
    var folder = 'img/figure/';
    var ext = '.png';
    this.circle = new Figure(folder, "circle", ext);
    this.square = new Figure(folder, "square", ext);
    this.triangle = new Figure(folder, "triangle", ext);
    this.diamond = new Figure(folder, "diamond", ext);
}

function FigureGame() {
    this.gameHandler = new Game();
    this.correctDrop = function () {
        if(figureGame.figureToCopy.id === figureGame.gameHandler.key.name)
            return true;
        return false;
    }
    // FUNCIONS MANEGADORES DE L'API DRAG'N'DROP
    this.playerDragStart = function (e) { // AL COGER UN ELEMENTO DRAGNDROP
        // e.target o this és l'origen
        if (!e.target.classList.contains('pick')) {
            e.target.classList.add('pick');
            figureGame.figureToCopy = e.target;
        }

        console.log(e.target.id + ' drag start: ' + e.target.classList.toString()
                + '; img id=' + figureGame.figureToCopy.id);
    };

    this.playerDragEnd = function (e) { // LO QUE LE PASA AL ELEMENTO QUE HAS COGIDO CUANDO LO SUELTAS

        //e.target o this és l'origen
        e.target.classList.remove('pick');
        e.target.classList.remove('over');
        console.log('dragend ' + e.target.id + ': ' + e.target.classList.toString());

    };

    this.systemDragEnter = function (e) { // AL ENTRAR EN EL "TERRITORIO" DE OTRO ELEMENTO DRAGNDROP
        //e.target o this és el desti
        if (e.target.id === 'b04') {
            e.target.classList.add('over'); // le pone la clase over al div para q el css haga algo
            console.log('drag enter ' + e.target.id + ': ' + e.target.classList.toString() + 
                    '; current level: ' + figureGame.gameHandler.currentLevel);
        }

    };

    this.systemDragOver = function (e) { // AL PASAR POR ENCIMA DE OTRO ELEMENTO DRAGNDROP
        // e.target o this és el desti

        if (e.target.classList.contains("system")) {
            if (e.preventDefault) {
                // evita otras movidas del comportamiento de la página, como los hipervínculos 
                // (sino alomejor al pasar por encima te envia para otra página, y no queremos eso D: )
                e.preventDefault();
            }

            e.dataTransfer.dropEffect = 'move';
            console.log(e.target.id + ' drag over: ' + e.target.classList.toString() + '; ' +
                    figureGame.figureToCopy.id + ' to copy');
            return false;
        }
    };

    this.systemDragLeave = function (e) { // AL SALIR DEL "TERRITORIO" DE OTRO ELEMENTO DRAGNDROP
        //e.target o this és el desti
        e.target.classList.remove('over'); // le quita la clase over al div para q el css haga algo

        console.log('drag leave ' + e.target.id + ': ' + e.target.classList.toString());
    };

    this.systemDrop = function (e) { // LO QUE LE PASA AL ELEMENTO EN EL CUAL SUELTAS LA MOVIDA
        //e.target o this és el desti
        
        if ((e.target.id === 'b04') &&
                figureGame.correctDrop()) {

            console.log(figureGame.figureToCopy);
            figureGame.figureToCopy.classList.remove('pick');
            e.target.appendChild(figureGame.figureToCopy.cloneNode());
            //e.target.childNodes[1].setAttribute("draggable", false);
            //e.target.childNodes[0].setAttribute("draggable", false);

            if (e.stopPropagation) {
                e.stopPropagation();
            }

            figureGame.gameHandler.completedLevel = true;
            figureGame.gameHandler.pause();
            
            console.log('drop on ' + e.target.id + ': ' + e.target.classList.toString());
        } else if (!figureGame.correctDrop()) {
            window.timeCount += 5;
        }

        e.target.classList.remove('over');

    };
}