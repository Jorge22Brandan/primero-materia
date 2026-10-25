/* TEORÍA 2: Fenómenos y métodos de separación de fases.
   Se carga DESPUÉS del script principal: <script src="teoria2.js"></script> justo antes de </body>.
   Usa las funciones del index.html (nombreOK, local, save, show, drawRank, post, sh, esc, $, $$). */
(()=>{
const T1={trivia:"Trivia de la materia",cuerpo:"¿Cuerpo o sustancia?",cambios:"Cambios de estado",sistemas:"Sistemas materiales"};
const NM=()=>$("#nombre").value.trim().replace(/\s+/g," ").toLowerCase();
const nrm=s=>s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^a-z0-9 ]/g," ").replace(/\s+/g," ").trim();
const missing=()=>Object.keys(T1).filter(j=>!(localStorage.getItem("done1|"+NM()+"|"+j)||local().some(r=>String(r.n).toLowerCase()===NM()&&r.j===j)));
const done1=()=>nombreOK()&&!missing().length;
const lk2=()=>"lec2|"+NM();
const leido2=()=>nombreOK()&&!!localStorage.getItem(lk2());
const COL=["#14305c"];

/* ---------- estilos y estructura ---------- */
document.head.insertAdjacentHTML("beforeend","<style>nav{flex-wrap:wrap}nav button{min-width:30%}.opt.sel{background:var(--hl)}.opt.lk{border-width:4px}.cel{aspect-ratio:1;width:100%;padding:0;font:inherit;font-weight:bold;border:1px solid var(--mut);background:#fff;color:var(--ink);cursor:pointer;border-radius:4px}.cel.sel{background:var(--hl)}.cel:focus-visible{outline:3px solid var(--red)}.cl{margin:6px 0}.cl.hecho{text-decoration:line-through;color:var(--ok)}</style>");
const nav=$("nav");
[["teoria2","Teoría 2"],["juegos2","Juegos 2"],["ranking2","Ranking 2"]].forEach(([t,n])=>nav.insertAdjacentHTML("beforeend",`<button data-t="${t}">${n}</button>`));
$$("nav button").forEach(b=>b.onclick=()=>show(b.dataset.t));

const GM=[["trivia","Trivia de fenómenos","Fenómenos naturales, artificiales, físicos y químicos."],["natart","¿Natural o artificial?","Clasificá cada fenómeno."],["fisquim","¿Físico o químico?","Decidí si se forman sustancias nuevas."],["metodos","¿Qué método uso?","Elegí el método para separar cada mezcla."],["flechas","Unir con flechas","Uní cada método con la mezcla que separa."],["sopa","Sopa de letras","Encontrá los métodos a partir de las pistas."],["escribir","Escribí la respuesta","Respondé escribiendo, sin opciones."]];

