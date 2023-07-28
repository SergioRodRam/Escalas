## PROGRAMA PARA OBTENER LAS ESCALAS MUSICALES

##CONSTANTES
NOTAS = ['Do','Do#', 'Re', 'Re#', 'Mi', 'Fa', 'Fa#', 'Sol', 'Sol#', 'La', 'La#', 'Si']

##VARIABLES GLOBALES
arregloEscalaMayor = ['Do','Re', 'Mi', 'Fa', 'Sol', 'La', 'Si', 'Do']

def valNota(val_nota):
    nota = val_nota.capitalize()

    #Buscando la nota
    inicio = 0
    while(NOTAS[inicio] != nota):
        inicio += 1

    return inicio

def escalaMayor(escala):
    
    #Validar la nota
    inicio = valNota(escala)

    #Estructura de la escala
    print("La estructura de la escala es esta:")
    print("Nota -> Tono -> Tono -> Semi -> Tono -> Tono -> Tono -> Semi")
    
    #Inicializamos la escala
    arregloEscalaMayor[0] = NOTAS[inicio]
    arregloEscalaMayor[1] = NOTAS[inicio-10]
    arregloEscalaMayor[2] = NOTAS[inicio-8]
    arregloEscalaMayor[3] = NOTAS[inicio-7]
    arregloEscalaMayor[4] = NOTAS[inicio-5]
    arregloEscalaMayor[5] = NOTAS[inicio-3]
    arregloEscalaMayor[6] = NOTAS[inicio-1]
    arregloEscalaMayor[7] = NOTAS[inicio]
    
    #Imprimir la escala
    for i in range(0, len(arregloEscalaMayor), 1):
        print(arregloEscalaMayor[i], end="\t")

def escalaMenor(escala):
    
    #Validar la nota
    inicio = valNota(escala)

    #Estructura de la escala
    print("La estructura de la escala menor natural es esta:")
    print("Nota -> Tono -> Semi -> Tono -> Tono -> Semi -> Tono -> Tono")
    
    #Inicializamos la escala
    arregloEscalaMayor[0] = NOTAS[inicio]
    arregloEscalaMayor[1] = NOTAS[inicio-10]
    arregloEscalaMayor[2] = NOTAS[inicio-8]
    arregloEscalaMayor[3] = NOTAS[inicio-7]
    arregloEscalaMayor[4] = NOTAS[inicio-5]
    arregloEscalaMayor[5] = NOTAS[inicio-3]
    arregloEscalaMayor[6] = NOTAS[inicio-1]
    arregloEscalaMayor[7] = NOTAS[inicio]
    
    #Imprimir la escala
    for i in range(0, len(arregloEscalaMayor), 1):
        print(arregloEscalaMayor[i], end="\t")
        # print(end=" ")


escalaMayor('Sol')