export const dolares = (cantidad, redondearDigitos = 2) =>
  `$ ${cantidad.toFixed(redondearDigitos)}`;

/**
 * @param {{
 *      tipo: String,
 *      esCostoDirecto: Boolean,
 *      unidad: String,
 *      cantidad: Number,
 *      unidadCosto: Number,
 *      personasCantidad: Number,
 *      costo: Number,
 * }} recurso
 * @returns Number
 */
export const calcularSubtotalMaterial = (recurso) => {
  return recurso.precio * recurso.cantidad;
};

/**
 * @param {{
 *      tipo: String,
 *      esCostoDirecto: Boolean,
 *      unidad: String,
 *      cantidad: Number,
 *      unidadCosto: Number,
 *      personasCantidad: Number,
 *      costo: Number,
 * }} recurso
 * @returns Number
 */
export const calcularSubtotalManoObra = (recurso) => {
  // TODO Obtener desde almacenamiento
  const costoHora = 425/240
  return costoHora * recurso.cantidad * (recurso.cantidadPersonas || 1)
};

/**
 * @param {{
 *      tipo: String,
 *      esCostoDirecto: Boolean,
 *      unidad: String,
 *      cantidad: Number,
 *      unidadCosto: Number,
 *      personasCantidad: Number,
 *      costo: Number,
 * }} recurso
 * @returns Number
 */
export const calcularSubtotalRecurso = (recurso) => {
  return recurso.precio * recurso.cantidad;

  if (recurso.unidad === "watt") {
    return recurso.cantidad * sessionStorage.getItem("valorWattHora");
  }
  if (recurso.unidad === "litro") {
    return recurso.cantidad * sessionStorage.getItem("valorAguaLitro");
  }
  if (recurso.tipo === "manoObra") {
    return (
      sessionStorage.getItem("sueldoMinimoHora") *
      recurso.cantidad *
      recurso.personasCantidad
    );
  }
  if (recurso.tipo !== "otro" && !recurso.esDirecto) {
  }
  if (recurso.costo) {
    return recurso.costo;
  }
  return 0;
  // TODO Agregar múltiplos de conversión
};

/**
 * @param {{recursos: [
 *      tipo: String,
 *      esCostoDirecto: Boolean,
 *      unidad: String,
 *      cantidad: Number,
 *      unidadCosto: Number,
 *      personasCantidad: Number,
 *      costo: Number,
 *  ]
 * }} recursos
 * @returns Number
 */
export const calcularSubtotalMateriasDirectas = (recursos) =>
  recursos
    .filter((recurso) => recurso.tipo === "materia" && recurso.esCostoDirecto)
    .reduce(
      (anterior, actual) => anterior + calcularSubtotalMaterial(actual),
      0
    );

/**
 * @param {{recursos: [
 *      tipo: String,
 *      esCostoDirecto: Boolean,
 *      unidad: String,
 *      cantidad: Number,
 *      unidadCosto: Number,
 *      personasCantidad: Number,
 *      costo: Number,
 *  ]
 * }} recursos
 * @returns Number
 */
export const calcularSubtotalMateriasIndirectas = (recursos) =>
  recursos
    .filter((recurso) => recurso.tipo === "materia" && !recurso.esCostoDirecto)
    .reduce(
      (anterior, actual) => anterior + calcularSubtotalMaterial(actual),
      0
    );

/**
 * @param {{recursos: [
 *      tipo: String,
 *      esCostoDirecto: Boolean,
 *      unidad: String,
 *      cantidad: Number,
 *      unidadCosto: Number,
 *      personasCantidad: Number,
 *      costo: Number,
 *  ]
 * }} recursos
 * @returns Number
 */
export const calcularSubtotalManoObraDirecta = (recursos) =>
  recursos
    .filter((recurso) => recurso.tipo === "manoObra" && recurso.esCostoDirecto)
    .reduce(
      (anterior, actual) => anterior + calcularSubtotalMaterial(actual),
      0
    );

/**
 * @param {{recursos: [
 *      tipo: String,
 *      esCostoDirecto: Boolean,
 *      unidad: String,
 *      cantidad: Number,
 *      unidadCosto: Number,
 *      personasCantidad: Number,
 *      costo: Number,
 *  ]
 * }} recursos
 * @returns Number
 */
