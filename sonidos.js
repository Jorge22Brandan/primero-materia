/* EFECTOS DE SONIDO. Se carga DESPUÉS de teoria2.js:
   <script src="teoria2.js"></script>
   <script src="sonidos.js"></script>
   No usa archivos de audio: los sonidos se generan con el navegador. */
(()=>{
let ctx=null,on=localStorage.getItem("snd")!=="0";
const tone=(f,t,d,type="sine",v=.15)=>{
 const o=ctx.createOscillator(),g=ctx.createGain(),t0=ctx.currentTime+t;
 o.type=type;o.frequency.value=f;
 g.gain.setValueAtTime(0.0001,t0);g.gain.linearRampToValueAtTime(v,t0+.01);g.gain.exponentialRampToValueAtTime(.0001,t0+d);
 o.connect(g);g.connect(ctx.destination);o.start(t0);o.stop(t0+d+.05);
};
const S={
 ok:()=>{tone(660,0,.15);tone(880,.12,.25)},
 no:()=>{tone(220,0,.2,"square",.07);tone(165,.15,.3,"square",.07)},
 fin:()=>[523,659,784,1047].forEach((f,i)=>tone(f,i*.13,.3))
};
const play=k=>{
 if(!on)return;
 try{ctx=ctx||new(window.AudioContext||window.webkitAudioContext)();ctx.resume();S[k]()}catch(e){}
};

/* Detecta acierto, error y fin de juego mirando los cambios en las áreas de juego */
const watch=(root,fn,opt)=>{if(root)new MutationObserver(fn).observe(root,opt)};
const juego=muts=>{
 let ok=0,no=0,fin=0;
 muts.forEach(m=>{
  if(m.type==="attributes"){
   const c=m.target.classList;
   if(c.contains("no"))no=1;else if(c.contains("ok")||c.contains("hecho"))ok=1;
  }else if(m.type==="childList"){
   if(m.target.id==="fb"){const t=m.target.textContent;if(t)(t.startsWith("¡Correcto")?ok=1:no=1)}
   m.addedNodes.forEach(n=>{if(n.nodeType===1&&n.classList.contains("res"))fin=1});
  }
 });
 if(fin)play("fin");else if(no)play("no");else if(ok)play("ok");
};
const opt={subtree:true,childList:true,attributes:true,attributeFilter:["class"]};
watch($("#area"),juego,opt);
watch($("#area2"),juego,opt);

/* Sonido cuando se aprueba el control de lectura (solo la primera vez que aparece el ✔) */
[["#ctlmsg"],["#c2m"]].forEach(([s])=>{
 const el=$(s);let antes=false;
 watch(el,()=>{const ahora=el.textContent.startsWith("✔");if(ahora&&!antes)play("ok");antes=ahora},{childList:true,characterData:true,subtree:true});
});

/* Botón para silenciar o activar */
const b=document.createElement("button");
b.className="btn";b.setAttribute("aria-label","Activar o silenciar el sonido");
b.style.cssText="position:fixed;right:12px;bottom:12px;z-index:10;padding:8px 12px;border-radius:50%";
const ver=()=>{b.textContent=on?"🔊":"🔇"};
b.onclick=()=>{on=!on;localStorage.setItem("snd",on?"1":"0");ver();if(on)play("ok")};
ver();document.body.appendChild(b);
})();
