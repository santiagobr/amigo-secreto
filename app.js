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

  if (listaAmigos.length > 0) {
    elementoListadoAmigos.style.width = '525px'
  } else {
    elementoListadoAmigos.style.width = '0'
  }
  elementoListadoAmigos.innerHTML = ''

  listaAmigos.map((amigo, index) => {
    let list = document.createElement('li')

    console.log(`El listado de amigos array es de: ${listaAmigos.length}`)
    console.log(listaAmigos);


    elementoListadoAmigos.appendChild(list)
    list.classList.add('friend-list')

    list.innerHTML = `${amigo} <img src='assets/basura.svg' class='delete' onclick='EliminarAmigo(${index})'>`
  })
  inputAmigos.focus()
  LimpiarElemento(inputAmigos)
}

/**
 * 
 * @param {Integer} index 
 */
const EliminarAmigo = (index) => {
  listaAmigos.splice(index, 1)
  ActualizarListadoAmigos()
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

/**
 * 
 * @param {HTMLElement} contenido 
 * @param {Object} properties 
 * @returns 
 */
const AbrirModal = (contenido, properties) => {
  let { amigoElegido } = properties
  //debugger
  console.log('abrir modal')
  elementoModalOverlay.style.display = 'block'
  elementoModal.style.display = 'flex'
  elementoModalBoton.style.display = 'block'

  contenido.innerHTML = `<p class='modal-text'>Tu amigo secreto es: <br/> <strong>${amigoElegido}</strong></p>`
  return
}

const CerrarModal = () => {
  //debugger
  console.log('cerrar modal')
  elementoModalOverlay.style.display = 'none'
  elementoModal.style.display = 'none'
  elementoModalBoton.style.display = 'none'
  return
}

const ReiniciarSorteo = () => {
  listaAmigos = []
  ActualizarListadoAmigos()
  elementoResultadoSorteo.innerHTML = ''
}