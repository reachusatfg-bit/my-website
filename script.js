const vibes = [
  {e:"🍣",l:"Sushi date",s:"Fresh rolls and great vibes"},
  {e:"🍝",l:"Italian dinner",s:"Fresh pasta and warm bread"},
  {e:"🍛",l:"Indian cuisine",s:"Incredible flavors and spices"},
  {e:"🥩",l:"Classic steakhouse",s:"A traditional birthday treat"},
  {e:"🥐",l:"Bakery & cafe",s:"Pastries, coffee, cozy aesthetic"},
  {e:"🍿",l:"New in theaters",s:"Current blockbuster"},
  {e:"🌌",l:"Drive-in theater",s:"Snacks in the car"},
  {e:"🏖️",l:"Seashore sunset",s:"Drive, dinner, walk on the shore"},
  {e:"🍟",l:"Bowling & lunch",s:"Playful match, casual bites"},
  {e:"🍕",l:"Bowling & dinner",s:"Low-pressure, sit-down meal"},
  {e:"☕",l:"Coffee & matcha run",s:"Artisanal drinks, cute cafe"},
  {e:"🍹",l:"Birthday drinks",s:"Craft cocktails or mocktails"}
];
const grid = document.getElementById('vibesGrid');
vibes.forEach((v,i)=>{
  const d = document.createElement('div');
  d.className='vibe-card';
  d.dataset.i=i;
  d.innerHTML = `<span class="emoji">${v.e}</span><span><span class="label">${v.l}</span><br><span class="sub">${v.s}</span></span>`;
  d.onclick=()=>d.classList.toggle('selected');
  grid.appendChild(d);
});

function showStep(n){
  document.querySelectorAll('.step').forEach(s=>s.classList.remove('active'));
  document.getElementById('step'+n).classList.add('active');
  document.querySelectorAll('.base').forEach((b,i)=>{
    b.classList.remove('active','done');
    if(i<n) b.classList.add('done');
    if(i===n) b.classList.add('active');
  });
}

function goYes(){ showStep(1); }

function goChatFirst(){
  document.getElementById('thanksMsg').textContent = "No pressure at all, let's just chat about it in person!";
  document.getElementById('summaryBox').style.display='none';
  showStep(4);
  const body = encodeURIComponent("Ashley would rather chat about the birthday plan in person first!");
  window.location.href = `sms:16266345543?&body=${body}`;
}

function submitAll(){
  const phone = document.getElementById('phoneInput').value || "not provided";
  const date = document.getElementById('dateInput').value || "not specified";
  const time = document.getElementById('timeInput').value || "not specified";
  const selected = Array.from(document.querySelectorAll('.vibe-card.selected')).map(c=>vibes[c.dataset.i].l);
  const mix = document.getElementById('mixInput').value || "none";

  const summaryHtml = `
    <b>Your number:</b> ${phone}<br>
    <b>Date:</b> ${date}<br>
    <b>Time:</b> ${time}<br>
    <b>Vibes picked:</b> ${selected.length ? selected.join(', ') : 'none'}<br>
    <b>Notes:</b> ${mix}
  `;
  document.getElementById('summaryBox').innerHTML = summaryHtml;
  document.getElementById('thanksMsg').textContent = "Here's what I've got, sending it your way!";
  showStep(4);

  const bodyText = `Ashley's Birthday Adventure - her picks:\n\nHer number: ${phone}\nDate: ${date}\nTime: ${time}\nVibes picked: ${selected.length ? selected.join(', ') : 'none'}\nNotes: ${mix}`;
  window.location.href = `sms:16266345543?&body=${encodeURIComponent(bodyText)}`;
}
