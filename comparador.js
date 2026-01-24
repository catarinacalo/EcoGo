const emissionFactors = {
  carro:    { gasolina: 120, diesel: 110, eletrico: 50, hibrido: 80 },
  comboio:  { diesel: 45, eletrico: 35 },
  autocarro:{ gasolina: 105, diesel: 95, eletrico: 65, hibrido: 75 }
};

const fuelConfig = {
  gasolina: {label:"Gasolina", color:"#ef4444"},
  diesel:   {label:"Diesel",   color:"#f97316"},
  eletrico: {label:"Elétrico", color:"#22c55e"},
  hibrido:  {label:"Híbrido",  color:"#eab308"}
};

let selectedVehicle = "carro";
let selectedDistance = 5;

// troca imagens claro/escuro
function atualizarImagensVeiculo(veicAtivo){
  document.querySelectorAll(".veic-btn").forEach(b=>{
    const veic = b.getAttribute("data-veic");
    const img  = b.querySelector(".veic-icone");
    if(veic === veicAtivo){
      b.classList.add("ativo");
      img.src = `imagens/${veic}escuro.svg`;
    }else{
      b.classList.remove("ativo");
      img.src = `imagens/${veic}claro.svg`;
    }
  });
}

// Botões veículo
document.querySelectorAll('.veic-btn').forEach(btn => {
    btn.onclick = () => {
        const veic = btn.getAttribute('data-veic');
        selectedVehicle = veic;
        atualizarImagensVeiculo(veic);
        renderTableChart();  //refaz o gráfico, a legenda e a tabela
    }
});


const distSlider = document.getElementById("dist-slider");
const distInput  = document.getElementById("dist-input");

distSlider.oninput = distInput.oninput = function(e){
  selectedDistance = Number(e.target.value);
  distSlider.value = selectedDistance;
  distInput.value  = selectedDistance;
  renderTableChart();
};

function renderTableChart() {
  const fuels = Object.keys(emissionFactors[selectedVehicle]);
  const maxValue = Math.max(...fuels.map(f=>emissionFactors[selectedVehicle][f]*selectedDistance));
  let yMax = Math.ceil((maxValue + 5000) / 10000) * 10000;
  if(yMax < 10000) yMax = 10000;

  const ctx = document.getElementById('co2-chart').getContext('2d');
  if(window.co2ChartObj){ window.co2ChartObj.destroy(); }
  window.co2ChartObj = new Chart(ctx, {  // biblioteca chart.js
    type: 'bar',
    data: {
      labels: fuels.map(f=>fuelConfig[f].label),
      datasets: [{
        label: null,
        data: fuels.map(f=>emissionFactors[selectedVehicle][f]*selectedDistance),
        backgroundColor: fuels.map(f=>fuelConfig[f].color),
        borderWidth: 0,
        borderRadius: 7
      }]
    },
    options: {
      animation: { duration: 1600, easing: "easeOutBounce" },
      plugins: {
        legend: {display: false},
        title: {
          display: true,
          text: `Emissões de CO₂ por Tipo de Combustível`,
          color: "#222",
          font: { size: 19, weight: 'bold', family:"inherit" },
          align: "start",
          padding: { top: 10, bottom: 22 }
        }
      },
      layout: { padding: 10 },
      scales: {
        x: {
          title: { display: false },
          grid: {display: false},
          ticks: { color: "#444", font: { size: 19 } }
        },
        y: {
          min: 0,
          max: yMax,
          title: { display: true, text: "g CO₂", color: "#444", font: { size: 19 } },
          beginAtZero: true,
          ticks: { color: "#444", font: { size: 18 }},
          grid: {color: "#e3e3e3"}
        }
      }
    }
  });

  // Legenda
  let legendHtml = '';
  fuels.forEach(f=>{
    legendHtml += `<span class="co2-legend-item"><span class="dot" style="background:${fuelConfig[f].color};margin-right:7px;width:18px;height:18px;"></span>${fuelConfig[f].label}</span>`;
  });
  document.getElementById("chart-legenda").innerHTML = legendHtml;

  // Média, min, max
  const values = fuels.map(f=>emissionFactors[selectedVehicle][f]*selectedDistance);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const avg = (values.reduce((a,b)=>a+b,0)/values.length).toFixed(1);
  document.querySelector(".media-info").innerHTML = `
    <div class="media-item" style="background:#eafaea;">Emissão Média<br>${avg} g CO₂</div>
    <div class="media-item" style="background:#e7f1fa">Para ${selectedDistance} km<br>${max.toFixed(1)} - ${min.toFixed(1)} g CO₂</div>
  `;

  // Tabela
  let tableHtml = `<table class="co2-table">
    <tr>
      <th>Combustível</th>
      <th>g CO₂/km</th>
      <th>Total (${selectedDistance} km)</th>
    </tr>`;
  fuels.forEach(f=>{
    let perKm = emissionFactors[selectedVehicle][f];
    let total = perKm * selectedDistance;
    tableHtml += `<tr>
      <td>
        <span class="dot" style="background:${fuelConfig[f].color}"></span>
        ${fuelConfig[f].label}
      </td>
      <td>${perKm.toFixed(1)} g</td>
      <td>${total.toFixed(1)} g</td>
    </tr>`;
  });
  tableHtml += `</table>`;
  document.getElementById("co2-table-container").innerHTML = tableHtml;
}

// inicial
window.onload = function(){
  atualizarImagensVeiculo("carro");
  renderTableChart();
};

