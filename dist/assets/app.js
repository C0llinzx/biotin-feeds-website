const products = [
  {id:'layer-mash',name:'Layer Mash',filter:'mash',category:'Layers',type:'Complete mash',bestFor:'Mature laying birds',benefit:'Supports sustained egg production and desirable egg quality.',points:['Formulated for enduring high production','Supports desirable egg size and yolk colour']},
  {id:'grower-mash',name:'Grower Mash',filter:'mash',category:'Chicks & pullets',type:'Complete mash',bestFor:'Growing pullets',benefit:'Balanced nutrition for healthy pullet development.',points:['Supports healthy pullet development','Provides nutrition towards reproductive maturity']},
  {id:'chick-mash',name:'Chick Mash',filter:'mash',category:'Chicks & pullets',type:'Complete mash',bestFor:'Young chicks',benefit:'Essential early nutrition for healthy chick development.',points:['Supports a smooth brooding period','Provides essential nutrients for healthy chicks']},
  {id:'prelay-mash',name:'Prelay Mash',filter:'mash',category:'Layers',type:'Complete mash',bestFor:'Pullets approaching lay',benefit:'Prepares pullets for the demands of egg production.',points:['Supports transition into the laying stage','Helps build a robust system for production']},
  {id:'broiler-prestarter',name:'Broiler Pre-Starter Mash',filter:'mash',category:'Broilers',type:'Complete mash',bestFor:'Early brooding',benefit:'Nutrient-dense support for early broiler development.',points:['Formulated for the starter stage','Supports a smooth brooding period']},
  {id:'broiler-starter',name:'Broiler Starter Mash',filter:'mash',category:'Broilers',type:'Complete mash',bestFor:'Growing broilers',benefit:'Supports frame development and steady weight gain.',points:['Supports broiler frame development','Formulated for efficient feed conversion']},
  {id:'broiler-finisher',name:'Broiler Finisher Mash',filter:'mash',category:'Broilers',type:'Complete mash',bestFor:'Finishing broilers',benefit:'Strong finishing nutrition for desirable lean-meat development.',points:['Supports finishing performance','Supports desirable lean-meat development']},
  {id:'layer-40',name:'Layer 40% Concentrate',filter:'concentrate',category:'Layers',type:'Concentrate',bestFor:'Layer-feed formulation',benefit:'Concentrated nutrition for sustained layer production.',points:['Supports enduring high production','Supports desirable egg size and yolk colour']},
  {id:'grower-30',name:'Grower 30% Concentrate',filter:'concentrate',category:'Chicks & pullets',type:'Concentrate',bestFor:'Grower-feed formulation',benefit:'Balanced support for growing pullets.',points:['Supports healthy pullet development','Supports reproductive maturity']},
  {id:'chick-40',name:'Chick 40% Concentrate',filter:'concentrate',category:'Chicks & pullets',type:'Concentrate',bestFor:'Chick-feed formulation',benefit:'Concentrated nutrients for the brooding stage.',points:['Supports smooth brooding','Supports healthy chick development']},
  {id:'broiler-50',name:'Broiler 50% Concentrate',filter:'concentrate',category:'Broilers',type:'Concentrate',bestFor:'Broiler-feed formulation',benefit:'Concentrated support for broiler frame and weight development.',points:['Supports frame development','Formulated for efficient conversion']},
  {id:'ruminant',name:'Ruminant Concentrate',filter:'ruminant',category:'Cattle / ruminants',type:'Concentrate',bestFor:'Cattle and other ruminants',benefit:'Balanced nutrition for healthy growth and animal condition.',points:['Supports healthy growth','Supports animal condition and meat quality']}
].map(product => ({...product, image:`assets/products/${product.id}.webp`}));

