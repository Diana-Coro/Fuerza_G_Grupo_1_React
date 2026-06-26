import API_URL from "../api/apiUnidadAdmin";

export const obtenerUnidades = async () => {
  const response = await fetch(API_URL);
  return await response.json();
};

export const crearUnidad = async (unidad) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(unidad),
  });

  return await response.json();
};

export const actualizarUnidad = async (id, unidad) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(unidad),
  });

  return await response.json();
};

export const eliminarUnidad = async (id) => {
  await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
};