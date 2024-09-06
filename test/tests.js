import { porExtenso, estilos } from "../index.js";
import assert from "assert";

let test = (description, assertTest) => {
  it(description, (done) => {
    try {
      assertTest();
      done();
    } catch (e) {
      done(e);
    }
  });
};

describe("testando estilo normal", () => {
  test("escrevendo do 0 ao 9", () => {
    [
      "zero",
      "um",
      "dois",
      "três",
      "quatro",
      "cinco",
      "seis",
      "sete",
      "oito",
      "nove",
    ].forEach((n, i) => assert.equal(porExtenso(i), n));
  });

  test("escrevendo do 10 ao 19", () => {
    [
      "dez",
      "onze",
      "doze",
      "treze",
      "quatorze",
      "quinze",
      "dezesseis",
      "dezessete",
      "dezoito",
      "dezenove",
    ].forEach((n, i) => assert.equal(porExtenso(i + 10), n));
  });

  test("escrevendo dezenas", () => {
    [
      "dez",
      "vinte",
      "trinta",
      "quarenta",
      "cinquenta",
      "sessenta",
      "setenta",
      "oitenta",
      "noventa",
    ].forEach((n, i) => assert.equal(porExtenso((i + 1) * 10), n));
  });

  test("escrevendo centenas", () => {
    [
      "cem",
      "duzentos",
      "trezentos",
      "quatrocentos",
      "quinhentos",
      "seiscentos",
      "setecentos",
      "oitocentos",
      "novecentos",
    ].forEach((n, i) => assert.equal(porExtenso((i + 1) * 100), n));
  });

  test("escrevendo milhares", () => {
    assert.equal(porExtenso(1000), "um mil");
    assert.equal(porExtenso(2000), "dois mil");
  });

  test("escrevendo dezenas de milhares", () => {
    assert.equal(porExtenso(10000), "dez mil");
    assert.equal(porExtenso(30000), "trinta mil");
  });

  test("escrevendo centenas de milhares", () => {
    [
      "cem",
      "duzentos",
      "trezentos",
      "quatrocentos",
      "quinhentos",
      "seiscentos",
      "setecentos",
      "oitocentos",
      "novecentos",
    ].forEach((n, i) => assert.equal(porExtenso((i + 1) * 100000), n + " mil"));
  });

  test("escrevendo números negativos", () => {
    assert.equal(porExtenso(-1), "menos um");
    assert.equal(porExtenso(-200), "menos duzentos");
    assert.equal(porExtenso(-0.5), "menos zero vírgula cinco décimos");
  });
});

describe("testando README.md", () => {
  test("escrevendo exemplos", () => {
    // Números inteiros
    assert.equal(porExtenso(128), "cento e vinte e oito");
    assert.equal(
      porExtenso(128, estilos.monetario),
      "cento e vinte e oito reais"
    );
    assert.equal(
      porExtenso(128, estilos.porcentagem),
      "cento e vinte e oito por cento"
    );

    // Números decimais
    assert.equal(porExtenso(10.5), "dez vírgula cinco décimos");
    assert.equal(
      porExtenso(10.5, estilos.monetario),
      "dez reais e cinquenta centavos"
    );
    assert.equal(
      porExtenso(10.5, estilos.porcentagem),
      "dez vírgula cinco décimos por cento"
    );

    // Números gigantes
    assert.equal(
      porExtenso(9_876_543_210),
      "nove bilhões oitocentos e setenta e seis milhões quinhentos e quarenta e três mil duzentos e dez"
    );
    assert.equal(
      porExtenso(-87_654_321, estilos.monetario),
      "menos oitenta e sete milhões seiscentos e cinquenta e quatro mil trezentos e vinte e um reais"
    );
    assert.equal(
      porExtenso(123_456.7891, estilos.porcentagem),
      "cento e vinte e três mil quatrocentos e cinquenta e seis vírgula sete mil oitocentos e noventa e um décimos de milésimo por cento"
    );

    // Maior número possível (type number)
    assert.equal(
      porExtenso(999_999_999_999_999.9),
      "novecentos e noventa e nove trilhões novecentos e noventa e nove bilhões novecentos e noventa e nove milhões novecentos e noventa e nove mil novecentos e noventa e nove vírgula nove décimos"
    );

    // Maior número possível (type string)
    assert.equal(
      porExtenso(
        "999999999999999999999999999999999999999999999.99999999999999999999"
      ),
      "novecentos e noventa e nove tredecilhões novecentos e noventa e nove duodecilhões novecentos e noventa e nove undecilhões novecentos e noventa e nove decilhões novecentos e noventa e nove nonilhões novecentos e noventa e nove octilhões novecentos e noventa e nove septilhões novecentos e noventa e nove sextilhões novecentos e noventa e nove quintilhões novecentos e noventa e nove quatrilhões novecentos e noventa e nove trilhões novecentos e noventa e nove bilhões novecentos e noventa e nove milhões novecentos e noventa e nove mil novecentos e noventa e nove vírgula noventa e nove quintilhões novecentos e noventa e nove quatrilhões novecentos e noventa e nove trilhões novecentos e noventa e nove bilhões novecentos e noventa e nove milhões novecentos e noventa e nove mil novecentos e noventa e nove centésimos de quintilionésimo"
    );
  });
});

describe("Issue #1", () => {
  test("escrevendo 1.000.090.000,00", () => {
    assert.equal(
      porExtenso("1000090000.00", estilos.monetario),
      "um bilhão e noventa mil reais"
    );
  });
});

describe("10.030,00", () => {
  test("escrevendo 10.030,00", () => {
    assert.equal(
      porExtenso("10030.00", estilos.monetario),
      "dez mil e trinta reais"
    );
  });
});

describe("Issue #4", () => {
  test("escrevendo percentuais com zeros a esquerda", () => {
    assert.equal(
      porExtenso(3.01, estilos.porcentagem),
      "três vírgula um centésimo por cento"
    );
    assert.equal(
      porExtenso(50.05, estilos.porcentagem),
      "cinquenta vírgula cinco centésimos por cento"
    );
    assert.equal(
      porExtenso(1.049, estilos.porcentagem),
      "um vírgula quarenta e nove milésimos por cento"
    );
  });
});
