import API_URL from "../api/apiMes";

export const listarMeses = async () => {
  const respuesta = await fetch(API_URL);
  return await respuesta.json();
};

export const buscarMesPorId = async (id) => {
  const respuesta = await fetch(`${API_URL}/${id}`);

  if (!respuesta.ok) {
    throw new Error("No se encontró el mes");
  }

  return await respuesta.json();
};

export const guardarMes = async (mes) => {
  const respuesta = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(mes),
  });

  return await respuesta.json();
};

export const actualizarMes = async (id, mes) => {
  const respuesta = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(mes),
  });

  return await respuesta.json();
};

export const eliminarMes = async (id) => {
  await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
};