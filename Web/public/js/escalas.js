//CONSTANTES
const NOTAS = ['Do','Do#', 'Re', 'Re#', 'Mi', 'Fa', 'Fa#', 'Sol', 'Sol#', 'La', 'La#', 'Si']

//HTML
const notaSelected = document.getElementById("nota-musical")
const escalaSelected = document.getElementById("escala-musical")
const muestraEscala = document.querySelector(".muestra-escala")

//VARIABLES GLOBALES
var arregloEscala = ['Do','Re', 'Mi', 'Fa', 'Sol', 'La', 'Si', 'Do']

/*

    var nodoEliminar = document.querySelector(".muestra-escala")
    
    nodoEliminar.removeChild()

    var body = document.querySelector("body")

    var muestraEscala = document.createElement("div")
    muestraEscala.setAttribute("id", "muestra-escala")
    muestraEscala.className = "muestra-escala"

    body.appendChild(muestraEscala);

    //POR HACER
    function crearCajaResumen(){
    //Si no hay ningún div...
    if(div == null){
        //Creamos el elemento/objeto que deseamos, sea <p> o <div> o <form>, etc.
        div = document.createElement("div");
        //DIV tiene la propiedad style, la cual permite acceder a atributos CSS. Ejemplo: div.style.width = "280px"; ...
        div.setAttribute("id", "container");
        div.setAttribute("style", "width: 280px; height: 170px; background-color: #FE775A; position: absolute; top: 20px; left: 20px;");
        //Guardamos en una variable el body, aunque no haría falta, por cada HTML solo existe un body, entonces: "document.body".
        //var body = document.getElementsByTagName("body")[0];
        //Guardamos en una variable el elemento/objeto que deseamos, <center>
        var center = document.getElementsByTagName("center")[0];
        //Insertamos el elemento "div" antes que el "center".
        document.body.insertBefore(div, center);
    }

*/

//Validamos el arreglo
function valArray(val_nota, aux){
    //Convertimos la primera letra a mayúscula
    var nota = val_nota[0].toUpperCase() + val_nota.substring(1);

    //Buscando la nota
    var position = NOTAS.indexOf(nota)
    
    for (let i = 0; i < aux.length; i++) {
        if (position == 0) {
            i = aux.length
            aux = NOTAS.slice()
        } else {
            if (position == aux.length) {
                position = 0
            }
            aux[i] = NOTAS[position]
            position++
        }
    }
}

function eliminarMostrar(eliminarHijos){
    if (eliminarHijos !== null) {
        while (eliminarHijos.hasChildNodes()){
            eliminarHijos.removeChild(eliminarHijos.lastChild);
        }
    } else {
        alert("La etiqueta no existe")
    }
}

function agregarNota(section, texto){
    const item = document.createElement("p");
    item.className = "muestra-escala"

    const text = document.createTextNode(texto);

    item.appendChild(text);
    section.appendChild(item);
}

function escalaMayor(arreglo, aux, muestra){

    /*
    Estructura de la escala mayor
    console.log("La estructura de la escala es esta:");
    console.log("Nota -> Tono -> Tono -> Semi -> Tono -> Tono -> Tono -> Semi");
    */

    for (let i = 0; i < arreglo.length-1; i++) {
        if (i >= 3) {
            arreglo[i] = aux[i*2-1]
        }else{
            arreglo[i] = aux[i*2]
        }

        agregarNota(muestra, arreglo[i])
    }
    arreglo[7] = aux[0]
    agregarNota(muestra, arreglo[7])
}

function escalaMenorN(arreglo, aux, muestra){

    /*
    Estructura de la escala menor natural
    console.log("La estructura de la escala es esta:");
    console.log("Nota -> Tono -> Semi -> Tono -> Tono -> Semi -> Tono -> Tono");
    */

    for (let i = 0, potencia = 0; i < arreglo.length-1; i++) {
        if (i < 2) {
            arreglo[i] = aux[i*2]
        }else{
            if (i >= 5) {
                potencia=1
            }
            arreglo[i] = aux[i*2-Math.pow(2,potencia)]
        }
    
        agregarNota(muestra, arreglo[i])
    }
    arreglo[7] = aux[0]
    agregarNota(muestra, arreglo[7])
}

function escalaMenorH(arreglo, aux, muestra){

    /*
    Estructura de la escala menor natural
    console.log("La estructura de la escala es esta:");
    console.log("Nota -> Tono -> Semi -> Tono -> Tono -> Semi -> Tono y 1/2 -> Semi");
    */

    for (let i = 0, potencia = 0; i < arreglo.length-1; i++) {
        if (i < 2) {
            arreglo[i] = aux[i*2]
        }else{
            if (i >= 5) {
                potencia=1
            }
            arreglo[i] = aux[i*2-Math.pow(2,potencia)]
        }
    
        agregarNota(muestra, arreglo[i])
    }

    arreglo[0] = aux[0]
    arreglo[1] = aux[2]     //2^1
    arreglo[2] = aux[3]     //2^2-1
    arreglo[3] = aux[5]     //2^3-3
    arreglo[4] = aux[7]
    arreglo[5] = aux[8]
    arreglo[6] = aux[11]

    arreglo[7] = aux[0]
    agregarNota(muestra, arreglo[7])
}

function desplegarEscala(){

    // @ts-ignore
    var escala = notaSelected.options[notaSelected.selectedIndex].value
    // @ts-ignore
    var tipoEscala = escalaSelected.options[escalaSelected.selectedIndex].value
    
    var arregloAux = NOTAS.slice()

    //Validar el arreglo
    valArray(escala, arregloAux)
    
    //Eliminar los hijos del HTML
    eliminarMostrar(muestraEscala)

    switch (tipoEscala) {
        case "Mayor":
            escalaMayor(arregloEscala, arregloAux, muestraEscala)
            break;
        case "MenorN":
            escalaMenorN(arregloEscala, arregloAux, muestraEscala)
            //alert("Escala MenorN")
            break;
        case "MenorH":
            alert("Escala MenorH esta por definir")
            escalaMenorH(arregloEscala, arregloAux, muestraEscala)
            break;
        case "MenorMA":
            alert("Escala MenorMA esta por definir")
            break;
        case "MenorMD":
            alert("Escala MenorMD esta por definir")
            break;
        default:
            alert("Error al seleccionar la opción")
            break;
    }
}

desplegarEscala();
