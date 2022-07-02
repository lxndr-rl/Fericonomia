import { createContext } from "react"


export const Datos = {
  productos: [
    {
      id: 1,
      nombre: "Bolones de rojo",
      imagen_url: "https://www.laylita.com/recetas/wp-content/uploads/2012/03/Receta-del-bolon-de-verde-ecuatoriano-1024x683.jpg",
      costo: 2.35, /* TODO Valor calculado. Se debe IGNORAR... */
      cantidad: 100,
      margenUtilidad: 0.7,
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
        {
          nombre: "Consumo Agua 1",
          tipo: "otro",
          esCostoDirecto: false,
          unidad: "litro",
          cantidad: 150,
        },
        {
          nombre: "Consumo Luz 1",
          tipo: "otro",
          esCostoDirecto: false,
          unidad: "watt",
          cantidad: 200,
        },
        {
          nombre: "Arriendo",
          tipo: "otro",
          esCostoDirecto: false,
          unidad: "mes",
          costo: 350,
        },
      ]
    },
    {
      id: 2,
      nombre: "Bolones de verde",
      imagen_url: "https://www.laylita.com/recetas/wp-content/uploads/2012/03/Receta-del-bolon-de-verde-ecuatoriano-1024x683.jpg",
      costo: 2.35,
      cantidad: 50,
      margenUtilidad: 0.7,
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
      cantidad: 25,
      margenUtilidad: 0.7,
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
        /* TODO Desgloce de servicios básicos y otros costos indirectos como el arriendo */
      ]
    },
  ],
  parametros: {
    sueldoMinimoHora: 425/240,
    valorWattHora: 0.095/1000,
    valorAgua_litro: 0.332/1000,
  },
}


export const DataContext = createContext({
  get: () => Datos,
  set: (_datos) => { Datos = _datos },
})