$("main").insertAdjacentHTML("beforeend",`
<section id="teoria2" hidden>
 <h2>Teoría 2: fenómenos y métodos de separación</h2>
 <h3>¿Qué es un fenómeno?</h3>
 <div class="def"><p><b>Fenómeno:</b> es todo cambio o suceso que se produce en la naturaleza o en la materia. Se pueden clasificar de dos maneras distintas e independientes: según <b>quién</b> lo produce (natural o artificial) y según <b>qué le pasa a la materia</b> (físico o químico).</p></div>
 <h3>Natural o artificial</h3>
 <div class="est">
  <div><b>Fenómeno natural</b><p>Ocurre sin que el ser humano intervenga. Ejemplos: la lluvia, un rayo, la erupción de un volcán, la fotosíntesis, el día y la noche, la germinación de una semilla.</p></div>
  <div><b>Fenómeno artificial</b><p>Es provocado o modificado por el ser humano. Ejemplos: encender una lamparita, hacer fuegos artificiales, cocinar un guiso, hacer queso, hacer funcionar un auto.</p></div>
 </div>
 <h3>Físico o químico</h3>
 <div class="est">
  <div><b>Fenómeno físico</b><p>La sustancia sigue siendo la misma: <b>no se forman sustancias nuevas</b>. Cambia la forma, el tamaño, el estado o la posición, y muchas veces se puede revertir. Ejemplos: todos los cambios de estado, romper un vaso, disolver azúcar en agua, doblar un alambre.</p></div>
  <div><b>Fenómeno químico</b><p>Cambia la naturaleza de la sustancia: <b>se forman sustancias nuevas</b>, y por lo general no se puede volver atrás. Ejemplos: la combustión de la madera, la oxidación de un clavo, la cocción de un huevo, la digestión, la fermentación, la putrefacción de una fruta.</p></div>
 </div>
 <p><b>¿Cómo sé que se formó una sustancia nueva?</b> Algunas señales son: cambio de color, desprendimiento de gas (burbujas), producción de luz o calor, aparición de un sólido nuevo y olor distinto.</p>
 <div class="wrap"><table>
  <tr><th>Fenómeno</th><th>Según quién lo produce</th><th>Según qué le pasa a la materia</th></tr>
  <tr><td>La lluvia</td><td>natural</td><td>físico</td></tr>
  <tr><td>La fotosíntesis</td><td>natural</td><td>químico</td></tr>
  <tr><td>La evaporación del agua de un charco</td><td>natural</td><td>físico</td></tr>
  <tr><td>La putrefacción de una fruta</td><td>natural</td><td>químico</td></tr>
  <tr><td>Disolver azúcar en el té</td><td>artificial</td><td>físico</td></tr>
  <tr><td>Romper un vaso</td><td>artificial</td><td>físico</td></tr>
  <tr><td>Quemar madera en un asado</td><td>artificial</td><td>químico</td></tr>
  <tr><td>Fuegos artificiales</td><td>artificial</td><td>químico</td></tr>
 </table></div>
 <div class="def"><p><b>Ojo:</b> las dos clasificaciones se combinan. Un fenómeno puede ser natural y físico (la lluvia), natural y químico (la fotosíntesis), artificial y físico (romper un vaso) o artificial y químico (fuegos artificiales).</p></div>
 <h3>Métodos de separación de fases</h3>
 <p>Un sistema heterogéneo tiene dos o más fases. Para separarlas usamos <b>métodos de separación de fases</b>. Son fenómenos físicos: las sustancias no cambian, solo se separan. Cada método aprovecha una propiedad distinta de las fases.</p>
 <div class="wrap"><table>
  <tr><th>Método</th><th>Qué separa y cómo</th><th>Ejemplo</th></tr>
  <tr><td>Tría</td><td>Sólidos grandes, a mano.</td><td>porotos y piedritas</td></tr>
  <tr><td>Tamizado</td><td>Sólidos según el tamaño de sus granos, con un tamiz o colador.</td><td>harina y piedras</td></tr>
  <tr><td>Imantación</td><td>Un material magnético de otro que no lo es, con un imán.</td><td>limaduras de hierro y arena</td></tr>
  <tr><td>Filtración</td><td>Un sólido insoluble de un líquido, con papel de filtro.</td><td>arena y agua, café molido y café líquido</td></tr>
  <tr><td>Decantación</td><td>Líquidos que no se mezclan, con un embudo de decantación, o un sólido que se deposita en el fondo.</td><td>agua y aceite</td></tr>
  <tr><td>Centrifugación</td><td>Acelera la separación: se hace girar rápido la mezcla y lo más denso va al fondo.</td><td>sangre (plasma y glóbulos)</td></tr>
  <tr><td>Levigación</td><td>Sólidos de distinta densidad, con una corriente de agua que arrastra el más liviano.</td><td>oro y arena</td></tr>
 </table></div>
 <h3>Y si hay una solución...</h3>
 <p>Una solución tiene una sola fase, así que no se puede separar con los métodos anteriores. Para separar sus componentes se usa el <b>fraccionamiento</b>: la <b>evaporación</b> (se evapora el líquido y queda el sólido disuelto, como la sal del agua de mar), la <b>cristalización</b> y la <b>destilación</b> (separa líquidos que se mezclan, como alcohol y agua, porque hierven a distinta temperatura).</p>
 <div class="def"><p><b>Ejemplo de secuencia:</b> para separar limaduras de hierro, arena y agua con sal: 1) imantación (sale el hierro), 2) filtración (queda la arena en el papel), 3) evaporación (queda la sal y el agua se va).</p></div>
 <div style="margin-top:18px;border-top:2px dashed var(--mut);padding-top:14px">
  <h3 style="margin-top:0">Control de lectura 2</h3>
  <p id="c2m" class="warn"></p>
  <button class="btn" id="c2b" disabled>Hacer el control de lectura</button>
  <div id="c2q" hidden></div>
 </div>
</section>
<section id="juegos2" hidden>
 <div id="menu2"><h2>Juegos 2</h2>
  <p>Ganás hasta 100 puntos por juego según tus aciertos y, si respondés rápido, un bonus de hasta 10 puntos más.</p>
  <div class="games" style="margin-top:12px">${GM.map(([k,n,d])=>`<div class="game"><h3 style="margin-top:0">${n}</h3><p>${d}</p><button class="btn" data-p2="${k}">Jugar</button></div>`).join("")}</div>
 </div>
 <div id="juego2" hidden><p><b id="jn2"></b> <span id="jc2" class="nota"></span></p><div class="bar"><i id="pb2" style="width:0"></i></div><div id="area2"></div></div>
</section>
<section id="ranking2" hidden>
 <h2>Ranking 2</h2>
 <p class="me"><label for="f2">Ver:</label><select id="f2"><option value="all">Total (suma de los mejores puntajes)</option>${GM.map(([k,n])=>`<option value="${k}">${n}</option>`).join("")}</select></p>
 <div class="wrap"><table id="rk2"></table></div><p class="nota" id="rkn2"></p>
</section>`);
$$("[data-p2]").forEach(b=>b.onclick=()=>start2(b.dataset.p2));