const categoryConfig = {
  layers:{label:'Layers',title:'Feed for enduring production',animal:'assets/animals-layers-v2.webp',alt:'Healthy laying hen with eggs',ids:['layer-mash','prelay-mash','layer-40']},
  pullets:{label:'Chicks & pullets',title:'A strong start, stage by stage',animal:'assets/animals-pullets.png',alt:'Healthy chick and young pullet',ids:['chick-mash','grower-mash','chick-40','grower-30']},
  broilers:{label:'Broilers',title:'From brooding to finishing',animal:'assets/animals-broilers-v2.webp',alt:'Healthy adult broiler with a smaller chick',ids:['broiler-prestarter','broiler-starter','broiler-finisher','broiler-50']},
  ruminants:{label:'Cattle / ruminants',title:'Balanced nutrition for healthy growth',animal:'assets/animals-ruminants-v4.webp',alt:'Healthy Nigerian cattle standing beside a goat',ids:['ruminant']}
};

const els = {
  tabs:[...document.querySelectorAll('.animal-tab')], stage:document.getElementById('feedStage'), animal:document.getElementById('animalImage'), stageAnimal:document.getElementById('stageAnimal'), title:document.getElementById('feedTitle'), options:document.getElementById('feedOptions'), bag:document.getElementById('bagImage'), type:document.getElementById('productType'), name:document.getElementById('productName'), benefit:document.getElementById('productBenefit'), whats:document.getElementById('productWhatsapp')
};

let activeProduct = products[0];
function whatsappLink(name){return `https://wa.me/2347031944660?text=${encodeURIComponent(`Hello Biotin Feeds, I would like to enquire about ${name}. Please share the current price and availability.`)}`}
function displayProduct(product){
  activeProduct=product; els.type.textContent=product.type; els.name.textContent=product.name; els.benefit.textContent=product.benefit; els.whats.href=whatsappLink(product.name);
  els.bag.src=product.image; els.bag.alt=`Biotin Feeds ${product.name} bag`;
  [...els.options.children].forEach(b=>b.classList.toggle('active',b.dataset.id===product.id));
  els.bag.animate([{opacity:.2,transform:'translateY(10px)'},{opacity:1,transform:'none'}],{duration:360,easing:'ease-out'});
}
function displayCategory(key, focusFirst=true){
  const config=categoryConfig[key]; els.stage.dataset.category=key; els.stageAnimal.textContent=config.label; els.title.textContent=config.title; els.animal.src=config.animal; els.animal.alt=config.alt; els.animal.className=`animal-image animal-${key}`;
  els.options.replaceChildren(...config.ids.map((id,i)=>{const p=products.find(x=>x.id===id);const b=document.createElement('button');b.type='button';b.className='feed-option'+(i===0?' active':'');b.dataset.id=id;b.textContent=p.name;b.addEventListener('click',()=>displayProduct(p));return b}));
  displayProduct(products.find(p=>p.id===config.ids[0]));
  if(focusFirst) els.stage.animate([{opacity:.72,transform:'scale(.995)'},{opacity:1,transform:'none'}],{duration:420,easing:'ease-out'});
}
els.tabs.forEach(tab=>tab.addEventListener('click',()=>{els.tabs.forEach(t=>{t.classList.remove('active');t.setAttribute('aria-selected','false')});tab.classList.add('active');tab.setAttribute('aria-selected','true');displayCategory(tab.dataset.category)}));

const dialog=document.getElementById('productDialog');
function openProduct(product){
  const photo=document.getElementById('dialogImage');photo.src=product.image;photo.alt=`Biotin Feeds ${product.name} bag`;
  document.getElementById('dialogType').textContent=product.type+' · '+product.category; document.getElementById('dialogName').textContent=product.name; document.getElementById('dialogBenefit').textContent=product.benefit;document.getElementById('dialogBestFor').textContent=product.bestFor;
  const list=document.getElementById('dialogPoints');list.replaceChildren(...product.points.map(point=>{const li=document.createElement('li');li.textContent=point;return li}));document.getElementById('dialogWhatsapp').href=whatsappLink(product.name);dialog.showModal();
}
document.getElementById('detailButton').addEventListener('click',()=>openProduct(activeProduct));
dialog.querySelector('.dialog-close').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close()});

