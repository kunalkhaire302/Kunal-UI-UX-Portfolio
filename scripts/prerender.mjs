import { createServer } from 'vite';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
const origin = 'https://kunal-ui-ux-portfolio.vercel.app';
const server = await createServer({server:{middlewareMode:true},appType:'custom'});
try {
 const {App} = await server.ssrLoadModule('/src/main.tsx');
 const {projects} = await server.ssrLoadModule('/src/data/projects.ts');
 const template = await readFile('dist/index.html','utf8');
 const routes = [{path:'',title:"Kunal's Control Room — UI/UX Portfolio",description:"I design experiences, not just screens. Explore Kunal Khaire's UI/UX case studies, photography, video, gaming insights, and frontend craft."},...projects.map(p=>({path:`/work/${p.slug}`,title:`${p.title} — Kunal Khaire`,description:`${p.title}: ${p.description} Explore the structured case study, UI/UX concepts, and interface direction.`}))];
 const escape = s=>s.replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll('<','&lt;');
 for(const route of routes){
  const body=renderToString(React.createElement(App,{initialPath:route.path}));
  const html=template.replace('<div id="root"></div>',`<div id="root">${body}</div>`).replace(/<title>.*?<\/title>/,`<title>${escape(route.title)}</title>`).replace(/(<meta name="description" content=")[^"]*/,`$1${escape(route.description)}`).replace(/(<meta property="og:title" content=")[^"]*/,`$1${escape(route.title)}`).replace(/(<meta property="og:description" content=")[^"]*/,`$1${escape(route.description)}`).replace('</head>',`<link rel="canonical" href="${origin}${route.path}/"/><meta property="og:url" content="${origin}${route.path}/"/></head>`);
  await mkdir(`dist${route.path}`,{recursive:true});await writeFile(`dist${route.path}/index.html`,html);
 }
 await writeFile('dist/sitemap.xml',`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${routes.map(r=>`<url><loc>${origin}${r.path}/</loc></url>`).join('')}</urlset>`);
 await writeFile('dist/robots.txt',`User-agent: *\nAllow: /\nSitemap: ${origin}/sitemap.xml\n`);
 console.log(`Prerendered ${routes.length} pages with route metadata and sitemap.`);
} finally {await server.close()}
