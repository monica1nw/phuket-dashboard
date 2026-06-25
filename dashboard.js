/* ══════════════════════════════════════════
   DATA
══════════════════════════════════════════ */
const MONTHS_LABEL = ['ธ.ค.68','ม.ค.69','ก.พ.69','มี.ค.69','เม.ย.69','พ.ค.69'];
const MONTHS_FULL  = ['ธ.ค. 68','ม.ค. 69','ก.พ. 69','มี.ค. 69','เม.ย. 69','พ.ค. 69'];

const DATA = {
  totalPop:  [432464, 452071, 433414, 433893, 434119, 434416],
  thaiPop:   [423119, 442612, 424183, 424750, 424911, 425216],
  foreignPop:[9345, 9459, 9231, 9243, 9215, 9190],
  birth:     [616, 398, 299, 192, 171, 350],
  death:     [292, 278, 248, 213, 257, 239],
  moveIn:    [2437, 2889, 2664, 2926, 2536, 2555],
  moveOut:   [2465, 2724, 2810, 2835, 2874, 2509],
  house:     [303160, 304360, 304690, 307360, 308472, 308911],

  ageBands: [
    {label:'0–14',  m:[35262,35262,35262,35262,35262,35262], f:[39925,39925,39925,39925,39925,39925]},
    {label:'15–24', m:[24577,24577,24577,24577,24577,24577], f:[27826,27826,27826,27826,27826,27826]},
    {label:'25–59', m:[105135,105135,105135,105135,105135,105135], f:[119035,119035,119035,119035,119035,119035]},
    {label:'60–79', m:[25765,25765,25765,25765,25765,25765], f:[29172,29172,29172,29172,29172,29172]},
    {label:'80+',   m:[3246,3246,3246,3246,3246,3246], f:[3676,3676,3676,3676,3676,3676]},
  ],

  districts: [
    {name:'เทศบาลนครภูเก็ต',              v:[68424,68424,68424,68424,68424,68424]},
    {name:'เทศบาลตำบลวิชิต',              v:[56869,56869,56869,56869,56869,56869]},
    {name:'เทศบาลตำบลรัษฎา',              v:[52797,52797,52797,52797,52797,52797]},
    {name:'เทศบาลเมืองกะทู้',              v:[33443,33443,33443,33443,33443,33443]},
    {name:'เทศบาลตำบลศรีสุนทร',           v:[31027,31027,31027,31027,31027,31027]},
    {name:'เทศบาลตำบลฉลอง',               v:[28948,28948,28948,28948,28948,28948]},
    {name:'เทศบาลตำบลเทพกระษัตรี',        v:[28655,28655,28655,28655,28655,28655]},
    {name:'เทศบาลตำบลป่าคลอก',            v:[20396,20396,20396,20396,20396,20396]},
    {name:'เทศบาลตำบลราไวย์',              v:[19751,19751,19751,19751,19751,19751]},
    {name:'เทศบาลเมืองป่าตอง',             v:[19652,19652,19652,19652,19652,19652]},
    {name:'อำเภอเมืองภูเก็ต',              v:[19341,19341,19341,19341,19341,19341]},
    {name:'เทศบาลตำบลเชิงทะเล',           v:[19189,19189,19189,19189,19189,19189]},
    {name:'องค์การบริหารส่วนตำบลไม้ขาว',  v:[13979,13979,13979,13979,13979,13979]},
    {name:'เทศบาลตำบลกะรน',               v:[7569,7569,7569,7569,7569,7569]},
    {name:'องค์การบริหารส่วนตำบลสาคู',    v:[7287,7287,7287,7287,7287,7287]},
    {name:'เทศบาลตำบลกมลา',               v:[7089,7089,7089,7089,7089,7089]},
  ]
};