const catalog=document.getElementById('catalogGrid');
function renderCatalog(filter='all'){
  const visible=filter==='all'?products:products.filter(p=>p.filter===filter);
  catalog.replaceChildren(...visible.map((p,i)=>{const article=document.createElement('article');article.className='product-card reveal visible';article.innerHTML=`<div class="card-meta"><span>${p.category}</span><span class="card-number">${String(i+1).padStart(2,'0')}</span></div><button class="product-photo" type="button" aria-label="Quick view ${p.name}"><img src="${p.image}" alt="Biotin Feeds ${p.name} bag" loading="lazy" decoding="async" width="600" height="800"></button><div class="product-labels"><span class="product-format">${p.type}</span><span class="product-stage">${p.bestFor}</span></div><h3>${p.name}</h3><p>${p.benefit}</p><a class="text-button" href="products/${p.id}/" aria-label="View ${p.name} product page">View product <span>↗</span></a>`;article.querySelector('.product-photo').addEventListener('click',()=>openProduct(p));return article}));
}
renderCatalog();
document.querySelectorAll('.catalog-tab').forEach(tab=>tab.addEventListener('click',()=>{document.querySelectorAll('.catalog-tab').forEach(t=>t.classList.remove('active'));tab.classList.add('active');renderCatalog(tab.dataset.filter)}));

const header=document.getElementById('siteHeader');
function updateHeader(){header.classList.toggle('scrolled',scrollY>=Math.max(120,innerHeight-header.offsetHeight))}
addEventListener('scroll',updateHeader,{passive:true});addEventListener('resize',updateHeader,{passive:true});updateHeader();
const menu=document.querySelector('.menu-toggle'),nav=document.getElementById('mainNav');menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')==='true';menu.setAttribute('aria-expanded',String(!open));nav.classList.toggle('open',!open)});nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menu.setAttribute('aria-expanded','false')}));

const heroVideo=document.querySelector('.hero-bg'),heroVideoToggle=document.getElementById('heroVideoToggle');
function updateHeroVideoControl(){const paused=heroVideo.paused;heroVideoToggle.classList.toggle('is-paused',paused);heroVideoToggle.setAttribute('aria-pressed',String(paused));heroVideoToggle.setAttribute('aria-label',`${paused?'Play':'Pause'} background video`);heroVideoToggle.querySelector('span').textContent=paused?'▶':'Ⅱ';heroVideoToggle.querySelector('b').textContent=paused?'Play motion':'Pause motion'}
heroVideoToggle.addEventListener('click',()=>{if(heroVideo.paused){heroVideo.play().catch(()=>{});}else{heroVideo.pause()}updateHeroVideoControl()});heroVideo.addEventListener('play',updateHeroVideoControl);heroVideo.addEventListener('pause',updateHeroVideoControl);if(matchMedia('(prefers-reduced-motion: reduce)').matches)heroVideo.pause();updateHeroVideoControl();

const sectionLinks=[...nav.querySelectorAll('a[href^="#"]')].map(link=>({link,section:document.querySelector(link.getAttribute('href'))})).filter(item=>item.section);
const sectionObserver=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(!entry.isIntersecting)return;sectionLinks.forEach(({link,section})=>{const active=section===entry.target;link.classList.toggle('active',active);if(active)link.setAttribute('aria-current','location');else link.removeAttribute('aria-current')})})},{rootMargin:'-28% 0px -58% 0px',threshold:0});sectionLinks.forEach(({section})=>sectionObserver.observe(section));

const backToTop=document.getElementById('backToTop');function updateFloatingControls(){backToTop.classList.toggle('visible',scrollY>innerHeight*.85)}addEventListener('scroll',updateFloatingControls,{passive:true});addEventListener('resize',updateFloatingControls,{passive:true});updateFloatingControls();

const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target)}}),{threshold:.12});document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

