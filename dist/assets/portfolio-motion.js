const video=document.querySelector('.hero-bg');
const toggle=document.getElementById('heroVideoToggle');
function updateControl(){
  const paused=video.paused;
  toggle.classList.toggle('is-paused',paused);
  toggle.setAttribute('aria-pressed',String(paused));
  toggle.setAttribute('aria-label',`${paused?'Play':'Pause'} background video`);
  toggle.querySelector('span').textContent=paused?'▶':'Ⅱ';
  toggle.querySelector('b').textContent=paused?'Play motion':'Pause motion';
}
toggle.addEventListener('click',()=>{
  if(video.paused)video.play().catch(()=>{});
  else video.pause();
  updateControl();
});
video.addEventListener('play',updateControl);
video.addEventListener('pause',updateControl);
if(matchMedia('(prefers-reduced-motion: reduce)').matches)video.pause();
updateControl();
