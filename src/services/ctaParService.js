import API_URL from "../api/apiCtaPar";

async function handleResponse(response, errorMessage) {
  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || errorMessage || `Error ${response.status}`);
  }
  if (response.status === 204) {
    return null;
  }
  return await response.json();
}

export const listarCtaPar = async () => {
  const response = await fetch(API_URL);
  return await handleResponse(response, "No se pudieron cargar los registros");
};

export const buscarCtaParPorId = async (id) => {
  const response = await fetch(`${API_URL}/${id}`);
  return await handleResponse(response, "No se encontró el registro");
};

export const guardarCtaPar = async (ctaPar) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(ctaPar),
  });
  return await handleResponse(response, "No se pudo guardar el registro");
};

export const actualizarCtaPar = async (id, ctaPar) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(ctaPar),
  });
  return await handleResponse(response, "No se pudo actualizar el registro");
};

export const eliminarCtaPar = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  return await handleResponse(response, "No se pudo eliminar el registro");
};