const galleryPhotos=[
  {src:'assets/gallery/facility-exterior.webp',category:'Facility',title:'Our Kaduna facility',description:'A real view of the Biotin Feeds operation at BR 4, Nnamdi Azikiwe Expressway, Ungwan Muazu, Kaduna.',alt:'Exterior of the Biotin Feeds facility in Kaduna'},
  {src:'assets/gallery/bagging-production.webp',category:'Production',title:'Layer Mash in production',description:'Our team sealing finished Layer Mash bags during the production process.',alt:'Biotin Feeds workers sealing Layer Mash bags during production'},
  {src:'assets/gallery/ingredient-measurement.webp',category:'Preparation',title:'Careful ingredient measurement',description:'Feed ingredients are measured carefully as part of day-to-day preparation.',alt:'Worker carefully measuring feed ingredients on a digital scale'},
  {src:'assets/gallery/feed-dispatch.webp',category:'Logistics',title:'Packed and ready for dispatch',description:'Finished feed bags loaded securely for the journey to customers.',alt:'A delivery truck packed with Biotin Feeds bags'},
  {src:'assets/gallery/learning-session.webp',category:'',title:'Annual General Meeting',description:'',alt:'Participants attending the Biotin Feeds Annual General Meeting'},
  {src:'assets/gallery/fleet-sanitisation.webp',category:'',title:'Keeping Biosecurity Measures Before Entry of Vehicles',description:'',alt:'Workers keeping biosecurity measures before entry of a Biotin Feeds vehicle'},
  {src:'assets/gallery/warehouse-stock.webp',category:'Fulfilment',title:'Layer Mash organised for fulfilment',description:'Finished product arranged at the facility before customer collection or dispatch.',alt:'Biotin Feeds Layer Mash organised in the warehouse'},
  {src:'assets/gallery/facility-sign.webp',category:'Kaduna',title:'Find us in Ungwan Muazu',description:'The roadside sign welcoming customers to Biotin Feeds and Concentrates in Kaduna.',alt:'Biotin Feeds and Concentrates roadside sign in Kaduna'},
  {src:'assets/gallery/office-team.webp',category:'Team',title:'Keeping the operation moving',description:'Every order is supported by people managing the important details behind the scenes.',alt:'A Biotin Feeds team member working at the office'},
  {src:'assets/gallery/delivery-preparation.webp',category:'',title:'Keeping Biosecurity Measures Before Entry of Vehicles',description:'',alt:'Workers keeping biosecurity measures before entry of a Biotin Feeds vehicle'},
  {src:'assets/gallery/team-member.webp',category:'Team',title:'People behind precise nutrition',description:'A member of the Biotin Feeds team during a company programme.',alt:'A Biotin Feeds team member standing beside a company banner'},
  {src:'assets/gallery/community-recognition.webp',category:'Community',title:'A moment of recognition',description:'A presentation moment captured during a Biotin Feeds programme.',alt:'Recognition moment during a Biotin Feeds programme'}
];
const reducedMotion=matchMedia('(prefers-reduced-motion: reduce)').matches;
const galleryDialog=document.getElementById('galleryDialog'),galleryImage=document.getElementById('galleryDialogImage'),galleryAmbient=document.getElementById('galleryAmbientImage'),galleryToggle=document.querySelector('.gallery-autoplay-toggle');let galleryIndex=0,galleryTimer=0,galleryPlaying=!reducedMotion,galleryInteracted=false;
function showGalleryPhoto(index){
  galleryIndex=(index+galleryPhotos.length)%galleryPhotos.length;const photo=galleryPhotos[galleryIndex];
  galleryImage.classList.remove('is-panning');galleryImage.src=photo.src;galleryImage.alt=photo.alt;galleryAmbient.src=photo.src;
  const category=document.getElementById('galleryDialogCategory'),description=document.getElementById('galleryDialogDescription');category.textContent=photo.category;category.hidden=!photo.category;document.getElementById('galleryDialogTitle').textContent=photo.title;description.textContent=photo.description;description.hidden=!photo.description;
  document.getElementById('galleryDialogCount').textContent=`${String(galleryIndex+1).padStart(2,'0')} / ${String(galleryPhotos.length).padStart(2,'0')}`;document.getElementById('galleryProgressBar').style.width=`${((galleryIndex+1)/galleryPhotos.length)*100}%`;
  requestAnimationFrame(()=>requestAnimationFrame(()=>galleryImage.classList.add('is-panning')));
}
function updateGalleryToggle(){galleryToggle.innerHTML=`<span aria-hidden="true">${galleryPlaying?'Ⅱ':'▶'}</span> ${galleryPlaying?'Pause':'Play'}`;galleryToggle.setAttribute('aria-label',`${galleryPlaying?'Pause':'Play'} gallery autoplay`)}
function stopGalleryAutoplay(){clearInterval(galleryTimer);galleryTimer=0}
function startGalleryAutoplay(){stopGalleryAutoplay();if(galleryPlaying&&galleryDialog.open&&!document.hidden)galleryTimer=setInterval(()=>showGalleryPhoto(galleryIndex+1),galleryInteracted?6500:3600);updateGalleryToggle()}
function selectGalleryPhoto(index){galleryInteracted=true;showGalleryPhoto(index);startGalleryAutoplay()}
function openGalleryAt(index=0){galleryInteracted=false;showGalleryPhoto(index);galleryDialog.showModal();galleryPlaying=!reducedMotion;startGalleryAutoplay()}
document.querySelectorAll('.gallery-item').forEach(item=>item.addEventListener('click',()=>openGalleryAt(Number(item.dataset.galleryIndex))));document.getElementById('openFullGallery').addEventListener('click',()=>openGalleryAt(0));
galleryToggle.addEventListener('click',()=>{galleryInteracted=true;galleryPlaying=!galleryPlaying;startGalleryAutoplay()});
galleryDialog.querySelector('.gallery-close').addEventListener('click',()=>galleryDialog.close());galleryDialog.querySelector('.gallery-prev').addEventListener('click',()=>selectGalleryPhoto(galleryIndex-1));galleryDialog.querySelector('.gallery-next').addEventListener('click',()=>selectGalleryPhoto(galleryIndex+1));
galleryDialog.addEventListener('click',event=>{if(event.target===galleryDialog)galleryDialog.close()});galleryDialog.addEventListener('keydown',event=>{if(event.key==='ArrowLeft')selectGalleryPhoto(galleryIndex-1);if(event.key==='ArrowRight')selectGalleryPhoto(galleryIndex+1)});
galleryDialog.addEventListener('close',stopGalleryAutoplay);updateGalleryToggle();

