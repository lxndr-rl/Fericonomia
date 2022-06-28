import { createContext } from "react"


const Datos = {
  productos: [
    {
      id: 1,
      nombre: "Bolones de rojo",
      imagen_url: "https://www.laylita.com/recetas/wp-content/uploads/2012/03/Receta-del-bolon-de-verde-ecuatoriano-1024x683.jpg",
      costo: 2.35,
      recursos: [
        {
          nombre: "MPD 1",
          tipo: "materia",
          esCostoDirecto: true,
          unidad: "unidad",
          cantidad: 3,
          unidadCosto: 0.1,
        },
        {
          nombre: "MPD 2",
          tipo: "materia",
          esCostoDirecto: true,
          unidad: "kilo",
          cantidad: 2.5,
          unidadCosto: 1.1,
        },
        {
          nombre: "MPi 1",
          tipo: "materia",
          esCostoDirecto: false,
          unidad: "kilo",
          cantidad: 4,
          unidadCosto: 1.5,
        },
        {
          nombre: "MPi 2",
          tipo: "materia",
          esCostoDirecto: false,
          unidad: "kilo",
          cantidad: 3.33333333333,
          unidadCosto: 1.6,
        },
        {
          nombre: "Tarea 1",
          tipo: "manoObra",
          esCostoDirecto: true,
          unidad: "hora",
          cantidad: 2.5,
          personasCantidad: 2,
        },
        {
          nombre: "Tarea 2",
          tipo: "manoObra",
          esCostoDirecto: true,
          unidad: "hora",
          cantidad: 1,
          personasCantidad: 3,
        },
        {
          nombre: "Tarea 3",
          tipo: "manoObra",
          esCostoDirecto: false,
          unidad: "hora",
          cantidad: 25/60,
          personasCantidad: 1,
        },
        {
          nombre: "Tarea 4",
          tipo: "manoObra",
          esCostoDirecto: false,
          unidad: "hora",
          cantidad: 0.75,
          personasCantidad: 2,
        },
      ]
    },
    {
      id: 2,
      nombre: "Bolones de verde",
      imagen_url: "https://www.laylita.com/recetas/wp-content/uploads/2012/03/Receta-del-bolon-de-verde-ecuatoriano-1024x683.jpg",
      costo: 2.35,
      recursos: [
        {
          nombre: "huevo",
          tipo: "materia",
          esCostoDirecto: true,
          unidad: "unidad",
          cantidad: 3,
          unidadCosto: 0.1,
        },
        {
          nombre: "Harina",
          tipo: "materia",
          esCostoDirecto: true,
          unidad: "kilo",
          cantidad: 2.5,
          unidadCosto: 1.1,
        },
      ]
    },
    {
      id: 3,
      nombre: "Bolones de azul",
      imagen_url: "https://www.laylita.com/recetas/wp-content/uploads/2012/03/Receta-del-bolon-de-verde-ecuatoriano-1024x683.jpg",
      costo: 2.35,
      recursos: [
        {
          nombre: "huevo",
          tipo: "materia",
          esCostoDirecto: true,
          unidad: "unidad",
          cantidad: 3,
          unidadCosto: 0.1,
        },
        {
          nombre: "Harina",
          tipo: "materia",
          esCostoDirecto: true,
          unidad: "kilo",
          cantidad: 2.5,
          unidadCosto: 1.1,
        },
        // TODO Desgloce de servicios básicos y otros costos indirectos como el arriendo
      ]
    },
  ],
  parametros: {
    sueldoMinimoHora: 425/240,
    valorWattHora: 0.095/1000,
    valorAgua_m3: 0, // TODO Poner valor correcto
  },
}


export const DataContext = createContext({
  get: () => Datos,
  set: (_datos) => { Datos = _datos },
})
