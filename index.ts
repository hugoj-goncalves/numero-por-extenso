import { porExtensoNormal as normal } from "./lib/estilos/normal.js";
import { porExtensoMonetario as monetario } from "./lib/estilos/monetario.js";
import { porExtensoPorcentagem as porcentagem } from "./lib/estilos/porcentagem.js";

export const estilos = {
  normal: 'normal',
  monetario: 'monetario',
  porcentagem: 'porcentagem',
};

const estilosFn = {
  normal: normal,
  monetario: monetario,
  porcentagem: porcentagem,
};

export function porExtenso(
  numero: number,
  estilo = estilos.normal
) {
  if (!estilos[estilo])
    throw new Error(
      `Estilo "${estilo}" inválido. Possíveis valores: normal, monetario, porcentagem`
    );
  return estilosFn[estilo](numero);

  // if (estilo === estilos.normal) {
  //     return normal(numero);
  // }
  // if (estilo === estilos.monetario) {
  //     return monetario(numero);
  // }
  // if (estilo === estilos.porcentagem) {
  //     return porcentagem(numero);
  // }
  // return require('./lib/estilos/' + estilo)(numero);
}
