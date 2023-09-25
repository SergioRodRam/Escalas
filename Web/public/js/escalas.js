//CONSTANTES
const NOTAS = ['Do','Do#', 'Re', 'Re#', 'Mi', 'Fa', 'Fa#', 'Sol', 'Sol#', 'La', 'La#', 'Si']

//HTML
var notaSelected = document.getElementById("nota-musical")
var escalaSelected = document.getElementById("escala-musical")
var muestraEscala = document.querySelector(".muestra-escala")
var muestraDescription = document.querySelector(".contenedor-descripcion")

//VARIABLES GLOBALES
var arregloEscala = ['Do','Re', 'Mi', 'Fa', 'Sol', 'La', 'Si', 'Do']
var arregloAux = NOTAS.slice()

//ERRORES
const errorEtiqueta = "No existe sección.\nCreando ";

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
function valArray(val_nota){
    //Convertimos la primera letra a mayúscula
    var nota = val_nota[0].toUpperCase() + val_nota.substring(1);

    //Buscando la nota
    var position = NOTAS.indexOf(nota)
    
    for (let i = 0; i < arregloAux.length; i++) {
        if (position == 0) {
            arregloAux = NOTAS.slice()
            return;
        } else {
            if (position == arregloAux.length) {
                position = 0
            }
            
            arregloAux[i] = NOTAS[position]
            position++
        }
    }
}

//Eliminamos una sección
function eliminarSection(eliminarHijos){
    if (eliminarHijos !== null) {
        while (eliminarHijos.hasChildNodes()){
            eliminarHijos.removeChild(eliminarHijos.lastChild);
        }
    }
}

//Agregamos una nota en una sección especifica
function agregarNota(section, texto){
    const item = document.createElement("p");
    item.className = "muestra-escala"

    const text = document.createTextNode(texto);

    item.appendChild(text);
    section.appendChild(item);
}

//Agregamos la descripción de las estructuras
function descripcion(escala, estructura){

    const titulo = document.createElement("h3");
    titulo.className = "titulo-descripcion";

    let text = document.createTextNode("Estructura de la escala "+ escala);
    
    titulo.appendChild(text);

    //Creamos la sección para colocar el parrafo de la estructura
    const parrafo = document.createElement("p");
    parrafo.className = "descripcion";     //Le damos una clase al parrafo

    text = document.createTextNode(estructura); //Especificamos el texto

    parrafo.appendChild(text) //Agregamos el texto a "p"

    try {
        if (!muestraDescription) throw errorEtiqueta+"descripción";
    } catch (error) {
        console.log(error)

        muestraDescription = crearSection(muestraDescription, "contenedor-descripcion flex")
    }finally{
        muestraDescription?.appendChild(titulo) //Agregamos el titulo a la sección 
        muestraDescription?.appendChild(parrafo) //Agregamos el parrafo a la sección 
    }
}

//Crea secciones dentro del main
function crearSection(section, clases){
    //Si no hay ningún div...
    if(section == null){
        //Creamos el elemento/objeto que deseamos
        let creaSection = document.createElement("section");
        
        //Agregamos las clases
        creaSection.className = clases;

        var main = document.querySelector("main")

        main?.appendChild(creaSection);

        section = creaSection;
    }

    return section;
}

function escalaMayor(arreglo, section){

    /*
    Estructura de la escala mayor
    console.log("La estructura de la escala es esta:");
    console.log("Nota -> Tono -> Tono -> Semi -> Tono -> Tono -> Tono -> Semi");
    */

    for (let i = 0; i < arreglo.length-1; i++) {
        if (i >= 3) {
            arreglo[i] = arregloAux[i*2-1]
        }else{
            arreglo[i] = arregloAux[i*2]
        }

        agregarNota(section, arreglo[i])
    }
    arreglo[7] = arregloAux[0]
    agregarNota(section, arreglo[7])
}

function escalaMenorNat(arreglo, section){

    /*
    Estructura de la escala menor natural
    console.log("La estructura de la escala es esta:");
    console.log("Nota -> Tono -> Semi -> Tono -> Tono -> Semi -> Tono -> Tono");
    */

    for (let i = 0, potencia = 0; i < arreglo.length-1; i++) {
        if (i < 2) {
            arreglo[i] = arregloAux[i*2]
        }else{
            if (i >= 5) {
                potencia=1
            }
            arreglo[i] = arregloAux[i*2-Math.pow(2,potencia)]
        }
    
        agregarNota(section, arreglo[i])
    }
    arreglo[7] = arregloAux[0]
    agregarNota(section, arreglo[7])
}

