if(!self.define){let s,e={};const r=(r,l)=>(r=new URL(r+".js",l).href,e[r]||new Promise((e=>{if("document"in self){const s=document.createElement("script");s.src=r,s.onload=e,document.head.appendChild(s)}else s=r,importScripts(r),e()})).then((()=>{let s=e[r];if(!s)throw new Error(`Module ${r} didn’t register its module`);return s})));self.define=(l,i)=>{const n=s||("document"in self?document.currentScript.src:"")||location.href;if(e[n])return;let t={};const o=s=>r(s,n),u={module:{uri:n},exports:t,require:o};e[n]=Promise.all(l.map((s=>u[s]||o(s)))).then((s=>(i(...s),t)))}}define(["./workbox-e3490c72"],(function(s){"use strict";self.addEventListener("message",(s=>{s.data&&"SKIP_WAITING"===s.data.type&&self.skipWaiting()})),s.precacheAndRoute([{url:"404.html",revision:"90a69b6daac00ff25bc7d61b310f9fcc"},{url:"assets/@firebase-L_xG_mlJ.js",revision:null},{url:"assets/cookie-CY119PWS.js",revision:null},{url:"assets/firebase-D84MbEuT.js",revision:null},{url:"assets/framer-motion-BK0ZBAWD.js",revision:null},{url:"assets/idb-BXWtuYvb.js",revision:null},{url:"assets/index-CsJlm3zQ.js",revision:null},{url:"assets/index-DawMwI-K.css",revision:null},{url:"assets/lodash-C2nYvBw5.js",revision:null},{url:"assets/motion-dom-DnIdl6pN.js",revision:null},{url:"assets/motion-utils-BDWe_Wef.js",revision:null},{url:"assets/prop-types-L5NmFoeK.js",revision:null},{url:"assets/react-CywZ_8YR.js",revision:null},{url:"assets/react-dom-Bg_DQbB-.js",revision:null},{url:"assets/react-router-BCISYrXQ.js",revision:null},{url:"assets/react-router-dom-l0sNRNKZ.js",revision:null},{url:"assets/scheduler-BNqrtbQi.js",revision:null},{url:"assets/set-cookie-parser-l0sNRNKZ.js",revision:null},{url:"assets/tslib-BGVaTf34.js",revision:null},{url:"assets/turbo-stream-l0sNRNKZ.js",revision:null},{url:"index.html",revision:"1d46a3f6e341232ef5ef7dfe24611191"},{url:"registerSW.js",revision:"99f8b5264a49035b411add61c95658d4"},{url:"manifest.webmanifest",revision:"1df2791edb59edf0e769ff1c4f83e9bc"}],{}),s.cleanupOutdatedCaches(),s.registerRoute(new s.NavigationRoute(s.createHandlerBoundToURL("index.html")))}));
