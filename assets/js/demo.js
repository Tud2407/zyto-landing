// Zyto — démonstration de la page d'accueil. Aucun stockage, aucune requête réseau.
(function(){
  // Catalogue de démonstration : tout est fictif.
  var B=[
    {id:'zeste',name:'Zeste Nord',brew:'Atelier Tournepierre',style:'IPA',abv:6.2,ibu:55,tags:['Agrumes','Résine','Pamplemousse'],glass:'#3b2414',cap:'#e9b23a',c1:'#f2e3c2',c2:'#d9641c',em:'sun',
      near:[{n:'Zeste Sud',s:'Session IPA · 4,5 % vol.',r:'Même famille de style en plus léger',c:'#e58a2b'},{n:'Résine Claire',s:'Pale Ale · 5,4 % vol.',r:'Amertume voisine',c:'#c9a03a'},{id:'ecluse',r:'Notes d\'agrumes en commun'}]},
    {id:'sentier',name:'Sentier Blond',brew:'Brasserie du Col Perdu',style:'Blonde',abv:5.0,ibu:22,tags:['Céréale','Miel','Floral'],glass:'#4a3312',cap:'#f1f1ee',c1:'#f6d873',c2:'#2f5d50',em:'peak',
      near:[{id:'grain',r:'Degré proche et amertume douce'},{id:'cuivre',r:'Même brasserie'},{n:'Zeste Sud',s:'Session IPA · 4,5 % vol.',r:'Degré d\'alcool voisin',c:'#e58a2b'}]},
    {id:'brume',name:'Brume d\'Ardoise',brew:'Brasserie Kervalen',style:'Stout',abv:5.8,ibu:38,tags:['Café','Cacao','Torréfié'],glass:'#17110d',cap:'#8a8f98',c1:'#2a2f3a',c2:'#b9c1cf',em:'wave',
      near:[{n:'Nuit Courte',s:'Porter · 5,2 % vol.',r:'Même famille de style',c:'#3a2a22'},{id:'cuivre',r:'Notes de malt grillé en commun'},{id:'ecluse',r:'Même brasserie'}]},
    {id:'grain',name:'Grain de Midi',brew:'Atelier Tournepierre',style:'Blanche',abv:4.6,ibu:14,tags:['Coriandre','Écorce d\'orange','Blé'],glass:'#5a4a1c',cap:'#f0a23a',c1:'#fbf6e6',c2:'#3d6fb0',em:'grain',
      near:[{id:'sentier',r:'Degré proche et amertume douce'},{id:'ecluse',r:'Notes d\'épices en commun'},{n:'Zeste Sud',s:'Session IPA · 4,5 % vol.',r:'Notes d\'agrumes en commun',c:'#e58a2b'}]},
    {id:'cuivre',name:'Cuivre Lent',brew:'Brasserie du Col Perdu',style:'Ambrée',abv:6.0,ibu:28,tags:['Caramel','Biscuit','Fruits secs'],glass:'#3a1d10',cap:'#c9772c',c1:'#b4532a',c2:'#f3dcb4',em:'diamond',
      near:[{id:'sentier',r:'Même brasserie'},{id:'ecluse',r:'Amertume voisine'},{id:'brume',r:'Notes de malt grillé en commun'}]},
    {id:'ecluse',name:'Écluse 7',brew:'Brasserie Kervalen',style:'Saison',abv:6.5,ibu:30,tags:['Poivre','Agrumes','Finale sèche'],glass:'#2c3a1c',cap:'#f1f1ee',c1:'#e8efe2',c2:'#2d6a4f',em:'seven',
      near:[{id:'grain',r:'Notes d\'épices en commun'},{id:'zeste',r:'Notes d\'agrumes en commun'},{id:'cuivre',r:'Amertume voisine'}]}
  ];
  var byId={}; B.forEach(function(b){byId[b.id]=b});
  var reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  var cur=0, step=0, auto=!reduce, timers=[];
  var $=function(s,r){return (r||document).querySelector(s)};
  var scenes=[0,1,2,3].map(function(i){return $('#s'+i)});
  var fr=function(n,d){return n.toFixed(d).replace('.',',')};

  function emblem(b){
    var c=b.c2;
    switch(b.em){
      case 'sun':return '<circle cx="40" cy="137" r="10" fill="'+c+'"/><circle cx="40" cy="137" r="15" fill="none" stroke="'+c+'" stroke-width="1.5" stroke-dasharray="2 4"/>';
      case 'peak':return '<path d="M26 147l10-17 5 8 4-6 9 15z" fill="'+c+'"/>';
      case 'wave':return '<path d="M24 133q8-9 16 0t16 0M24 142q8-9 16 0t16 0" fill="none" stroke="'+c+'" stroke-width="3" stroke-linecap="round"/>';
      case 'grain':return '<g fill="'+c+'"><ellipse cx="40" cy="128" rx="4" ry="7"/><ellipse cx="32" cy="140" rx="4" ry="7" transform="rotate(-30 32 140)"/><ellipse cx="48" cy="140" rx="4" ry="7" transform="rotate(30 48 140)"/></g>';
      case 'diamond':return '<rect x="30" y="127" width="20" height="20" transform="rotate(45 40 137)" fill="'+c+'"/>';
      default:return '<text x="40" y="146" text-anchor="middle" font-family="Space Grotesk,sans-serif" font-weight="700" font-size="26" fill="'+c+'">7</text>';
    }
  }
  function bottle(b){
    return '<svg viewBox="0 0 80 200" aria-hidden="true"><rect x="32" y="3" width="16" height="10" rx="2.5" fill="'+b.cap+'"/>'+
      '<path d="M34 13h12v38c0 14 20 20 20 44v88a10 10 0 0 1-10 10H24a10 10 0 0 1-10-10V95c0-24 20-30 20-44z" fill="'+b.glass+'"/>'+
      '<rect x="14" y="108" width="52" height="58" fill="'+b.c1+'"/><rect x="14" y="108" width="52" height="7" fill="'+b.c2+'"/><rect x="14" y="159" width="52" height="7" fill="'+b.c2+'"/>'+
      emblem(b)+'<path d="M21 98v88" stroke="#fff" stroke-opacity=".16" stroke-width="3" stroke-linecap="round"/></svg>';
  }
  function miniBottle(color){
    return '<svg viewBox="0 0 80 200" aria-hidden="true"><path d="M34 13h12v38c0 14 20 20 20 44v88a10 10 0 0 1-10 10H24a10 10 0 0 1-10-10V95c0-24 20-30 20-44z" fill="none" stroke="'+color+'" stroke-width="5"/><rect x="22" y="112" width="36" height="50" rx="4" fill="'+color+'"/></svg>';
  }
  function barcode(seed){
    var x=4,out='',s=seed*7+3;
    while(x<114){ s=(s*31+11)%97; var w=1+(s%4); out+='<rect x="'+x+'" y="2" width="'+w+'" height="50"/>'; x+=w+1+(s%3); }
    return '<svg viewBox="0 0 118 54" aria-hidden="true" fill="#111">'+out+'</svg>';
  }
  var STAR='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2l3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1z"/></svg>';

  function build(){
    var b=B[cur];
    scenes[0].innerHTML='<div class="scan"><div class="scan-bottle">'+bottle(b)+'</div>'+
      '<div class="code"><i></i><i></i><i></i><i></i><div class="code-card">'+barcode(cur+1)+'</div><div class="laser"></div></div>'+
      '<p class="scan-status" aria-live="polite">Lecture du code-barres…</p></div>';
    scenes[1].innerHTML='<div class="f-head"><div class="f-bottle">'+bottle(b)+'</div><div><p class="f-brew">'+b.brew+'</p><h3>'+b.name+'</h3><span class="chip style">'+b.style+'</span></div></div>'+
      '<dl class="stats"><div class="stat"><dt>Degré d\'alcool</dt><dd><span data-n="'+b.abv+'" data-d="1">0</span> <small>% vol.</small></dd></div>'+
      '<div class="stat"><dt>Amertume</dt><dd><span data-n="'+b.ibu+'" data-d="0">0</span> <small>IBU</small></dd><div class="gauge"><b></b></div></div></dl>'+
      '<p class="f-label">Notes aromatiques</p><div class="chips">'+b.tags.map(function(t){return '<span class="chip">'+t+'</span>'}).join('')+'</div>'+
      '<button class="s-btn" data-go="2">Noter cette bière</button>';
    scenes[2].innerHTML='<div class="rate"><h3>Votre note pour '+b.name+'</h3><p class="sub">Touchez une étoile.</p>'+
      '<div class="stars" role="group" aria-label="Note sur 5">'+[1,2,3,4,5].map(function(n){return '<button data-star="'+n+'" aria-label="'+n+' sur 5">'+STAR+'</button>'}).join('')+'</div>'+
      '<p class="f-label">Ce que vous avez perçu</p><div class="chips">'+b.tags.concat(['Fruité','Amer']).map(function(t){return '<button class="chip" aria-pressed="false">'+t+'</button>'}).join('')+'</div>'+
      '<div class="saved" aria-live="polite"><svg viewBox="0 0 24 24"><rect x="5" y="11" width="14" height="10" rx="2.5"/><path class="shackle" d="M8 11V8a4 4 0 0 1 8 0v3"/></svg><span>Note enregistrée et visible par vous seul</span></div></div>'+
      '<button class="s-btn" data-go="3">Voir des bières proches</button>';
    scenes[3].innerHTML='<div class="near"><h3>Proches de '+b.name+'</h3><div class="near-list">'+b.near.map(function(n){
        if(n.id){var o=byId[n.id];return '<button class="near-item" data-beer="'+n.id+'">'+bottle(o)+'<div><strong>'+o.name+'</strong><span>'+o.style+' · '+fr(o.abv,1)+' % vol.</span><em>'+n.r+'</em></div></button>'}
        return '<div class="near-item">'+miniBottle(n.c)+'<div><strong>'+n.n+'</strong><span>'+n.s+'</span><em>'+n.r+'</em></div></div>';
      }).join('')+'</div></div><button class="s-btn ghost" data-next>Scanner une autre bière</button>';
    Array.prototype.forEach.call(document.querySelectorAll('.pick'),function(p,i){p.setAttribute('aria-pressed',i===cur)});
  }

  function clearT(){timers.forEach(clearTimeout);timers=[]}
  function later(f,ms){timers.push(setTimeout(f,ms))}
  function count(el){
    var to=+el.dataset.n,d=+el.dataset.d;
    if(reduce){el.textContent=fr(to,d);return}
    var t0=performance.now();
    (function tick(t){var k=Math.min(1,(t-t0)/900);k=1-Math.pow(1-k,3);el.textContent=fr(to*k,d);if(k<1)requestAnimationFrame(tick)})(t0);
  }
  function rate(n,byUser){
    Array.prototype.forEach.call(scenes[2].querySelectorAll('[data-star]'),function(s){s.classList.toggle('lit',+s.dataset.star<=n)});
    $('.sub',scenes[2]).textContent=n+' sur 5';
    later(function(){$('.saved',scenes[2]).classList.add('show')},byUser?250:500);
  }
  function go(s){
    clearT(); step=s;
    scenes.forEach(function(el,i){el.classList.toggle('on',i===s)});
    Array.prototype.forEach.call(document.querySelectorAll('.steps button'),function(b,i){if(i===s)b.setAttribute('aria-current','step');else b.removeAttribute('aria-current')});
    var b=B[cur];
    if(s===0){
      var sc=$('.scan',scenes[0]); sc.classList.remove('found'); $('.scan-status',sc).textContent='Lecture du code-barres…';
      later(function(){sc.classList.add('found');$('.scan-status',sc).textContent='Bière identifiée'},reduce?300:2000);
      later(function(){go(1)},reduce?900:2900);
    }
    if(s===1){
      Array.prototype.forEach.call(scenes[1].querySelectorAll('[data-n]'),count);
      // Jauge animée par l'API Web Animations : aucun attribut style dans le DOM.
      var g=$('.gauge b',scenes[1]); g.getAnimations().forEach(function(a){a.cancel()});
      later(function(){g.animate([{width:'0'},{width:Math.min(100,b.ibu/70*100)+'%'}],{duration:reduce?0:1000,delay:reduce?0:150,easing:'cubic-bezier(.2,.7,.2,1)',fill:'both'})},60);
      if(auto)later(function(){go(2)},4200);
    }
    if(s===2 && auto){
      [1,2,3,4].forEach(function(n){later(function(){rate(n)},1100+n*170)});
      later(function(){go(3)},4600);
    }
    if(s===3 && auto) later(function(){pick((cur+1)%B.length,true)},6000);
  }
  function pick(i,keepAuto){ if(!keepAuto)stop(); cur=i; build(); go(0); }
  function stop(){ if(auto){auto=false;$('#replay').hidden=false} clearT(); if(step===0)go(0); }

  // Étagère
  $('#row').innerHTML=B.map(function(b,i){return '<button class="pick" data-pick="'+i+'" aria-pressed="false">'+bottle(b)+'<strong>'+b.name+'</strong><span>'+b.style+'</span></button>'}).join('');

  document.addEventListener('click',function(e){
    var t=e.target.closest('[data-pick],[data-go],[data-star],[data-beer],[data-next],.rate .chip,#replay'); if(!t)return;
    if(t.id==='replay'){auto=true;t.hidden=true;go(step===0?0:step);return}
    if(t.dataset.pick!==undefined){pick(+t.dataset.pick);$('#stage').scrollIntoView({behavior:reduce?'auto':'smooth',block:'center'});return}
    stop();
    if(t.dataset.go!==undefined)go(+t.dataset.go);
    else if(t.dataset.star){rate(+t.dataset.star,true)}
    else if(t.dataset.beer){pick(B.indexOf(byId[t.dataset.beer]))}
    else if(t.hasAttribute('data-next')){pick((cur+1)%B.length)}
    else if(t.classList.contains('chip')){t.setAttribute('aria-pressed',t.getAttribute('aria-pressed')!=='true')}
  });

  build(); go(reduce?1:0);
})();
