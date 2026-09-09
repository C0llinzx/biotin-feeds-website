import { mkdir, writeFile } from 'node:fs/promises';

const products = [
  {id:'layer-mash',name:'Layer Mash',category:'Layers',type:'Complete mash',bestFor:'Mature laying birds',benefit:'Supports sustained egg production and desirable egg quality.',points:['Formulated for enduring high production','Supports desirable egg size and yolk colour']},
  {id:'grower-mash',name:'Grower Mash',category:'Chicks & pullets',type:'Complete mash',bestFor:'Growing pullets',benefit:'Balanced nutrition for healthy pullet development.',points:['Supports healthy pullet development','Provides nutrition towards reproductive maturity']},
  {id:'chick-mash',name:'Chick Mash',category:'Chicks & pullets',type:'Complete mash',bestFor:'Young chicks',benefit:'Essential early nutrition for healthy chick development.',points:['Supports a smooth brooding period','Provides essential nutrients for healthy chicks']},
  {id:'prelay-mash',name:'Prelay Mash',category:'Layers',type:'Complete mash',bestFor:'Pullets approaching lay',benefit:'Prepares pullets for the demands of egg production.',points:['Supports transition into the laying stage','Helps build a robust system for production']},
  {id:'broiler-prestarter',name:'Broiler Pre-Starter Mash',category:'Broilers',type:'Complete mash',bestFor:'Early brooding',benefit:'Nutrient-dense support for early broiler development.',points:['Formulated for the starter stage','Supports a smooth brooding period']},
  {id:'broiler-starter',name:'Broiler Starter Mash',category:'Broilers',type:'Complete mash',bestFor:'Growing broilers',benefit:'Supports frame development and steady weight gain.',points:['Supports broiler frame development','Formulated for efficient feed conversion']},
  {id:'broiler-finisher',name:'Broiler Finisher Mash',category:'Broilers',type:'Complete mash',bestFor:'Finishing broilers',benefit:'Strong finishing nutrition for desirable lean-meat development.',points:['Supports finishing performance','Supports desirable lean-meat development']},
  {id:'layer-40',name:'Layer 40% Concentrate',category:'Layers',type:'Concentrate',bestFor:'Layer-feed formulation',benefit:'Concentrated nutrition for sustained layer production.',points:['Supports enduring high production','Supports desirable egg size and yolk colour']},
  {id:'grower-30',name:'Grower 30% Concentrate',category:'Chicks & pullets',type:'Concentrate',bestFor:'Grower-feed formulation',benefit:'Balanced support for growing pullets.',points:['Supports healthy pullet development','Supports reproductive maturity']},
  {id:'chick-40',name:'Chick 40% Concentrate',category:'Chicks & pullets',type:'Concentrate',bestFor:'Chick-feed formulation',benefit:'Concentrated nutrients for the brooding stage.',points:['Supports smooth brooding','Supports healthy chick development']},
  {id:'broiler-50',name:'Broiler 50% Concentrate',category:'Broilers',type:'Concentrate',bestFor:'Broiler-feed formulation',benefit:'Concentrated support for broiler frame and weight development.',points:['Supports frame development','Formulated for efficient conversion']},
  {id:'ruminant',name:'Ruminant Concentrate',category:'Cattle / ruminants',type:'Concentrate',bestFor:'Cattle and other ruminants',benefit:'Balanced nutrition for healthy growth and animal condition.',points:['Supports healthy growth','Supports animal condition and meat quality']}
];

const esc = value => value.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
const json = value => JSON.stringify(value).replaceAll('<','\\u003c');

