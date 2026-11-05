(()=>{
const $=(s,c=document)=>c.querySelector(s),$$=(s,c=document)=>[...c.querySelectorAll(s)];
const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
/* reveal on scroll */
const io=new IntersectionObserver(es=>es.forEach(x=>{if(x.isIntersecting){x.target.classList.add('in');x.target.classList.remove('armed');io.unobserve(x.target)}}),{rootMargin:'0px 0px -8% 0px'});
$$('.rv').forEach(el=>{if(!reduce&&el.getBoundingClientRect().top>innerHeight){el.classList.add('armed');io.observe(el)}else el.classList.add('in')});
setTimeout(()=>$$('.rv.armed').forEach(el=>{if(el.getBoundingClientRect().top<innerHeight)el.classList.remove('armed')}),2500);
/* menu */
const menu=$('#menu'),openB=$('#menuOpen');
if(menu&&openB){const set=o=>{menu.classList.toggle('open',o);openB.setAttribute('aria-expanded',o);document.body.style.overflow=o?'hidden':'';if(o)$('#menuClose').focus();else openB.focus({preventScroll:true})};
  openB.onclick=()=>set(true);$('#menuClose').onclick=()=>set(false);$$('#menu a').forEach(a=>a.addEventListener('click',()=>set(false)));
  addEventListener('keydown',e=>{if(e.key==='Escape'&&menu.classList.contains('open'))set(false)})}
/* enquiry form: builds a pre-filled email */
const f=$('#enqForm');
if(f)f.addEventListener('submit',ev=>{ev.preventDefault();const d=new FormData(f),g=k=>(d.get(k)||'').toString().trim();
  const occ=g('occasion')||'cake',date=g('date');
  const body=['Name: '+g('name'),'Email: '+g('email'),'Date: '+date,'Occasion: '+occ,'Servings: '+g('servings'),'','Notes:',g('notes'),'','(Attach any inspiration photos to this email.)'].join('\n');
  location.href='mailto:'+f.dataset.to+'?subject='+encodeURIComponent('Cake enquiry: '+occ+(date?' on '+date:''))+'&body='+encodeURIComponent(body);
  const ok=$('#enqOk');if(ok)ok.hidden=false});
/* palette-knife cursor */
if(matchMedia('(pointer: fine)').matches&&!reduce){
  const k=$('#knife');if(!k)return;document.documentElement.classList.add('has-knife');
  const clamp=(v,a,b)=>Math.min(b,Math.max(a,v));
  let x=-100,y=-100,px=x,ang=34,target=34,shown=false;
  addEventListener('pointermove',e=>{if(e.pointerType!=='mouse')return;x=e.clientX;y=e.clientY;if(!shown){k.classList.add('on');shown=true;px=x}
    k.classList.toggle('hot',!!e.target.closest('a,button,summary,input,select,textarea'))},{passive:true});
  document.addEventListener('mouseleave',()=>{k.classList.remove('on');shown=false});
  addEventListener('pointerdown',e=>{k.classList.add('down');target-=14;if(e.pointerType==='mouse'){const s=document.createElement('span');s.className='smear';s.style.left=e.clientX+'px';s.style.top=e.clientY+'px';document.body.appendChild(s);setTimeout(()=>s.remove(),720)}});
  addEventListener('pointerup',()=>k.classList.remove('down'));
  (function loop(){const vx=x-px;px+=vx*.35;target+=((34+clamp(vx*.9,-22,22))-target)*.12;ang+=(target-ang)*.2;
    k.style.transform=`translate(${x-3}px,${y-9}px) rotate(${ang.toFixed(2)}deg)`;requestAnimationFrame(loop)})();
}
})();