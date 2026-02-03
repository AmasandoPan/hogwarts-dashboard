const tabla = document.getElementById("tabla-personajes");
const myModal = new bootstrap.Modal(document.getElementById("charModal"));
const imgDefault = "https://placehold.co/400x600?text=Sin+Foto";

// Cargar listado
document.addEventListener("DOMContentLoaded", () => {
  fetch("https://hp-api.onrender.com/api/characters")
    .then((response) => response.json())
    .then((data) => {
      renderizarTabla(data);
    });
});

function renderizarTabla(personajes) {
  tabla.innerHTML = "";
  personajes.forEach((p) => {
    const row = document.createElement("tr");
    row.innerHTML = `
            <td><img src="${p.image || imgDefault}" class="img-table"></td>
            <td>${p.name}</td>
            <td>${p.house || "Sin casa"}</td>
            <td>${p.species}</td>
            <td>
                <button class="btn btn-primary btn-sm" onclick="verDetalle('${p.id}')">Ver</button>
            </td>
        `;
    tabla.appendChild(row);
  });
}

// ver detalles por ID
function verDetalle(id) {
  fetch(`https://hp-api.onrender.com/api/character/${id}`)
    .then((response) => response.json())
    .then((data) => {
      const p = data[0];
      document.getElementById("modal-nombre").innerText = p.name;
      document.getElementById("modal-img").src = p.image || imgDefault;
      document.getElementById("modal-actor").innerText =
        p.actor || "Desconocido";
      document.getElementById("modal-fecha").innerText =
        p.dateOfBirth || "Desconocido";
      document.getElementById("modal-patronus").innerText =
        p.patronus || "Desconocido";

      myModal.show();
    });
}