let quoteIndex=0,quoteTimer=0,quotePlaying=!reducedMotion,quoteInteracted=false;const quotes=[...document.querySelectorAll('.quote')],dots=document.querySelector('.quote-dots'),quoteToggle=document.querySelector('.quote-toggle'),storyStack=document.querySelector('.story-stack');
quotes.forEach((_,i)=>{const b=document.createElement('button');b.type='button';b.setAttribute('aria-label',`Show testimonial ${i+1}`);b.addEventListener('click',()=>selectQuote(i));dots.appendChild(b)});
function showQuote(i){quoteIndex=(i+quotes.length)%quotes.length;quotes.forEach((q,n)=>{const offset=(n-quoteIndex+quotes.length)%quotes.length;q.classList.toggle('active',offset===0);q.classList.toggle('is-next',offset===1);q.classList.toggle('is-prev',offset===quotes.length-1);q.setAttribute('aria-hidden',String(offset!==0))});[...dots.children].forEach((d,n)=>d.classList.toggle('active',n===quoteIndex));}
function updateQuoteToggle(){quoteToggle.textContent=quotePlaying?'Pause':'Play';quoteToggle.setAttribute('aria-label',`${quotePlaying?'Pause':'Play'} testimonial autoplay`);storyStack.setAttribute('aria-live',quotePlaying?'off':'polite')}
function startQuoteAutoplay(){clearInterval(quoteTimer);quoteTimer=0;if(quotePlaying&&!document.hidden)quoteTimer=setInterval(()=>showQuote(quoteIndex+1),quoteInteracted?7000:4000);updateQuoteToggle()}
function selectQuote(index){quoteInteracted=true;showQuote(index);startQuoteAutoplay()}
document.querySelector('.quote-nav.prev').addEventListener('click',()=>selectQuote(quoteIndex-1));document.querySelector('.quote-nav.next').addEventListener('click',()=>selectQuote(quoteIndex+1));quoteToggle.addEventListener('click',()=>{quoteInteracted=true;quotePlaying=!quotePlaying;startQuoteAutoplay()});showQuote(0);startQuoteAutoplay();
document.addEventListener('visibilitychange',()=>{if(document.hidden){stopGalleryAutoplay();clearInterval(quoteTimer)}else{startGalleryAutoplay();startQuoteAutoplay()}});

