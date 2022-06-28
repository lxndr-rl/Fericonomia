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
        {
          nombre: "Batir los huevos",
          tipo: "manoObra",
          esCostoDirecto: true,
          unidad: "hora",
          cantidad: 2.5,
          personasCantidad: 2,
          unidadCosto: 1.1,
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
      ]
    },
  ]
}


export const DataContext = createContext({
  get: () => Datos,
  set: (_datos) => { Datos = _datos },
})
