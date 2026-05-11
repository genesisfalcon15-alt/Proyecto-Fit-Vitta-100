// función para obetener recomendaciones segun el imc
console.log("BACKEND URL:", import.meta.env.VITE_BACKEND_URL);

export const fetchRutinaIA = async (imc, dias) => {
  const apiUrl = `${import.meta.env.VITE_BACKEND_URL}/api/rutina-ia`;

  try {
    // se crea la url del endpoint utilizando varibles de entorno
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json", //envio json
      },
      body: JSON.stringify({
        imc: imc, // aqui ya se envia el imc dentro del body
        dias: dias,
      }),
    });
    // viene el error en caso de que la respuesta no sea ok
    if (!response.ok) {
      throw new Error("Error al conectar con Vitta AI");
    }
    // se convierte esta respuesta a json
    const data = await response.json();
    // se devuelven los datos tal cual vienen del back
    return data;
  } catch (error) {
    console.error("Fallo en la comunicación con la IA:", error);
    throw error;
  }
};

export const fetchNutricionIA = async (imc) => {
  try {
    //peti al endpoint de nutrición del back
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/nutri-bot`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          imc: imc,
        }),
      },
    );

    if (!response.ok) {
      throw new Error("Error al obtener nutrición");
    }
    // se convierten y se devuelven la respuesta json
    return await response.json();
  } catch (error) {
    console.error("Error en fetchNutricionIA:", error);
    return null; // null para que no se rompa
  }
};

export const fetchListaCompraIA = async (imc) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/lista-compra-ia`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          imc: imc,
        }),
      },
    );

    if (!response.ok) {
      throw new Error("Error al obtener lista de compra IA");
    }

    return await response.json();
  } catch (error) {
    console.error("Error en fetchListaCompraIA:", error);
    return null;
  }
};
