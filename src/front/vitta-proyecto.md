# Proyecto VITTA: 

Nutrición Inteligente y Ahorro Consciente#

En este documento, detallamos la investigación, el rediseño de marca y las decisiones técnicas que implementamos en la fase inicial del proyecto **VITTA**.

## Rebranding e Identidad Visual
Tras un estudio de todo el concepto inicial, hemos migrado de una estética puramente tecnológica y básica a una **identidad bio-orgánica actualizada **

### Visión del Diseño
* **Logotipo:** Se ha simplificado al máximo eliminando cápsulas y elementos no necesarios para el desarrollo.
 La palabra **VITTA** en mayúsculas transmite solidez, mientras que el color verde evoca frescura y salud.

* **Paleta de Colores:** * ”Verde HEX 6E8A4F RGBA 110, 138,79, 100”: Color principal para algunos botones, letras y estados activos.
*”Marron Camel”: Botones de la pantalla de Bienvenida  /Inicio se Sesión y Registro  HEX 8B572A RGBA 139,87,42,76 *
    * `Blanco Roto`: Fondo para reducir la fatiga visual.
* **Tipografía:** Uso de fuentes ** Poppins* *AbrilFace* con terminaciones suaves para mejorar la legibilidad en dispositivos móviles.


## 2. Aplicación de la Sucesión de Fibonacci

Para dotar a la interfaz de una armonía natural, hemos integrado la lógica de Fibonacci en dos niveles:

. **Jerarquía Visual:** El escalado de las tarjetas de información y los márgenes siguen proporciones basadas en la serie ($1, 2, 3, 5, 8...$), creando un equilibrio visual subconsciente. 
“ El diseño de nuestra app Vitta, no es aleatorio, utilizamos reglas matemáticas”



## 3. Estrategia de Almacenamiento de Datos

Para que VITTA sea una aplicación funcional, hemos definido tres niveles de persistencia de datos:

| Tipo de Almacenamiento | Uso en VITTA | Persistencia |
| :--- | :--- | :--- |
| **Variable en Memoria** | Cálculos temporales del IMC antes de guardar. 
| **SessionStorage** | Filtros de búsqueda durante una compra específica. |
| **LocalStorage** | **Perfil del usuario, Historial de IMC y Ahorro.** | Permanente (se mantiene al cerrar el navegador). | 




## 3. Metodología y control de versiones.

El desarrollo de VITTA se gestiona bajo un sistema de control de versiones distribuido, garantizando la integridad del código y facilitando la escalabilidad del proyecto.
/Herramientas de Desarrollo/
<Editor de Código> : Visual Estudio Code.
“Repositorios y guia del proyecto” Git Hub (“gestión de despliegues, automatización, issues”lista de tareas, errores o mejoras” .



## 4. Flujo de Git (Git Workflow).
Actualmente, el proyecto se encuentra en fase de Prototipado Inicial, utilizando un modelo simplificado que evolucionará conforme crezca el equipo: 
“Fase Actual “ (Single Branch)
De momento, usamos la rama main para commits directos.
*Comandos frecuentes*
 $git add.
$git commit -m 
$ git push origin —
* Este documento ha sido desarrollado por el equipo de desarrollo de  VITTA*
/Abril 2026/