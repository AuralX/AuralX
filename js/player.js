let player = document.getElementById("player");
let chapters = document.querySelectorAll(".chapter");
let epInfo = document.getElementById("epInfo");
let seekBar = document.getElementById("seekBar");
let playPause = document.getElementById("playPause");
let speedBtn = document.getElementById("speedBtn");
let timeNow = document.getElementById("currentTime");
let timeTotal = document.getElementById("duration");
let bar = document.getElementById("playerBar");
let current = 0;

function format(t){
  let m = Math.floor(t/60), s = Math.floor(t%60);
  return m+":"+(s<10?"0"+s:s);
}

function playEpisode(i){
  current=i;
  chapters.forEach(c=>c.classList.remove("active"));
  chapters[i].classList.add("active");
  player.src = chapters[i].getAttribute("data-src");
  epInfo.innerText=`Episode ${i+1} / ${chapters.length}`;
  player.play();
}

chapters.forEach(ch=>{
  ch.onclick = ()=> playEpisode(parseInt(ch.getAttribute("data-index")));
});

player.onplay = ()=>{ bar.style.bottom="0"; playPause.innerText="⏸"; };
player.onpause = ()=>{ bar.style.bottom="-110px"; playPause.innerText="⏵"; };

playPause.onclick = ()=>{
  if(player.paused) player.play(); else player.pause();
};

document.getElementById("prevBtn").onclick = ()=>{ if(current>0) playEpisode(current-1); };
document.getElementById("nextBtn").onclick = ()=>{ if(current<chapters.length-1) playEpisode(current+1); };

document.getElementById("rew10").onclick = ()=> player.currentTime -= 10;
document.getElementById("fwd10").onclick = ()=> player.currentTime += 10;

speedBtn.onclick = ()=>{
  let speeds=[1,1.5,2]; 
  let idx = speeds.indexOf(player.playbackRate);
  idx = (idx+1) % speeds.length;
  player.playbackRate = speeds[idx];
  speedBtn.innerText = speeds[idx]+"x";
};

player.ontimeupdate = ()=>{
  seekBar.value = player.currentTime / player.duration * 100;
  timeNow.innerText = format(player.currentTime);
  timeTotal.innerText = format(player.duration);
};

seekBar.oninput = ()=> player.currentTime = seekBar.value * player.duration / 100;

document.getElementById("closeBtn").onclick = ()=> bar.style.display="none";