const zoneStates={
  'North West':['Jigawa','Kaduna','Kano','Katsina','Kebbi','Sokoto','Zamfara'],
  'North Central':['Benue','Kogi','Kwara','Nasarawa','Niger','Plateau','Federal Capital Territory'],
  'North East':['Adamawa','Bauchi','Borno','Gombe','Taraba','Yobe'],
  'South West':['Ekiti','Lagos','Ogun','Ondo','Osun','Oyo'],
  'South South':['Akwa Ibom','Bayelsa','Cross River','Delta','Edo','Rivers'],
  'South East':['Abia','Anambra','Ebonyi','Enugu','Imo']
};
const aliases={'Abuja Federal Capital Territory':'Federal Capital Territory','Federal Capital Territory':'Federal Capital Territory','Nassarawa':'Nasarawa'};
const zoneClasses={'North West':'nw','North Central':'nc','North East':'ne','South West':'sw','South South':'ss','South East':'se'};
const statePhones={
  'Kaduna':['0703 194 4660','0903 469 6128'],
  'Kano':['0815 499 9564'],
  'Federal Capital Territory':['0810 546 0707']
};
function getZone(name){const clean=aliases[name]||name;return Object.entries(zoneStates).find(([,states])=>states.includes(clean))?.[0]||null}
async function renderMap(){
  try{
    const topo=await fetch('assets/nigeria-states.json').then(r=>r.json());const feature=topojson.feature(topo,topo.objects.NGA_adm1);const svg=d3.select('#nigeriaMap'),projection=d3.geoMercator().fitExtent([[25,18],[535,485]],feature),path=d3.geoPath(projection),tip=document.getElementById('mapTooltip'),card=document.querySelector('.map-card');
    svg.selectAll('path').data(feature.features).join('path').attr('d',path).attr('class',d=>{const z=getZone(d.properties.NAME_1);return 'state '+(z?`covered zone-${zoneClasses[z]}`:'')}).attr('tabindex',d=>getZone(d.properties.NAME_1)?0:null).attr('aria-label',d=>{const name=aliases[d.properties.NAME_1]||d.properties.NAME_1,zone=getZone(d.properties.NAME_1),phone=statePhones[name];return zone?`${name}, ${zone} delivery area${phone?`. Inquiry ${phone.join(' or ')}`:''}`:name})
      .on('mousemove focus',function(event,d){const name=aliases[d.properties.NAME_1]||d.properties.NAME_1,zone=getZone(d.properties.NAME_1),phone=statePhones[name];if(!zone)return;tip.style.display='block';tip.innerHTML=`<b>${name}</b><br>${zone} · Delivery area${phone?`<span class="map-phone">Call ${phone.join(' · ')}</span>`:''}`;const rect=card.getBoundingClientRect();const x=event.clientX?event.clientX-rect.left+12:25,y=event.clientY?event.clientY-rect.top+12:25;tip.style.left=`${Math.min(x,rect.width-205)}px`;tip.style.top=`${Math.min(y,rect.height-(phone?86:60))}px`}).on('mouseleave blur',()=>tip.style.display='none');
  }catch(err){document.querySelector('.map-card').classList.add('map-error');document.getElementById('nigeriaMap').outerHTML='<div class="map-fallback"><b>Nationwide delivery</b><p>Serving all six geopolitical zones across Nigeria</p></div>'}
}
renderMap();
document.querySelectorAll('.zone-button').forEach(button=>button.addEventListener('click',()=>{const zone=button.dataset.zone;document.querySelectorAll('.zone-button').forEach(b=>b.classList.toggle('active',b===button));document.getElementById('activeZoneLabel').textContent=zone;document.querySelectorAll('.state').forEach(path=>{const name=path.getAttribute('aria-label')||'';path.classList.toggle('dim',zone!=='Nationwide'&&!name.includes(zone))})}));
document.getElementById('year').textContent=new Date().getFullYear();
displayCategory('layers',false);
