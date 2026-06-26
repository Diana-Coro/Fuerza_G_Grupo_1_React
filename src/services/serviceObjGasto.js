import API_URL from "../api/apiObjGasto";

export const listarObjGastos = async () => {
  const respuesta = await fetch(`${API_URL}`);
  return await respuesta.json();
};

export const buscarObjGastoPorPartida = async (partida) => {
  const respuesta = await fetch(`${API_URL}/${partida}`);

  if (!respuesta.ok) {
    throw new Error("No se encontró el objeto de gasto");
  }

  return await respuesta.json();
};

export const guardarObjGasto = async (objGasto) => {
  const respuesta = await fetch(`${API_URL}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(objGasto),
  });

  return await respuesta.json();
};

export const eliminarObjGasto = async (partida) => {
  await fetch(`${API_URL}/${partida}`, {
    method: "DELETE",
  });
};

export const actualizarObjGasto = async (partida, objGasto) => {
  const respuesta = await fetch(`${API_URL}/${partida}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(objGasto),
  });

  return await respuesta.json();
};