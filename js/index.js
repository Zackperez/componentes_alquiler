import config from './supabase/config.js';

const Modelo = {

  async insertarDatosContenido(nombreAlquiler, huespedesAlquiler, bañosAlquiler, cocinaAlquiler, descripcionAlquiler, imagenAlquiler) {
    const datos_insertar = {
      nombre_alquiler: nombreAlquiler,
      huespedes_alquiler: huespedesAlquiler,
      baños_alquiler: bañosAlquiler,
      cocina_alquiler: cocinaAlquiler,
      descripcion_alquiler: descripcionAlquiler,
      imagen_alquiler: imagenAlquiler
    }

    console.log(datos_insertar)

    const res = await axios({
      method: "POST",
      url: "https://ciyrwbjyrpspcejakytr.supabase.co/rest/v1/alquileres",
      data: datos_insertar,
      headers: config.headers
    });
    return res;
  },

  async mostrarTodosAlquileres() {

    const res = await axios({
      method: "GET",
      url: `https://ciyrwbjyrpspcejakytr.supabase.co/rest/v1/alquileres?select=*`,
      headers: config.headers,
    });
    return res;
  },


}

const Controlador = {

  /* Agregar contenido */
  async mostrarContenidoAgregar() {
    const { nombreAlquiler, huespedesAlquiler, bañosAlquiler, cocinaAlquiler, descripcionAlquiler, imagenAlquiler } = Vista.getDatosContenidoAgregar();
    try {

      const res = await Modelo.insertarDatosContenido(nombreAlquiler, huespedesAlquiler, bañosAlquiler, cocinaAlquiler, descripcionAlquiler, imagenAlquiler);

    } catch (err) {
      Vista.mostrarMensajeError(err);
    }
  },

  async obtenerTodosAlquileres() {
    try {
      const response = await Modelo.mostrarTodosAlquileres();
      console.log(response.data);
      Vista.mostrarInfoContenido(response.data);
    } catch (err) {
      console.log(err);
      Vista.mostrarMensajeError(err);
    }
  },

}

const Vista = {

  mostrarAlbumInfo: function (datos) {
    const paginaGrilla = document.getElementById('paginaGrilla');
    datos.forEach(element => {
      const album = document.createElement('div');
      const tracks = element.tracks;
      var contador = 1;

      let tracksList = "<ul class='album-tracks'>";
      tracks.forEach(track => {
        tracksList += `<li class ="album__track"> ${contador++}. ${track}</li>`;
      });
      tracksList += "</ul>";

      album.classList.add('album')

      album.innerHTML = `
        <div class="album-titulo">
            <h1 class="album__titulo">${element.name} </h1>
        </div>
        <div class="album-tipo">
            <p class="album__tipo"><i class="fa-solid fa-record-vinyl"></i> ${element.type}</p>
        </div>
        <div class="album-fecha">
            <p class="album__fecha"><i class="fa-solid fa-calendar-days"></i> ${element.releaseDate}</p>
        </div>
        <div class="album-pais">
            <p class="album__pais"><i class="fa-solid fa-globe"></i> ${element.country}</p>
        </div>
        <div class="album-cover">
        <img src=" ${element.coverArt} " alt="" class="album__cover">
        </div>  
        <div class="album-contenido">
            <p class="album__contenido">${element.content}</p>
        </div>
        <div class="tracks-titulo">
        <h3 class="titulo">Tracklist</h3>
    </div>
        ${tracksList}
    `;

      paginaGrilla.appendChild(album);


    });
  },

  mostrarInfoContenido: function (data) {
    const listaAlquileres = document.getElementById('listaAlquileres');

    data.forEach(element => {
    const contenido = document.createElement('div');
      contenido.innerHTML = `
      <div class="casa">

        <div class="casa-imagen">
            <div class="top-right">Disponible</div>
            <img src="${element.imagen_alquiler}" class = "casa__imagen" alt="">
        </div>
        <div class="casa-contenido">
            <div class="casa-titulo">
                <p class="casa__titulo">${element.nombre_alquiler}</p>
            </div>

            <div class="casa-info">
                <p>${element.huespedes_alquiler} Huespedes</p>
                <p>${element.cocina_alquiler} Cocina</p>
                <p>${element.baños_alquiler} Baño</p>
            </div>

            <div class="casa-boton">
                <button id="btnAbrirModal" class="boton-1">Mas información</button>
            </div>

        </div>
      </div>
      `

      listaAlquileres.append(contenido);
    });

  },
  /* PAGINA PRINCIPAL */

  getDatosContenidoAgregar: function () {
    const nombreAlquiler = document.getElementById('nombreAlquiler').value;
    const huespedesAlquiler = document.getElementById('huespedesAlquiler').value;
    const bañosAlquiler = document.getElementById('bañosAlquiler').value;
    const cocinaAlquiler = document.getElementById('cocinaAlquiler').value;
    const descripcionAlquiler = document.getElementById('descripcionAlquiler').value;
    const imagenAlquiler = document.getElementById('imagenAlquiler').value;

    return { nombreAlquiler, huespedesAlquiler, bañosAlquiler, cocinaAlquiler, descripcionAlquiler, imagenAlquiler };
  },

  /* MENSAJES DE ERRORES */
  mostrarMensajeError(mensaje) {
    console.log(mensaje);
  }
}

const btnAgregarInformacion = document.getElementById('btnAgregarInformacion');

btnAgregarInformacion.onclick = function () {
  Controlador.mostrarContenidoAgregar();
}


/* MODAL Eliminar */
var modalEliminar = document.getElementById("targetModalInformacion");
var btnAbrirModal = document.getElementById("btnAbrirModal");
var btnCerrarModalEliminar = document.getElementsByClassName("cerrar-modal-informacion")[0];
const btnEliminarDatosModal = document.getElementById('btnEliminarDatosModal');

btnAbrirModal.onclick = function () {
  modalEliminar.style.display = "block";
}

btnCerrarModalEliminar.onclick = function () {
  modalEliminar.style.display = "none";
  const eliminarId = document.getElementById('eliminar-id');
  eliminarId.value = "";
}

window.onclick = function (event) {
  if (event.target == modalEliminar) {
    modalEliminar.style.display = "none";
  }
}

document.addEventListener('DOMContentLoaded', function () {
  Controlador.obtenerTodosAlquileres();
})