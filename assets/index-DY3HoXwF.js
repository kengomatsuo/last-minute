import{r as n,j as e,R as q}from"./react-Wu2nlj90.js";import{R as U}from"./react-dom-CVdyM_5S.js";import{P as u}from"./prop-types-D0pSn4ZB.js";import{i as z,g as W,a as Z,o as L,s as R,b as K,c as Q}from"./@firebase-DreQeOHl.js";import"./firebase-CQiR9VvM.js";import{u as k,N as v,a as B,R as V,b as j,B as G}from"./react-router-BvX1asPb.js";import{A as P,m as N}from"./framer-motion-BALIKw7z.js";import"./cookie-BX9QSSmL.js";import"./scheduler-BNqrtbQi.js";import"./tslib-BGVaTf34.js";import"./idb-BXWtuYvb.js";import"./motion-dom-DnIdl6pN.js";import"./motion-utils-BDWe_Wef.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))c(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const r of i.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&c(r)}).observe(document,{childList:!0,subtree:!0});function a(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function c(s){if(s.ep)return;s.ep=!0;const i=a(s);fetch(s.href,i)}})();const J="/last-minute/assets/ket-Bp7EiJsM.png",O=t=>t*parseFloat(getComputedStyle(document.documentElement).fontSize),Y=(t,o,a=null)=>{const c=n.useRef(null),s=n.useRef(t);n.useEffect(()=>{s.current=t},[t]);const i=n.useCallback((...r)=>{c.current&&clearTimeout(c.current),c.current=setTimeout(()=>{s.current(...r)},o)},[o]);return n.useEffect(()=>{a!==null&&s.current()},a??[]),i},T=52,b={isSmallScreen:window.innerWidth<O(T),dimensions:{width:window.innerWidth,height:window.innerHeight},navBarHeight:0,setNavBarHeight:()=>{},isOnline:navigator.onLine},f=n.createContext(b),A=({children:t})=>{const[o,a]=n.useState(b.isSmallScreen),[c,s]=n.useState(b.dimensions),i=Y(({width:g,height:d})=>s({width:g,height:d}),300),[r,l]=n.useState(b.navBarHeight),[m,x]=n.useState(b.isOnline),w=O(T);return n.useEffect(()=>{const g=()=>{const E=window.innerWidth,M=window.innerHeight;i({width:E,height:M}),a(E<w)},d=()=>x(!0),p=()=>x(!1);return window.addEventListener("resize",g),window.addEventListener("online",d),window.addEventListener("offline",p),()=>{window.removeEventListener("resize",g),window.removeEventListener("online",d),window.removeEventListener("offline",p)}},[w,i]),e.jsx(f.Provider,{value:{isSmallScreen:o,dimensions:c,navBarHeight:r,setNavBarHeight:l,isOnline:m},children:t})};A.propTypes={children:u.node.isRequired};const h=({filled:t=!1,onClick:o=()=>{},className:a,children:c})=>{const{isSmallScreen:s}=n.use(f),[i,r]=n.useState(!1);return e.jsx("div",{className:`${a} px-2.5 py-1 truncate transition-all ${t?"bg-primary hover:bg-filled-button-hover active:bg-filled-button-active text-secondary-text":"bg-transparent hover:bg-interactive-hover active:bg-interactive-active  text-primary"}  border-2 border-primary hover:border-filled-button-hover active:border-filled-button-active active:ring-primary active:ring text-center box-border rounded-md font-semibold text-lg cursor-pointer `,onClick:o,onPointerDown:()=>r(!0),onPointerCancel:()=>r(!1),onPointerUp:()=>r(!1),onPointerLeave:()=>r(!1),children:e.jsx("div",{className:`${s?"transition-all":"transition-transform"} ${i?"scale-[97%] opacity-75":""}`,children:c})})};h.propTypes={filled:u.bool,onClick:u.func,className:u.string,children:u.node.isRequired};const I=({className:t,header:o,onClick:a,interactive:c=!!a,children:s})=>{const[i,r]=n.useState(!1);return q.useEffect(()=>{console.log(i)},[i]),e.jsxs("div",{className:`${t} ${c&&!i?"transition-all hover:ring hover:ring-primary cursor-pointer hover:scale-101 active:ring active:ring-primary active:scale-101":""} bg-card-background box-border border-card-outline border-2 backdrop-blur-sm flex p-4 flex-col rounded-xl`,onClick:a,onPointerDown:()=>r(!0),onPointerCancel:()=>r(!1),onPointerUp:()=>r(!1),onPointerLeave:()=>r(!1),children:[e.jsx("div",{className:"text-lg font-semibold pb-2",children:o}),e.jsx("div",{onPointerDown:l=>{l.stopPropagation(),l.preventDefault()},onClick:l=>l.stopPropagation(),children:s})]})};I.propTypes={className:u.string,header:u.string,onClick:u.func,interactive:u.bool,children:u.node.isRequired};const F=()=>e.jsx("footer",{children:"This is a footer. Edit me in src/components/CustomFooter.jsx"}),S=({className:t="",children:o,onClick:a=()=>{}})=>{const{isSmallScreen:c}=n.use(f),[s,i]=n.useState(!1);return e.jsx("div",{className:`${t} px-3 py-1 w-full ${c?"transition-all":""} rounded-md hover:bg-interactive-hover
        active:bg-interactive-active active:ring-background-secondary active:ring truncate text-primary-text text-center font-medium text-lg cursor-pointer `,onClick:a,onPointerDown:()=>i(!0),onPointerCancel:()=>i(!1),onPointerUp:()=>i(!1),onPointerLeave:()=>i(!1),children:e.jsx("div",{className:`transition-transform w-min ${s?"scale-[97%]":""}`,children:o})})};S.propTypes={className:u.string,onClick:u.func,children:u.node.isRequired};const X=t=>n.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",id:"Outline",viewBox:"0 0 24 24",width:512,height:512,...t},n.createElement("path",{d:"M15.4,9.88,10.81,5.29a1,1,0,0,0-1.41,0,1,1,0,0,0,0,1.42L14,11.29a1,1,0,0,1,0,1.42L9.4,17.29a1,1,0,0,0,1.41,1.42l4.59-4.59A3,3,0,0,0,15.4,9.88Z"})),_=t=>n.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",id:"Layer_1","data-name":"Layer 1",viewBox:"0 0 24 24",width:512,height:512,...t},n.createElement("path",{d:"M19,2H5C2.243,2,0,4.243,0,7v10c0,2.757,2.243,5,5,5h14c2.757,0,5-2.243,5-5V7c0-2.757-2.243-5-5-5ZM2,17V7c0-1.654,1.346-3,3-3H13V20H5c-1.654,0-3-1.346-3-3Zm20,0c0,1.654-1.346,3-3,3h-4V4h4c1.654,0,3,1.346,3,3v10Zm-2-6c0,.553-.448,1-1,1h-1c-.552,0-1-.447-1-1s.448-1,1-1h1c.552,0,1,.447,1,1Zm0,4c0,.553-.448,1-1,1h-1c-.552,0-1-.447-1-1s.448-1,1-1h1c.552,0,1,.447,1,1Zm0-8c0,.553-.448,1-1,1h-1c-.552,0-1-.447-1-1s.448-1,1-1h1c.552,0,1,.447,1,1Z"})),ee={apiKey:"AIzaSyBOS586Glw04Yc02cT15X9h7q0xMCNkJGM",authDomain:"project-last-minute.firebaseapp.com",projectId:"project-last-minute",storageBucket:"project-last-minute.firebasestorage.app",messagingSenderId:"465198803740",appId:"1:465198803740:web:53c0d2690e0cc343d3e8d9",measurementId:"G-2L8JDEKDWT"},H=z(ee),y=W(H);Z(H);const te={user:void 0,signUp:async()=>Promise.resolve(),signIn:async()=>Promise.resolve(),signOut:async()=>Promise.resolve()},C=n.createContext(te),D=({children:t})=>{const[o,a]=n.useState(void 0);n.useEffect(()=>{const l=L(y,m=>{a(m)});return()=>l()},[]);const c=async({email:l,password:m})=>{try{await Q(y,l,m),await r(),console.log("Signed up successfully!")}catch(x){console.error("Error signing up:",x)}},s=async({email:l,password:m})=>{try{await K(y,l,m),await r()}catch(x){console.error("Error signing in:",x)}},i=async()=>{try{await R(y),await r()}catch(l){console.error("Error signing out:",l)}},r=()=>new Promise(l=>{const m=L(y,x=>{a(x),m(),l(x)})});return e.jsx(C.Provider,{value:{user:o,signUp:c,signIn:s,signOut:i},children:t})};D.propTypes={children:u.node.isRequired};const $=({scrollContainerRef:t={current:null}})=>{const{user:o}=n.use(C),[a,c]=n.useState(!1),[s,i]=n.useState(!1),{isSmallScreen:r,setNavBarHeight:l}=n.use(f),m=n.useRef(null),x=k(),w=async()=>{await R(y).then(()=>{console.log("Signed out successfully!"),x("/auth")}).catch(d=>{console.error("Error signing out:",d)})};n.useEffect(()=>{r&&c(!1)},[r]),n.useEffect(()=>{m.current&&l(m.current.offsetHeight)},[l]),n.useEffect(()=>{const d=()=>{i(t.current.scrollTop>0)},p=t.current;return p&&p.addEventListener("scroll",d),()=>{p&&p.removeEventListener("scroll",d)}},[t]);const g=o?[{name:"Dashboard",path:"/"},{name:"Book",path:"/booking"},{name:"History",path:"/history"},{name:"Settings",path:"/settings"}]:[{name:"Home",path:"/"},{name:"Contact",path:"/contact"},{name:"FAQ",path:"/faq"}];return e.jsxs("nav",{ref:m,className:`fixed z-10 top-0 flex justify-between w-full py-4 px-6
        border-b border-transparent transition-colors bg-background  duration-300 ${s?"!border-background-secondary/30":""}`,children:[e.jsx("div",{className:"flex items-center text-2xl justify-start max-md:flex-1",children:e.jsx(v,{to:"/",className:"font-semibold text-nowrap",children:"Last Minute"})}),r?e.jsxs(e.Fragment,{children:[e.jsx(S,{className:"w-min aspect-square flex !p-1.5 items-center justify-center",onClick:()=>c(!a),children:e.jsx(_,{width:28,height:28})}),e.jsx(P,{children:a&&e.jsxs(e.Fragment,{children:[e.jsx(N.div,{className:"absolute z-20 top-0 left-0 w-screen h-screen bg-background-secondary/25",initial:{opacity:0},animate:{opacity:1,backdropFilter:"blur(3px)"},exit:{opacity:0},onClick:()=>c(!1)}),e.jsxs(N.div,{className:"w-72 max-w-4/5 fixed z-30 top-0 text-end flex flex-col px-6 py-4 right-0 h-screen bg-background",initial:{x:"100%",boxShadow:"0px 0px 0px 0px rgba(0, 0, 0, 0)"},animate:{x:0,boxShadow:"3px 0px 10px 2px rgba(0, 0, 0, 0.1)"},exit:{x:"100%",boxShadow:"0px 0px 0px 0px rgba(0, 0, 0, 0)"},transition:{type:"spring",stiffness:200,damping:20,mass:.5},children:[e.jsx(S,{className:"w-min aspect-square flex !p-1 items-center mb-2 justify-center ml-auto",onClick:()=>c(!1),children:e.jsx(X,{width:32,height:32})}),e.jsx(v,{to:"/auth",className:"flex",children:e.jsx(h,{filled:!0,className:"flex-1",onClick:()=>{c(!1),w()},children:o?"Sign out":"Sign in / Register"})}),e.jsx("p",{className:"text-lg font-semibold mr-3 mt-6 mb-2",children:"Navigation"}),g.map(d=>e.jsx(v,{to:d.path,className:({isActive:p})=>p?" bg-background-secondary/50 rounded-md pointer-events-none":void 0,children:e.jsx(S,{onClick:()=>c(!1),className:"py-2 flex justify-end",children:d.name})},d.name))]})]})})]}):e.jsxs("div",{className:"text-lg font-medium items-center justify-end inline-flex top-0 py-0 gap-4",children:[e.jsx("div",{className:"inline-flex gap-2",children:g.map(d=>e.jsx(v,{to:d.path,className:({isActive:p})=>p?"underline underline-offset-4 underline-primary pointer-events-none":void 0,children:e.jsx(S,{children:d.name})},d.name))}),o?e.jsx("div",{className:"flex gap-2 flex-row",children:e.jsx(h,{onClick:()=>w(),children:"Sign out"})}):e.jsxs("div",{className:"flex gap-2 flex-row",children:[e.jsx(v,{to:{pathname:"/auth"},state:{action:"register"},className:({isActive:d})=>`flex-1 flex transition-opacity ${d?"pointer-events-none opacity-50":""}`,children:e.jsx(h,{children:"Register"})}),e.jsx(v,{to:{pathname:"/auth"},state:{action:"signin"},className:({isActive:d})=>`flex-1 flex transition-opacity ${d?"pointer-events-none opacity-50":""}`,children:e.jsx(h,{filled:!0,children:"Sign in"})})]})]})]})};$.propTypes={scrollContainerRef:u.object.isRequired};const ne=()=>e.jsxs(e.Fragment,{children:[e.jsx("div",{children:"this is a FAQ. Edit me in src/components/FAQ.jsx"}),e.jsx(F,{})]}),se=()=>{const{navBarHeight:t}=n.use(f);return e.jsxs("div",{className:"flex flex-col flex-1 items-center w-screen justify-center",style:{paddingTop:t},children:[e.jsxs("div",{className:"flex flex-col items-center justify-center",children:[e.jsx("img",{src:J,width:100,alt:"Ket"}),e.jsx("h1",{children:"Last Minute"})]}),e.jsxs("div",{className:"flex flex-col items-center justify-center",children:[e.jsx("p",{children:"Your courses. At your demand."}),e.jsx(h,{onClick:null,children:"I am a button"})]}),e.jsx(ne,{}),e.jsx(F,{})]})},ie=()=>{var l;const t=k(),o=B(),{signIn:a,signUp:c}=n.use(C),[s,i]=n.useState(((l=o.state)==null?void 0:l.action)||"signin"),r=async()=>{await a({email:"admin@admin.com",password:"admin123"}).then(()=>{t("/")})};return e.jsxs("div",{className:"flex flex-col flex-1 items-center justify-center",children:["auth",e.jsx(h,{onClick:()=>r(),children:"Login"})]})},re=()=>e.jsxs("div",{className:"flex flex-col flex-1 items-center justify-center",children:[e.jsx("h1",{children:"404 Page not found"}),e.jsx("p",{children:"The page you are looking for does not exist."})]}),oe=()=>{const{navBarHeight:t}=n.use(f);return e.jsx("div",{style:{paddingTop:t},children:"dashboard"})},ae=()=>{const{navBarHeight:t}=n.use(f);return e.jsx("div",{className:"flex flex-col flex-1 items-center",style:{paddingTop:t},children:e.jsx(I,{interactive:!0,header:"Find a Tutor",children:e.jsxs("div",{className:"flex flex-col gap-2",children:[e.jsx(e.Fragment,{children:"This is the content"}),e.jsx(h,{onClick:()=>console.log("hey"),children:"Book Now"})]})})})},ce=()=>e.jsx("div",{children:"session"}),le=()=>e.jsx("div",{children:"settings"}),de=()=>{const{isOnline:t}=n.use(f);return e.jsx("div",{children:t?"Loading...":"You are offline"})};function ue(){const{user:t}=n.use(C),o=B(),a=n.useRef(null);return e.jsx(P,{mode:"wait",children:t===void 0?e.jsx(N.div,{className:"w-screen h-screen flex justify-center items-center text-primary-text",animate:{opacity:1,transition:{duration:1}},exit:{opacity:0},children:e.jsx(de,{})},"loading"):e.jsx(N.div,{className:"w-screen h-screen overflow-hidden flex-col flex text-primary-text",initial:{opacity:0},animate:{opacity:1,transition:{duration:1}},exit:{opacity:0},children:e.jsxs(A,{children:[e.jsx($,{scrollContainerRef:a}),e.jsx(P,{mode:"wait",children:e.jsx(N.div,{variants:{initial:{opacity:0},animate:{opacity:1,transition:{duration:.5}},exit:{opacity:0,transition:{duration:.3}}},ref:a,initial:"initial",animate:"animate",exit:"exit",className:"w-full overflow-y-auto h-screen flex",children:e.jsxs(V,{location:o,children:[e.jsx(j,{path:"/",element:t?e.jsx(oe,{}):e.jsx(se,{})}),t?e.jsxs(e.Fragment,{children:[e.jsx(j,{path:"/booking",element:e.jsx(ae,{})}),e.jsx(j,{path:"/session",element:e.jsx(ce,{})}),e.jsx(j,{path:"/settings",element:e.jsx(le,{})})]}):e.jsx(j,{path:"/auth",element:e.jsx(ie,{})}),e.jsx(j,{path:"*",element:e.jsx(re,{})})]},o.pathname)},o.pathname+(t?"-auth":"-guest"))})]})},"loaded")})}U.createRoot(document.getElementById("root")).render(e.jsx(D,{children:e.jsx(G,{basename:"/last-minute/",children:e.jsx(ue,{})})}));
