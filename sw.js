if(!self.define){let s,e={};const r=(r,l)=>(r=new URL(r+".js",l).href,e[r]||new Promise((e=>{if("document"in self){const s=document.createElement("script");s.src=r,s.onload=e,document.head.appendChild(s)}else s=r,importScripts(r),e()})).then((()=>{let s=e[r];if(!s)throw new Error(`Module ${r} didn’t register its module`);return s})));self.define=(l,i)=>{const n=s||("document"in self?document.currentScript.src:"")||location.href;if(e[n])return;let t={};const o=s=>r(s,n),u={module:{uri:n},exports:t,require:o};e[n]=Promise.all(l.map((s=>u[s]||o(s)))).then((s=>(i(...s),t)))}}define(["./workbox-e3490c72"],(function(s){"use strict";self.addEventListener("message",(s=>{s.data&&"SKIP_WAITING"===s.data.type&&self.skipWaiting()})),s.precacheAndRoute([{url:"404.html",revision:"990165d6937cf8dbdc55300a8a8ad882"},{url:"assets/@firebase-BAYCo1ju.js",revision:null},{url:"assets/cookie-BX9QSSmL.js",revision:null},{url:"assets/firebase-BjKrMMne.js",revision:null},{url:"assets/framer-motion-BK0ZBAWD.js",revision:null},{url:"assets/idb-BXWtuYvb.js",revision:null},{url:"assets/index-AWLzEd3C.css",revision:null},{url:"assets/index-tSBBJnLK.js",revision:null},{url:"assets/motion-dom-DnIdl6pN.js",revision:null},{url:"assets/motion-utils-BDWe_Wef.js",revision:null},{url:"assets/prop-types-D0pSn4ZB.js",revision:null},{url:"assets/react-CywZ_8YR.js",revision:null},{url:"assets/react-dom-V7lzCc_E.js",revision:null},{url:"assets/react-router-D_bWvcVQ.js",revision:null},{url:"assets/react-router-dom-l0sNRNKZ.js",revision:null},{url:"assets/scheduler-BNqrtbQi.js",revision:null},{url:"assets/set-cookie-parser-l0sNRNKZ.js",revision:null},{url:"assets/tslib-BGVaTf34.js",revision:null},{url:"assets/turbo-stream-l0sNRNKZ.js",revision:null},{url:"index.html",revision:"17a6c71da2406d82a5a0bc6b92563510"},{url:"registerSW.js",revision:"99f8b5264a49035b411add61c95658d4"},{url:"manifest.webmanifest",revision:"8e72f9ada8765a4cd338ae34b349087a"}],{}),s.cleanupOutdatedCaches(),s.registerRoute(new s.NavigationRoute(s.createHandlerBoundToURL("index.html")))}));