/* ---------- control de lectura 2 ---------- */
const C2=[
["Un fenómeno natural es el que…","ocurre sin intervención humana","es provocado por las personas","solo ocurre en laboratorios","siempre forma sustancias nuevas"],
["¿Cuál es un fenómeno artificial?","Los fuegos artificiales","Una tormenta","La fotosíntesis","El día y la noche"],
["En un fenómeno físico…","no se forman sustancias nuevas","se forman sustancias nuevas","la sustancia cambia su naturaleza","siempre hay luz y calor"],
["En un fenómeno químico…","se forman sustancias nuevas","la sustancia sigue siendo la misma","solo cambia el tamaño","solo cambia la posición"],
["La fotosíntesis es un fenómeno…","natural y químico","natural y físico","artificial y químico","artificial y físico"],
["La lluvia es un fenómeno…","natural y físico","natural y químico","artificial y físico","artificial y químico"],
["Para separar limaduras de hierro y arena se usa…","la imantación","la decantación","la filtración","la levigación"],
["Para separar agua y aceite se usa…","la decantación","la imantación","el tamizado","la tría"],
["El tamizado separa sólidos por…","el tamaño de sus granos","su color","su magnetismo","su punto de ebullición"],
["La levigación separa…","sólidos de distinta densidad con una corriente de agua","dos líquidos que no se mezclan","un imán de un metal","sal de agua"],
["¿Qué método separa un sólido insoluble de un líquido?","la filtración","la imantación","la tría","la destilación"],
["Los métodos de separación de fases se aplican a…","sistemas heterogéneos","sistemas homogéneos","sustancias puras","soluciones"]];
let tl2=0,note2="";const MIN2=60;
function upd2(){
 if(!$("#c2q").hidden)return;
 const m=$("#c2m"),b=$("#c2b");
 if(leido2()){m.textContent="✔ Lectura aprobada. Ya podés jugar los juegos de la Teoría 2.";b.textContent="Ir a jugar";b.disabled=false;return}
 b.textContent="Hacer el control de lectura";
 if(!nombreOK()){m.textContent="Escribí tu nombre y apellido arriba para empezar.";b.disabled=true}
 else if(tl2<MIN2){m.textContent=note2+`Leé con atención: el control se habilita en ${MIN2-tl2} s.`;b.disabled=true}
 else{m.textContent=note2+"Respondé 4 preguntas sobre la teoría. Tenés que acertar las 4 para poder jugar.";b.disabled=false}
}
function openQ2(){
 note2="";
 const qs=sh(C2).slice(0,4).map(([q,a,...w])=>({q,a,o:sh([a,...w])}));
 const box=$("#c2q");box.hidden=false;$("#c2b").hidden=true;$("#c2m").textContent="Elegí una opción en cada pregunta.";
 box.innerHTML=qs.map((x,i)=>`<p class="q" style="font-size:1.05rem">${i+1}. ${esc(x.q)}</p>`+x.o.map(o=>`<label style="display:block;margin:4px 0"><input type="radio" name="d${i}" value="${esc(o)}" style="width:auto"> ${esc(o)}</label>`).join("")).join("")+`<p><button class="btn" id="c2ok">Enviar respuestas</button></p>`;
 $("#c2ok").onclick=()=>{
  const sel=qs.map((x,i)=>{const c=box.querySelector(`input[name=d${i}]:checked`);return c?c.value:null});
  if(sel.includes(null)){$("#c2m").textContent="Respondé las 4 preguntas.";return}
  const ok=sel.filter((v,i)=>v===qs[i].a).length;
  box.hidden=true;$("#c2b").hidden=false;
  if(ok===4){localStorage.setItem(lk2(),JSON.stringify({t:tl2,q:4,f:Date.now()}));post({tipo:"lectura",teoria:2,n:$("#nombre").value.trim().replace(/\s+/g," "),t:tl2,f:Date.now()})}
  else{tl2=MIN2-20;note2=`Acertaste ${ok} de 4. Necesitás las 4. Releé la teoría y probá de nuevo con preguntas nuevas. `}
  upd2();
 };
}
$("#c2b").onclick=()=>leido2()?show("juegos2"):openQ2();
$("#nombre").addEventListener("input",upd2);
setInterval(()=>{if(document.hidden||$("#teoria2").hidden)return;tl2++;upd2()},1000);
upd2();

