// 1. Lista de amigos
let listaAmigos = []
const inputAmigos = document.getElementById('amigo')
const elementoListadoAmigos = document.getElementById('listaAmigos')
const elementoResultadoSorteo = document.getElementById('resultado')
const elementoModalOverlay = document.getElementById('modal-overlay')
const elementoModal = document.getElementById('modal')
const elementoModalBoton = document.getElementById('modal-boton')

/* Eventos */
inputAmigos.addEventListener(
  'keyup',
  event => {
    if (event.code === 'Enter') {
      AgregarAmigo()
    }
  }
)

// 2. Función para agregar amigos
/**
 * 
 * @returns 
 */
const AgregarAmigo = () => {
  console.log(inputAmigos.value);

  if (!inputAmigos.value) {
    inputAmigos.setAttribute('placeholder', 'Ingresa un nombre adecuado.')
    inputAmigos.classList.add('error')
    return
  }
  ActualizarListadoAmigos()
}

const SortearAmigo = () => {
  elementoResultadoSorteo.innerHTML = ''
  const pElemento = document.createElement('p')
  elementoResultadoSorteo.appendChild(pElemento)
  if (listaAmigos.length === 0) {
    pElemento.innerHTML = 'Ya has sorteado todos los amigos.'
    return
  }

  const indiceAmigoElegido = parseInt(Math.floor(Math.random() * listaAmigos.length))
  const amigoElegido = listaAmigos[indiceAmigoElegido]

  AbrirModal(pElemento, { amigoElegido })
  listaAmigos.splice(indiceAmigoElegido, 1)
  console.log(listaAmigos);

  ActualizarListadoAmigos()
}

const ActualizarListadoAmigos = () => {
  if (inputAmigos.value) {
    listaAmigos.push(inputAmigos.value)
  }

  /* debugger */
  elementoListadoAmigos.innerHTML = ''

  listaAmigos.map((amigo, index) => {
    let list = document.createElement('li')

    console.log(`El listado de amigos array es de: ${listaAmigos.length}`)
    console.log(listaAmigos);


    elementoListadoAmigos.appendChild(list)
    list.classList.add('friend-list')
    list.innerHTML = `${amigo}`
  })
  inputAmigos.focus()
  LimpiarElemento(inputAmigos)
}

/**
 * 
 * @param {HTMLElement} elemento 
 */
const LimpiarElemento = (elemento) => {
  elemento.value = ''
  elemento.classList.remove('error')
  elemento.innerHTML = ''
}

/**
 * 
 * @param {HTMLElement} elemento 
 */
const AlternarEstadoElemento = (elemento) => {
  elemento.toggleAttribute('disabled')
}

const AlternarListaClases = (elemento) => {
  if (elemento.classList.contains('disabled')) {
    elemento.classList.remove('disabled')
    elemento.classList.add('enabled')
  } else if (elemento.classList.contains('enabled')) {
    elemento.classList.remove('enabled')
    elemento.classList.add('disabled')
  } else {
    elemento.classList.remove('disabled')
    elemento.classList.add('enabled')
  }
}

const AbrirModal = (contenido, properties) => {
  let { amigoElegido } = properties
  AlternarListaClases(elementoModalOverlay)
  AlternarListaClases(elementoModal)
  AlternarListaClases(elementoModalBoton)

  contenido.innerHTML = `<p class='modal-text'>Tu amigo secreto es: <br/> <strong>${amigoElegido}</strong></p>`
  return
}

const CerrarModal = () => {
  AlternarListaClases(elementoModalOverlay)
  AlternarListaClases(elementoModal)
  AlternarListaClases(elementoModalBoton)
  return
}

CerrarModal()

elementoModal.addEventListener('touchstart', CerrarModal())