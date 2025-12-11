document.addEventListener("DOMContentLoaded", () => {
  // Mesmos fatores do comparador, em g CO2/km
  const emissionFactors = {
    carro:     { gasolina: 120, diesel: 110, eletrico: 50, hibrido: 80 },
    autocarro: { gasolina: 105, diesel: 95,  eletrico: 65, hibrido: 75 },
    comboio:   { diesel: 45,  eletrico: 35 }
  };

  const vehicleLabels = {
    carro: "Carro",
    autocarro: "Autocarro",
    comboio: "Comboio"
  };

  const fuelLabels = {
    gasolina: "Gasolina",
    diesel: "Diesel",
    eletrico: "Elétrico",
    hibrido: "Híbrido"
  };

  const inputDist   = document.getElementById("distancia");
  const selectTipo  = document.getElementById("tipo-veiculo");
  const selectComb  = document.getElementById("combustivel");

  const labelVeiculo    = document.getElementById("label-veiculo");
  const emisDiariasEl   = document.getElementById("emissoes-diarias");
  const emisAnuaisEl    = document.getElementById("emissoes-anuais");
  const emisAnuaisKgEl  = document.getElementById("emissoes-anuais-kg");

  const introSolucoes   = document.getElementById("texto-intro-solucoes");
  const textoBicicleta  = document.getElementById("texto-bicicleta");
  const numArvoresEl    = document.getElementById("num-arvores");
  const percentEletricoEl = document.getElementById("percent-eletrico");
  const kgEletricoEl      = document.getElementById("kg-eletrico");
  const percentPublicoEl  = document.getElementById("percent-publico");
  const kgPublicoEl       = document.getElementById("kg-publico");

  const poupDiaEl   = document.getElementById("poupanca-diaria");
  const poupMesEl   = document.getElementById("poupanca-mensal");
  const poupAnoEl   = document.getElementById("poupanca-anual");

  const textoDicaBici    = document.getElementById("texto-dica-bici");
  const textoDicaPublico = document.getElementById("texto-dica-publico");
  const textoDicaEletrico= document.getElementById("texto-dica-eletrico");

  // Ajusta opções de combustível conforme tipo de veículo
  function atualizarCombustiveis() {
    const tipo = selectTipo.value;
    const disponiveis = emissionFactors[tipo] ? Object.keys(emissionFactors[tipo]) : [];
    const atual = selectComb.value;
    selectComb.innerHTML = "";

    disponiveis.forEach(f => {
      const opt = document.createElement("option");
      opt.value = f;
      opt.textContent = fuelLabels[f] || f;
      selectComb.appendChild(opt);
    });

    // Mantém escolha se ainda for válida
    if (disponiveis.includes(atual)) {
      selectComb.value = atual;
    }
  }

  function atualizar() {
    let dist = Number(inputDist.value);
    if (!dist || dist < 1) dist = 1;
    inputDist.value = dist;

    const tipo = selectTipo.value;
    atualizarCombustiveis();
    const fuel = selectComb.value;

    const fatoresTipo = emissionFactors[tipo] || {};
    const perKm = fatoresTipo[fuel];
    if (!perKm) return;

    // Emissões atuais
    const diariaKg = (perKm * dist) / 1000;
    const anualKg  = diariaKg * 365;
    const anualTon = anualKg / 1000;

    emisDiariasEl.textContent  = `${diariaKg.toFixed(2)} kg CO₂`;
    emisAnuaisEl.textContent   = `${anualTon.toFixed(1)} ton CO₂`;
    emisAnuaisKgEl.textContent = `${anualKg.toFixed(0)} kg/ano`;

    const labelTipo = vehicleLabels[tipo] || "Transporte";
    const labelFuel = fuelLabels[fuel] || "";
    labelVeiculo.textContent = `${labelTipo} ${labelFuel ? "a " + labelFuel : ""}`;

    introSolucoes.textContent =
      `Com base nos seus ${dist} km diários usando ${labelVeiculo.textContent.toLowerCase()}, ` +
      "aqui estão ações específicas que pode tomar.";
    textoBicicleta.textContent =
      `Se fizesse ${dist} km de bicicleta em vez de ${labelVeiculo.textContent.toLowerCase()}:`;

    // Árvores (~20 kg CO2/ano por árvore)
    const arvores = Math.max(1, Math.round(anualKg / 20));
    numArvoresEl.textContent = arvores;

    // Cenários: elétrico e transporte público (comboio elétrico)
    const perKmEletrico = 50;
    const perKmPublico  = 35;

    const diariaEletricoKg = (perKmEletrico * dist) / 1000;
    const diariaPublicoKg  = (perKmPublico * dist) / 1000;

    const reducaoEletrico = diariaKg <= 0 ? 0 : 100 * (1 - diariaEletricoKg / diariaKg);
    const reducaoPublico  = diariaKg <= 0 ? 0 : 100 * (1 - diariaPublicoKg / diariaKg);

    percentEletricoEl.textContent = `${Math.round(reducaoEletrico)}%`;
    kgEletricoEl.textContent =
      `${Math.round((diariaKg - diariaEletricoKg) * 365)} kg CO₂ poupados/ano`;

    percentPublicoEl.textContent = `${Math.round(reducaoPublico)}%`;
    kgPublicoEl.textContent =
      `${Math.round((diariaKg - diariaPublicoKg) * 365)} kg CO₂ poupados/ano`;

    // Poupança financeira (assume custo por km diferente por tipo)
    const custoKmPorTipo = {
      carro: 0.15,
      autocarro: 0.08,
      comboio: 0.10
    };
    const custoPorKm = custoKmPorTipo[tipo] || 0.15;

    const poupDia = dist * custoPorKm;
    const poupMes = poupDia * 30;
    const poupAno = poupDia * 365;

    poupDiaEl.textContent = `€${poupDia.toFixed(2)}`;
    poupMesEl.textContent = `€${poupMes.toFixed(2)}`;
    poupAnoEl.textContent = `€${poupAno.toFixed(2)}`;

    // Dicas
    textoDicaBici.textContent =
      `Para os seus ${dist} km diários, considere usar bicicleta. Além de zero emissões, ` +
      "melhora a sua saúde cardiovascular e poupa dinheiro.";

    textoDicaPublico.textContent =
      `Usar transporte público, como comboio elétrico ou autocarro eficiente, pode emitir até 35g CO₂/km, ` +
      `comparado aos ${perKm}g do seu transporte atual. Experimente o transporte público!`;


    textoDicaEletrico.textContent =
      `Na próxima escolha de veículo, considere opções elétricas. Com as suas deslocações, ` +
      `poderia reduzir até ${(anualKg * 0.6 / 1000).toFixed(1)} toneladas de CO₂ por ano.`;
  }

  inputDist.addEventListener("input", atualizar);
  selectTipo.addEventListener("change", () => {
    atualizarCombustiveis();
    atualizar();
  });
  selectComb.addEventListener("change", atualizar);

  atualizarCombustiveis();
  atualizar();
});
