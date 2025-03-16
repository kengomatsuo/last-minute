import{r as u}from"./react-CywZ_8YR.js";import"./cookie-CY119PWS.js";/**
 * react-router v7.3.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */var ae="popstate";function Le(e={}){function t(a,r){let{pathname:o,search:s,hash:c}=a.location;return G("",{pathname:o,search:s,hash:c},r.state&&r.state.usr||null,r.state&&r.state.key||"default")}function n(a,r){return typeof r=="string"?r:M(r)}return Se(t,n,null,e)}function E(e,t){if(e===!1||e===null||typeof e>"u")throw new Error(t)}function P(e,t){if(!e){typeof console<"u"&&console.warn(t);try{throw new Error(t)}catch{}}}function ke(){return Math.random().toString(36).substring(2,10)}function oe(e,t){return{usr:e.state,key:e.key,idx:t}}function G(e,t,n=null,a){return{pathname:typeof e=="string"?e:e.pathname,search:"",hash:"",...typeof t=="string"?I(t):t,state:n,key:t&&t.key||a||ke()}}function M({pathname:e="/",search:t="",hash:n=""}){return t&&t!=="?"&&(e+=t.charAt(0)==="?"?t:"?"+t),n&&n!=="#"&&(e+=n.charAt(0)==="#"?n:"#"+n),e}function I(e){let t={};if(e){let n=e.indexOf("#");n>=0&&(t.hash=e.substring(n),e=e.substring(0,n));let a=e.indexOf("?");a>=0&&(t.search=e.substring(a),e=e.substring(0,a)),e&&(t.pathname=e)}return t}function Se(e,t,n,a={}){let{window:r=document.defaultView,v5Compat:o=!1}=a,s=r.history,c="POP",l=null,i=f();i==null&&(i=0,s.replaceState({...s.state,idx:i},""));function f(){return(s.state||{idx:null}).idx}function d(){c="POP";let m=f(),h=m==null?null:m-i;i=m,l&&l({action:c,location:w.location,delta:h})}function y(m,h){c="PUSH";let x=G(w.location,m,h);i=f()+1;let p=oe(x,i),R=w.createHref(x);try{s.pushState(p,"",R)}catch(C){if(C instanceof DOMException&&C.name==="DataCloneError")throw C;r.location.assign(R)}o&&l&&l({action:c,location:w.location,delta:1})}function g(m,h){c="REPLACE";let x=G(w.location,m,h);i=f();let p=oe(x,i),R=w.createHref(x);s.replaceState(p,"",R),o&&l&&l({action:c,location:w.location,delta:0})}function v(m){let h=r.location.origin!=="null"?r.location.origin:r.location.href,x=typeof m=="string"?m:M(m);return x=x.replace(/ $/,"%20"),E(h,`No window.location.(origin|href) available to create URL for href: ${x}`),new URL(x,h)}let w={get action(){return c},get location(){return e(r,s)},listen(m){if(l)throw new Error("A history only accepts one active listener");return r.addEventListener(ae,d),l=m,()=>{r.removeEventListener(ae,d),l=null}},createHref(m){return t(r,m)},createURL:v,encodeLocation(m){let h=v(m);return{pathname:h.pathname,search:h.search,hash:h.hash}},push:y,replace:g,go(m){return s.go(m)}};return w}function se(e,t,n="/"){return $e(e,t,n,!1)}function $e(e,t,n,a){let r=typeof t=="string"?I(t):t,o=S(r.pathname||"/",n);if(o==null)return null;let s=ce(e);Fe(s);let c=null;for(let l=0;c==null&&l<s.length;++l){let i=He(o);c=Ue(s[l],i,a)}return c}function ce(e,t=[],n=[],a=""){let r=(o,s,c)=>{let l={relativePath:c===void 0?o.path||"":c,caseSensitive:o.caseSensitive===!0,childrenIndex:s,route:o};l.relativePath.startsWith("/")&&(E(l.relativePath.startsWith(a),`Absolute route path "${l.relativePath}" nested under path "${a}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`),l.relativePath=l.relativePath.slice(a.length));let i=k([a,l.relativePath]),f=n.concat(l);o.children&&o.children.length>0&&(E(o.index!==!0,`Index routes must not have child routes. Please remove all child routes from route path "${i}".`),ce(o.children,t,f,i)),!(o.path==null&&!o.index)&&t.push({path:i,score:Ae(i,o.index),routesMeta:f})};return e.forEach((o,s)=>{var c;if(o.path===""||!((c=o.path)!=null&&c.includes("?")))r(o,s);else for(let l of fe(o.path))r(o,s,l)}),t}function fe(e){let t=e.split("/");if(t.length===0)return[];let[n,...a]=t,r=n.endsWith("?"),o=n.replace(/\?$/,"");if(a.length===0)return r?[o,""]:[o];let s=fe(a.join("/")),c=[];return c.push(...s.map(l=>l===""?o:[o,l].join("/"))),r&&c.push(...s),c.map(l=>e.startsWith("/")&&l===""?"/":l)}function Fe(e){e.sort((t,n)=>t.score!==n.score?n.score-t.score:Oe(t.routesMeta.map(a=>a.childrenIndex),n.routesMeta.map(a=>a.childrenIndex)))}var Te=/^:[\w-]+$/,Ie=3,De=2,Ne=1,Be=10,Me=-2,le=e=>e==="*";function Ae(e,t){let n=e.split("/"),a=n.length;return n.some(le)&&(a+=Me),t&&(a+=De),n.filter(r=>!le(r)).reduce((r,o)=>r+(Te.test(o)?Ie:o===""?Ne:Be),a)}function Oe(e,t){return e.length===t.length&&e.slice(0,-1).every((a,r)=>a===t[r])?e[e.length-1]-t[t.length-1]:0}function Ue(e,t,n=!1){let{routesMeta:a}=e,r={},o="/",s=[];for(let c=0;c<a.length;++c){let l=a[c],i=c===a.length-1,f=o==="/"?t:t.slice(o.length)||"/",d=K({path:l.relativePath,caseSensitive:l.caseSensitive,end:i},f),y=l.route;if(!d&&i&&n&&!a[a.length-1].route.index&&(d=K({path:l.relativePath,caseSensitive:l.caseSensitive,end:!1},f)),!d)return null;Object.assign(r,d.params),s.push({params:r,pathname:k([o,d.pathname]),pathnameBase:Ke(k([o,d.pathnameBase])),route:y}),d.pathnameBase!=="/"&&(o=k([o,d.pathnameBase]))}return s}function K(e,t){typeof e=="string"&&(e={path:e,caseSensitive:!1,end:!0});let[n,a]=We(e.path,e.caseSensitive,e.end),r=t.match(n);if(!r)return null;let o=r[0],s=o.replace(/(.)\/+$/,"$1"),c=r.slice(1);return{params:a.reduce((i,{paramName:f,isOptional:d},y)=>{if(f==="*"){let v=c[y]||"";s=o.slice(0,o.length-v.length).replace(/(.)\/+$/,"$1")}const g=c[y];return d&&!g?i[f]=void 0:i[f]=(g||"").replace(/%2F/g,"/"),i},{}),pathname:o,pathnameBase:s,pattern:e}}function We(e,t=!1,n=!0){P(e==="*"||!e.endsWith("*")||e.endsWith("/*"),`Route path "${e}" will be treated as if it were "${e.replace(/\*$/,"/*")}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${e.replace(/\*$/,"/*")}".`);let a=[],r="^"+e.replace(/\/*\*?$/,"").replace(/^\/*/,"/").replace(/[\\.*+^${}|()[\]]/g,"\\$&").replace(/\/:([\w-]+)(\?)?/g,(s,c,l)=>(a.push({paramName:c,isOptional:l!=null}),l?"/?([^\\/]+)?":"/([^\\/]+)"));return e.endsWith("*")?(a.push({paramName:"*"}),r+=e==="*"||e==="/*"?"(.*)$":"(?:\\/(.+)|\\/*)$"):n?r+="\\/*$":e!==""&&e!=="/"&&(r+="(?:(?=\\/|$))"),[new RegExp(r,t?void 0:"i"),a]}function He(e){try{return e.split("/").map(t=>decodeURIComponent(t).replace(/\//g,"%2F")).join("/")}catch(t){return P(!1,`The URL path "${e}" could not be decoded because it is a malformed URL segment. This is probably due to a bad percent encoding (${t}).`),e}}function S(e,t){if(t==="/")return e;if(!e.toLowerCase().startsWith(t.toLowerCase()))return null;let n=t.endsWith("/")?t.length-1:t.length,a=e.charAt(n);return a&&a!=="/"?null:e.slice(n)||"/"}function _e(e,t="/"){let{pathname:n,search:a="",hash:r=""}=typeof e=="string"?I(e):e;return{pathname:n?n.startsWith("/")?n:Ve(n,t):t,search:Je(a),hash:Ye(r)}}function Ve(e,t){let n=t.replace(/\/+$/,"").split("/");return e.split("/").forEach(r=>{r===".."?n.length>1&&n.pop():r!=="."&&n.push(r)}),n.length>1?n.join("/"):"/"}function j(e,t,n,a){return`Cannot include a '${e}' character in a manually specified \`to.${t}\` field [${JSON.stringify(a)}].  Please separate it out to the \`to.${n}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`}function ze(e){return e.filter((t,n)=>n===0||t.route.path&&t.route.path.length>0)}function de(e){let t=ze(e);return t.map((n,a)=>a===t.length-1?n.pathname:n.pathnameBase)}function he(e,t,n,a=!1){let r;typeof e=="string"?r=I(e):(r={...e},E(!r.pathname||!r.pathname.includes("?"),j("?","pathname","search",r)),E(!r.pathname||!r.pathname.includes("#"),j("#","pathname","hash",r)),E(!r.search||!r.search.includes("#"),j("#","search","hash",r)));let o=e===""||r.pathname==="",s=o?"/":r.pathname,c;if(s==null)c=n;else{let d=t.length-1;if(!a&&s.startsWith("..")){let y=s.split("/");for(;y[0]==="..";)y.shift(),d-=1;r.pathname=y.join("/")}c=d>=0?t[d]:"/"}let l=_e(r,c),i=s&&s!=="/"&&s.endsWith("/"),f=(o||s===".")&&n.endsWith("/");return!l.pathname.endsWith("/")&&(i||f)&&(l.pathname+="/"),l}var k=e=>e.join("/").replace(/\/\/+/g,"/"),Ke=e=>e.replace(/\/+$/,"").replace(/^\/*/,"/"),Je=e=>!e||e==="?"?"":e.startsWith("?")?e:"?"+e,Ye=e=>!e||e==="#"?"":e.startsWith("#")?e:"#"+e;function je(e){return e!=null&&typeof e.status=="number"&&typeof e.statusText=="string"&&typeof e.internal=="boolean"&&"data"in e}var me=["POST","PUT","PATCH","DELETE"];new Set(me);var qe=["GET",...me];new Set(qe);var D=u.createContext(null);D.displayName="DataRouter";var J=u.createContext(null);J.displayName="DataRouterState";var pe=u.createContext({isTransitioning:!1});pe.displayName="ViewTransition";var Ge=u.createContext(new Map);Ge.displayName="Fetchers";var Xe=u.createContext(null);Xe.displayName="Await";var L=u.createContext(null);L.displayName="Navigation";var A=u.createContext(null);A.displayName="Location";var $=u.createContext({outlet:null,matches:[],isDataRoute:!1});$.displayName="Route";var Q=u.createContext(null);Q.displayName="RouteError";function Qe(e,{relative:t}={}){E(O(),"useHref() may be used only in the context of a <Router> component.");let{basename:n,navigator:a}=u.useContext(L),{hash:r,pathname:o,search:s}=U(e,{relative:t}),c=o;return n!=="/"&&(c=o==="/"?n:k([n,o])),a.createHref({pathname:c,search:s,hash:r})}function O(){return u.useContext(A)!=null}function F(){return E(O(),"useLocation() may be used only in the context of a <Router> component."),u.useContext(A).location}var ye="You should call navigate() in a React.useEffect(), not when your component is first rendered.";function ge(e){u.useContext(L).static||u.useLayoutEffect(e)}function Ze(){let{isDataRoute:e}=u.useContext($);return e?dt():et()}function et(){E(O(),"useNavigate() may be used only in the context of a <Router> component.");let e=u.useContext(D),{basename:t,navigator:n}=u.useContext(L),{matches:a}=u.useContext($),{pathname:r}=F(),o=JSON.stringify(de(a)),s=u.useRef(!1);return ge(()=>{s.current=!0}),u.useCallback((l,i={})=>{if(P(s.current,ye),!s.current)return;if(typeof l=="number"){n.go(l);return}let f=he(l,JSON.parse(o),r,i.relative==="path");e==null&&t!=="/"&&(f.pathname=f.pathname==="/"?t:k([t,f.pathname])),(i.replace?n.replace:n.push)(f,i.state,i)},[t,n,o,r,e])}u.createContext(null);function U(e,{relative:t}={}){let{matches:n}=u.useContext($),{pathname:a}=F(),r=JSON.stringify(de(n));return u.useMemo(()=>he(e,JSON.parse(r),a,t==="path"),[e,r,a,t])}function tt(e,t){return ve(e,t)}function ve(e,t,n,a){var x;E(O(),"useRoutes() may be used only in the context of a <Router> component.");let{navigator:r,static:o}=u.useContext(L),{matches:s}=u.useContext($),c=s[s.length-1],l=c?c.params:{},i=c?c.pathname:"/",f=c?c.pathnameBase:"/",d=c&&c.route;{let p=d&&d.path||"";we(i,!d||p.endsWith("*")||p.endsWith("*?"),`You rendered descendant <Routes> (or called \`useRoutes()\`) at "${i}" (under <Route path="${p}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${p}"> to <Route path="${p==="/"?"*":`${p}/*`}">.`)}let y=F(),g;if(t){let p=typeof t=="string"?I(t):t;E(f==="/"||((x=p.pathname)==null?void 0:x.startsWith(f)),`When overriding the location using \`<Routes location>\` or \`useRoutes(routes, location)\`, the location pathname must begin with the portion of the URL pathname that was matched by all parent routes. The current pathname base is "${f}" but pathname "${p.pathname}" was given in the \`location\` prop.`),g=p}else g=y;let v=g.pathname||"/",w=v;if(f!=="/"){let p=f.replace(/^\//,"").split("/");w="/"+v.replace(/^\//,"").split("/").slice(p.length).join("/")}let m=!o&&n&&n.matches&&n.matches.length>0?n.matches:se(e,{pathname:w});P(d||m!=null,`No routes matched location "${g.pathname}${g.search}${g.hash}" `),P(m==null||m[m.length-1].route.element!==void 0||m[m.length-1].route.Component!==void 0||m[m.length-1].route.lazy!==void 0,`Matched leaf route at location "${g.pathname}${g.search}${g.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`);let h=lt(m&&m.map(p=>Object.assign({},p,{params:Object.assign({},l,p.params),pathname:k([f,r.encodeLocation?r.encodeLocation(p.pathname).pathname:p.pathname]),pathnameBase:p.pathnameBase==="/"?f:k([f,r.encodeLocation?r.encodeLocation(p.pathnameBase).pathname:p.pathnameBase])})),s,n,a);return t&&h?u.createElement(A.Provider,{value:{location:{pathname:"/",search:"",hash:"",state:null,key:"default",...g},navigationType:"POP"}},h):h}function nt(){let e=ft(),t=je(e)?`${e.status} ${e.statusText}`:e instanceof Error?e.message:JSON.stringify(e),n=e instanceof Error?e.stack:null,a="rgba(200,200,200, 0.5)",r={padding:"0.5rem",backgroundColor:a},o={padding:"2px 4px",backgroundColor:a},s=null;return console.error("Error handled by React Router default ErrorBoundary:",e),s=u.createElement(u.Fragment,null,u.createElement("p",null,"💿 Hey developer 👋"),u.createElement("p",null,"You can provide a way better UX than this when your app throws errors by providing your own ",u.createElement("code",{style:o},"ErrorBoundary")," or"," ",u.createElement("code",{style:o},"errorElement")," prop on your route.")),u.createElement(u.Fragment,null,u.createElement("h2",null,"Unexpected Application Error!"),u.createElement("h3",{style:{fontStyle:"italic"}},t),n?u.createElement("pre",{style:r},n):null,s)}var rt=u.createElement(nt,null),at=class extends u.Component{constructor(e){super(e),this.state={location:e.location,revalidation:e.revalidation,error:e.error}}static getDerivedStateFromError(e){return{error:e}}static getDerivedStateFromProps(e,t){return t.location!==e.location||t.revalidation!=="idle"&&e.revalidation==="idle"?{error:e.error,location:e.location,revalidation:e.revalidation}:{error:e.error!==void 0?e.error:t.error,location:t.location,revalidation:e.revalidation||t.revalidation}}componentDidCatch(e,t){console.error("React Router caught the following error during render",e,t)}render(){return this.state.error!==void 0?u.createElement($.Provider,{value:this.props.routeContext},u.createElement(Q.Provider,{value:this.state.error,children:this.props.component})):this.props.children}};function ot({routeContext:e,match:t,children:n}){let a=u.useContext(D);return a&&a.static&&a.staticContext&&(t.route.errorElement||t.route.ErrorBoundary)&&(a.staticContext._deepestRenderedBoundaryId=t.route.id),u.createElement($.Provider,{value:e},n)}function lt(e,t=[],n=null,a=null){if(e==null){if(!n)return null;if(n.errors)e=n.matches;else if(t.length===0&&!n.initialized&&n.matches.length>0)e=n.matches;else return null}let r=e,o=n==null?void 0:n.errors;if(o!=null){let l=r.findIndex(i=>i.route.id&&(o==null?void 0:o[i.route.id])!==void 0);E(l>=0,`Could not find a matching route for errors on route IDs: ${Object.keys(o).join(",")}`),r=r.slice(0,Math.min(r.length,l+1))}let s=!1,c=-1;if(n)for(let l=0;l<r.length;l++){let i=r[l];if((i.route.HydrateFallback||i.route.hydrateFallbackElement)&&(c=l),i.route.id){let{loaderData:f,errors:d}=n,y=i.route.loader&&!f.hasOwnProperty(i.route.id)&&(!d||d[i.route.id]===void 0);if(i.route.lazy||y){s=!0,c>=0?r=r.slice(0,c+1):r=[r[0]];break}}}return r.reduceRight((l,i,f)=>{let d,y=!1,g=null,v=null;n&&(d=o&&i.route.id?o[i.route.id]:void 0,g=i.route.errorElement||rt,s&&(c<0&&f===0?(we("route-fallback",!1,"No `HydrateFallback` element provided to render during initial hydration"),y=!0,v=null):c===f&&(y=!0,v=i.route.hydrateFallbackElement||null)));let w=t.concat(r.slice(0,f+1)),m=()=>{let h;return d?h=g:y?h=v:i.route.Component?h=u.createElement(i.route.Component,null):i.route.element?h=i.route.element:h=l,u.createElement(ot,{match:i,routeContext:{outlet:l,matches:w,isDataRoute:n!=null},children:h})};return n&&(i.route.ErrorBoundary||i.route.errorElement||f===0)?u.createElement(at,{location:n.location,revalidation:n.revalidation,component:g,error:d,children:m(),routeContext:{outlet:null,matches:w,isDataRoute:!0}}):m()},null)}function Z(e){return`${e} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`}function it(e){let t=u.useContext(D);return E(t,Z(e)),t}function ut(e){let t=u.useContext(J);return E(t,Z(e)),t}function st(e){let t=u.useContext($);return E(t,Z(e)),t}function ee(e){let t=st(e),n=t.matches[t.matches.length-1];return E(n.route.id,`${e} can only be used on routes that contain a unique "id"`),n.route.id}function ct(){return ee("useRouteId")}function ft(){var a;let e=u.useContext(Q),t=ut("useRouteError"),n=ee("useRouteError");return e!==void 0?e:(a=t.errors)==null?void 0:a[n]}function dt(){let{router:e}=it("useNavigate"),t=ee("useNavigate"),n=u.useRef(!1);return ge(()=>{n.current=!0}),u.useCallback(async(r,o={})=>{P(n.current,ye),n.current&&(typeof r=="number"?e.navigate(r):await e.navigate(r,{fromRouteId:t,...o}))},[e,t])}var ie={};function we(e,t,n){!t&&!ie[e]&&(ie[e]=!0,P(!1,n))}u.memo(ht);function ht({routes:e,future:t,state:n}){return ve(e,void 0,n,t)}function mt(e){E(!1,"A <Route> is only ever to be used as the child of <Routes> element, never rendered directly. Please wrap your <Route> in a <Routes>.")}function pt({basename:e="/",children:t=null,location:n,navigationType:a="POP",navigator:r,static:o=!1}){E(!O(),"You cannot render a <Router> inside another <Router>. You should never have more than one in your app.");let s=e.replace(/^\/*/,"/"),c=u.useMemo(()=>({basename:s,navigator:r,static:o,future:{}}),[s,r,o]);typeof n=="string"&&(n=I(n));let{pathname:l="/",search:i="",hash:f="",state:d=null,key:y="default"}=n,g=u.useMemo(()=>{let v=S(l,s);return v==null?null:{location:{pathname:v,search:i,hash:f,state:d,key:y},navigationType:a}},[s,l,i,f,d,y,a]);return P(g!=null,`<Router basename="${s}"> is not able to match the URL "${l}${i}${f}" because it does not start with the basename, so the <Router> won't render anything.`),g==null?null:u.createElement(L.Provider,{value:c},u.createElement(A.Provider,{children:t,value:g}))}function qt({children:e,location:t}){return tt(X(e),t)}function X(e,t=[]){let n=[];return u.Children.forEach(e,(a,r)=>{if(!u.isValidElement(a))return;let o=[...t,r];if(a.type===u.Fragment){n.push.apply(n,X(a.props.children,o));return}E(a.type===mt,`[${typeof a.type=="string"?a.type:a.type.name}] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>`),E(!a.props.index||!a.props.children,"An index route cannot have child routes.");let s={id:a.props.id||o.join("-"),caseSensitive:a.props.caseSensitive,element:a.props.element,Component:a.props.Component,index:a.props.index,path:a.props.path,loader:a.props.loader,action:a.props.action,hydrateFallbackElement:a.props.hydrateFallbackElement,HydrateFallback:a.props.HydrateFallback,errorElement:a.props.errorElement,ErrorBoundary:a.props.ErrorBoundary,hasErrorBoundary:a.props.hasErrorBoundary===!0||a.props.ErrorBoundary!=null||a.props.errorElement!=null,shouldRevalidate:a.props.shouldRevalidate,handle:a.props.handle,lazy:a.props.lazy};a.props.children&&(s.children=X(a.props.children,o)),n.push(s)}),n}var V="get",z="application/x-www-form-urlencoded";function Y(e){return e!=null&&typeof e.tagName=="string"}function yt(e){return Y(e)&&e.tagName.toLowerCase()==="button"}function gt(e){return Y(e)&&e.tagName.toLowerCase()==="form"}function vt(e){return Y(e)&&e.tagName.toLowerCase()==="input"}function wt(e){return!!(e.metaKey||e.altKey||e.ctrlKey||e.shiftKey)}function xt(e,t){return e.button===0&&(!t||t==="_self")&&!wt(e)}var _=null;function Et(){if(_===null)try{new FormData(document.createElement("form"),0),_=!1}catch{_=!0}return _}var Rt=new Set(["application/x-www-form-urlencoded","multipart/form-data","text/plain"]);function q(e){return e!=null&&!Rt.has(e)?(P(!1,`"${e}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${z}"`),null):e}function Ct(e,t){let n,a,r,o,s;if(gt(e)){let c=e.getAttribute("action");a=c?S(c,t):null,n=e.getAttribute("method")||V,r=q(e.getAttribute("enctype"))||z,o=new FormData(e)}else if(yt(e)||vt(e)&&(e.type==="submit"||e.type==="image")){let c=e.form;if(c==null)throw new Error('Cannot submit a <button> or <input type="submit"> without a <form>');let l=e.getAttribute("formaction")||c.getAttribute("action");if(a=l?S(l,t):null,n=e.getAttribute("formmethod")||c.getAttribute("method")||V,r=q(e.getAttribute("formenctype"))||q(c.getAttribute("enctype"))||z,o=new FormData(c,e),!Et()){let{name:i,type:f,value:d}=e;if(f==="image"){let y=i?`${i}.`:"";o.append(`${y}x`,"0"),o.append(`${y}y`,"0")}else i&&o.append(i,d)}}else{if(Y(e))throw new Error('Cannot submit element that is not <form>, <button>, or <input type="submit|image">');n=V,a=null,r=z,s=e}return o&&r==="text/plain"&&(s=o,o=void 0),{action:a,method:n.toLowerCase(),encType:r,formData:o,body:s}}function te(e,t){if(e===!1||e===null||typeof e>"u")throw new Error(t)}async function bt(e,t){if(e.id in t)return t[e.id];try{let n=await import(e.module);return t[e.id]=n,n}catch(n){return console.error(`Error loading route module \`${e.module}\`, reloading page...`),console.error(n),window.__reactRouterContext&&window.__reactRouterContext.isSpaMode,window.location.reload(),new Promise(()=>{})}}function Pt(e){return e==null?!1:e.href==null?e.rel==="preload"&&typeof e.imageSrcSet=="string"&&typeof e.imageSizes=="string":typeof e.rel=="string"&&typeof e.href=="string"}async function Lt(e,t,n){let a=await Promise.all(e.map(async r=>{let o=t.routes[r.route.id];if(o){let s=await bt(o,n);return s.links?s.links():[]}return[]}));return Ft(a.flat(1).filter(Pt).filter(r=>r.rel==="stylesheet"||r.rel==="preload").map(r=>r.rel==="stylesheet"?{...r,rel:"prefetch",as:"style"}:{...r,rel:"prefetch"}))}function ue(e,t,n,a,r,o){let s=(l,i)=>n[i]?l.route.id!==n[i].route.id:!0,c=(l,i)=>{var f;return n[i].pathname!==l.pathname||((f=n[i].route.path)==null?void 0:f.endsWith("*"))&&n[i].params["*"]!==l.params["*"]};return o==="assets"?t.filter((l,i)=>s(l,i)||c(l,i)):o==="data"?t.filter((l,i)=>{var d;let f=a.routes[l.route.id];if(!f||!f.hasLoader)return!1;if(s(l,i)||c(l,i))return!0;if(l.route.shouldRevalidate){let y=l.route.shouldRevalidate({currentUrl:new URL(r.pathname+r.search+r.hash,window.origin),currentParams:((d=n[0])==null?void 0:d.params)||{},nextUrl:new URL(e,window.origin),nextParams:l.params,defaultShouldRevalidate:!0});if(typeof y=="boolean")return y}return!0}):[]}function kt(e,t,{includeHydrateFallback:n}={}){return St(e.map(a=>{let r=t.routes[a.route.id];if(!r)return[];let o=[r.module];return r.clientActionModule&&(o=o.concat(r.clientActionModule)),r.clientLoaderModule&&(o=o.concat(r.clientLoaderModule)),n&&r.hydrateFallbackModule&&(o=o.concat(r.hydrateFallbackModule)),r.imports&&(o=o.concat(r.imports)),o}).flat(1))}function St(e){return[...new Set(e)]}function $t(e){let t={},n=Object.keys(e).sort();for(let a of n)t[a]=e[a];return t}function Ft(e,t){let n=new Set;return new Set(t),e.reduce((a,r)=>{let o=JSON.stringify($t(r));return n.has(o)||(n.add(o),a.push({key:o,link:r})),a},[])}function Tt(e,t){let n=typeof e=="string"?new URL(e,typeof window>"u"?"server://singlefetch/":window.location.origin):e;return n.pathname==="/"?n.pathname="_root.data":t&&S(n.pathname,t)==="/"?n.pathname=`${t.replace(/\/$/,"")}/_root.data`:n.pathname=`${n.pathname.replace(/\/$/,"")}.data`,n}function xe(){let e=u.useContext(D);return te(e,"You must render this element inside a <DataRouterContext.Provider> element"),e}function It(){let e=u.useContext(J);return te(e,"You must render this element inside a <DataRouterStateContext.Provider> element"),e}var ne=u.createContext(void 0);ne.displayName="FrameworkContext";function Ee(){let e=u.useContext(ne);return te(e,"You must render this element inside a <HydratedRouter> element"),e}function Dt(e,t){let n=u.useContext(ne),[a,r]=u.useState(!1),[o,s]=u.useState(!1),{onFocus:c,onBlur:l,onMouseEnter:i,onMouseLeave:f,onTouchStart:d}=t,y=u.useRef(null);u.useEffect(()=>{if(e==="render"&&s(!0),e==="viewport"){let w=h=>{h.forEach(x=>{s(x.isIntersecting)})},m=new IntersectionObserver(w,{threshold:.5});return y.current&&m.observe(y.current),()=>{m.disconnect()}}},[e]),u.useEffect(()=>{if(a){let w=setTimeout(()=>{s(!0)},100);return()=>{clearTimeout(w)}}},[a]);let g=()=>{r(!0)},v=()=>{r(!1),s(!1)};return n?e!=="intent"?[o,y,{}]:[o,y,{onFocus:B(c,g),onBlur:B(l,v),onMouseEnter:B(i,g),onMouseLeave:B(f,v),onTouchStart:B(d,g)}]:[!1,y,{}]}function B(e,t){return n=>{e&&e(n),n.defaultPrevented||t(n)}}function Nt({page:e,...t}){let{router:n}=xe(),a=u.useMemo(()=>se(n.routes,e,n.basename),[n.routes,e,n.basename]);return a?u.createElement(Mt,{page:e,matches:a,...t}):null}function Bt(e){let{manifest:t,routeModules:n}=Ee(),[a,r]=u.useState([]);return u.useEffect(()=>{let o=!1;return Lt(e,t,n).then(s=>{o||r(s)}),()=>{o=!0}},[e,t,n]),a}function Mt({page:e,matches:t,...n}){let a=F(),{manifest:r,routeModules:o}=Ee(),{basename:s}=xe(),{loaderData:c,matches:l}=It(),i=u.useMemo(()=>ue(e,t,l,r,a,"data"),[e,t,l,r,a]),f=u.useMemo(()=>ue(e,t,l,r,a,"assets"),[e,t,l,r,a]),d=u.useMemo(()=>{if(e===a.pathname+a.search+a.hash)return[];let v=new Set,w=!1;if(t.forEach(h=>{var p;let x=r.routes[h.route.id];!x||!x.hasLoader||(!i.some(R=>R.route.id===h.route.id)&&h.route.id in c&&((p=o[h.route.id])!=null&&p.shouldRevalidate)||x.hasClientLoader?w=!0:v.add(h.route.id))}),v.size===0)return[];let m=Tt(e,s);return w&&v.size>0&&m.searchParams.set("_routes",t.filter(h=>v.has(h.route.id)).map(h=>h.route.id).join(",")),[m.pathname+m.search]},[s,c,a,r,i,t,e,o]),y=u.useMemo(()=>kt(f,r),[f,r]),g=Bt(f);return u.createElement(u.Fragment,null,d.map(v=>u.createElement("link",{key:v,rel:"prefetch",as:"fetch",href:v,...n})),y.map(v=>u.createElement("link",{key:v,rel:"modulepreload",href:v,...n})),g.map(({key:v,link:w})=>u.createElement("link",{key:v,...w})))}function At(...e){return t=>{e.forEach(n=>{typeof n=="function"?n(t):n!=null&&(n.current=t)})}}var Re=typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u";try{Re&&(window.__reactRouterVersion="7.3.0")}catch{}function Gt({basename:e,children:t,window:n}){let a=u.useRef();a.current==null&&(a.current=Le({window:n,v5Compat:!0}));let r=a.current,[o,s]=u.useState({action:r.action,location:r.location}),c=u.useCallback(l=>{u.startTransition(()=>s(l))},[s]);return u.useLayoutEffect(()=>r.listen(c),[r,c]),u.createElement(pt,{basename:e,children:t,location:o.location,navigationType:o.action,navigator:r})}var Ce=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,be=u.forwardRef(function({onClick:t,discover:n="render",prefetch:a="none",relative:r,reloadDocument:o,replace:s,state:c,target:l,to:i,preventScrollReset:f,viewTransition:d,...y},g){let{basename:v}=u.useContext(L),w=typeof i=="string"&&Ce.test(i),m,h=!1;if(typeof i=="string"&&w&&(m=i,Re))try{let b=new URL(window.location.href),T=i.startsWith("//")?new URL(b.protocol+i):new URL(i),re=S(T.pathname,v);T.origin===b.origin&&re!=null?i=re+T.search+T.hash:h=!0}catch{P(!1,`<Link to="${i}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`)}let x=Qe(i,{relative:r}),[p,R,C]=Dt(a,y),W=Ht(i,{replace:s,state:c,target:l,preventScrollReset:f,relative:r,viewTransition:d});function N(b){t&&t(b),b.defaultPrevented||W(b)}let H=u.createElement("a",{...y,...C,href:m||x,onClick:h||o?t:N,ref:At(g,R),target:l,"data-discover":!w&&n==="render"?"true":void 0});return p&&!w?u.createElement(u.Fragment,null,H,u.createElement(Nt,{page:x})):H});be.displayName="Link";var Ot=u.forwardRef(function({"aria-current":t="page",caseSensitive:n=!1,className:a="",end:r=!1,style:o,to:s,viewTransition:c,children:l,...i},f){let d=U(s,{relative:i.relative}),y=F(),g=u.useContext(J),{navigator:v,basename:w}=u.useContext(L),m=g!=null&&Jt(d)&&c===!0,h=v.encodeLocation?v.encodeLocation(d).pathname:d.pathname,x=y.pathname,p=g&&g.navigation&&g.navigation.location?g.navigation.location.pathname:null;n||(x=x.toLowerCase(),p=p?p.toLowerCase():null,h=h.toLowerCase()),p&&w&&(p=S(p,w)||p);const R=h!=="/"&&h.endsWith("/")?h.length-1:h.length;let C=x===h||!r&&x.startsWith(h)&&x.charAt(R)==="/",W=p!=null&&(p===h||!r&&p.startsWith(h)&&p.charAt(h.length)==="/"),N={isActive:C,isPending:W,isTransitioning:m},H=C?t:void 0,b;typeof a=="function"?b=a(N):b=[a,C?"active":null,W?"pending":null,m?"transitioning":null].filter(Boolean).join(" ");let T=typeof o=="function"?o(N):o;return u.createElement(be,{...i,"aria-current":H,className:b,ref:f,style:T,to:s,viewTransition:c},typeof l=="function"?l(N):l)});Ot.displayName="NavLink";var Ut=u.forwardRef(({discover:e="render",fetcherKey:t,navigate:n,reloadDocument:a,replace:r,state:o,method:s=V,action:c,onSubmit:l,relative:i,preventScrollReset:f,viewTransition:d,...y},g)=>{let v=zt(),w=Kt(c,{relative:i}),m=s.toLowerCase()==="get"?"get":"post",h=typeof c=="string"&&Ce.test(c),x=p=>{if(l&&l(p),p.defaultPrevented)return;p.preventDefault();let R=p.nativeEvent.submitter,C=(R==null?void 0:R.getAttribute("formmethod"))||s;v(R||p.currentTarget,{fetcherKey:t,method:C,navigate:n,replace:r,state:o,relative:i,preventScrollReset:f,viewTransition:d})};return u.createElement("form",{ref:g,method:m,action:w,onSubmit:a?l:x,...y,"data-discover":!h&&e==="render"?"true":void 0})});Ut.displayName="Form";function Wt(e){return`${e} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`}function Pe(e){let t=u.useContext(D);return E(t,Wt(e)),t}function Ht(e,{target:t,replace:n,state:a,preventScrollReset:r,relative:o,viewTransition:s}={}){let c=Ze(),l=F(),i=U(e,{relative:o});return u.useCallback(f=>{if(xt(f,t)){f.preventDefault();let d=n!==void 0?n:M(l)===M(i);c(e,{replace:d,state:a,preventScrollReset:r,relative:o,viewTransition:s})}},[l,c,i,n,a,t,e,r,o,s])}var _t=0,Vt=()=>`__${String(++_t)}__`;function zt(){let{router:e}=Pe("useSubmit"),{basename:t}=u.useContext(L),n=ct();return u.useCallback(async(a,r={})=>{let{action:o,method:s,encType:c,formData:l,body:i}=Ct(a,t);if(r.navigate===!1){let f=r.fetcherKey||Vt();await e.fetch(f,n,r.action||o,{preventScrollReset:r.preventScrollReset,formData:l,body:i,formMethod:r.method||s,formEncType:r.encType||c,flushSync:r.flushSync})}else await e.navigate(r.action||o,{preventScrollReset:r.preventScrollReset,formData:l,body:i,formMethod:r.method||s,formEncType:r.encType||c,replace:r.replace,state:r.state,fromRouteId:n,flushSync:r.flushSync,viewTransition:r.viewTransition})},[e,t,n])}function Kt(e,{relative:t}={}){let{basename:n}=u.useContext(L),a=u.useContext($);E(a,"useFormAction must be used inside a RouteContext");let[r]=a.matches.slice(-1),o={...U(e||".",{relative:t})},s=F();if(e==null){o.search=s.search;let c=new URLSearchParams(o.search),l=c.getAll("index");if(l.some(f=>f==="")){c.delete("index"),l.filter(d=>d).forEach(d=>c.append("index",d));let f=c.toString();o.search=f?`?${f}`:""}}return(!e||e===".")&&r.route.index&&(o.search=o.search?o.search.replace(/^\?/,"?index&"):"?index"),n!=="/"&&(o.pathname=o.pathname==="/"?n:k([n,o.pathname])),M(o)}function Jt(e,t={}){let n=u.useContext(pe);E(n!=null,"`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?");let{basename:a}=Pe("useViewTransitionState"),r=U(e,{relative:t.relative});if(!n.isTransitioning)return!1;let o=S(n.currentLocation.pathname,a)||n.currentLocation.pathname,s=S(n.nextLocation.pathname,a)||n.nextLocation.pathname;return K(r.pathname,s)!=null||K(r.pathname,o)!=null}new TextEncoder;export{Gt as B,Ot as N,qt as R,mt as a};
