import { Datos } from "./DataContext"

export const dolares = (cantidad, redondearDigitos=2) => 
    `$ ${ cantidad.toFixed(redondearDigitos) }`

export const calcularSubtotalRecurso = (recurso) => {
    //const costoServicioBasico = calcularCostoServicioBásico(recurso)

    if (recurso.unidad === "watt") {
        return recurso.cantidad * Datos.parametros.valorWattHora
    }
    if (recurso.unidad === "litro") {
        return recurso.cantidad * Datos.parametros.valorAgua_litro
    }
    if (recurso.tipo === "manoObra") {
        return Datos.parametros.sueldoMinimoHora * recurso.cantidad * recurso.personasCantidad
    }
    if (recurso.tipo !== "otro" && !recurso.esDirecto) {
        return recurso.unidadCosto * recurso.cantidad
    }
    if (recurso.costo) {
        return recurso.costo
    }
    return 0
    // TODO Agregar otros valores que puedan totalizar
    }

// TODO Subtotales de costos segú sea. Uno para cada tipo
// - Directo: Mano obra, materias
// - Indirecto: Mano obra, materias, otros
