const API_URL = "http://localhost:3000";

const emocionSelect = document.getElementById("emocionSelect");
const btnBuscar = document.getElementById("btnBuscar");
const listaCanciones = document.getElementById("listaCanciones");


async function cargarEmociones() {
  try {
    const res = await fetch(`${API_URL}/api/emociones`);
    const emociones = await res.json();

    emociones.forEach((emo) => {
      const option = document.createElement("option");
      option.value = emo.nombre; 
      option.textContent = emo.nombre;
      emocionSelect.appendChild(option);
    });
  } catch (error) {
    console.error("Error cargando emociones:", error);
  }
}

// 2️⃣ Buscar canciones por emoción
async function buscarCanciones() {
  const emocion = emocionSelect.value;

  if (!emocion) {
    alert("Por favor selecciona una emoción.");
    return;
  }

  listaCanciones.innerHTML = "<li>Cargando...</li>";

  try {
    const res = await fetch(
      `${API_URL}/api/canciones?emocion=${encodeURIComponent(emocion)}`
    );
    const canciones = await res.json();

    listaCanciones.innerHTML = "";

    if (canciones.length === 0) {
      listaCanciones.innerHTML = "<li>No hay canciones para esta emoción.</li>";
      return;
    }

    canciones.forEach((c) => {
      const li = document.createElement("li");
      li.textContent = `${c.titulo} - ${c.artista} (${c.emocion})`;
      listaCanciones.appendChild(li);
    });
  } catch (error) {
    console.error("Error buscando canciones:", error);
    listaCanciones.innerHTML = "<li>Error al cargar canciones.</li>";
  }
}


btnBuscar.addEventListener("click", buscarCanciones);


cargarEmociones();
