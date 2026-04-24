import os
import json
from flask import request, jsonify, Blueprint
from groq import Groq
from api.prompts.fitness_prompt import FITNESS_SYSTEM_PROMPT
from api.prompts.nutricion_prompt import NUTRI_SYSTEM_PROMPT
from dotenv import load_dotenv
# punto de carga para las variables del archivo .env
load_dotenv()

ia_api = Blueprint('ia_api', __name__)

print("GROQ KEY:", os.getenv("GROQ_API_KEY"))
client = Groq(api_key=os.getenv('GROQ_API_KEY'))

@ia_api.route('/rutina-ia', methods=['POST'])
def generar_rutina():
    # se obtiene el json enviado desde el frontend
    data = request.get_json()

    # aqui se extrae el imc, si no viene se usa 22 como valor por defecto
    imc = data.get('imc', '22')
    dias = data.get('dias', 3)
    
    try:
        completion = client.chat.completions.create(
            model="llama-3.1-8b-instant",
            messages=[
                # prompt para comportamiento general de ia
                {"role": "system", "content": FITNESS_SYSTEM_PROMPT},

                # mensaje del usuario con el dato dinámico imc
                {"role": "user", "content": f"Mi IMC es {imc} y entreno {dias} días por semana. Dame mi rutina en JSON."}
            ],
            # la respuesta se pide en json
            response_format={"type": "json_object"}
        )

        # ia devuelve un string y aquí se convierte  a json
        rutina_json = json.loads(completion.choices[0].message.content)

        return jsonify(rutina_json), 200

    except Exception as e:
        # si ocurre algún error se muestra en consola
        print(f"Error en Groq: {e}")

        return jsonify({"error": str(e)}), 500
    


@ia_api.route('/nutri-bot', methods=['POST'])
def generar_nutricion():
    # aqui se reciben los datos enviados desde el frontend
    data = request.get_json()

    imc = data.get('imc', '22')
    
    try:
        # llamo a la ia para generar consejo nutricionales
        completion = client.chat.completions.create(
            model="llama-3.1-8b-instant",
            messages=[
                # prompt de nutrición
                {"role": "system", "content": NUTRI_SYSTEM_PROMPT},

                {"role": "user", "content": f"Mi IMC es {imc}. Dame un consejo nutricional en JSON."}
            ],
            response_format={"type": "json_object"}
        )

        # se devuelve una respuesta directa de la ia
        nutri_json = json.loads(completion.choices[0].message.content)
        return jsonify(nutri_json), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500