/* ---------- navegación y requisitos ---------- */
const osh=show,osave=save,odr=drawRank;
show=id=>{
 if(!/2$/.test(id))return osh(id);
 const av=$("#aviso");
 if(id!=="ranking2"){
  if(!nombreOK()){osh("teoria");av.textContent="Escribí tu nombre y apellido arriba para continuar.";return}
  if(!done1()){osh("juegos");av.textContent="Para entrar a la Teoría 2 tenés que completar la Teoría 1: leerla, aprobar el control y jugar los 4 juegos. Te falta jugar: "+missing().map(j=>T1[j]).join(", ")+".";return}
  if(id==="juegos2"&&!leido2()){id="teoria2";av.textContent="Primero leé la Teoría 2 y aprobá su control de lectura."}
  else av.textContent="";
 }else av.textContent="";
 $$("main section").forEach(s=>s.hidden=s.id!==id);
 $$("nav button").forEach(b=>b.classList.toggle("on",b.dataset.t===id));
 if(id==="ranking2")loadRank2();
 if(id==="juegos2"&&!r2){$("#menu2").hidden=false;$("#juego2").hidden=true}
 scrollTo(0,0);
};
save=async r=>{if(T1[r.j])localStorage.setItem("done1|"+String(r.n).toLowerCase()+"|"+r.j,"1");return osave(r)};
drawRank=rows=>odr(rows.filter(r=>!String(r.j).startsWith("t2_")));

