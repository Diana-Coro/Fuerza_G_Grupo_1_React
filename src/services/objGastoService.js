import API_URL from "../api/apiObjGasto";

export const listarObjGastos = async () => {
  const respuesta = await fetch(API_URL);
  return await respuesta.json();
};

export const buscarObjGastoPorId = async (id) => {
  const respuesta = await fetch(`${API_URL}/${id}`);

  if (!respuesta.ok) {
    throw new Error("No se encontró el objeto de gasto");
  }

  return await respuesta.json();
};

export const guardarObjGasto = async (objGasto) => {
  const respuesta = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(objGasto),
  });

  return await respuesta.json();
};

export const actualizarObjGasto = async (id, objGasto) => {
  const respuesta = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(objGasto),
  });

  return await respuesta.json();
};

export const eliminarObjGasto = async (id) => {
  await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
};