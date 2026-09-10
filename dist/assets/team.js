const teamMembers=[
  {name:'Abdullahi Ishola (RAS)',role:'Managing Director / CEO',image:'assets/team/abdullahi-ishola.webp'},
  {name:'Dr Olatunji Surajudeen',role:'Head of Marketing',image:'assets/team/olatunji-surajudeen.webp'},
  {name:'Ibrahim Umoru',role:'HR / Head of Accounts',image:'assets/team/ibrahim-umoru.webp'},
  {name:'Balogun Ali',role:'Head of Quality Control',image:'assets/team/balogun-ali.webp'},
  {name:'Ahmad Usman',role:'Head of Supplies',image:'assets/team/ahmad-usman.webp'},
  {name:'Moses Oche',role:'Head of Production',image:'assets/team/moses-oche-v2.webp'},
  {name:'Kabir Ishola (RAS)',role:'Head of R&D',image:'assets/team/kabir-ishola.webp'},
  {name:'Arafat Idris',role:'Head of Sales',image:'assets/team/arafat-idris.webp'},
  {name:'Zubair Asipita',role:'Head of Logistics',image:'assets/team/zubair-asipita.webp'}
];

const teamDirectory=document.getElementById('teamDirectory');
const teamCards=document.getElementById('teamCards');
const teamAmbient=document.getElementById('teamAmbient');
const teamCount=document.getElementById('teamCount');
const teamProgress=document.getElementById('teamProgress');
let activeTeamMember=0;

teamMembers.forEach((member,index)=>{
  const button=document.createElement('button');
  button.type='button';
  button.className='team-person';
  button.role='tab';
  button.id=`team-tab-${index}`;
  button.setAttribute('aria-controls','teamCards');
  button.innerHTML=`<span>${member.name}</span>`;
  button.addEventListener('click',()=>showTeamMember(index,true));
  teamDirectory.appendChild(button);
});

function teamCard(member,index,featured){
  const article=document.createElement('article');
  article.className=`team-card ${featured?'featured':'preview'} is-entering`;
  article.setAttribute('aria-label',`${member.name}, ${member.role}`);
  article.innerHTML=`<figure><img src="${member.image}" alt="Portrait of ${member.name}" width="1122" height="1402" loading="${featured&&activeTeamMember===0?'eager':'lazy'}" decoding="async"><figcaption><span class="team-caption-copy"><b>${member.name}</b><span>${member.role}</span></span><span class="team-linkedin" role="img" aria-label="LinkedIn profile link coming soon"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.5 8.3H3.2V19h3.3V8.3ZM4.85 3A1.92 1.92 0 1 0 4.85 6.84 1.92 1.92 0 0 0 4.85 3ZM19.8 12.87c0-3.22-1.72-4.72-4.02-4.72-1.85 0-2.68 1.02-3.14 1.73V8.3H9.35V19h3.29v-5.3c0-1.4.27-2.8 2.04-2.8 1.75 0 1.77 1.64 1.77 2.9V19h3.3l.05-6.13Z"/></svg></span></figcaption></figure><button type="button" aria-label="View ${member.name}"></button>`;
  if(!featured)article.querySelector('button').addEventListener('click',()=>showTeamMember(index,true));
  return article;
}

function showTeamMember(index,userInitiated=false){
  activeTeamMember=(index+teamMembers.length)%teamMembers.length;
  const visible=[activeTeamMember,(activeTeamMember+1)%teamMembers.length,(activeTeamMember+2)%teamMembers.length];
  teamCards.replaceChildren(...visible.map((memberIndex,slot)=>teamCard(teamMembers[memberIndex],memberIndex,slot===0)));
  teamAmbient.src=teamMembers[activeTeamMember].image;
  teamCount.textContent=`${String(activeTeamMember+1).padStart(2,'0')} / ${String(teamMembers.length).padStart(2,'0')}`;
  teamProgress.style.width=`${((activeTeamMember+1)/teamMembers.length)*100}%`;
  [...teamDirectory.children].forEach((button,buttonIndex)=>{
    const selected=buttonIndex===activeTeamMember;
    button.classList.toggle('active',selected);
    button.setAttribute('aria-selected',String(selected));
    button.tabIndex=selected?0:-1;
  });
  if(userInitiated)teamDirectory.children[activeTeamMember].scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'nearest',inline:'center'});
}

document.getElementById('teamPrev').addEventListener('click',()=>showTeamMember(activeTeamMember-1,true));
document.getElementById('teamNext').addEventListener('click',()=>showTeamMember(activeTeamMember+1,true));
teamDirectory.addEventListener('keydown',event=>{
  if(event.key==='ArrowDown'||event.key==='ArrowRight'){event.preventDefault();showTeamMember(activeTeamMember+1,true);teamDirectory.children[activeTeamMember].focus()}
  if(event.key==='ArrowUp'||event.key==='ArrowLeft'){event.preventDefault();showTeamMember(activeTeamMember-1,true);teamDirectory.children[activeTeamMember].focus()}
  if(event.key==='Home'){event.preventDefault();showTeamMember(0,true);teamDirectory.children[0].focus()}
  if(event.key==='End'){event.preventDefault();showTeamMember(teamMembers.length-1,true);teamDirectory.children[activeTeamMember].focus()}
});

let teamTouchStart=0;
teamCards.addEventListener('touchstart',event=>{teamTouchStart=event.changedTouches[0].clientX},{passive:true});
teamCards.addEventListener('touchend',event=>{const distance=event.changedTouches[0].clientX-teamTouchStart;if(Math.abs(distance)>45)showTeamMember(activeTeamMember+(distance<0?1:-1),true)},{passive:true});
showTeamMember(0);