/* ---------- datos de los juegos ---------- */
const METS=["Filtración","Decantación","Imantación","Tamizado","Tría","Centrifugación","Levigación","Evaporación","Destilación"];
const D={
trivia:[
["¿Qué es un fenómeno?","Todo cambio o suceso que se produce en la naturaleza o en la materia","Una sustancia pura","Un instrumento de laboratorio","Un estado de la materia"],
["Un fenómeno natural es el que…","ocurre sin intervención del ser humano","siempre es peligroso","solo ocurre en laboratorios","es provocado por las personas"],
["Un fenómeno artificial es el que…","es provocado o modificado por el ser humano","ocurre solo en la naturaleza","no cambia la materia","siempre es químico"],
["En un fenómeno físico…","no se forman sustancias nuevas","se forman sustancias nuevas","siempre se libera luz","la sustancia cambia su naturaleza"],
["En un fenómeno químico…","se forman sustancias nuevas","la sustancia sigue siendo la misma","solo cambia la forma","solo cambia el tamaño"],
["¿Cuál es un fenómeno químico?","La combustión de la madera","La fusión del hielo","Romper un vidrio","Disolver sal en agua"],
["¿Cuál es un fenómeno físico?","La evaporación del agua","La oxidación de un clavo","La cocción de un huevo","La fermentación de la uva"],
["¿Qué señal indica que pudo haber un fenómeno químico?","Cambio de color o burbujas de gas","Cambio de lugar del objeto","Que el objeto se rompe","Que el objeto se mueve"],
["Los métodos de separación de fases se usan en…","sistemas heterogéneos","sustancias puras","un solo componente","sistemas de una sola fase"],
["La filtración separa…","un sólido insoluble de un líquido","dos líquidos que no se mezclan","un imán de un sólido","sal disuelta en agua"],
["La decantación sirve para separar…","líquidos que no se mezclan, como agua y aceite","sólidos de distinto tamaño","limaduras de hierro y arena","sal disuelta en agua"],
["La imantación separa…","un material magnético de otro que no lo es","dos líquidos","un sólido de un líquido","sólidos por su tamaño"],
["El tamizado separa sólidos según…","el tamaño de sus granos","su color","su carga eléctrica","su punto de ebullición"],
["La centrifugación se usa para…","acelerar la separación haciendo girar la mezcla","calentar un líquido","imantar un metal","disolver una sustancia"]].map(([q,a,...w])=>({q,a,o:sh([a,...w])})),
natart:[["Una tormenta eléctrica","Natural"],["Hacer una torta","Artificial"],["La erupción de un volcán","Natural"],["Encender una lamparita","Artificial"],["La fotosíntesis","Natural"],["Los fuegos artificiales","Artificial"],["El día y la noche","Natural"],["Cocinar un guiso","Artificial"],["La germinación de una semilla","Natural"],["Hacer queso","Artificial"],["Un arcoíris","Natural"],["Hacer funcionar un auto","Artificial"]].map(([q,a])=>({q:q+": ¿natural o artificial?",a,o:["Natural","Artificial"]})),
fisquim:[["La fusión del hielo","Físico"],["Quemar papel","Químico"],["Romper un vaso","Físico"],["La oxidación de un clavo","Químico"],["La evaporación del agua","Físico"],["La digestión de los alimentos","Químico"],["Disolver azúcar en agua","Físico"],["Cocinar un huevo","Químico"],["Estirar un elástico","Físico"],["La fermentación de la uva","Químico"],["La putrefacción de una fruta","Químico"],["Doblar un alambre","Físico"]].map(([q,a])=>({q:q+": ¿físico o químico?",a,o:["Físico","Químico"]})),
metodos:[["Separar arena de agua","Filtración"],["Separar agua y aceite","Decantación"],["Separar limaduras de hierro de arena","Imantación"],["Separar harina de piedritas","Tamizado"],["Separar porotos de piedritas con las manos","Tría"],["Separar los componentes de la sangre en un laboratorio","Centrifugación"],["Separar café molido del café líquido","Filtración"],["Separar oro de arena con agua corriente","Levigación"],["Recuperar la sal del agua de mar","Evaporación"],["Separar alcohol y agua","Destilación"]].map(([q,a])=>({q:q+": ¿qué método usás?",a})),
escribir:[["¿Qué método usás para separar arena y agua? (una palabra)",["filtracion"],"Filtración"],["¿Qué método separa agua y aceite?",["decantacion"],"Decantación"],["¿Qué método separa limaduras de hierro y arena?",["imantacion"],"Imantación"],["¿Qué método usás para separar piedras de harina con un colador?",["tamiz"],"Tamizado"],["Fenómeno en el que se forman sustancias nuevas: ¿físico o químico?",["quimico"],"Químico"],["Fenómeno en el que no se forman sustancias nuevas: ¿físico o químico?",["fisico"],"Físico"],["Fenómeno que ocurre sin intervención humana: ¿natural o artificial?",["natural"],"Natural"],["Fenómeno provocado por el ser humano: ¿natural o artificial?",["artificial"],"Artificial"],["¿Qué método usás para recuperar la sal disuelta en agua?",["evaporacion","cristalizacion"],"Evaporación"],["¿Qué método separa alcohol y agua por su punto de ebullición?",["destilacion"],"Destilación"],["¿Qué método usás para separar la sangre en un laboratorio haciéndola girar rápido?",["centrifug"],"Centrifugación"]].map(([q,w,s])=>({q,w,s}))
};
const PAIRS=[["Imantación","Limaduras de hierro y arena"],["Filtración","Arena y agua"],["Decantación","Agua y aceite"],["Tamizado","Piedras y harina"],["Centrifugación","Plasma y glóbulos de la sangre"],["Tría","Porotos y piedritas"],["Levigación","Oro y arena con agua corriente"]];
const WS=[["DECANTACION","Separa líquidos que no se mezclan, como agua y aceite"],["DESTILACION","Separa líquidos que se mezclan, por su punto de ebullición"],["EVAPORACION","Recupera la sal que quedó disuelta en el agua"],["FILTRACION","Separa un sólido insoluble de un líquido con papel de filtro"],["IMANTACION","Separa materiales magnéticos, como el hierro"],["TAMIZADO","Separa sólidos según el tamaño de sus granos"]];