export const calcularSubtotalManoObraIndirecta = (recursos) =>
  recursos
    .filter((recurso) => recurso.tipo === "manoObra" && !recurso.esCostoDirecto)
    .reduce(
      (anterior, actual) => anterior + calcularSubtotalMaterial(actual),
      0
    );

/**
 * @param {{recursos: [
 *      tipo: String,
 *      esCostoDirecto: Boolean,
 *      unidad: String,
 *      cantidad: Number,
 *      unidadCosto: Number,
 *      personasCantidad: Number,
 *      costo: Number,
 *  ]
 * }} recursos
 * @returns Number
 */
export const calcularSubtotalOtrosIndirectos = (recursos) =>
  recursos
    .filter((recurso) => recurso.tipo === "otro" && !recurso.esCostoDirecto)
    .reduce(
      (anterior, actual) => anterior + calcularSubtotalMaterial(actual),
      0
    );

/**
 * @param {{recursos: [
 *      tipo: String,
 *      esCostoDirecto: Boolean,
 *      unidad: String,
 *      cantidad: Number,
 *      unidadCosto: Number,
 *      personasCantidad: Number,
 *      costo: Number,
 *  ]
 * }} recursos
 * @returns Number
 */
export const calcularSubtotalDirectoUnitario = (recursos) =>
  calcularSubtotalMateriasDirectas(recursos) +
  calcularSubtotalManoObraDirecta(recursos);

/**
 * @param {{producto: {
 *  cantidad: number
 *  recursos: [
 *      tipo: String,
 *      esCostoDirecto: Boolean,
 *      unidad: String,
 *      cantidad: Number,
 *      unidadCosto: Number,
 *      personasCantidad: Number,
 *      costo: Number,
 *  }} producto
 * @returns Number
 */
export const calcularSubtotalDirectoTotal = (producto) =>
  calcularSubtotalDirectoUnitario(producto.recursos) * producto.cantidad;

/**
 * @param {{recursos: [
 *      tipo: String,
 *      esCostoDirecto: Boolean,
 *      unidad: String,
 *      cantidad: Number,
 *      unidadCosto: Number,
 *      personasCantidad: Number,
 *      costo: Number,
 *  ]
 * }} recursos
 * @returns Number
 */
export const calcularSubtotalIndirectoTotal = (recursos) =>
  calcularSubtotalMateriasIndirectas(recursos) +
  calcularSubtotalManoObraIndirecta(recursos) +
  calcularSubtotalOtrosIndirectos(recursos);

/**
 * @param {{producto: {
 *  cantidad: number
 *  recursos: [
 *      tipo: String,
 *      esCostoDirecto: Boolean,
 *      unidad: String,
 *      cantidad: Number,
 *      unidadCosto: Number,
 *      personasCantidad: Number,
 *      costo: Number,
 *  }} producto
 * @returns Number
 */
export const calcularCostoTotal = (producto) =>
  calcularSubtotalDirectoTotal(producto) +
  calcularSubtotalIndirectoTotal(producto.recursos);

/**
 * @param {{producto: {
 *  cantidad: number
 *  recursos: [
 *      tipo: String,
 *      esCostoDirecto: Boolean,
 *      unidad: String,
 *      cantidad: Number,
 *      unidadCosto: Number,
 *      personasCantidad: Number,
 *      costo: Number,
 *  }} producto
 * @returns Number
 */
export const calcularCostoTotalUnitario = (producto) =>
  calcularCostoTotal(producto) / producto.cantidad;

/**
 * @param {{producto: {
 *  cantidad: number
 *  recursos: [
 *      tipo: String,
 *      esCostoDirecto: Boolean,
 *      unidad: String,
 *      cantidad: Number,
 *      unidadCosto: Number,
 *      personasCantidad: Number,
 *      costo: Number,
 *  }} producto
 * @returns Number
 */
export const calcularPrecioVenta = (producto) =>
  calcularCostoTotalUnitario(producto) * (1 + producto.margenUtilidad);

// TODO Subtotales de costos segú sea. Uno para cada tipo
// - Directo: Mano obra, materias
// - Indirecto: Mano obra, materias, otros