/* ══════════════════════════════════════════
   THEME
══════════════════════════════════════════ */
const SEA    = '#006D77';
const SEA_LT = '#83C5BE';
const CORAL  = '#E76F51';
const TEXT2  = '#3E5A70';
const GRID   = 'rgba(0,109,119,0.08)';
const FONT   = "'IBM Plex Sans Thai', sans-serif";
const MONO   = "'IBM Plex Mono', monospace";

const xTick = { font:{size:10,family:MONO}, color:TEXT2 };
const yTick = { font:{size:10,family:MONO}, color:TEXT2 };
const baseOpts = { responsive:true, maintainAspectRatio:false, plugins:{legend:{display:false}} };

/* ══════════════════════════════════════════
   STATE
══════════════════════════════════════════ */
let selectedIdx = 'all'; // 'all' or 0-5

/* ══════════════════════════════════════════
   CHARTS
══════════════════════════════════════════ */
const lineChart = new Chart(document.getElementById('lineChart'), {
  type: 'line',
  data: {
    labels: MONTHS_LABEL,
    datasets: [
      { label:'รวม', data:[...DATA.totalPop], borderColor:SEA, backgroundColor:'rgba(0,109,119,0.06)', fill:true, tension:0.35, pointRadius:4, pointBackgroundColor:SEA, borderWidth:2 },
      { label:'ไทย', data:[...DATA.thaiPop],  borderColor:SEA_LT, backgroundColor:'transparent', tension:0.35, pointRadius:3, pointBackgroundColor:SEA_LT, borderWidth:1.5, borderDash:[4,3] },
      { label:'ต่างชาติ', data:[...DATA.foreignPop], borderColor:CORAL, backgroundColor:'transparent', tension:0.35, pointRadius:3, pointBackgroundColor:CORAL, borderWidth:1.5, yAxisID:'y2' }
    ]
  },
  options: { ...baseOpts,
    scales: {
      x: { ticks:xTick, grid:{display:false} },
      y: { ticks:{...yTick, callback:v=>v>=1000?(v/1000).toFixed(0)+'k':v}, grid:{color:GRID} },
      y2: { position:'right', ticks:{...yTick}, grid:{display:false} }
    }
  }
});

const bdChart = new Chart(document.getElementById('birthDeathChart'), {
  type: 'bar',
  data: {
    labels: MONTHS_LABEL,
    datasets: [
      { label:'เกิด', data:[...DATA.birth], backgroundColor:SEA,   borderRadius:5 },
      { label:'ตาย',  data:[...DATA.death], backgroundColor:CORAL, borderRadius:5 }
    ]
  },
  options: { ...baseOpts, scales:{ x:{ticks:xTick,grid:{display:false}}, y:{ticks:yTick,grid:{color:GRID}} } }
});

const moveChart = new Chart(document.getElementById('moveChart'), {
  type: 'bar',
  data: {
    labels: MONTHS_LABEL,
    datasets: [
      { label:'ย้ายเข้า', data:[...DATA.moveIn],  backgroundColor:SEA,      borderRadius:5 },
      { label:'ย้ายออก',  data:[...DATA.moveOut], backgroundColor:'#e8c4b2', borderRadius:5 }
    ]
  },
  options: { ...baseOpts, scales:{ x:{ticks:xTick,grid:{display:false}}, y:{ticks:yTick,grid:{color:GRID}} } }
});

const ageChart = new Chart(document.getElementById('ageChart'), {
  type: 'bar',
  data: {
    labels: DATA.ageBands.map(d=>d.label),
    datasets: [
      { label:'ชาย',  data: DATA.ageBands.map(d=>d.m[5]), backgroundColor:SEA,   borderRadius:4 },
      { label:'หญิง', data: DATA.ageBands.map(d=>d.f[5]), backgroundColor:CORAL, borderRadius:4 }
    ]
  },
  options: { ...baseOpts,
    scales: {
      x: { ticks:xTick, grid:{display:false} },
      y: { ticks:{...yTick, callback:v=>v>=1000?(v/1000).toFixed(0)+'k':v}, grid:{color:GRID} }
    }
  }
});