/* ---------- motor de juegos ---------- */
let r2=null;
function start2(k){
 if(!nombreOK()){$("#aviso").textContent="Escribí tu nombre y apellido arriba para poder jugar.";$("#nombre").focus();return}
 if(!leido2()){show("teoria2");return}
 $("#aviso").textContent="";localStorage.setItem("nm",$("#nombre").value.trim().replace(/\s+/g," "));
 r2={k,i:0,ok:0,t0:Date.now(),busy:false,nm:$("#nombre").value.trim().replace(/\s+/g," ")};
 $("#menu2").hidden=true;$("#juego2").hidden=false;$("#jn2").textContent=GM.find(g=>g[0]===k)[1];$("#jc2").textContent="";$("#pb2").style.width="0";
 if(k==="flechas")return flechas();
 if(k==="sopa")return sopa();
 r2.items=sh(D[k]).slice(0,10).map(x=>k==="metodos"?{...x,o:sh([x.a,...sh(METS.filter(m=>m!==x.a)).slice(0,3)])}:x);
 ask2();
}
function ask2(){
 const it=r2.items[r2.i];
 $("#jc2").textContent=`Pregunta ${r2.i+1} de ${r2.items.length} · Aciertos: ${r2.ok}`;
 $("#pb2").style.width=(r2.i/r2.items.length*100)+"%";
 if(it.w){
  $("#area2").innerHTML=`<p class="q">${esc(it.q)}</p><p><input id="resp" maxlength="60" autocomplete="off" placeholder="Escribí tu respuesta" style="width:100%;max-width:420px"> <button class="btn" id="env">Responder</button></p><p id="fb" style="font-weight:bold"></p>`;
  const go=()=>{
   if(r2.busy)return;const v=nrm($("#resp").value);if(!v)return;
   const good=it.w.some(x=>v.includes(x));
   $("#resp").disabled=true;$("#env").disabled=true;
   $("#fb").style.color=good?"var(--ok)":"var(--no)";$("#fb").textContent=good?"¡Correcto!":"No. La respuesta era: "+it.s;
   next2(good);
  };
  $("#env").onclick=go;$("#resp").onkeydown=e=>{if(e.key==="Enter")go()};$("#resp").focus();
 }else{
  $("#area2").innerHTML=`<p class="q">${esc(it.q)}</p><div class="opts">${it.o.map((o,j)=>`<button class="opt" data-j="${j}">${esc(o)}</button>`).join("")}</div>`;
  $$("#area2 .opt").forEach(b=>b.onclick=()=>{
   if(r2.busy)return;
   const good=it.o[b.dataset.j]===it.a;b.classList.add(good?"ok":"no");
   if(!good)$$("#area2 .opt").forEach(x=>{if(it.o[x.dataset.j]===it.a)x.classList.add("ok")});
   next2(good);
  });
 }
}
function next2(good){
 r2.busy=true;if(good)r2.ok++;
 setTimeout(()=>{r2.busy=false;r2.i++;r2.i<r2.items.length?ask2():fin2(r2.ok,r2.items.length,r2.items.length*9)},good?650:1700);
}
async function fin2(ok,tot,allow){
 const r=r2;r2=null;window.onresize=null;
 const seg=Math.round((Date.now()-r.t0)/1000),bonus=ok>=tot/2?Math.max(0,Math.min(10,Math.floor((allow-seg)/9))):0,pts=Math.round(ok/tot*100)+bonus,nota=(ok/tot*10).toFixed(1).replace(".0","");
 let L={};try{L=JSON.parse(localStorage.getItem("lec2|"+r.nm.toLowerCase())||"{}")}catch(e){}
 $("#pb2").style.width="100%";
 $("#area2").innerHTML=`<div class="res"><p class="big">${pts} puntos</p><p>${ok} aciertos de ${tot} · Nota ${nota} · Tiempo ${seg} s (bonus ${bonus})</p><p>${ok===tot?"¡Perfecto!":ok>=tot*.6?"¡Muy bien!":"Repasá la teoría y volvé a intentarlo."}</p><p><button class="btn" id="ag2">Jugar de nuevo</button> <button class="btn" id="vr2">Ver ranking</button> <button class="btn" id="mn2">Otros juegos</button></p></div>`;
 $("#ag2").onclick=()=>start2(r.k);$("#vr2").onclick=()=>show("ranking2");$("#mn2").onclick=()=>show("juegos2");
 await save({n:r.nm,j:"t2_"+r.k,p:pts,nota:+nota,s:seg,lec:L.t||0,f:Date.now()});
}

