/*
  js/script.js — annotated version

  This file contains the small interactive features for the 20-10 page:
   - Typing effect for the main message
   - Floating hearts (DOM + Anime.js)
   - Falling petals (canvas)
   - Gallery auto-loading from a manifest
   - Simple music control and file loading helpers

  Comments below explain the purpose of each section and give tips for
  customization while keeping the original behavior unchanged.
*/

// ----------------------- Typing effect -----------------------
// `message` is the text shown by the typing animation. You can replace
// it with a string from a text file (we wire that later in the file).
let message = 'Em là người quan trọng nhất trong cuộc đời anh. Chúc mừng ngày 20-10 của em iu thật dui nhé !!';
const typedEl = document.getElementById('typed'); // where typed text appears
let idx = 0;           // current character index
let typingTimer = null; // handle so we can cancel the timer when resetting

// typeStep renders the next character and schedules the following step.
// Adjust the timeout (42) to change typing speed (smaller = faster).
function typeStep(){
  if(idx <= message.length){
    typedEl.textContent = message.slice(0, idx);
    idx++;
    typingTimer = setTimeout(typeStep, 42);
  } else {
    // a small pulse animation when typing completes (uses Anime.js)
    anime({targets:'#card',scale:[1,1.02,1],duration:2000, easing:'easeInOutSine'});
    typingTimer = null;
  }
}

// startTyping optionally replaces the message and resets the animation.
// Use `startTyping('New text')` to programmatically change the message.
function startTyping(newMessage){
  if(typeof newMessage === 'string') message = newMessage;
  if(typingTimer) clearTimeout(typingTimer); // stop previous animation
  idx = 0;
  typedEl.textContent = '';
  typeStep();
}
window.addEventListener('load', ()=>{
  startTyping();
  startPetals();
  startHearts();
  wireFileControls();
  // set up gallery fit toggle and then load manifest
  setupGalleryFitToggle();
  loadGalleryFromManifest();
});

// Hearts
let heartsOn = true;
const heartsContainer = document.getElementById('hearts');
function createHeart(){
  const el = document.createElement('div');
  el.className = 'heart';
  el.innerHTML = `
    <svg viewBox="0 0 32 29.6" width="36" height="36" fill="#ff6b9a">
      <path d="M23.6,0c-2.9,0-5.4,1.6-6.6,4C15.8,1.6,13.3,0,10.4,0C4.6,0,0,4.7,0,10.5c0,7.6,9.6,13.8,15.9,19.1l1.7,1.4l1.7-1.4
      C22.4,24.3,32,18.1,32,10.5C32,4.7,27.4,0,23.6,0z"/>
    </svg>`;
  heartsContainer.appendChild(el);

  const startX = Math.random()*100; // percent
  const dur = 3000 + Math.random()*2500;
  el.style.left = startX + '%';
  el.style.bottom = '-10%';
  el.style.opacity = 0;

  anime({
    targets: el,
    translateY: ['0%','-120%'],
    opacity: [0,1,0],
    scale: [0.7,1,0.9],
    duration: dur,
    easing: 'easeOutCubic',
    complete: function(){ el.remove(); }
  });
}

// Gallery: load images from assets/images/images.json (array of filenames)
async function loadGalleryFromManifest(){
  const grid = document.querySelector('.gallery-grid');
  if(!grid) return;
  try{
    const res = await fetch('./assets/images/images.json');
    if(!res.ok) return; // no manifest
    const list = await res.json();
    // clear current static images if any
    grid.innerHTML = '';
    list.forEach(name => {
      const wrap = document.createElement('div');
      // add either 'contain' or 'cover' class depending on current mode
      wrap.className = 'thumb ' + (galleryUseCover ? 'cover' : 'contain');
      const img = document.createElement('img');
      img.src = `assets/images/${name}`;
      img.alt = name.replace(/[-_]/g,' ');
      img.loading = 'lazy';
      wrap.appendChild(img);
      grid.appendChild(wrap);
    });
  }catch(e){
    // fail silently (keep static images in HTML)
    console.info('No images manifest or error loading it', e);
  }
}

// Gallery fit toggle: allow user to switch between 'contain' (no crop)
// and 'cover' (fill thumbnail, may crop). Default is 'contain'.
let galleryUseCover = false;
function setupGalleryFitToggle(){
  const btn = document.getElementById('toggleFit');
  const gallery = document.getElementById('gallery');
  if(!btn || !gallery) return;
  // initialize aria and text
  btn.setAttribute('aria-pressed', 'false');
  btn.addEventListener('click', ()=>{
    galleryUseCover = !galleryUseCover;
    btn.setAttribute('aria-pressed', String(galleryUseCover));
    btn.textContent = galleryUseCover ? 'Contain' : 'Cover';
    // update existing thumbs in DOM
    document.querySelectorAll('.gallery-grid .thumb').forEach(t => {
      t.classList.toggle('cover', galleryUseCover);
      t.classList.toggle('contain', !galleryUseCover);
    });
  });
}

