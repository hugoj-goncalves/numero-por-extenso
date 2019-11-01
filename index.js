module.exports = {
    porExtenso: porExtenso,
    estilo: {
        normal: 'normal',
        monetario: 'monetario',
        porcentagem: 'porcentagem'
    }
};

function porExtenso(numero, estilo, masculino) {
    masculino = masculino === undefined ? true : masculino;
    if (!estilo)
        estilo = 'normal';

    return require('./lib/estilos/' + estilo)(numero, masculino);
}