/* ---------- unir con flechas ---------- */
function flechas(){
 const P=sh(PAIRS).slice(0,6),R=sh([0,1,2,3,4,5]),L={};let sel=null;
 let h=`<p>Hacé clic en un método y después en la mezcla que separa. Para cambiar una unión, volvé a unir.</p><div id="fl" style="position:relative;display:grid;grid-template-columns:1fr 70px 1fr;gap:10px 0"><svg id="fls" style="position:absolute;inset:0;width:100%;height:100%;pointer-events:none"></svg>`;
 for(let i=0;i<6;i++)h+=`<button class="opt" data-l="${i}">${esc(P[i][0])}</button><span></span><button class="opt" data-r="${i}">${esc(P[R[i]][1])}</button>`;
 h+=`</div><p class="warn" id="flm"></p><p><button class="btn" id="flok">Comprobar</button> <button class="btn" id="flx">Borrar uniones</button></p>`;
 $("#area2").innerHTML=h;
 const draw=()=>{
  const f=$("#fl").getBoundingClientRect();
  let s=`<defs><marker id="ah" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0L8,4L0,8z" fill="#14305c"/></marker></defs>`;
  Object.entries(L).forEach(([i,j])=>{const a=$(`[data-l="${i}"]`).getBoundingClientRect(),b=$(`[data-r="${j}"]`).getBoundingClientRect();s+=`<line x1="${a.right-f.left}" y1="${a.top+a.height/2-f.top}" x2="${b.left-f.left-2}" y2="${b.top+b.height/2-f.top}" stroke="${COL[0]}" stroke-width="3" marker-end="url(#ah)"/>`});
  $("#fls").innerHTML=s;
  $$("#fl [data-l]").forEach(x=>{x.classList.toggle("sel",sel!==null&&+x.dataset.l===sel);x.classList.toggle("lk",x.dataset.l in L)});
  $$("#fl [data-r]").forEach(x=>x.classList.toggle("lk",Object.values(L).includes(+x.dataset.r)));
  $("#jc2").textContent=`Uniones: ${Object.keys(L).length} de 6`;$("#pb2").style.width=Object.keys(L).length/6*100+"%";
 };
 $$("#fl [data-l]").forEach(b=>b.onclick=()=>{const i=+b.dataset.l;sel=sel===i?null:i;draw()});
 $$("#fl [data-r]").forEach(b=>b.onclick=()=>{if(sel===null)return;const j=+b.dataset.r;Object.keys(L).forEach(i=>{if(L[i]===j)delete L[i]});L[sel]=j;sel=null;draw()});
 $("#flx").onclick=()=>{Object.keys(L).forEach(i=>delete L[i]);sel=null;draw()};
 $("#flok").onclick=()=>{
  if(Object.keys(L).length<6){$("#flm").textContent="Uní los 6 métodos antes de comprobar.";return}
  fin2(Object.entries(L).filter(([i,j])=>R[j]===+i).length,6,120);
 };
 window.onresize=draw;draw();
}