let heartTimer;
function startHearts(){
  if(!heartsOn) return;
  heartTimer = setInterval(()=>{
    createHeart();
  }, 500);
}
function stopHearts(){
  clearInterval(heartTimer);
}

document.getElementById('toggleHearts').addEventListener('click', ()=>{
  heartsOn = !heartsOn;
  if(heartsOn) startHearts(); else stopHearts();
});

// Petals - canvas animation
function startPetals(){
  const canvas = document.getElementById('petalCanvas');
  const ctx = canvas.getContext('2d');
  resize();

  window.addEventListener('resize', resize);

  let petals = [];
  for(let i=0;i<40;i++) petals.push(new Petal());

  function resize(){
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
  }

  function Petal(){
    this.x = Math.random()*canvas.width;
    this.y = Math.random()*-canvas.height;
    this.size = 6 + Math.random()*14;
    this.speedY = 0.3 + Math.random()*1.2;
    this.speedX = -0.5 + Math.random()*1;
    this.rotation = Math.random()*360;
    this.rotSpeed = -0.5 + Math.random()*1;
    this.color = `rgba(255,${180+Math.floor(Math.random()*50)},${200+Math.floor(Math.random()*30)},0.95)`;
  }
  Petal.prototype.update = function(){
    this.x += this.speedX;
    this.y += this.speedY;
    this.rotation += this.rotSpeed;
    if(this.y > canvas.height + 20 || this.x < -30 || this.x > canvas.width+30){
      this.x = Math.random()*canvas.width;
      this.y = -20 - Math.random()*canvas.height;
    }
  }
  Petal.prototype.draw = function(){
    ctx.save();
    ctx.translate(this.x,this.y);
    ctx.rotate(this.rotation * Math.PI / 180);

    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.ellipse(0,0,this.size*0.6,this.size,0,0,Math.PI*2);
    ctx.fill();

    ctx.restore();
  }

  function loop(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    for(const p of petals){
      p.update();
      p.draw();
    }
    requestAnimationFrame(loop);
  }
  loop();
}

// Music control
const bgMusic = document.getElementById('bgMusic');
const playBtn = document.getElementById('playMusic');
let musicOn = false;
playBtn.addEventListener('click', ()=>{
  musicOn = !musicOn;
  if(musicOn){
    bgMusic.play();
    playBtn.textContent = 'Tắt nhạc';
  } else {
    bgMusic.pause();
    playBtn.textContent = 'Bật nhạc';
  }
});

// small gentle animations for header
anime({targets:'#title',translateY:[-8,0],opacity:[0,1],duration:900,easing:'easeOutElastic'});
anime({targets:'.subtitle',opacity:[0,1],delay:400,duration:700,easing:'easeOutSine'});

// ensure music button text initial state
if(bgMusic.paused){ playBtn.textContent = 'Bật nhạc'; } else { playBtn.textContent = 'Tắt nhạc'; }

// File loading: allow picking a local .txt or loading assets/message.txt
function wireFileControls(){
  const fileInput = document.getElementById('fileInput');
  const chooseBtn = document.getElementById('chooseFile');
  const loadAssetBtn = document.getElementById('loadAsset');

  // click choose opens file dialog
  chooseBtn.addEventListener('click', ()=> fileInput.click());

  // when a file is chosen, read and start typing
  fileInput.addEventListener('change', (ev)=>{
    const f = ev.target.files && ev.target.files[0];
    if(!f) return;
    if(!f.name.toLowerCase().endsWith('.txt')){
      alert('Vui lòng chọn file .txt');
      return;
    }
    const reader = new FileReader();
    reader.onload = function(e){
      const text = String(e.target.result || '').trim();
      if(text) startTyping(text);
    };
    reader.readAsText(f, 'utf-8');
    // clear input so same file can be re-selected later
    fileInput.value = '';
  });

  // load from assets/message.txt (must exist on server/local folder)
  loadAssetBtn.addEventListener('click', async ()=>{
    try{
      const res = await fetch('./assets/message.txt');
      if(!res.ok) throw new Error('Không tìm thấy assets/message.txt');
      const txt = (await res.text()).trim();
      if(txt) startTyping(txt);
    }catch(err){
      alert('Không thể tải file từ assets: ' + err.message);
    }
  });
}