function page(product){
  const canonical=`https://biotinfeeds.com/products/${product.id}/`;
  const image=`https://biotinfeeds.com/assets/products/${product.id}.webp`;
  const message=encodeURIComponent(`Hello Biotin Feeds, I would like to enquire about ${product.name}. Please share the current price and availability.`);
  const schema={
    '@context':'https://schema.org','@type':'Product',name:product.name,image:[image],description:product.benefit,
    brand:{'@type':'Brand',name:'Biotin Feeds'},category:product.category,url:canonical,
    additionalProperty:[
      {'@type':'PropertyValue',name:'Feed format',value:product.type},
      {'@type':'PropertyValue',name:'Best for',value:product.bestFor}
    ]
  };
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="theme-color" content="#180d1d">
  <title>${esc(product.name)} | Biotin Feeds</title>
  <meta name="description" content="${esc(product.benefit)} Learn about ${esc(product.name)} and contact Biotin Feeds for current pricing and availability.">
  <link rel="canonical" href="${canonical}">
  <meta property="og:type" content="product">
  <meta property="og:site_name" content="Biotin Feeds">
  <meta property="og:title" content="${esc(product.name)} | Biotin Feeds">
  <meta property="og:description" content="${esc(product.benefit)}">
  <meta property="og:url" content="${canonical}">
  <meta property="og:image" content="${image}">
  <meta property="og:image:alt" content="Biotin Feeds ${esc(product.name)} bag">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${esc(product.name)} | Biotin Feeds">
  <meta name="twitter:description" content="${esc(product.benefit)}">
  <meta name="twitter:image" content="${image}">
  <link rel="icon" type="image/png" sizes="32x32" href="../../favicon.png">
  <link rel="apple-touch-icon" href="../../apple-touch-icon.png">
  <link rel="manifest" href="../../site.webmanifest">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&amp;display=swap" rel="stylesheet">
  <link rel="stylesheet" href="../../assets/product-page.css">
  <script type="application/ld+json">${json(schema)}</script>
</head>
<body>
  <header><a class="brand" href="../../" aria-label="Biotin Feeds home"><img src="../../assets/biotin-mark.png" alt="" width="40" height="35"><span>BIOTIN <b>FEEDS</b></span></a><a class="back" href="../../#products">All products <span aria-hidden="true">↗</span></a></header>
  <main>
    <section class="product-hero">
      <div class="product-copy">
        <p class="eyebrow">${esc(product.category)} · ${esc(product.type)}</p>
        <h1>${esc(product.name)}</h1>
        <p class="lede">${esc(product.benefit)}</p>
        <div class="facts"><div><span>Best for</span><b>${esc(product.bestFor)}</b></div><div><span>Availability</span><b>Contact our team</b></div></div>
        <a class="cta" href="https://wa.me/2347031944660?text=${message}" target="_blank" rel="noopener">Ask about price &amp; availability <span aria-hidden="true">↗</span></a>
      </div>
      <figure><div class="orbit" aria-hidden="true"></div><img src="../../assets/products/${product.id}.webp" alt="Biotin Feeds ${esc(product.name)} bag" width="600" height="800" fetchpriority="high" decoding="async"></figure>
    </section>
    <section class="benefits"><p>Designed to support</p><div>${product.points.map((point,index)=>`<article><span>0${index+1}</span><h2>${esc(point)}</h2></article>`).join('')}</div></section>
  </main>
  <footer><span>© 2026 Biotin Feeds Ltd.</span><a href="https://collinsenahoro.framer.ai/" target="_blank" rel="noopener">Designed by Lnz Designs ↗</a></footer>
</body>
</html>`;
}

for(const product of products){
  const directory=new URL(`../dist/products/${product.id}/`,import.meta.url);
  await mkdir(directory,{recursive:true});
  await writeFile(new URL('index.html',directory),page(product));
}

const sitemap=`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://biotinfeeds.com/</loc><changefreq>monthly</changefreq><priority>1.0</priority></url>
${products.map(product=>`  <url><loc>https://biotinfeeds.com/products/${product.id}/</loc><changefreq>monthly</changefreq><priority>0.8</priority></url>`).join('\n')}
</urlset>\n`;
await writeFile(new URL('../dist/sitemap.xml',import.meta.url),sitemap);