function escalaMenorHar(arreglo, section){

    /*
    Estructura de la escala menor harmonica
    console.log("La estructura de la escala es esta:");
    console.log("Nota -> Tono -> Semi -> Tono -> Tono -> Semi -> Tono y 1/2 -> Semi");
    */

    // @ts-ignore
    // @ts-ignore
    for (let i = 0, potencia = 0; i < arreglo.length-1; i++) {
        if (i < 2) {
            arreglo[i] = arregloAux[2*i]
        }else{
            if (i == 5) {
                arreglo[i] = arregloAux[2*(i-1)]
            }else{
                arreglo[i] = arregloAux[2*i-1]
            }
        }
        agregarNota(section, arreglo[i])
    }
    
    arreglo[7] = arregloAux[0]
    agregarNota(section, arreglo[7])
}

function escalaMenorMelAsc(arreglo, section){

    /*
    Estructura de la escala menor melódica ascendente
    console.log("La estructura de la escala es esta:");
    console.log("Nota -> Tono -> Semi -> Tono -> Tono -> Tono -> Tono -> Semi");
    */

    // @ts-ignore
    // @ts-ignore
    for (let i = 0, potencia = 0; i < arreglo.length-1; i++) {
        if (i < 2) {
            arreglo[i] = arregloAux[2*i]
        }else{
            arreglo[i] = arregloAux[2*i-1]
        }
        agregarNota(section, arreglo[i])
    }
    
    arreglo[7] = arregloAux[0]
    agregarNota(section, arreglo[7])
}

function escalaMenorMelDes(arreglo, section){

    /*
    Estructura de la escala menor melódica descendente
    console.log("La estructura de la escala es esta:");
    console.log("Nota -> Tono -> Tono -> Semi -> Tono -> Tono -> Semi -> Tono");
    */

    // @ts-ignore
    // @ts-ignore
    for (let i = 0, potencia = 0; i < arreglo.length-1; i++) {
        if (i < 3) {
            arreglo[i] = arregloAux[2*i]
        }else{
            if (i == 6) {
                arreglo[i] = arregloAux[2*(i-1)]
            } else {
                arreglo[i] = arregloAux[2*i-1]
            }
        }
        agregarNota(section, arreglo[i])
    }

    arreglo[7] = arregloAux[0]
    agregarNota(section, arreglo[7])
}

function desplegarEscala(){

    // @ts-ignore
    var escala = notaSelected.options[notaSelected.selectedIndex].value
    
    // @ts-ignore
    var tipoEscala = escalaSelected.options[escalaSelected.selectedIndex].value

    //Es el separador que se mostrara en la descripción(Código unicode)
    const separador = "\u{2192}"

    //Validar el arreglo
    valArray(escala)
    
    //Validar sección donde se muestran las escalas
    try {
        if (!muestraEscala) throw errorEtiqueta+"Muestra escala";
    } catch (error) {
        console.log(error)

        muestraEscala = crearSection(muestraEscala, "muestra-escala tarjeta flex")
    }
    
    //Eliminar los hijos del HTML
    eliminarSection(muestraEscala)
    eliminarSection(muestraDescription)

    switch (tipoEscala) {
        case "Mayor":
            escalaMayor(arregloEscala, muestraEscala)
            descripcion(tipoEscala, "Nota "+separador+ " Tono "+separador+ " Tono "+separador+ " Semi "+separador+ " Tono "+separador+ " Tono "+separador+ " Tono "+separador+ " Semi")
            break;
        case "Menor Natural":
            escalaMenorNat(arregloEscala, muestraEscala)
            descripcion(tipoEscala, "Nota "+separador+ " Tono "+separador+ " Semi "+separador+ " Tono "+separador+ " Tono "+separador+ " Semi "+separador+ " Tono "+separador+ " Tono")
            break;
        case "Menor Harmonica":
            escalaMenorHar(arregloEscala, muestraEscala)
            descripcion(tipoEscala, "Nota "+separador+ " Tono "+separador+ " Semi "+separador+ " Tono "+separador+ " Tono "+separador+ " Semi "+separador+ " Tono y 1/2 "+separador+ " Semi")
            break;
        case "Menor Melódica Ascendente":
            escalaMenorMelAsc(arregloEscala, muestraEscala)
            descripcion(tipoEscala, "Nota "+separador+ " Tono "+separador+ " Semi "+separador+ " Tono "+separador+ " Tono "+separador+ " Tono "+separador+ " Tono "+separador+ " Semi")
            break;
        case "Menor Melódica Descendente":
            escalaMenorMelDes(arregloEscala, muestraEscala)
            descripcion(tipoEscala, "Nota "+separador+ " Tono "+separador+ " Tono "+separador+ " Semi "+separador+ " Tono "+separador+ " Tono "+separador+ " Semi "+separador+ " Tono")
            break;
        default:
            alert("Error al seleccionar la opción")
            break;
    }
}

desplegarEscala();