/* ---------- sopa de letras ---------- */
function sopa(){
 const N=12,g=Array.from({length:N},()=>Array(N).fill("")),DR=[[0,1],[1,0],[1,1]],rnd=n=>Math.floor(Math.random()*n);
 [...WS].sort((a,b)=>b[0].length-a[0].length).forEach(([w])=>{
  for(let t=0;t<800;t++){
   const [dr,dc]=DR[rnd(3)],r=rnd(N),c=rnd(N);
   if(r+dr*(w.length-1)>=N||c+dc*(w.length-1)>=N)continue;
   let ok=true;for(let k=0;k<w.length;k++){const x=g[r+dr*k][c+dc*k];if(x&&x!==w[k])ok=false}
   if(!ok)continue;
   for(let k=0;k<w.length;k++)g[r+dr*k][c+dc*k]=w[k];break;
  }
 });
 for(let i=0;i<N;i++)for(let j=0;j<N;j++)if(!g[i][j])g[i][j]="ABCDEFGHIJLMNOPRSTUVZ"[rnd(21)];
 let cells="";for(let i=0;i<N;i++)for(let j=0;j<N;j++)cells+=`<button class="cel" data-r="${i}" data-c="${j}" aria-label="${g[i][j]}">${g[i][j]}</button>`;
 $("#area2").innerHTML=`<p>Leé las pistas y encontrá cada método. Hacé clic en la primera letra y después en la última (horizontal, vertical o en diagonal).</p><div style="display:flex;gap:18px;flex-wrap:wrap;align-items:flex-start"><div id="sg" style="display:grid;grid-template-columns:repeat(${N},1fr);gap:2px;width:100%;max-width:480px">${cells}</div><div style="flex:1;min-width:220px">${WS.map(([w,c],i)=>`<p class="cl" id="cl${i}">${i+1}. ${esc(c)} <span class="nota">(${w.length} letras)</span></p>`).join("")}<p><button class="btn" id="sfin">Terminar</button></p></div></div>`;
 const found=new Set();let a=null;
 const cell=(r,c)=>$(`.cel[data-r="${r}"][data-c="${c}"]`);
 const upd=()=>{$("#jc2").textContent=`Palabras: ${found.size} de ${WS.length}`;$("#pb2").style.width=found.size/WS.length*100+"%"};
 $$(".cel").forEach(b=>b.onclick=()=>{
  const r=+b.dataset.r,c=+b.dataset.c;
  if(!a){a=[r,c];b.classList.add("sel");return}
  const [r0,c0]=a,dr=r-r0,dc=c-c0;a=null;cell(r0,c0).classList.remove("sel");
  if((!dr&&!dc)||(dr&&dc&&Math.abs(dr)!==Math.abs(dc)))return;
  const n=Math.max(Math.abs(dr),Math.abs(dc))+1,sr=Math.sign(dr),sc=Math.sign(dc),cs=[];let s="";
  for(let k=0;k<n;k++){cs.push([r0+sr*k,c0+sc*k]);s+=g[r0+sr*k][c0+sc*k]}
  const i=WS.findIndex(([w])=>w===s||w===[...s].reverse().join(""));
  if(i<0||found.has(i))return;
  found.add(i);cs.forEach(([x,y])=>{cell(x,y).style.background=`hsl(${i*60},85%,78%)`});
  $("#cl"+i).classList.add("hecho");upd();
  if(found.size===WS.length)setTimeout(()=>fin2(found.size,WS.length,180),700);
 });
 $("#sfin").onclick=()=>fin2(found.size,WS.length,180);
 upd();
}

/* ---------- ranking 2 ---------- */
async function loadRank2(){
 let rows=local(),shared=false;
 if(RANKING_URL){try{const r=await fetch(RANKING_URL);const d=await r.json();if(Array.isArray(d)){rows=d;shared=true}}catch(e){}}
 $("#rkn2").textContent=shared?"Ranking compartido por todos los participantes.":"Ranking guardado solo en este dispositivo.";
 const draw=()=>{
  const f=$("#f2").value,best={},by={};
  rows.filter(r=>String(r.j).startsWith("t2_")).forEach(r=>{const k=String(r.n).toLowerCase()+"|"+r.j;if(!best[k]||r.p>best[k].p||(r.p===best[k].p&&r.s<best[k].s))best[k]=r});
  Object.values(best).forEach(r=>{
   if(f!=="all"&&r.j!=="t2_"+f)return;
   const k=String(r.n).toLowerCase(),o=by[k]||(by[k]={n:r.n,p:0,s:0,nt:[],lec:0});
   o.p+=r.p;o.s+=r.s;o.nt.push(r.nota);o.lec=r.lec||o.lec;
  });
  const list=Object.values(by).sort((x,y)=>y.p-x.p||x.s-y.s).slice(0,100),me=NM(),med=["🥇","🥈","🥉"];
  $("#rk2").innerHTML=list.length?`<tr><th>Puesto</th><th>Nombre</th><th>Puntos</th><th>Nota</th><th>Tiempo juego</th><th>Lectura</th></tr>`+list.map((o,i)=>`<tr class="${o.n.toLowerCase()===me?"me-row":""}"><td>${med[i]||i+1}</td><td>${esc(o.n)}</td><td>${o.p}</td><td>${(o.nt.reduce((x,y)=>x+y,0)/o.nt.length).toFixed(1)}</td><td>${o.s} s</td><td>${o.lec?o.lec+" s":"-"}</td></tr>`).join(""):`<tr><td>Todavía no hay puntajes. Jugá una partida para aparecer acá.</td></tr>`;
 };
 $("#f2").onchange=draw;draw();
}
})();