function getDistColors(vals) {
  const mx = Math.max(...vals);
  return vals.map(v => {
    const r = v/mx;
    if (r>0.7) return SEA;
    if (r>0.4) return SEA_LT;
    return '#b2dbd8';
  });
}

const distSorted = [...DATA.districts].sort((a,b)=>b.v[5]-a.v[5]);
const distChart = new Chart(document.getElementById('districtChart'), {
  type: 'bar',
  data: {
    labels: distSorted.map(d=>d.name),
    datasets: [{ label:'ประชากร', data:distSorted.map(d=>d.v[5]), backgroundColor:getDistColors(distSorted.map(d=>d.v[5])), borderRadius:4 }]
  },
  options: { ...baseOpts, indexAxis:'y',
    scales: {
      x: { ticks:{...xTick, callback:v=>v>=1000?(v/1000).toFixed(0)+'k':v}, grid:{color:GRID} },
      y: { ticks:{font:{size:11,family:FONT},color:TEXT2}, grid:{display:false} }
    }
  }
});

/* ══════════════════════════════════════════
   UPDATE FUNCTION
══════════════════════════════════════════ */
function fmt(n) { return Math.round(n).toLocaleString('th-TH'); }

function updateAll(idx) {
  selectedIdx = idx;
  const isAll = idx === 'all';

  /* ── KPI ── */
  const kpiIdx = isAll ? 5 : idx;
  const total   = DATA.totalPop[kpiIdx];
  const thai    = DATA.thaiPop[kpiIdx];
  const foreign = DATA.foreignPop[kpiIdx];
  const pct     = ((foreign/total)*100).toFixed(1);
  const label   = isAll ? 'ทั้ง 6 เดือน' : MONTHS_FULL[idx];

  document.getElementById('kpi-total').textContent   = fmt(total);
  document.getElementById('kpi-total-sub').textContent = `ไทย + ต่างชาติ (${label})`;
  document.getElementById('kpi-thai').textContent    = fmt(thai);
  document.getElementById('kpi-foreign').textContent = fmt(foreign);
  document.getElementById('kpi-pct').innerHTML       = pct + '<span class="kpi-unit">%</span>';
  document.getElementById('kpi-house').textContent   = fmt(DATA.house[kpiIdx]);

  /* ── Trend charts: all months or highlight single ── */
  if (isAll) {

    lineChart.data.labels = MONTHS_LABEL;
    lineChart.data.datasets[0].data = [...DATA.totalPop];
    lineChart.data.datasets[1].data = [...DATA.thaiPop];
    lineChart.data.datasets[2].data = [...DATA.foreignPop];

    lineChart.data.datasets[0].pointRadius = 4;
    lineChart.data.datasets[1].pointRadius = 3;
    lineChart.data.datasets[2].pointRadius = 3;

    lineChart.data.datasets[0].pointBackgroundColor =
        DATA.totalPop.map(() => SEA);

    lineChart.data.datasets[1].pointBackgroundColor =
        DATA.thaiPop.map(() => SEA_LT);

    lineChart.data.datasets[2].pointBackgroundColor =
        DATA.foreignPop.map(() => CORAL);

    bdChart.data.labels = MONTHS_LABEL;
    bdChart.data.datasets[0].data = [...DATA.birth];
    bdChart.data.datasets[1].data = [...DATA.death];

    moveChart.data.labels = MONTHS_LABEL;
    moveChart.data.datasets[0].data = [...DATA.moveIn];
    moveChart.data.datasets[1].data = [...DATA.moveOut];

} else {

    // ยังคงแสดงครบ 6 เดือน
    lineChart.data.labels = MONTHS_LABEL;
    lineChart.data.datasets[0].data = [...DATA.totalPop];
    lineChart.data.datasets[1].data = [...DATA.thaiPop];
    lineChart.data.datasets[2].data = [...DATA.foreignPop];

    // จุดปกติ
    lineChart.data.datasets[0].pointRadius =
        DATA.totalPop.map((_, i) => i === idx ? 7 : 3);

    lineChart.data.datasets[1].pointRadius =
        DATA.thaiPop.map((_, i) => i === idx ? 6 : 2);

    lineChart.data.datasets[2].pointRadius =
        DATA.foreignPop.map((_, i) => i === idx ? 6 : 2);

    // เปลี่ยนสีเฉพาะจุดที่เลือก
    lineChart.data.datasets[0].pointBackgroundColor =
        DATA.totalPop.map((_, i) => i === idx ? SEA : "#b7d7d5");

    lineChart.data.datasets[1].pointBackgroundColor =
        DATA.thaiPop.map((_, i) => i === idx ? SEA_LT : "#d7ecea");

    lineChart.data.datasets[2].pointBackgroundColor =
        DATA.foreignPop.map((_, i) => i === idx ? CORAL : "#f6c4b8");

    // กราฟแท่งยังแสดงเดือนเดียวเหมือนเดิม
    bdChart.data.labels = [MONTHS_FULL[idx]];
    bdChart.data.datasets[0].data = [DATA.birth[idx]];
    bdChart.data.datasets[1].data = [DATA.death[idx]];

    moveChart.data.labels = [MONTHS_FULL[idx]];
    moveChart.data.datasets[0].data = [DATA.moveIn[idx]];
    moveChart.data.datasets[1].data = [DATA.moveOut[idx]];


    document.getElementById('sub-line').textContent = `ประชากรรวม · คนไทย · ต่างชาติ · ${MONTHS_FULL[idx]}`;
    document.getElementById('sub-bd').textContent   = `จำนวนการเกิด–ตาย · ${MONTHS_FULL[idx]}`;
    document.getElementById('sub-move').textContent = `จำนวนการย้ายถิ่น · ${MONTHS_FULL[idx]}`;
  }

  lineChart.update();
  bdChart.update();
  moveChart.update();

  /* ── Age chart ── */
  const ageI = isAll ? 5 : idx;
  ageChart.data.datasets[0].data = DATA.ageBands.map(d=>d.m[ageI]);
  ageChart.data.datasets[1].data = DATA.ageBands.map(d=>d.f[ageI]);
  document.getElementById('sub-age').textContent = `จัดกลุ่มช่วงอายุ ชาย / หญิง · ${isAll ? 'พ.ค. 69' : MONTHS_FULL[idx]}`;
  ageChart.update();

  /* ── District chart ── */
  const distI = isAll ? 5 : idx;
  const sorted = [...DATA.districts].sort((a,b)=>b.v[distI]-a.v[distI]);
  distChart.data.labels = sorted.map(d=>d.name);
  distChart.data.datasets[0].data = sorted.map(d=>d.v[distI]);
  distChart.data.datasets[0].backgroundColor = getDistColors(sorted.map(d=>d.v[distI]));
  document.getElementById('sub-dist').textContent = `เรียงมาก–น้อย · 16 สำนักทะเบียน · ${isAll ? 'พ.ค. 69' : MONTHS_FULL[idx]}`;
  distChart.update();
}

/* ══════════════════════════════════════════
   PILL BUTTONS
══════════════════════════════════════════ */
document.getElementById('monthPills').addEventListener('click', e => {
  const btn = e.target.closest('.pill');
  if (!btn) return;

  // ลบ active class จากทุก pill
  document.querySelectorAll('.pill').forEach(p => p.classList.remove('active'));
  
  // เพิ่ม active class ให้ pill ที่คลิก
  btn.classList.add('active');

  // อัปเดตข้อมูล
  const raw = btn.dataset.idx;
  updateAll(raw === 'all' ? 'all' : parseInt(raw));
});

document.querySelectorAll('.pill').forEach(p => p.classList.remove('active'));
document.querySelector('.pill[data-idx="all"]').classList.add('active');

updateAll('all');