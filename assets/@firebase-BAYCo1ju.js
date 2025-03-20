import{_ as fi}from"./tslib-BGVaTf34.js";import{o as Ts}from"./idb-BXWtuYvb.js";const Ra=()=>{};var Pr={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const As=function(i){const e=[];let n=0;for(let r=0;r<i.length;r++){let o=i.charCodeAt(r);o<128?e[n++]=o:o<2048?(e[n++]=o>>6|192,e[n++]=o&63|128):(o&64512)===55296&&r+1<i.length&&(i.charCodeAt(r+1)&64512)===56320?(o=65536+((o&1023)<<10)+(i.charCodeAt(++r)&1023),e[n++]=o>>18|240,e[n++]=o>>12&63|128,e[n++]=o>>6&63|128,e[n++]=o&63|128):(e[n++]=o>>12|224,e[n++]=o>>6&63|128,e[n++]=o&63|128)}return e},Ca=function(i){const e=[];let n=0,r=0;for(;n<i.length;){const o=i[n++];if(o<128)e[r++]=String.fromCharCode(o);else if(o>191&&o<224){const c=i[n++];e[r++]=String.fromCharCode((o&31)<<6|c&63)}else if(o>239&&o<365){const c=i[n++],h=i[n++],u=i[n++],g=((o&7)<<18|(c&63)<<12|(h&63)<<6|u&63)-65536;e[r++]=String.fromCharCode(55296+(g>>10)),e[r++]=String.fromCharCode(56320+(g&1023))}else{const c=i[n++],h=i[n++];e[r++]=String.fromCharCode((o&15)<<12|(c&63)<<6|h&63)}}return e.join("")},Ss={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(i,e){if(!Array.isArray(i))throw Error("encodeByteArray takes an array as a parameter");this.init_();const n=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let o=0;o<i.length;o+=3){const c=i[o],h=o+1<i.length,u=h?i[o+1]:0,g=o+2<i.length,E=g?i[o+2]:0,A=c>>2,b=(c&3)<<4|u>>4;let R=(u&15)<<2|E>>6,N=E&63;g||(N=64,h||(R=64)),r.push(n[A],n[b],n[R],n[N])}return r.join("")},encodeString(i,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(i):this.encodeByteArray(As(i),e)},decodeString(i,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(i):Ca(this.decodeStringToByteArray(i,e))},decodeStringToByteArray(i,e){this.init_();const n=e?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let o=0;o<i.length;){const c=n[i.charAt(o++)],u=o<i.length?n[i.charAt(o)]:0;++o;const E=o<i.length?n[i.charAt(o)]:64;++o;const b=o<i.length?n[i.charAt(o)]:64;if(++o,c==null||u==null||E==null||b==null)throw new ka;const R=c<<2|u>>4;if(r.push(R),E!==64){const N=u<<4&240|E>>2;if(r.push(N),b!==64){const k=E<<6&192|b;r.push(k)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let i=0;i<this.ENCODED_VALS.length;i++)this.byteToCharMap_[i]=this.ENCODED_VALS.charAt(i),this.charToByteMap_[this.byteToCharMap_[i]]=i,this.byteToCharMapWebSafe_[i]=this.ENCODED_VALS_WEBSAFE.charAt(i),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[i]]=i,i>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(i)]=i,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(i)]=i)}}};class ka extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const Pa=function(i){const e=As(i);return Ss.encodeByteArray(e,!0)},cn=function(i){return Pa(i).replace(/\./g,"")},bs=function(i){try{return Ss.decodeString(i,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Oa(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Da=()=>Oa().__FIREBASE_DEFAULTS__,Na=()=>{if(typeof process>"u"||typeof Pr>"u")return;const i=Pr.__FIREBASE_DEFAULTS__;if(i)return JSON.parse(i)},La=()=>{if(typeof document>"u")return;let i;try{i=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=i&&bs(i[1]);return e&&JSON.parse(e)},pi=()=>{try{return Ra()||Da()||Na()||La()}catch(i){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${i}`);return}},Rs=i=>{var e,n;return(n=(e=pi())===null||e===void 0?void 0:e.emulatorHosts)===null||n===void 0?void 0:n[i]},Ma=i=>{const e=Rs(i);if(!e)return;const n=e.lastIndexOf(":");if(n<=0||n+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const r=parseInt(e.substring(n+1),10);return e[0]==="["?[e.substring(1,n-1),r]:[e.substring(0,n),r]},Cs=()=>{var i;return(i=pi())===null||i===void 0?void 0:i.config},ks=i=>{var e;return(e=pi())===null||e===void 0?void 0:e[`_${i}`]};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ua{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,n)=>{this.resolve=e,this.reject=n})}wrapCallback(e){return(n,r)=>{n?this.reject(n):this.resolve(r),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(n):e(n,r))}}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Fa(i,e){if(i.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const n={alg:"none",type:"JWT"},r=e||"demo-project",o=i.iat||0,c=i.sub||i.user_id;if(!c)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const h=Object.assign({iss:`https://securetoken.google.com/${r}`,aud:r,iat:o,exp:o+3600,auth_time:o,sub:c,user_id:c,firebase:{sign_in_provider:"custom",identities:{}}},i);return[cn(JSON.stringify(n)),cn(JSON.stringify(h)),""].join(".")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function q(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function xa(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(q())}function ja(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function Ps(){const i=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof i=="object"&&i.id!==void 0}function Ha(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function Va(){const i=q();return i.indexOf("MSIE ")>=0||i.indexOf("Trident/")>=0}function Os(){try{return typeof indexedDB=="object"}catch{return!1}}function Ds(){return new Promise((i,e)=>{try{let n=!0;const r="validate-browser-context-for-indexeddb-analytics-module",o=self.indexedDB.open(r);o.onsuccess=()=>{o.result.close(),n||self.indexedDB.deleteDatabase(r),i(!0)},o.onupgradeneeded=()=>{n=!1},o.onerror=()=>{var c;e(((c=o.error)===null||c===void 0?void 0:c.message)||"")}}catch(n){e(n)}})}function Ba(){return!(typeof navigator>"u"||!navigator.cookieEnabled)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $a="FirebaseError";class ce extends Error{constructor(e,n,r){super(n),this.code=e,this.customData=r,this.name=$a,Object.setPrototypeOf(this,ce.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,Ge.prototype.create)}}class Ge{constructor(e,n,r){this.service=e,this.serviceName=n,this.errors=r}create(e,...n){const r=n[0]||{},o=`${this.service}/${e}`,c=this.errors[e],h=c?za(c,r):"Error",u=`${this.serviceName}: ${h} (${o}).`;return new ce(o,u,r)}}function za(i,e){return i.replace(Wa,(n,r)=>{const o=e[r];return o!=null?String(o):`<${r}?>`})}const Wa=/\{\$([^}]+)}/g;function Ga(i){for(const e in i)if(Object.prototype.hasOwnProperty.call(i,e))return!1;return!0}function Ne(i,e){if(i===e)return!0;const n=Object.keys(i),r=Object.keys(e);for(const o of n){if(!r.includes(o))return!1;const c=i[o],h=e[o];if(Or(c)&&Or(h)){if(!Ne(c,h))return!1}else if(c!==h)return!1}for(const o of r)if(!n.includes(o))return!1;return!0}function Or(i){return i!==null&&typeof i=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Nt(i){const e=[];for(const[n,r]of Object.entries(i))Array.isArray(r)?r.forEach(o=>{e.push(encodeURIComponent(n)+"="+encodeURIComponent(o))}):e.push(encodeURIComponent(n)+"="+encodeURIComponent(r));return e.length?"&"+e.join("&"):""}function At(i){const e={};return i.replace(/^\?/,"").split("&").forEach(r=>{if(r){const[o,c]=r.split("=");e[decodeURIComponent(o)]=decodeURIComponent(c)}}),e}function St(i){const e=i.indexOf("?");if(!e)return"";const n=i.indexOf("#",e);return i.substring(e,n>0?n:void 0)}function qa(i,e){const n=new Ka(i,e);return n.subscribe.bind(n)}class Ka{constructor(e,n){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=n,this.task.then(()=>{e(this)}).catch(r=>{this.error(r)})}next(e){this.forEachObserver(n=>{n.next(e)})}error(e){this.forEachObserver(n=>{n.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,n,r){let o;if(e===void 0&&n===void 0&&r===void 0)throw new Error("Missing Observer.");Ja(e,["next","error","complete"])?o=e:o={next:e,error:n,complete:r},o.next===void 0&&(o.next=Xn),o.error===void 0&&(o.error=Xn),o.complete===void 0&&(o.complete=Xn);const c=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?o.error(this.finalError):o.complete()}catch{}}),this.observers.push(o),c}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let n=0;n<this.observers.length;n++)this.sendOne(n,e)}sendOne(e,n){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{n(this.observers[e])}catch(r){typeof console<"u"&&console.error&&console.error(r)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function Ja(i,e){if(typeof i!="object"||i===null)return!1;for(const n of e)if(n in i&&typeof i[n]=="function")return!0;return!1}function Xn(){}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Xa=1e3,Ya=2,Qa=4*60*60*1e3,Za=.5;function Dr(i,e=Xa,n=Ya){const r=e*Math.pow(n,i),o=Math.round(Za*r*(Math.random()-.5)*2);return Math.min(Qa,r+o)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function le(i){return i&&i._delegate?i._delegate:i}class oe{constructor(e,n,r){this.name=e,this.instanceFactory=n,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const He="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ec{constructor(e,n){this.name=e,this.container=n,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const n=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(n)){const r=new Ua;if(this.instancesDeferred.set(n,r),this.isInitialized(n)||this.shouldAutoInitialize())try{const o=this.getOrInitializeService({instanceIdentifier:n});o&&r.resolve(o)}catch{}}return this.instancesDeferred.get(n).promise}getImmediate(e){var n;const r=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),o=(n=e==null?void 0:e.optional)!==null&&n!==void 0?n:!1;if(this.isInitialized(r)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:r})}catch(c){if(o)return null;throw c}else{if(o)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(nc(e))try{this.getOrInitializeService({instanceIdentifier:He})}catch{}for(const[n,r]of this.instancesDeferred.entries()){const o=this.normalizeInstanceIdentifier(n);try{const c=this.getOrInitializeService({instanceIdentifier:o});r.resolve(c)}catch{}}}}clearInstance(e=He){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(n=>"INTERNAL"in n).map(n=>n.INTERNAL.delete()),...e.filter(n=>"_delete"in n).map(n=>n._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=He){return this.instances.has(e)}getOptions(e=He){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:n={}}=e,r=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const o=this.getOrInitializeService({instanceIdentifier:r,options:n});for(const[c,h]of this.instancesDeferred.entries()){const u=this.normalizeInstanceIdentifier(c);r===u&&h.resolve(o)}return o}onInit(e,n){var r;const o=this.normalizeInstanceIdentifier(n),c=(r=this.onInitCallbacks.get(o))!==null&&r!==void 0?r:new Set;c.add(e),this.onInitCallbacks.set(o,c);const h=this.instances.get(o);return h&&e(h,o),()=>{c.delete(e)}}invokeOnInitCallbacks(e,n){const r=this.onInitCallbacks.get(n);if(r)for(const o of r)try{o(e,n)}catch{}}getOrInitializeService({instanceIdentifier:e,options:n={}}){let r=this.instances.get(e);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:tc(e),options:n}),this.instances.set(e,r),this.instancesOptions.set(e,n),this.invokeOnInitCallbacks(r,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,r)}catch{}return r||null}normalizeInstanceIdentifier(e=He){return this.component?this.component.multipleInstances?e:He:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function tc(i){return i===He?void 0:i}function nc(i){return i.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ic{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const n=this.getProvider(e.name);if(n.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);n.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const n=new ec(e,this);return this.providers.set(e,n),n}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var O;(function(i){i[i.DEBUG=0]="DEBUG",i[i.VERBOSE=1]="VERBOSE",i[i.INFO=2]="INFO",i[i.WARN=3]="WARN",i[i.ERROR=4]="ERROR",i[i.SILENT=5]="SILENT"})(O||(O={}));const rc={debug:O.DEBUG,verbose:O.VERBOSE,info:O.INFO,warn:O.WARN,error:O.ERROR,silent:O.SILENT},sc=O.INFO,oc={[O.DEBUG]:"log",[O.VERBOSE]:"log",[O.INFO]:"info",[O.WARN]:"warn",[O.ERROR]:"error"},ac=(i,e,...n)=>{if(e<i.logLevel)return;const r=new Date().toISOString(),o=oc[e];if(o)console[o](`[${r}]  ${i.name}:`,...n);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class yn{constructor(e){this.name=e,this._logLevel=sc,this._logHandler=ac,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in O))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?rc[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,O.DEBUG,...e),this._logHandler(this,O.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,O.VERBOSE,...e),this._logHandler(this,O.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,O.INFO,...e),this._logHandler(this,O.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,O.WARN,...e),this._logHandler(this,O.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,O.ERROR,...e),this._logHandler(this,O.ERROR,...e)}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cc{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(n=>{if(lc(n)){const r=n.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(n=>n).join(" ")}}function lc(i){const e=i.getComponent();return(e==null?void 0:e.type)==="VERSION"}const ri="@firebase/app",Nr="0.11.2";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const we=new yn("@firebase/app"),hc="@firebase/app-compat",uc="@firebase/analytics-compat",dc="@firebase/analytics",fc="@firebase/app-check-compat",pc="@firebase/app-check",gc="@firebase/auth",mc="@firebase/auth-compat",vc="@firebase/database",yc="@firebase/data-connect",_c="@firebase/database-compat",Ic="@firebase/functions",wc="@firebase/functions-compat",Ec="@firebase/installations",Tc="@firebase/installations-compat",Ac="@firebase/messaging",Sc="@firebase/messaging-compat",bc="@firebase/performance",Rc="@firebase/performance-compat",Cc="@firebase/remote-config",kc="@firebase/remote-config-compat",Pc="@firebase/storage",Oc="@firebase/storage-compat",Dc="@firebase/firestore",Nc="@firebase/vertexai",Lc="@firebase/firestore-compat",Mc="firebase",Uc="11.4.0";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const si="[DEFAULT]",Fc={[ri]:"fire-core",[hc]:"fire-core-compat",[dc]:"fire-analytics",[uc]:"fire-analytics-compat",[pc]:"fire-app-check",[fc]:"fire-app-check-compat",[gc]:"fire-auth",[mc]:"fire-auth-compat",[vc]:"fire-rtdb",[yc]:"fire-data-connect",[_c]:"fire-rtdb-compat",[Ic]:"fire-fn",[wc]:"fire-fn-compat",[Ec]:"fire-iid",[Tc]:"fire-iid-compat",[Ac]:"fire-fcm",[Sc]:"fire-fcm-compat",[bc]:"fire-perf",[Rc]:"fire-perf-compat",[Cc]:"fire-rc",[kc]:"fire-rc-compat",[Pc]:"fire-gcs",[Oc]:"fire-gcs-compat",[Dc]:"fire-fst",[Lc]:"fire-fst-compat",[Nc]:"fire-vertex","fire-js":"fire-js",[Mc]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ln=new Map,xc=new Map,oi=new Map;function Lr(i,e){try{i.container.addComponent(e)}catch(n){we.debug(`Component ${e.name} failed to register with FirebaseApp ${i.name}`,n)}}function de(i){const e=i.name;if(oi.has(e))return we.debug(`There were multiple attempts to register component ${e}.`),!1;oi.set(e,i);for(const n of ln.values())Lr(n,i);for(const n of xc.values())Lr(n,i);return!0}function qe(i,e){const n=i.container.getProvider("heartbeat").getImmediate({optional:!0});return n&&n.triggerHeartbeat(),i.container.getProvider(e)}function te(i){return i==null?!1:i.settings!==void 0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const jc={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},De=new Ge("app","Firebase",jc);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hc{constructor(e,n,r){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},n),this._name=n.name,this._automaticDataCollectionEnabled=n.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new oe("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw De.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const st=Uc;function Vc(i,e={}){let n=i;typeof e!="object"&&(e={name:e});const r=Object.assign({name:si,automaticDataCollectionEnabled:!1},e),o=r.name;if(typeof o!="string"||!o)throw De.create("bad-app-name",{appName:String(o)});if(n||(n=Cs()),!n)throw De.create("no-options");const c=ln.get(o);if(c){if(Ne(n,c.options)&&Ne(r,c.config))return c;throw De.create("duplicate-app",{appName:o})}const h=new ic(o);for(const g of oi.values())h.addComponent(g);const u=new Hc(n,r,h);return ln.set(o,u),u}function gi(i=si){const e=ln.get(i);if(!e&&i===si&&Cs())return Vc();if(!e)throw De.create("no-app",{appName:i});return e}function se(i,e,n){var r;let o=(r=Fc[i])!==null&&r!==void 0?r:i;n&&(o+=`-${n}`);const c=o.match(/\s|\//),h=e.match(/\s|\//);if(c||h){const u=[`Unable to register library "${o}" with version "${e}":`];c&&u.push(`library name "${o}" contains illegal characters (whitespace or "/")`),c&&h&&u.push("and"),h&&u.push(`version name "${e}" contains illegal characters (whitespace or "/")`),we.warn(u.join(" "));return}de(new oe(`${o}-version`,()=>({library:o,version:e}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Bc="firebase-heartbeat-database",$c=1,Pt="firebase-heartbeat-store";let Yn=null;function Ns(){return Yn||(Yn=Ts(Bc,$c,{upgrade:(i,e)=>{switch(e){case 0:try{i.createObjectStore(Pt)}catch(n){console.warn(n)}}}}).catch(i=>{throw De.create("idb-open",{originalErrorMessage:i.message})})),Yn}async function zc(i){try{const n=(await Ns()).transaction(Pt),r=await n.objectStore(Pt).get(Ls(i));return await n.done,r}catch(e){if(e instanceof ce)we.warn(e.message);else{const n=De.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});we.warn(n.message)}}}async function Mr(i,e){try{const r=(await Ns()).transaction(Pt,"readwrite");await r.objectStore(Pt).put(e,Ls(i)),await r.done}catch(n){if(n instanceof ce)we.warn(n.message);else{const r=De.create("idb-set",{originalErrorMessage:n==null?void 0:n.message});we.warn(r.message)}}}function Ls(i){return`${i.name}!${i.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Wc=1024,Gc=30;class qc{constructor(e){this.container=e,this._heartbeatsCache=null;const n=this.container.getProvider("app").getImmediate();this._storage=new Jc(n),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){var e,n;try{const o=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),c=Ur();if(((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((n=this._heartbeatsCache)===null||n===void 0?void 0:n.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===c||this._heartbeatsCache.heartbeats.some(h=>h.date===c))return;if(this._heartbeatsCache.heartbeats.push({date:c,agent:o}),this._heartbeatsCache.heartbeats.length>Gc){const h=Xc(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(h,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(r){we.warn(r)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const n=Ur(),{heartbeatsToSend:r,unsentEntries:o}=Kc(this._heartbeatsCache.heartbeats),c=cn(JSON.stringify({version:2,heartbeats:r}));return this._heartbeatsCache.lastSentHeartbeatDate=n,o.length>0?(this._heartbeatsCache.heartbeats=o,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),c}catch(n){return we.warn(n),""}}}function Ur(){return new Date().toISOString().substring(0,10)}function Kc(i,e=Wc){const n=[];let r=i.slice();for(const o of i){const c=n.find(h=>h.agent===o.agent);if(c){if(c.dates.push(o.date),Fr(n)>e){c.dates.pop();break}}else if(n.push({agent:o.agent,dates:[o.date]}),Fr(n)>e){n.pop();break}r=r.slice(1)}return{heartbeatsToSend:n,unsentEntries:r}}class Jc{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return Os()?Ds().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const n=await zc(this.app);return n!=null&&n.heartbeats?n:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){var n;if(await this._canUseIndexedDBPromise){const o=await this.read();return Mr(this.app,{lastSentHeartbeatDate:(n=e.lastSentHeartbeatDate)!==null&&n!==void 0?n:o.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){var n;if(await this._canUseIndexedDBPromise){const o=await this.read();return Mr(this.app,{lastSentHeartbeatDate:(n=e.lastSentHeartbeatDate)!==null&&n!==void 0?n:o.lastSentHeartbeatDate,heartbeats:[...o.heartbeats,...e.heartbeats]})}else return}}function Fr(i){return cn(JSON.stringify({version:2,heartbeats:i})).length}function Xc(i){if(i.length===0)return-1;let e=0,n=i[0].date;for(let r=1;r<i.length;r++)i[r].date<n&&(n=i[r].date,e=r);return e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Yc(i){de(new oe("platform-logger",e=>new cc(e),"PRIVATE")),de(new oe("heartbeat",e=>new qc(e),"PRIVATE")),se(ri,Nr,i),se(ri,Nr,"esm2017"),se("fire-js","")}Yc("");function Ms(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const Qc=Ms,Us=new Ge("auth","Firebase",Ms());/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const hn=new yn("@firebase/auth");function Zc(i,...e){hn.logLevel<=O.WARN&&hn.warn(`Auth (${st}): ${i}`,...e)}function rn(i,...e){hn.logLevel<=O.ERROR&&hn.error(`Auth (${st}): ${i}`,...e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ae(i,...e){throw mi(i,...e)}function he(i,...e){return mi(i,...e)}function Fs(i,e,n){const r=Object.assign(Object.assign({},Qc()),{[e]:n});return new Ge("auth","Firebase",r).create(e,{appName:i.name})}function Ie(i){return Fs(i,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function mi(i,...e){if(typeof i!="string"){const n=e[0],r=[...e.slice(1)];return r[0]&&(r[0].appName=i.name),i._errorFactory.create(n,...r)}return Us.create(i,...e)}function S(i,e,...n){if(!i)throw mi(e,...n)}function ve(i){const e="INTERNAL ASSERTION FAILED: "+i;throw rn(e),new Error(e)}function Ee(i,e){i||ve(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ai(){var i;return typeof self<"u"&&((i=self.location)===null||i===void 0?void 0:i.href)||""}function el(){return xr()==="http:"||xr()==="https:"}function xr(){var i;return typeof self<"u"&&((i=self.location)===null||i===void 0?void 0:i.protocol)||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function tl(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(el()||Ps()||"connection"in navigator)?navigator.onLine:!0}function nl(){if(typeof navigator>"u")return null;const i=navigator;return i.languages&&i.languages[0]||i.language||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Lt{constructor(e,n){this.shortDelay=e,this.longDelay=n,Ee(n>e,"Short delay should be less than long delay!"),this.isMobile=xa()||Ha()}get(){return tl()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function vi(i,e){Ee(i.emulator,"Emulator should always be set here");const{url:n}=i.emulator;return e?`${n}${e.startsWith("/")?e.slice(1):e}`:n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xs{static initialize(e,n,r){this.fetchImpl=e,n&&(this.headersImpl=n),r&&(this.responseImpl=r)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;ve("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;ve("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;ve("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const il={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const rl=new Lt(3e4,6e4);function Le(i,e){return i.tenantId&&!e.tenantId?Object.assign(Object.assign({},e),{tenantId:i.tenantId}):e}async function Me(i,e,n,r,o={}){return js(i,o,async()=>{let c={},h={};r&&(e==="GET"?h=r:c={body:JSON.stringify(r)});const u=Nt(Object.assign({key:i.config.apiKey},h)).slice(1),g=await i._getAdditionalHeaders();g["Content-Type"]="application/json",i.languageCode&&(g["X-Firebase-Locale"]=i.languageCode);const E=Object.assign({method:e,headers:g},c);return ja()||(E.referrerPolicy="no-referrer"),xs.fetch()(Hs(i,i.config.apiHost,n,u),E)})}async function js(i,e,n){i._canInitEmulator=!1;const r=Object.assign(Object.assign({},il),e);try{const o=new ol(i),c=await Promise.race([n(),o.promise]);o.clearNetworkTimeout();const h=await c.json();if("needConfirmation"in h)throw tn(i,"account-exists-with-different-credential",h);if(c.ok&&!("errorMessage"in h))return h;{const u=c.ok?h.errorMessage:h.error.message,[g,E]=u.split(" : ");if(g==="FEDERATED_USER_ID_ALREADY_LINKED")throw tn(i,"credential-already-in-use",h);if(g==="EMAIL_EXISTS")throw tn(i,"email-already-in-use",h);if(g==="USER_DISABLED")throw tn(i,"user-disabled",h);const A=r[g]||g.toLowerCase().replace(/[_\s]+/g,"-");if(E)throw Fs(i,A,E);ae(i,A)}}catch(o){if(o instanceof ce)throw o;ae(i,"network-request-failed",{message:String(o)})}}async function Mt(i,e,n,r,o={}){const c=await Me(i,e,n,r,o);return"mfaPendingCredential"in c&&ae(i,"multi-factor-auth-required",{_serverResponse:c}),c}function Hs(i,e,n,r){const o=`${e}${n}?${r}`;return i.config.emulator?vi(i.config,o):`${i.config.apiScheme}://${o}`}function sl(i){switch(i){case"ENFORCE":return"ENFORCE";case"AUDIT":return"AUDIT";case"OFF":return"OFF";default:return"ENFORCEMENT_STATE_UNSPECIFIED"}}class ol{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((n,r)=>{this.timer=setTimeout(()=>r(he(this.auth,"network-request-failed")),rl.get())})}}function tn(i,e,n){const r={appName:i.name};n.email&&(r.email=n.email),n.phoneNumber&&(r.phoneNumber=n.phoneNumber);const o=he(i,e,r);return o.customData._tokenResponse=n,o}function jr(i){return i!==void 0&&i.enterprise!==void 0}class al{constructor(e){if(this.siteKey="",this.recaptchaEnforcementState=[],e.recaptchaKey===void 0)throw new Error("recaptchaKey undefined");this.siteKey=e.recaptchaKey.split("/")[3],this.recaptchaEnforcementState=e.recaptchaEnforcementState}getProviderEnforcementState(e){if(!this.recaptchaEnforcementState||this.recaptchaEnforcementState.length===0)return null;for(const n of this.recaptchaEnforcementState)if(n.provider&&n.provider===e)return sl(n.enforcementState);return null}isProviderEnabled(e){return this.getProviderEnforcementState(e)==="ENFORCE"||this.getProviderEnforcementState(e)==="AUDIT"}isAnyProviderEnabled(){return this.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")||this.isProviderEnabled("PHONE_PROVIDER")}}async function cl(i,e){return Me(i,"GET","/v2/recaptchaConfig",Le(i,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ll(i,e){return Me(i,"POST","/v1/accounts:delete",e)}async function Vs(i,e){return Me(i,"POST","/v1/accounts:lookup",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function bt(i){if(i)try{const e=new Date(Number(i));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function hl(i,e=!1){const n=le(i),r=await n.getIdToken(e),o=yi(r);S(o&&o.exp&&o.auth_time&&o.iat,n.auth,"internal-error");const c=typeof o.firebase=="object"?o.firebase:void 0,h=c==null?void 0:c.sign_in_provider;return{claims:o,token:r,authTime:bt(Qn(o.auth_time)),issuedAtTime:bt(Qn(o.iat)),expirationTime:bt(Qn(o.exp)),signInProvider:h||null,signInSecondFactor:(c==null?void 0:c.sign_in_second_factor)||null}}function Qn(i){return Number(i)*1e3}function yi(i){const[e,n,r]=i.split(".");if(e===void 0||n===void 0||r===void 0)return rn("JWT malformed, contained fewer than 3 sections"),null;try{const o=bs(n);return o?JSON.parse(o):(rn("Failed to decode base64 JWT payload"),null)}catch(o){return rn("Caught error parsing JWT payload as JSON",o==null?void 0:o.toString()),null}}function Hr(i){const e=yi(i);return S(e,"internal-error"),S(typeof e.exp<"u","internal-error"),S(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ot(i,e,n=!1){if(n)return e;try{return await e}catch(r){throw r instanceof ce&&ul(r)&&i.auth.currentUser===i&&await i.auth.signOut(),r}}function ul({code:i}){return i==="auth/user-disabled"||i==="auth/user-token-expired"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dl{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){var n;if(e){const r=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),r}else{this.errorBackoff=3e4;const o=((n=this.user.stsTokenManager.expirationTime)!==null&&n!==void 0?n:0)-Date.now()-3e5;return Math.max(0,o)}}schedule(e=!1){if(!this.isRunning)return;const n=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},n)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){(e==null?void 0:e.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ci{constructor(e,n){this.createdAt=e,this.lastLoginAt=n,this._initializeTime()}_initializeTime(){this.lastSignInTime=bt(this.lastLoginAt),this.creationTime=bt(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function un(i){var e;const n=i.auth,r=await i.getIdToken(),o=await Ot(i,Vs(n,{idToken:r}));S(o==null?void 0:o.users.length,n,"internal-error");const c=o.users[0];i._notifyReloadListener(c);const h=!((e=c.providerUserInfo)===null||e===void 0)&&e.length?Bs(c.providerUserInfo):[],u=pl(i.providerData,h),g=i.isAnonymous,E=!(i.email&&c.passwordHash)&&!(u!=null&&u.length),A=g?E:!1,b={uid:c.localId,displayName:c.displayName||null,photoURL:c.photoUrl||null,email:c.email||null,emailVerified:c.emailVerified||!1,phoneNumber:c.phoneNumber||null,tenantId:c.tenantId||null,providerData:u,metadata:new ci(c.createdAt,c.lastLoginAt),isAnonymous:A};Object.assign(i,b)}async function fl(i){const e=le(i);await un(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function pl(i,e){return[...i.filter(r=>!e.some(o=>o.providerId===r.providerId)),...e]}function Bs(i){return i.map(e=>{var{providerId:n}=e,r=fi(e,["providerId"]);return{providerId:n,uid:r.rawId||"",displayName:r.displayName||null,email:r.email||null,phoneNumber:r.phoneNumber||null,photoURL:r.photoUrl||null}})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function gl(i,e){const n=await js(i,{},async()=>{const r=Nt({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:o,apiKey:c}=i.config,h=Hs(i,o,"/v1/token",`key=${c}`),u=await i._getAdditionalHeaders();return u["Content-Type"]="application/x-www-form-urlencoded",xs.fetch()(h,{method:"POST",headers:u,body:r})});return{accessToken:n.access_token,expiresIn:n.expires_in,refreshToken:n.refresh_token}}async function ml(i,e){return Me(i,"POST","/v2/accounts:revokeToken",Le(i,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tt{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){S(e.idToken,"internal-error"),S(typeof e.idToken<"u","internal-error"),S(typeof e.refreshToken<"u","internal-error");const n="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):Hr(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,n)}updateFromIdToken(e){S(e.length!==0,"internal-error");const n=Hr(e);this.updateTokensAndExpiration(e,null,n)}async getToken(e,n=!1){return!n&&this.accessToken&&!this.isExpired?this.accessToken:(S(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,n){const{accessToken:r,refreshToken:o,expiresIn:c}=await gl(e,n);this.updateTokensAndExpiration(r,o,Number(c))}updateTokensAndExpiration(e,n,r){this.refreshToken=n||null,this.accessToken=e||null,this.expirationTime=Date.now()+r*1e3}static fromJSON(e,n){const{refreshToken:r,accessToken:o,expirationTime:c}=n,h=new tt;return r&&(S(typeof r=="string","internal-error",{appName:e}),h.refreshToken=r),o&&(S(typeof o=="string","internal-error",{appName:e}),h.accessToken=o),c&&(S(typeof c=="number","internal-error",{appName:e}),h.expirationTime=c),h}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new tt,this.toJSON())}_performRefresh(){return ve("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Re(i,e){S(typeof i=="string"||typeof i>"u","internal-error",{appName:e})}class ye{constructor(e){var{uid:n,auth:r,stsTokenManager:o}=e,c=fi(e,["uid","auth","stsTokenManager"]);this.providerId="firebase",this.proactiveRefresh=new dl(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=n,this.auth=r,this.stsTokenManager=o,this.accessToken=o.accessToken,this.displayName=c.displayName||null,this.email=c.email||null,this.emailVerified=c.emailVerified||!1,this.phoneNumber=c.phoneNumber||null,this.photoURL=c.photoURL||null,this.isAnonymous=c.isAnonymous||!1,this.tenantId=c.tenantId||null,this.providerData=c.providerData?[...c.providerData]:[],this.metadata=new ci(c.createdAt||void 0,c.lastLoginAt||void 0)}async getIdToken(e){const n=await Ot(this,this.stsTokenManager.getToken(this.auth,e));return S(n,this.auth,"internal-error"),this.accessToken!==n&&(this.accessToken=n,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),n}getIdTokenResult(e){return hl(this,e)}reload(){return fl(this)}_assign(e){this!==e&&(S(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(n=>Object.assign({},n)),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const n=new ye(Object.assign(Object.assign({},this),{auth:e,stsTokenManager:this.stsTokenManager._clone()}));return n.metadata._copy(this.metadata),n}_onReload(e){S(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,n=!1){let r=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),r=!0),n&&await un(this),await this.auth._persistUserIfCurrent(this),r&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(te(this.auth.app))return Promise.reject(Ie(this.auth));const e=await this.getIdToken();return await Ot(this,ll(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return Object.assign(Object.assign({uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>Object.assign({},e)),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId},this.metadata.toJSON()),{apiKey:this.auth.config.apiKey,appName:this.auth.name})}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,n){var r,o,c,h,u,g,E,A;const b=(r=n.displayName)!==null&&r!==void 0?r:void 0,R=(o=n.email)!==null&&o!==void 0?o:void 0,N=(c=n.phoneNumber)!==null&&c!==void 0?c:void 0,k=(h=n.photoURL)!==null&&h!==void 0?h:void 0,F=(u=n.tenantId)!==null&&u!==void 0?u:void 0,M=(g=n._redirectEventId)!==null&&g!==void 0?g:void 0,fe=(E=n.createdAt)!==null&&E!==void 0?E:void 0,Q=(A=n.lastLoginAt)!==null&&A!==void 0?A:void 0,{uid:j,emailVerified:ne,isAnonymous:Ue,providerData:K,stsTokenManager:y}=n;S(j&&y,e,"internal-error");const d=tt.fromJSON(this.name,y);S(typeof j=="string",e,"internal-error"),Re(b,e.name),Re(R,e.name),S(typeof ne=="boolean",e,"internal-error"),S(typeof Ue=="boolean",e,"internal-error"),Re(N,e.name),Re(k,e.name),Re(F,e.name),Re(M,e.name),Re(fe,e.name),Re(Q,e.name);const p=new ye({uid:j,auth:e,email:R,emailVerified:ne,displayName:b,isAnonymous:Ue,photoURL:k,phoneNumber:N,tenantId:F,stsTokenManager:d,createdAt:fe,lastLoginAt:Q});return K&&Array.isArray(K)&&(p.providerData=K.map(m=>Object.assign({},m))),M&&(p._redirectEventId=M),p}static async _fromIdTokenResponse(e,n,r=!1){const o=new tt;o.updateFromServerResponse(n);const c=new ye({uid:n.localId,auth:e,stsTokenManager:o,isAnonymous:r});return await un(c),c}static async _fromGetAccountInfoResponse(e,n,r){const o=n.users[0];S(o.localId!==void 0,"internal-error");const c=o.providerUserInfo!==void 0?Bs(o.providerUserInfo):[],h=!(o.email&&o.passwordHash)&&!(c!=null&&c.length),u=new tt;u.updateFromIdToken(r);const g=new ye({uid:o.localId,auth:e,stsTokenManager:u,isAnonymous:h}),E={uid:o.localId,displayName:o.displayName||null,photoURL:o.photoUrl||null,email:o.email||null,emailVerified:o.emailVerified||!1,phoneNumber:o.phoneNumber||null,tenantId:o.tenantId||null,providerData:c,metadata:new ci(o.createdAt,o.lastLoginAt),isAnonymous:!(o.email&&o.passwordHash)&&!(c!=null&&c.length)};return Object.assign(g,E),g}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Vr=new Map;function _e(i){Ee(i instanceof Function,"Expected a class definition");let e=Vr.get(i);return e?(Ee(e instanceof i,"Instance stored in cache mismatched with class"),e):(e=new i,Vr.set(i,e),e)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $s{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,n){this.storage[e]=n}async _get(e){const n=this.storage[e];return n===void 0?null:n}async _remove(e){delete this.storage[e]}_addListener(e,n){}_removeListener(e,n){}}$s.type="NONE";const Br=$s;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function sn(i,e,n){return`firebase:${i}:${e}:${n}`}class nt{constructor(e,n,r){this.persistence=e,this.auth=n,this.userKey=r;const{config:o,name:c}=this.auth;this.fullUserKey=sn(this.userKey,o.apiKey,c),this.fullPersistenceKey=sn("persistence",o.apiKey,c),this.boundEventHandler=n._onStorageEvent.bind(n),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);return e?ye._fromJSON(this.auth,e):null}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const n=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,n)return this.setCurrentUser(n)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,n,r="authUser"){if(!n.length)return new nt(_e(Br),e,r);const o=(await Promise.all(n.map(async E=>{if(await E._isAvailable())return E}))).filter(E=>E);let c=o[0]||_e(Br);const h=sn(r,e.config.apiKey,e.name);let u=null;for(const E of n)try{const A=await E._get(h);if(A){const b=ye._fromJSON(e,A);E!==c&&(u=b),c=E;break}}catch{}const g=o.filter(E=>E._shouldAllowMigration);return!c._shouldAllowMigration||!g.length?new nt(c,e,r):(c=g[0],u&&await c._set(h,u.toJSON()),await Promise.all(n.map(async E=>{if(E!==c)try{await E._remove(h)}catch{}})),new nt(c,e,r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function $r(i){const e=i.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(qs(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(zs(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(Js(e))return"Blackberry";if(Xs(e))return"Webos";if(Ws(e))return"Safari";if((e.includes("chrome/")||Gs(e))&&!e.includes("edge/"))return"Chrome";if(Ks(e))return"Android";{const n=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,r=i.match(n);if((r==null?void 0:r.length)===2)return r[1]}return"Other"}function zs(i=q()){return/firefox\//i.test(i)}function Ws(i=q()){const e=i.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function Gs(i=q()){return/crios\//i.test(i)}function qs(i=q()){return/iemobile/i.test(i)}function Ks(i=q()){return/android/i.test(i)}function Js(i=q()){return/blackberry/i.test(i)}function Xs(i=q()){return/webos/i.test(i)}function _i(i=q()){return/iphone|ipad|ipod/i.test(i)||/macintosh/i.test(i)&&/mobile/i.test(i)}function vl(i=q()){var e;return _i(i)&&!!(!((e=window.navigator)===null||e===void 0)&&e.standalone)}function yl(){return Va()&&document.documentMode===10}function Ys(i=q()){return _i(i)||Ks(i)||Xs(i)||Js(i)||/windows phone/i.test(i)||qs(i)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Qs(i,e=[]){let n;switch(i){case"Browser":n=$r(q());break;case"Worker":n=`${$r(q())}-${i}`;break;default:n=i}const r=e.length?e.join(","):"FirebaseCore-web";return`${n}/JsCore/${st}/${r}`}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _l{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,n){const r=c=>new Promise((h,u)=>{try{const g=e(c);h(g)}catch(g){u(g)}});r.onAbort=n,this.queue.push(r);const o=this.queue.length-1;return()=>{this.queue[o]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const n=[];try{for(const r of this.queue)await r(e),r.onAbort&&n.push(r.onAbort)}catch(r){n.reverse();for(const o of n)try{o()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:r==null?void 0:r.message})}}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Il(i,e={}){return Me(i,"GET","/v2/passwordPolicy",Le(i,e))}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const wl=6;class El{constructor(e){var n,r,o,c;const h=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=(n=h.minPasswordLength)!==null&&n!==void 0?n:wl,h.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=h.maxPasswordLength),h.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=h.containsLowercaseCharacter),h.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=h.containsUppercaseCharacter),h.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=h.containsNumericCharacter),h.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=h.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=(o=(r=e.allowedNonAlphanumericCharacters)===null||r===void 0?void 0:r.join(""))!==null&&o!==void 0?o:"",this.forceUpgradeOnSignin=(c=e.forceUpgradeOnSignin)!==null&&c!==void 0?c:!1,this.schemaVersion=e.schemaVersion}validatePassword(e){var n,r,o,c,h,u;const g={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,g),this.validatePasswordCharacterOptions(e,g),g.isValid&&(g.isValid=(n=g.meetsMinPasswordLength)!==null&&n!==void 0?n:!0),g.isValid&&(g.isValid=(r=g.meetsMaxPasswordLength)!==null&&r!==void 0?r:!0),g.isValid&&(g.isValid=(o=g.containsLowercaseLetter)!==null&&o!==void 0?o:!0),g.isValid&&(g.isValid=(c=g.containsUppercaseLetter)!==null&&c!==void 0?c:!0),g.isValid&&(g.isValid=(h=g.containsNumericCharacter)!==null&&h!==void 0?h:!0),g.isValid&&(g.isValid=(u=g.containsNonAlphanumericCharacter)!==null&&u!==void 0?u:!0),g}validatePasswordLengthOptions(e,n){const r=this.customStrengthOptions.minPasswordLength,o=this.customStrengthOptions.maxPasswordLength;r&&(n.meetsMinPasswordLength=e.length>=r),o&&(n.meetsMaxPasswordLength=e.length<=o)}validatePasswordCharacterOptions(e,n){this.updatePasswordCharacterOptionsStatuses(n,!1,!1,!1,!1);let r;for(let o=0;o<e.length;o++)r=e.charAt(o),this.updatePasswordCharacterOptionsStatuses(n,r>="a"&&r<="z",r>="A"&&r<="Z",r>="0"&&r<="9",this.allowedNonAlphanumericCharacters.includes(r))}updatePasswordCharacterOptionsStatuses(e,n,r,o,c){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=n)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=r)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=o)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=c))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Tl{constructor(e,n,r,o){this.app=e,this.heartbeatServiceProvider=n,this.appCheckServiceProvider=r,this.config=o,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new zr(this),this.idTokenSubscription=new zr(this),this.beforeStateQueue=new _l(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=Us,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=o.sdkClientVersion}_initializeWithPersistence(e,n){return n&&(this._popupRedirectResolver=_e(n)),this._initializationPromise=this.queue(async()=>{var r,o;if(!this._deleted&&(this.persistenceManager=await nt.create(this,e),!this._deleted)){if(!((r=this._popupRedirectResolver)===null||r===void 0)&&r._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(n),this.lastNotifiedUid=((o=this.currentUser)===null||o===void 0?void 0:o.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const n=await Vs(this,{idToken:e}),r=await ye._fromGetAccountInfoResponse(this,n,e);await this.directlySetCurrentUser(r)}catch(n){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",n),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var n;if(te(this.app)){const h=this.app.settings.authIdToken;return h?new Promise(u=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(h).then(u,u))}):this.directlySetCurrentUser(null)}const r=await this.assertedPersistence.getCurrentUser();let o=r,c=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const h=(n=this.redirectUser)===null||n===void 0?void 0:n._redirectEventId,u=o==null?void 0:o._redirectEventId,g=await this.tryRedirectSignIn(e);(!h||h===u)&&(g!=null&&g.user)&&(o=g.user,c=!0)}if(!o)return this.directlySetCurrentUser(null);if(!o._redirectEventId){if(c)try{await this.beforeStateQueue.runMiddleware(o)}catch(h){o=r,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(h))}return o?this.reloadAndSetCurrentUserOrClear(o):this.directlySetCurrentUser(null)}return S(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===o._redirectEventId?this.directlySetCurrentUser(o):this.reloadAndSetCurrentUserOrClear(o)}async tryRedirectSignIn(e){let n=null;try{n=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return n}async reloadAndSetCurrentUserOrClear(e){try{await un(e)}catch(n){if((n==null?void 0:n.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=nl()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(te(this.app))return Promise.reject(Ie(this));const n=e?le(e):null;return n&&S(n.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(n&&n._clone(this))}async _updateCurrentUser(e,n=!1){if(!this._deleted)return e&&S(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),n||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return te(this.app)?Promise.reject(Ie(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return te(this.app)?Promise.reject(Ie(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(_e(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const n=this._getPasswordPolicyInternal();return n.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):n.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await Il(this),n=new El(e);this.tenantId===null?this._projectPasswordPolicy=n:this._tenantPasswordPolicies[this.tenantId]=n}_getPersistence(){return this.assertedPersistence.persistence.type}_updateErrorMap(e){this._errorFactory=new Ge("auth","Firebase",e())}onAuthStateChanged(e,n,r){return this.registerStateListener(this.authStateSubscription,e,n,r)}beforeAuthStateChanged(e,n){return this.beforeStateQueue.pushCallback(e,n)}onIdTokenChanged(e,n,r){return this.registerStateListener(this.idTokenSubscription,e,n,r)}authStateReady(){return new Promise((e,n)=>{if(this.currentUser)e();else{const r=this.onAuthStateChanged(()=>{r(),e()},n)}})}async revokeAccessToken(e){if(this.currentUser){const n=await this.currentUser.getIdToken(),r={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:n};this.tenantId!=null&&(r.tenantId=this.tenantId),await ml(this,r)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)===null||e===void 0?void 0:e.toJSON()}}async _setRedirectUser(e,n){const r=await this.getOrInitRedirectPersistenceManager(n);return e===null?r.removeCurrentUser():r.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const n=e&&_e(e)||this._popupRedirectResolver;S(n,this,"argument-error"),this.redirectPersistenceManager=await nt.create(this,[_e(n._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var n,r;return this._isInitialized&&await this.queue(async()=>{}),((n=this._currentUser)===null||n===void 0?void 0:n._redirectEventId)===e?this._currentUser:((r=this.redirectUser)===null||r===void 0?void 0:r._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var e,n;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const r=(n=(e=this.currentUser)===null||e===void 0?void 0:e.uid)!==null&&n!==void 0?n:null;this.lastNotifiedUid!==r&&(this.lastNotifiedUid=r,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,n,r,o){if(this._deleted)return()=>{};const c=typeof n=="function"?n:n.next.bind(n);let h=!1;const u=this._isInitialized?Promise.resolve():this._initializationPromise;if(S(u,this,"internal-error"),u.then(()=>{h||c(this.currentUser)}),typeof n=="function"){const g=e.addObserver(n,r,o);return()=>{h=!0,g()}}else{const g=e.addObserver(n);return()=>{h=!0,g()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return S(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=Qs(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var e;const n={"X-Client-Version":this.clientVersion};this.app.options.appId&&(n["X-Firebase-gmpid"]=this.app.options.appId);const r=await((e=this.heartbeatServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getHeartbeatsHeader());r&&(n["X-Firebase-Client"]=r);const o=await this._getAppCheckToken();return o&&(n["X-Firebase-AppCheck"]=o),n}async _getAppCheckToken(){var e;if(te(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const n=await((e=this.appCheckServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getToken());return n!=null&&n.error&&Zc(`Error while retrieving App Check token: ${n.error}`),n==null?void 0:n.token}}function Ke(i){return le(i)}class zr{constructor(e){this.auth=e,this.observer=null,this.addObserver=qa(n=>this.observer=n)}get next(){return S(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let _n={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function Al(i){_n=i}function Zs(i){return _n.loadJS(i)}function Sl(){return _n.recaptchaEnterpriseScript}function bl(){return _n.gapiScript}function Rl(i){return`__${i}${Math.floor(Math.random()*1e6)}`}class Cl{constructor(){this.enterprise=new kl}ready(e){e()}execute(e,n){return Promise.resolve("token")}render(e,n){return""}}class kl{ready(e){e()}execute(e,n){return Promise.resolve("token")}render(e,n){return""}}const Pl="recaptcha-enterprise",eo="NO_RECAPTCHA";class Ol{constructor(e){this.type=Pl,this.auth=Ke(e)}async verify(e="verify",n=!1){async function r(c){if(!n){if(c.tenantId==null&&c._agentRecaptchaConfig!=null)return c._agentRecaptchaConfig.siteKey;if(c.tenantId!=null&&c._tenantRecaptchaConfigs[c.tenantId]!==void 0)return c._tenantRecaptchaConfigs[c.tenantId].siteKey}return new Promise(async(h,u)=>{cl(c,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}).then(g=>{if(g.recaptchaKey===void 0)u(new Error("recaptcha Enterprise site key undefined"));else{const E=new al(g);return c.tenantId==null?c._agentRecaptchaConfig=E:c._tenantRecaptchaConfigs[c.tenantId]=E,h(E.siteKey)}}).catch(g=>{u(g)})})}function o(c,h,u){const g=window.grecaptcha;jr(g)?g.enterprise.ready(()=>{g.enterprise.execute(c,{action:e}).then(E=>{h(E)}).catch(()=>{h(eo)})}):u(Error("No reCAPTCHA enterprise script loaded."))}return this.auth.settings.appVerificationDisabledForTesting?new Cl().execute("siteKey",{action:"verify"}):new Promise((c,h)=>{r(this.auth).then(u=>{if(!n&&jr(window.grecaptcha))o(u,c,h);else{if(typeof window>"u"){h(new Error("RecaptchaVerifier is only supported in browser"));return}let g=Sl();g.length!==0&&(g+=u),Zs(g).then(()=>{o(u,c,h)}).catch(E=>{h(E)})}}).catch(u=>{h(u)})})}}async function Wr(i,e,n,r=!1,o=!1){const c=new Ol(i);let h;if(o)h=eo;else try{h=await c.verify(n)}catch{h=await c.verify(n,!0)}const u=Object.assign({},e);if(n==="mfaSmsEnrollment"||n==="mfaSmsSignIn"){if("phoneEnrollmentInfo"in u){const g=u.phoneEnrollmentInfo.phoneNumber,E=u.phoneEnrollmentInfo.recaptchaToken;Object.assign(u,{phoneEnrollmentInfo:{phoneNumber:g,recaptchaToken:E,captchaResponse:h,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}else if("phoneSignInInfo"in u){const g=u.phoneSignInInfo.recaptchaToken;Object.assign(u,{phoneSignInInfo:{recaptchaToken:g,captchaResponse:h,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}return u}return r?Object.assign(u,{captchaResp:h}):Object.assign(u,{captchaResponse:h}),Object.assign(u,{clientType:"CLIENT_TYPE_WEB"}),Object.assign(u,{recaptchaVersion:"RECAPTCHA_ENTERPRISE"}),u}async function li(i,e,n,r,o){var c;if(!((c=i._getRecaptchaConfig())===null||c===void 0)&&c.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")){const h=await Wr(i,e,n,n==="getOobCode");return r(i,h)}else return r(i,e).catch(async h=>{if(h.code==="auth/missing-recaptcha-token"){console.log(`${n} is protected by reCAPTCHA Enterprise for this project. Automatically triggering the reCAPTCHA flow and restarting the flow.`);const u=await Wr(i,e,n,n==="getOobCode");return r(i,u)}else return Promise.reject(h)})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Dl(i,e){const n=qe(i,"auth");if(n.isInitialized()){const o=n.getImmediate(),c=n.getOptions();if(Ne(c,e??{}))return o;ae(o,"already-initialized")}return n.initialize({options:e})}function Nl(i,e){const n=(e==null?void 0:e.persistence)||[],r=(Array.isArray(n)?n:[n]).map(_e);e!=null&&e.errorMap&&i._updateErrorMap(e.errorMap),i._initializeWithPersistence(r,e==null?void 0:e.popupRedirectResolver)}function Ll(i,e,n){const r=Ke(i);S(/^https?:\/\//.test(e),r,"invalid-emulator-scheme");const o=!1,c=to(e),{host:h,port:u}=Ml(e),g=u===null?"":`:${u}`,E={url:`${c}//${h}${g}/`},A=Object.freeze({host:h,port:u,protocol:c.replace(":",""),options:Object.freeze({disableWarnings:o})});if(!r._canInitEmulator){S(r.config.emulator&&r.emulatorConfig,r,"emulator-config-failed"),S(Ne(E,r.config.emulator)&&Ne(A,r.emulatorConfig),r,"emulator-config-failed");return}r.config.emulator=E,r.emulatorConfig=A,r.settings.appVerificationDisabledForTesting=!0,Ul()}function to(i){const e=i.indexOf(":");return e<0?"":i.substr(0,e+1)}function Ml(i){const e=to(i),n=/(\/\/)?([^?#/]+)/.exec(i.substr(e.length));if(!n)return{host:"",port:null};const r=n[2].split("@").pop()||"",o=/^(\[[^\]]+\])(:|$)/.exec(r);if(o){const c=o[1];return{host:c,port:Gr(r.substr(c.length+1))}}else{const[c,h]=r.split(":");return{host:c,port:Gr(h)}}}function Gr(i){if(!i)return null;const e=Number(i);return isNaN(e)?null:e}function Ul(){function i(){const e=document.createElement("p"),n=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",n.position="fixed",n.width="100%",n.backgroundColor="#ffffff",n.border=".1em solid #000000",n.color="#b50000",n.bottom="0px",n.left="0px",n.margin="0px",n.zIndex="10000",n.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",i):i())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ii{constructor(e,n){this.providerId=e,this.signInMethod=n}toJSON(){return ve("not implemented")}_getIdTokenResponse(e){return ve("not implemented")}_linkToIdToken(e,n){return ve("not implemented")}_getReauthenticationResolver(e){return ve("not implemented")}}async function Fl(i,e){return Me(i,"POST","/v1/accounts:signUp",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function xl(i,e){return Mt(i,"POST","/v1/accounts:signInWithPassword",Le(i,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function jl(i,e){return Mt(i,"POST","/v1/accounts:signInWithEmailLink",Le(i,e))}async function Hl(i,e){return Mt(i,"POST","/v1/accounts:signInWithEmailLink",Le(i,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Dt extends Ii{constructor(e,n,r,o=null){super("password",r),this._email=e,this._password=n,this._tenantId=o}static _fromEmailAndPassword(e,n){return new Dt(e,n,"password")}static _fromEmailAndCode(e,n,r=null){return new Dt(e,n,"emailLink",r)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(e){const n=typeof e=="string"?JSON.parse(e):e;if(n!=null&&n.email&&(n!=null&&n.password)){if(n.signInMethod==="password")return this._fromEmailAndPassword(n.email,n.password);if(n.signInMethod==="emailLink")return this._fromEmailAndCode(n.email,n.password,n.tenantId)}return null}async _getIdTokenResponse(e){switch(this.signInMethod){case"password":const n={returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return li(e,n,"signInWithPassword",xl);case"emailLink":return jl(e,{email:this._email,oobCode:this._password});default:ae(e,"internal-error")}}async _linkToIdToken(e,n){switch(this.signInMethod){case"password":const r={idToken:n,returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return li(e,r,"signUpPassword",Fl);case"emailLink":return Hl(e,{idToken:n,email:this._email,oobCode:this._password});default:ae(e,"internal-error")}}_getReauthenticationResolver(e){return this._getIdTokenResponse(e)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function it(i,e){return Mt(i,"POST","/v1/accounts:signInWithIdp",Le(i,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Vl="http://localhost";class Be extends Ii{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const n=new Be(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(n.idToken=e.idToken),e.accessToken&&(n.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(n.nonce=e.nonce),e.pendingToken&&(n.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(n.accessToken=e.oauthToken,n.secret=e.oauthTokenSecret):ae("argument-error"),n}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const n=typeof e=="string"?JSON.parse(e):e,{providerId:r,signInMethod:o}=n,c=fi(n,["providerId","signInMethod"]);if(!r||!o)return null;const h=new Be(r,o);return h.idToken=c.idToken||void 0,h.accessToken=c.accessToken||void 0,h.secret=c.secret,h.nonce=c.nonce,h.pendingToken=c.pendingToken||null,h}_getIdTokenResponse(e){const n=this.buildRequest();return it(e,n)}_linkToIdToken(e,n){const r=this.buildRequest();return r.idToken=n,it(e,r)}_getReauthenticationResolver(e){const n=this.buildRequest();return n.autoCreate=!1,it(e,n)}buildRequest(){const e={requestUri:Vl,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const n={};this.idToken&&(n.id_token=this.idToken),this.accessToken&&(n.access_token=this.accessToken),this.secret&&(n.oauth_token_secret=this.secret),n.providerId=this.providerId,this.nonce&&!this.pendingToken&&(n.nonce=this.nonce),e.postBody=Nt(n)}return e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Bl(i){switch(i){case"recoverEmail":return"RECOVER_EMAIL";case"resetPassword":return"PASSWORD_RESET";case"signIn":return"EMAIL_SIGNIN";case"verifyEmail":return"VERIFY_EMAIL";case"verifyAndChangeEmail":return"VERIFY_AND_CHANGE_EMAIL";case"revertSecondFactorAddition":return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}function $l(i){const e=At(St(i)).link,n=e?At(St(e)).deep_link_id:null,r=At(St(i)).deep_link_id;return(r?At(St(r)).link:null)||r||n||e||i}class wi{constructor(e){var n,r,o,c,h,u;const g=At(St(e)),E=(n=g.apiKey)!==null&&n!==void 0?n:null,A=(r=g.oobCode)!==null&&r!==void 0?r:null,b=Bl((o=g.mode)!==null&&o!==void 0?o:null);S(E&&A&&b,"argument-error"),this.apiKey=E,this.operation=b,this.code=A,this.continueUrl=(c=g.continueUrl)!==null&&c!==void 0?c:null,this.languageCode=(h=g.languageCode)!==null&&h!==void 0?h:null,this.tenantId=(u=g.tenantId)!==null&&u!==void 0?u:null}static parseLink(e){const n=$l(e);try{return new wi(n)}catch{return null}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ot{constructor(){this.providerId=ot.PROVIDER_ID}static credential(e,n){return Dt._fromEmailAndPassword(e,n)}static credentialWithLink(e,n){const r=wi.parseLink(n);return S(r,"argument-error"),Dt._fromEmailAndCode(e,r.code,r.tenantId)}}ot.PROVIDER_ID="password";ot.EMAIL_PASSWORD_SIGN_IN_METHOD="password";ot.EMAIL_LINK_SIGN_IN_METHOD="emailLink";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class no{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ut extends no{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ce extends Ut{constructor(){super("facebook.com")}static credential(e){return Be._fromParams({providerId:Ce.PROVIDER_ID,signInMethod:Ce.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Ce.credentialFromTaggedObject(e)}static credentialFromError(e){return Ce.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Ce.credential(e.oauthAccessToken)}catch{return null}}}Ce.FACEBOOK_SIGN_IN_METHOD="facebook.com";Ce.PROVIDER_ID="facebook.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ke extends Ut{constructor(){super("google.com"),this.addScope("profile")}static credential(e,n){return Be._fromParams({providerId:ke.PROVIDER_ID,signInMethod:ke.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:n})}static credentialFromResult(e){return ke.credentialFromTaggedObject(e)}static credentialFromError(e){return ke.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:n,oauthAccessToken:r}=e;if(!n&&!r)return null;try{return ke.credential(n,r)}catch{return null}}}ke.GOOGLE_SIGN_IN_METHOD="google.com";ke.PROVIDER_ID="google.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pe extends Ut{constructor(){super("github.com")}static credential(e){return Be._fromParams({providerId:Pe.PROVIDER_ID,signInMethod:Pe.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Pe.credentialFromTaggedObject(e)}static credentialFromError(e){return Pe.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Pe.credential(e.oauthAccessToken)}catch{return null}}}Pe.GITHUB_SIGN_IN_METHOD="github.com";Pe.PROVIDER_ID="github.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Oe extends Ut{constructor(){super("twitter.com")}static credential(e,n){return Be._fromParams({providerId:Oe.PROVIDER_ID,signInMethod:Oe.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:n})}static credentialFromResult(e){return Oe.credentialFromTaggedObject(e)}static credentialFromError(e){return Oe.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:n,oauthTokenSecret:r}=e;if(!n||!r)return null;try{return Oe.credential(n,r)}catch{return null}}}Oe.TWITTER_SIGN_IN_METHOD="twitter.com";Oe.PROVIDER_ID="twitter.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function zl(i,e){return Mt(i,"POST","/v1/accounts:signUp",Le(i,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $e{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,n,r,o=!1){const c=await ye._fromIdTokenResponse(e,r,o),h=qr(r);return new $e({user:c,providerId:h,_tokenResponse:r,operationType:n})}static async _forOperation(e,n,r){await e._updateTokensIfNecessary(r,!0);const o=qr(r);return new $e({user:e,providerId:o,_tokenResponse:r,operationType:n})}}function qr(i){return i.providerId?i.providerId:"phoneNumber"in i?"phone":null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dn extends ce{constructor(e,n,r,o){var c;super(n.code,n.message),this.operationType=r,this.user=o,Object.setPrototypeOf(this,dn.prototype),this.customData={appName:e.name,tenantId:(c=e.tenantId)!==null&&c!==void 0?c:void 0,_serverResponse:n.customData._serverResponse,operationType:r}}static _fromErrorAndOperation(e,n,r,o){return new dn(e,n,r,o)}}function io(i,e,n,r){return(e==="reauthenticate"?n._getReauthenticationResolver(i):n._getIdTokenResponse(i)).catch(c=>{throw c.code==="auth/multi-factor-auth-required"?dn._fromErrorAndOperation(i,c,e,r):c})}async function Wl(i,e,n=!1){const r=await Ot(i,e._linkToIdToken(i.auth,await i.getIdToken()),n);return $e._forOperation(i,"link",r)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Gl(i,e,n=!1){const{auth:r}=i;if(te(r.app))return Promise.reject(Ie(r));const o="reauthenticate";try{const c=await Ot(i,io(r,o,e,i),n);S(c.idToken,r,"internal-error");const h=yi(c.idToken);S(h,r,"internal-error");const{sub:u}=h;return S(i.uid===u,r,"user-mismatch"),$e._forOperation(i,o,c)}catch(c){throw(c==null?void 0:c.code)==="auth/user-not-found"&&ae(r,"user-mismatch"),c}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ro(i,e,n=!1){if(te(i.app))return Promise.reject(Ie(i));const r="signIn",o=await io(i,r,e),c=await $e._fromIdTokenResponse(i,r,o);return n||await i._updateCurrentUser(c.user),c}async function ql(i,e){return ro(Ke(i),e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function so(i){const e=Ke(i);e._getPasswordPolicyInternal()&&await e._updatePasswordPolicy()}async function zd(i,e,n){if(te(i.app))return Promise.reject(Ie(i));const r=Ke(i),h=await li(r,{returnSecureToken:!0,email:e,password:n,clientType:"CLIENT_TYPE_WEB"},"signUpPassword",zl).catch(g=>{throw g.code==="auth/password-does-not-meet-requirements"&&so(i),g}),u=await $e._fromIdTokenResponse(r,"signIn",h);return await r._updateCurrentUser(u.user),u}function Wd(i,e,n){return te(i.app)?Promise.reject(Ie(i)):ql(le(i),ot.credential(e,n)).catch(async r=>{throw r.code==="auth/password-does-not-meet-requirements"&&so(i),r})}function Kl(i,e,n,r){return le(i).onIdTokenChanged(e,n,r)}function Jl(i,e,n){return le(i).beforeAuthStateChanged(e,n)}function Gd(i,e,n,r){return le(i).onAuthStateChanged(e,n,r)}function qd(i){return le(i).signOut()}const fn="__sak";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class oo{constructor(e,n){this.storageRetriever=e,this.type=n}_isAvailable(){try{return this.storage?(this.storage.setItem(fn,"1"),this.storage.removeItem(fn),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,n){return this.storage.setItem(e,JSON.stringify(n)),Promise.resolve()}_get(e){const n=this.storage.getItem(e);return Promise.resolve(n?JSON.parse(n):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Xl=1e3,Yl=10;class ao extends oo{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,n)=>this.onStorageEvent(e,n),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=Ys(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const n of Object.keys(this.listeners)){const r=this.storage.getItem(n),o=this.localCache[n];r!==o&&e(n,o,r)}}onStorageEvent(e,n=!1){if(!e.key){this.forAllChangedKeys((h,u,g)=>{this.notifyListeners(h,g)});return}const r=e.key;n?this.detachListener():this.stopPolling();const o=()=>{const h=this.storage.getItem(r);!n&&this.localCache[r]===h||this.notifyListeners(r,h)},c=this.storage.getItem(r);yl()&&c!==e.newValue&&e.newValue!==e.oldValue?setTimeout(o,Yl):o()}notifyListeners(e,n){this.localCache[e]=n;const r=this.listeners[e];if(r)for(const o of Array.from(r))o(n&&JSON.parse(n))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,n,r)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:n,newValue:r}),!0)})},Xl)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,n){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(n)}_removeListener(e,n){this.listeners[e]&&(this.listeners[e].delete(n),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,n){await super._set(e,n),this.localCache[e]=JSON.stringify(n)}async _get(e){const n=await super._get(e);return this.localCache[e]=JSON.stringify(n),n}async _remove(e){await super._remove(e),delete this.localCache[e]}}ao.type="LOCAL";const Ql=ao;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class co extends oo{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,n){}_removeListener(e,n){}}co.type="SESSION";const lo=co;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Zl(i){return Promise.all(i.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(n){return{fulfilled:!1,reason:n}}}))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class In{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const n=this.receivers.find(o=>o.isListeningto(e));if(n)return n;const r=new In(e);return this.receivers.push(r),r}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const n=e,{eventId:r,eventType:o,data:c}=n.data,h=this.handlersMap[o];if(!(h!=null&&h.size))return;n.ports[0].postMessage({status:"ack",eventId:r,eventType:o});const u=Array.from(h).map(async E=>E(n.origin,c)),g=await Zl(u);n.ports[0].postMessage({status:"done",eventId:r,eventType:o,response:g})}_subscribe(e,n){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(n)}_unsubscribe(e,n){this.handlersMap[e]&&n&&this.handlersMap[e].delete(n),(!n||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}In.receivers=[];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ei(i="",e=10){let n="";for(let r=0;r<e;r++)n+=Math.floor(Math.random()*10);return i+n}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eh{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,n,r=50){const o=typeof MessageChannel<"u"?new MessageChannel:null;if(!o)throw new Error("connection_unavailable");let c,h;return new Promise((u,g)=>{const E=Ei("",20);o.port1.start();const A=setTimeout(()=>{g(new Error("unsupported_event"))},r);h={messageChannel:o,onMessage(b){const R=b;if(R.data.eventId===E)switch(R.data.status){case"ack":clearTimeout(A),c=setTimeout(()=>{g(new Error("timeout"))},3e3);break;case"done":clearTimeout(c),u(R.data.response);break;default:clearTimeout(A),clearTimeout(c),g(new Error("invalid_response"));break}}},this.handlers.add(h),o.port1.addEventListener("message",h.onMessage),this.target.postMessage({eventType:e,eventId:E,data:n},[o.port2])}).finally(()=>{h&&this.removeMessageHandler(h)})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ue(){return window}function th(i){ue().location.href=i}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ho(){return typeof ue().WorkerGlobalScope<"u"&&typeof ue().importScripts=="function"}async function nh(){if(!(navigator!=null&&navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function ih(){var i;return((i=navigator==null?void 0:navigator.serviceWorker)===null||i===void 0?void 0:i.controller)||null}function rh(){return ho()?self:null}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const uo="firebaseLocalStorageDb",sh=1,pn="firebaseLocalStorage",fo="fbase_key";class Ft{constructor(e){this.request=e}toPromise(){return new Promise((e,n)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{n(this.request.error)})})}}function wn(i,e){return i.transaction([pn],e?"readwrite":"readonly").objectStore(pn)}function oh(){const i=indexedDB.deleteDatabase(uo);return new Ft(i).toPromise()}function hi(){const i=indexedDB.open(uo,sh);return new Promise((e,n)=>{i.addEventListener("error",()=>{n(i.error)}),i.addEventListener("upgradeneeded",()=>{const r=i.result;try{r.createObjectStore(pn,{keyPath:fo})}catch(o){n(o)}}),i.addEventListener("success",async()=>{const r=i.result;r.objectStoreNames.contains(pn)?e(r):(r.close(),await oh(),e(await hi()))})})}async function Kr(i,e,n){const r=wn(i,!0).put({[fo]:e,value:n});return new Ft(r).toPromise()}async function ah(i,e){const n=wn(i,!1).get(e),r=await new Ft(n).toPromise();return r===void 0?null:r.value}function Jr(i,e){const n=wn(i,!0).delete(e);return new Ft(n).toPromise()}const ch=800,lh=3;class po{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await hi(),this.db)}async _withRetries(e){let n=0;for(;;)try{const r=await this._openDb();return await e(r)}catch(r){if(n++>lh)throw r;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return ho()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=In._getInstance(rh()),this.receiver._subscribe("keyChanged",async(e,n)=>({keyProcessed:(await this._poll()).includes(n.key)})),this.receiver._subscribe("ping",async(e,n)=>["keyChanged"])}async initializeSender(){var e,n;if(this.activeServiceWorker=await nh(),!this.activeServiceWorker)return;this.sender=new eh(this.activeServiceWorker);const r=await this.sender._send("ping",{},800);r&&!((e=r[0])===null||e===void 0)&&e.fulfilled&&!((n=r[0])===null||n===void 0)&&n.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||ih()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await hi();return await Kr(e,fn,"1"),await Jr(e,fn),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,n){return this._withPendingWrite(async()=>(await this._withRetries(r=>Kr(r,e,n)),this.localCache[e]=n,this.notifyServiceWorker(e)))}async _get(e){const n=await this._withRetries(r=>ah(r,e));return this.localCache[e]=n,n}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(n=>Jr(n,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(o=>{const c=wn(o,!1).getAll();return new Ft(c).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const n=[],r=new Set;if(e.length!==0)for(const{fbase_key:o,value:c}of e)r.add(o),JSON.stringify(this.localCache[o])!==JSON.stringify(c)&&(this.notifyListeners(o,c),n.push(o));for(const o of Object.keys(this.localCache))this.localCache[o]&&!r.has(o)&&(this.notifyListeners(o,null),n.push(o));return n}notifyListeners(e,n){this.localCache[e]=n;const r=this.listeners[e];if(r)for(const o of Array.from(r))o(n)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),ch)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,n){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(n)}_removeListener(e,n){this.listeners[e]&&(this.listeners[e].delete(n),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}po.type="LOCAL";const hh=po;new Lt(3e4,6e4);/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function uh(i,e){return e?_e(e):(S(i._popupRedirectResolver,i,"argument-error"),i._popupRedirectResolver)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ti extends Ii{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return it(e,this._buildIdpRequest())}_linkToIdToken(e,n){return it(e,this._buildIdpRequest(n))}_getReauthenticationResolver(e){return it(e,this._buildIdpRequest())}_buildIdpRequest(e){const n={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(n.idToken=e),n}}function dh(i){return ro(i.auth,new Ti(i),i.bypassAuthState)}function fh(i){const{auth:e,user:n}=i;return S(n,e,"internal-error"),Gl(n,new Ti(i),i.bypassAuthState)}async function ph(i){const{auth:e,user:n}=i;return S(n,e,"internal-error"),Wl(n,new Ti(i),i.bypassAuthState)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class go{constructor(e,n,r,o,c=!1){this.auth=e,this.resolver=r,this.user=o,this.bypassAuthState=c,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(n)?n:[n]}execute(){return new Promise(async(e,n)=>{this.pendingPromise={resolve:e,reject:n};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(r){this.reject(r)}})}async onAuthEvent(e){const{urlResponse:n,sessionId:r,postBody:o,tenantId:c,error:h,type:u}=e;if(h){this.reject(h);return}const g={auth:this.auth,requestUri:n,sessionId:r,tenantId:c||void 0,postBody:o||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(u)(g))}catch(E){this.reject(E)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return dh;case"linkViaPopup":case"linkViaRedirect":return ph;case"reauthViaPopup":case"reauthViaRedirect":return fh;default:ae(this.auth,"internal-error")}}resolve(e){Ee(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){Ee(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const gh=new Lt(2e3,1e4);class et extends go{constructor(e,n,r,o,c){super(e,n,o,c),this.provider=r,this.authWindow=null,this.pollId=null,et.currentPopupAction&&et.currentPopupAction.cancel(),et.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return S(e,this.auth,"internal-error"),e}async onExecution(){Ee(this.filter.length===1,"Popup operations only handle one event");const e=Ei();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(n=>{this.reject(n)}),this.resolver._isIframeWebStorageSupported(this.auth,n=>{n||this.reject(he(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)===null||e===void 0?void 0:e.associatedEvent)||null}cancel(){this.reject(he(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,et.currentPopupAction=null}pollUserCancellation(){const e=()=>{var n,r;if(!((r=(n=this.authWindow)===null||n===void 0?void 0:n.window)===null||r===void 0)&&r.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(he(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,gh.get())};e()}}et.currentPopupAction=null;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const mh="pendingRedirect",on=new Map;class vh extends go{constructor(e,n,r=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],n,void 0,r),this.eventId=null}async execute(){let e=on.get(this.auth._key());if(!e){try{const r=await yh(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(r)}catch(n){e=()=>Promise.reject(n)}on.set(this.auth._key(),e)}return this.bypassAuthState||on.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const n=await this.auth._redirectUserForId(e.eventId);if(n)return this.user=n,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function yh(i,e){const n=wh(e),r=Ih(i);if(!await r._isAvailable())return!1;const o=await r._get(n)==="true";return await r._remove(n),o}function _h(i,e){on.set(i._key(),e)}function Ih(i){return _e(i._redirectPersistence)}function wh(i){return sn(mh,i.config.apiKey,i.name)}async function Eh(i,e,n=!1){if(te(i.app))return Promise.reject(Ie(i));const r=Ke(i),o=uh(r,e),h=await new vh(r,o,n).execute();return h&&!n&&(delete h.user._redirectEventId,await r._persistUserIfCurrent(h.user),await r._setRedirectUser(null,e)),h}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Th=10*60*1e3;class Ah{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let n=!1;return this.consumers.forEach(r=>{this.isEventForConsumer(e,r)&&(n=!0,this.sendToConsumer(e,r),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!Sh(e)||(this.hasHandledPotentialRedirect=!0,n||(this.queuedRedirectEvent=e,n=!0)),n}sendToConsumer(e,n){var r;if(e.error&&!mo(e)){const o=((r=e.error.code)===null||r===void 0?void 0:r.split("auth/")[1])||"internal-error";n.onError(he(this.auth,o))}else n.onAuthEvent(e)}isEventForConsumer(e,n){const r=n.eventId===null||!!e.eventId&&e.eventId===n.eventId;return n.filter.includes(e.type)&&r}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=Th&&this.cachedEventUids.clear(),this.cachedEventUids.has(Xr(e))}saveEventToCache(e){this.cachedEventUids.add(Xr(e)),this.lastProcessedEventTime=Date.now()}}function Xr(i){return[i.type,i.eventId,i.sessionId,i.tenantId].filter(e=>e).join("-")}function mo({type:i,error:e}){return i==="unknown"&&(e==null?void 0:e.code)==="auth/no-auth-event"}function Sh(i){switch(i.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return mo(i);default:return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function bh(i,e={}){return Me(i,"GET","/v1/projects",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Rh=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,Ch=/^https?/;async function kh(i){if(i.config.emulator)return;const{authorizedDomains:e}=await bh(i);for(const n of e)try{if(Ph(n))return}catch{}ae(i,"unauthorized-domain")}function Ph(i){const e=ai(),{protocol:n,hostname:r}=new URL(e);if(i.startsWith("chrome-extension://")){const h=new URL(i);return h.hostname===""&&r===""?n==="chrome-extension:"&&i.replace("chrome-extension://","")===e.replace("chrome-extension://",""):n==="chrome-extension:"&&h.hostname===r}if(!Ch.test(n))return!1;if(Rh.test(i))return r===i;const o=i.replace(/\./g,"\\.");return new RegExp("^(.+\\."+o+"|"+o+")$","i").test(r)}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Oh=new Lt(3e4,6e4);function Yr(){const i=ue().___jsl;if(i!=null&&i.H){for(const e of Object.keys(i.H))if(i.H[e].r=i.H[e].r||[],i.H[e].L=i.H[e].L||[],i.H[e].r=[...i.H[e].L],i.CP)for(let n=0;n<i.CP.length;n++)i.CP[n]=null}}function Dh(i){return new Promise((e,n)=>{var r,o,c;function h(){Yr(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{Yr(),n(he(i,"network-request-failed"))},timeout:Oh.get()})}if(!((o=(r=ue().gapi)===null||r===void 0?void 0:r.iframes)===null||o===void 0)&&o.Iframe)e(gapi.iframes.getContext());else if(!((c=ue().gapi)===null||c===void 0)&&c.load)h();else{const u=Rl("iframefcb");return ue()[u]=()=>{gapi.load?h():n(he(i,"network-request-failed"))},Zs(`${bl()}?onload=${u}`).catch(g=>n(g))}}).catch(e=>{throw an=null,e})}let an=null;function Nh(i){return an=an||Dh(i),an}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Lh=new Lt(5e3,15e3),Mh="__/auth/iframe",Uh="emulator/auth/iframe",Fh={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},xh=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function jh(i){const e=i.config;S(e.authDomain,i,"auth-domain-config-required");const n=e.emulator?vi(e,Uh):`https://${i.config.authDomain}/${Mh}`,r={apiKey:e.apiKey,appName:i.name,v:st},o=xh.get(i.config.apiHost);o&&(r.eid=o);const c=i._getFrameworks();return c.length&&(r.fw=c.join(",")),`${n}?${Nt(r).slice(1)}`}async function Hh(i){const e=await Nh(i),n=ue().gapi;return S(n,i,"internal-error"),e.open({where:document.body,url:jh(i),messageHandlersFilter:n.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:Fh,dontclear:!0},r=>new Promise(async(o,c)=>{await r.restyle({setHideOnLeave:!1});const h=he(i,"network-request-failed"),u=ue().setTimeout(()=>{c(h)},Lh.get());function g(){ue().clearTimeout(u),o(r)}r.ping(g).then(g,()=>{c(h)})}))}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Vh={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},Bh=500,$h=600,zh="_blank",Wh="http://localhost";class Qr{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function Gh(i,e,n,r=Bh,o=$h){const c=Math.max((window.screen.availHeight-o)/2,0).toString(),h=Math.max((window.screen.availWidth-r)/2,0).toString();let u="";const g=Object.assign(Object.assign({},Vh),{width:r.toString(),height:o.toString(),top:c,left:h}),E=q().toLowerCase();n&&(u=Gs(E)?zh:n),zs(E)&&(e=e||Wh,g.scrollbars="yes");const A=Object.entries(g).reduce((R,[N,k])=>`${R}${N}=${k},`,"");if(vl(E)&&u!=="_self")return qh(e||"",u),new Qr(null);const b=window.open(e||"",u,A);S(b,i,"popup-blocked");try{b.focus()}catch{}return new Qr(b)}function qh(i,e){const n=document.createElement("a");n.href=i,n.target=e;const r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),n.dispatchEvent(r)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Kh="__/auth/handler",Jh="emulator/auth/handler",Xh=encodeURIComponent("fac");async function Zr(i,e,n,r,o,c){S(i.config.authDomain,i,"auth-domain-config-required"),S(i.config.apiKey,i,"invalid-api-key");const h={apiKey:i.config.apiKey,appName:i.name,authType:n,redirectUrl:r,v:st,eventId:o};if(e instanceof no){e.setDefaultLanguage(i.languageCode),h.providerId=e.providerId||"",Ga(e.getCustomParameters())||(h.customParameters=JSON.stringify(e.getCustomParameters()));for(const[A,b]of Object.entries({}))h[A]=b}if(e instanceof Ut){const A=e.getScopes().filter(b=>b!=="");A.length>0&&(h.scopes=A.join(","))}i.tenantId&&(h.tid=i.tenantId);const u=h;for(const A of Object.keys(u))u[A]===void 0&&delete u[A];const g=await i._getAppCheckToken(),E=g?`#${Xh}=${encodeURIComponent(g)}`:"";return`${Yh(i)}?${Nt(u).slice(1)}${E}`}function Yh({config:i}){return i.emulator?vi(i,Jh):`https://${i.authDomain}/${Kh}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Zn="webStorageSupport";class Qh{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=lo,this._completeRedirectFn=Eh,this._overrideRedirectResult=_h}async _openPopup(e,n,r,o){var c;Ee((c=this.eventManagers[e._key()])===null||c===void 0?void 0:c.manager,"_initialize() not called before _openPopup()");const h=await Zr(e,n,r,ai(),o);return Gh(e,h,Ei())}async _openRedirect(e,n,r,o){await this._originValidation(e);const c=await Zr(e,n,r,ai(),o);return th(c),new Promise(()=>{})}_initialize(e){const n=e._key();if(this.eventManagers[n]){const{manager:o,promise:c}=this.eventManagers[n];return o?Promise.resolve(o):(Ee(c,"If manager is not set, promise should be"),c)}const r=this.initAndGetManager(e);return this.eventManagers[n]={promise:r},r.catch(()=>{delete this.eventManagers[n]}),r}async initAndGetManager(e){const n=await Hh(e),r=new Ah(e);return n.register("authEvent",o=>(S(o==null?void 0:o.authEvent,e,"invalid-auth-event"),{status:r.onEvent(o.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:r},this.iframes[e._key()]=n,r}_isIframeWebStorageSupported(e,n){this.iframes[e._key()].send(Zn,{type:Zn},o=>{var c;const h=(c=o==null?void 0:o[0])===null||c===void 0?void 0:c[Zn];h!==void 0&&n(!!h),ae(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const n=e._key();return this.originValidationPromises[n]||(this.originValidationPromises[n]=kh(e)),this.originValidationPromises[n]}get _shouldInitProactively(){return Ys()||Ws()||_i()}}const Zh=Qh;var es="@firebase/auth",ts="1.9.1";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eu{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)===null||e===void 0?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const n=this.auth.onIdTokenChanged(r=>{e((r==null?void 0:r.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,n),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const n=this.internalListeners.get(e);n&&(this.internalListeners.delete(e),n(),this.updateProactiveRefresh())}assertAuthConfigured(){S(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function tu(i){switch(i){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function nu(i){de(new oe("auth",(e,{options:n})=>{const r=e.getProvider("app").getImmediate(),o=e.getProvider("heartbeat"),c=e.getProvider("app-check-internal"),{apiKey:h,authDomain:u}=r.options;S(h&&!h.includes(":"),"invalid-api-key",{appName:r.name});const g={apiKey:h,authDomain:u,clientPlatform:i,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:Qs(i)},E=new Tl(r,o,c,g);return Nl(E,n),E},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,n,r)=>{e.getProvider("auth-internal").initialize()})),de(new oe("auth-internal",e=>{const n=Ke(e.getProvider("auth").getImmediate());return(r=>new eu(r))(n)},"PRIVATE").setInstantiationMode("EXPLICIT")),se(es,ts,tu(i)),se(es,ts,"esm2017")}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const iu=5*60,ru=ks("authIdTokenMaxAge")||iu;let ns=null;const su=i=>async e=>{const n=e&&await e.getIdTokenResult(),r=n&&(new Date().getTime()-Date.parse(n.issuedAtTime))/1e3;if(r&&r>ru)return;const o=n==null?void 0:n.token;ns!==o&&(ns=o,await fetch(i,{method:o?"POST":"DELETE",headers:o?{Authorization:`Bearer ${o}`}:{}}))};function Kd(i=gi()){const e=qe(i,"auth");if(e.isInitialized())return e.getImmediate();const n=Dl(i,{popupRedirectResolver:Zh,persistence:[hh,Ql,lo]}),r=ks("authTokenSyncURL");if(r&&typeof isSecureContext=="boolean"&&isSecureContext){const c=new URL(r,location.origin);if(location.origin===c.origin){const h=su(c.toString());Jl(n,h,()=>h(n.currentUser)),Kl(n,u=>h(u))}}const o=Rs("auth");return o&&Ll(n,`http://${o}`),n}function ou(){var i,e;return(e=(i=document.getElementsByTagName("head"))===null||i===void 0?void 0:i[0])!==null&&e!==void 0?e:document}Al({loadJS(i){return new Promise((e,n)=>{const r=document.createElement("script");r.setAttribute("src",i),r.onload=e,r.onerror=o=>{const c=he("internal-error");c.customData=o,n(c)},r.type="text/javascript",r.charset="UTF-8",ou().appendChild(r)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});nu("Browser");const vo="@firebase/installations",Ai="0.6.13";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const yo=1e4,_o=`w:${Ai}`,Io="FIS_v2",au="https://firebaseinstallations.googleapis.com/v1",cu=60*60*1e3,lu="installations",hu="Installations";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const uu={"missing-app-config-values":'Missing App configuration value: "{$valueName}"',"not-registered":"Firebase Installation is not registered.","installation-not-found":"Firebase Installation not found.","request-failed":'{$requestName} request failed with error "{$serverCode} {$serverStatus}: {$serverMessage}"',"app-offline":"Could not process request. Application offline.","delete-pending-registration":"Can't delete installation while there is a pending registration request."},ze=new Ge(lu,hu,uu);function wo(i){return i instanceof ce&&i.code.includes("request-failed")}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Eo({projectId:i}){return`${au}/projects/${i}/installations`}function To(i){return{token:i.token,requestStatus:2,expiresIn:fu(i.expiresIn),creationTime:Date.now()}}async function Ao(i,e){const r=(await e.json()).error;return ze.create("request-failed",{requestName:i,serverCode:r.code,serverMessage:r.message,serverStatus:r.status})}function So({apiKey:i}){return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":i})}function du(i,{refreshToken:e}){const n=So(i);return n.append("Authorization",pu(e)),n}async function bo(i){const e=await i();return e.status>=500&&e.status<600?i():e}function fu(i){return Number(i.replace("s","000"))}function pu(i){return`${Io} ${i}`}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function gu({appConfig:i,heartbeatServiceProvider:e},{fid:n}){const r=Eo(i),o=So(i),c=e.getImmediate({optional:!0});if(c){const E=await c.getHeartbeatsHeader();E&&o.append("x-firebase-client",E)}const h={fid:n,authVersion:Io,appId:i.appId,sdkVersion:_o},u={method:"POST",headers:o,body:JSON.stringify(h)},g=await bo(()=>fetch(r,u));if(g.ok){const E=await g.json();return{fid:E.fid||n,registrationStatus:2,refreshToken:E.refreshToken,authToken:To(E.authToken)}}else throw await Ao("Create Installation",g)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ro(i){return new Promise(e=>{setTimeout(e,i)})}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function mu(i){return btoa(String.fromCharCode(...i)).replace(/\+/g,"-").replace(/\//g,"_")}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const vu=/^[cdef][\w-]{21}$/,ui="";function yu(){try{const i=new Uint8Array(17);(self.crypto||self.msCrypto).getRandomValues(i),i[0]=112+i[0]%16;const n=_u(i);return vu.test(n)?n:ui}catch{return ui}}function _u(i){return mu(i).substr(0,22)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function En(i){return`${i.appName}!${i.appId}`}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Co=new Map;function ko(i,e){const n=En(i);Po(n,e),Iu(n,e)}function Po(i,e){const n=Co.get(i);if(n)for(const r of n)r(e)}function Iu(i,e){const n=wu();n&&n.postMessage({key:i,fid:e}),Eu()}let Ve=null;function wu(){return!Ve&&"BroadcastChannel"in self&&(Ve=new BroadcastChannel("[Firebase] FID Change"),Ve.onmessage=i=>{Po(i.data.key,i.data.fid)}),Ve}function Eu(){Co.size===0&&Ve&&(Ve.close(),Ve=null)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Tu="firebase-installations-database",Au=1,We="firebase-installations-store";let ei=null;function Si(){return ei||(ei=Ts(Tu,Au,{upgrade:(i,e)=>{switch(e){case 0:i.createObjectStore(We)}}})),ei}async function gn(i,e){const n=En(i),o=(await Si()).transaction(We,"readwrite"),c=o.objectStore(We),h=await c.get(n);return await c.put(e,n),await o.done,(!h||h.fid!==e.fid)&&ko(i,e.fid),e}async function Oo(i){const e=En(i),r=(await Si()).transaction(We,"readwrite");await r.objectStore(We).delete(e),await r.done}async function Tn(i,e){const n=En(i),o=(await Si()).transaction(We,"readwrite"),c=o.objectStore(We),h=await c.get(n),u=e(h);return u===void 0?await c.delete(n):await c.put(u,n),await o.done,u&&(!h||h.fid!==u.fid)&&ko(i,u.fid),u}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function bi(i){let e;const n=await Tn(i.appConfig,r=>{const o=Su(r),c=bu(i,o);return e=c.registrationPromise,c.installationEntry});return n.fid===ui?{installationEntry:await e}:{installationEntry:n,registrationPromise:e}}function Su(i){const e=i||{fid:yu(),registrationStatus:0};return Do(e)}function bu(i,e){if(e.registrationStatus===0){if(!navigator.onLine){const o=Promise.reject(ze.create("app-offline"));return{installationEntry:e,registrationPromise:o}}const n={fid:e.fid,registrationStatus:1,registrationTime:Date.now()},r=Ru(i,n);return{installationEntry:n,registrationPromise:r}}else return e.registrationStatus===1?{installationEntry:e,registrationPromise:Cu(i)}:{installationEntry:e}}async function Ru(i,e){try{const n=await gu(i,e);return gn(i.appConfig,n)}catch(n){throw wo(n)&&n.customData.serverCode===409?await Oo(i.appConfig):await gn(i.appConfig,{fid:e.fid,registrationStatus:0}),n}}async function Cu(i){let e=await is(i.appConfig);for(;e.registrationStatus===1;)await Ro(100),e=await is(i.appConfig);if(e.registrationStatus===0){const{installationEntry:n,registrationPromise:r}=await bi(i);return r||n}return e}function is(i){return Tn(i,e=>{if(!e)throw ze.create("installation-not-found");return Do(e)})}function Do(i){return ku(i)?{fid:i.fid,registrationStatus:0}:i}function ku(i){return i.registrationStatus===1&&i.registrationTime+yo<Date.now()}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Pu({appConfig:i,heartbeatServiceProvider:e},n){const r=Ou(i,n),o=du(i,n),c=e.getImmediate({optional:!0});if(c){const E=await c.getHeartbeatsHeader();E&&o.append("x-firebase-client",E)}const h={installation:{sdkVersion:_o,appId:i.appId}},u={method:"POST",headers:o,body:JSON.stringify(h)},g=await bo(()=>fetch(r,u));if(g.ok){const E=await g.json();return To(E)}else throw await Ao("Generate Auth Token",g)}function Ou(i,{fid:e}){return`${Eo(i)}/${e}/authTokens:generate`}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ri(i,e=!1){let n;const r=await Tn(i.appConfig,c=>{if(!No(c))throw ze.create("not-registered");const h=c.authToken;if(!e&&Lu(h))return c;if(h.requestStatus===1)return n=Du(i,e),c;{if(!navigator.onLine)throw ze.create("app-offline");const u=Uu(c);return n=Nu(i,u),u}});return n?await n:r.authToken}async function Du(i,e){let n=await rs(i.appConfig);for(;n.authToken.requestStatus===1;)await Ro(100),n=await rs(i.appConfig);const r=n.authToken;return r.requestStatus===0?Ri(i,e):r}function rs(i){return Tn(i,e=>{if(!No(e))throw ze.create("not-registered");const n=e.authToken;return Fu(n)?Object.assign(Object.assign({},e),{authToken:{requestStatus:0}}):e})}async function Nu(i,e){try{const n=await Pu(i,e),r=Object.assign(Object.assign({},e),{authToken:n});return await gn(i.appConfig,r),n}catch(n){if(wo(n)&&(n.customData.serverCode===401||n.customData.serverCode===404))await Oo(i.appConfig);else{const r=Object.assign(Object.assign({},e),{authToken:{requestStatus:0}});await gn(i.appConfig,r)}throw n}}function No(i){return i!==void 0&&i.registrationStatus===2}function Lu(i){return i.requestStatus===2&&!Mu(i)}function Mu(i){const e=Date.now();return e<i.creationTime||i.creationTime+i.expiresIn<e+cu}function Uu(i){const e={requestStatus:1,requestTime:Date.now()};return Object.assign(Object.assign({},i),{authToken:e})}function Fu(i){return i.requestStatus===1&&i.requestTime+yo<Date.now()}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function xu(i){const e=i,{installationEntry:n,registrationPromise:r}=await bi(e);return r?r.catch(console.error):Ri(e).catch(console.error),n.fid}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ju(i,e=!1){const n=i;return await Hu(n),(await Ri(n,e)).token}async function Hu(i){const{registrationPromise:e}=await bi(i);e&&await e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Vu(i){if(!i||!i.options)throw ti("App Configuration");if(!i.name)throw ti("App Name");const e=["projectId","apiKey","appId"];for(const n of e)if(!i.options[n])throw ti(n);return{appName:i.name,projectId:i.options.projectId,apiKey:i.options.apiKey,appId:i.options.appId}}function ti(i){return ze.create("missing-app-config-values",{valueName:i})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Lo="installations",Bu="installations-internal",$u=i=>{const e=i.getProvider("app").getImmediate(),n=Vu(e),r=qe(e,"heartbeat");return{app:e,appConfig:n,heartbeatServiceProvider:r,_delete:()=>Promise.resolve()}},zu=i=>{const e=i.getProvider("app").getImmediate(),n=qe(e,Lo).getImmediate();return{getId:()=>xu(n),getToken:o=>ju(n,o)}};function Wu(){de(new oe(Lo,$u,"PUBLIC")),de(new oe(Bu,zu,"PRIVATE"))}Wu();se(vo,Ai);se(vo,Ai,"esm2017");/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const mn="analytics",Gu="firebase_id",qu="origin",Ku=60*1e3,Ju="https://firebase.googleapis.com/v1alpha/projects/-/apps/{app-id}/webConfig",Ci="https://www.googletagmanager.com/gtag/js";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Y=new yn("@firebase/analytics");/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Xu={"already-exists":"A Firebase Analytics instance with the appId {$id}  already exists. Only one Firebase Analytics instance can be created for each appId.","already-initialized":"initializeAnalytics() cannot be called again with different options than those it was initially called with. It can be called again with the same options to return the existing instance, or getAnalytics() can be used to get a reference to the already-initialized instance.","already-initialized-settings":"Firebase Analytics has already been initialized.settings() must be called before initializing any Analytics instanceor it will have no effect.","interop-component-reg-failed":"Firebase Analytics Interop Component failed to instantiate: {$reason}","invalid-analytics-context":"Firebase Analytics is not supported in this environment. Wrap initialization of analytics in analytics.isSupported() to prevent initialization in unsupported environments. Details: {$errorInfo}","indexeddb-unavailable":"IndexedDB unavailable or restricted in this environment. Wrap initialization of analytics in analytics.isSupported() to prevent initialization in unsupported environments. Details: {$errorInfo}","fetch-throttle":"The config fetch request timed out while in an exponential backoff state. Unix timestamp in milliseconds when fetch request throttling ends: {$throttleEndTimeMillis}.","config-fetch-failed":"Dynamic config fetch failed: [{$httpStatus}] {$responseMessage}","no-api-key":'The "apiKey" field is empty in the local Firebase config. Firebase Analytics requires this field tocontain a valid API key.',"no-app-id":'The "appId" field is empty in the local Firebase config. Firebase Analytics requires this field tocontain a valid app ID.',"no-client-id":'The "client_id" field is empty.',"invalid-gtag-resource":"Trusted Types detected an invalid gtag resource: {$gtagURL}."},Z=new Ge("analytics","Analytics",Xu);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Yu(i){if(!i.startsWith(Ci)){const e=Z.create("invalid-gtag-resource",{gtagURL:i});return Y.warn(e.message),""}return i}function Mo(i){return Promise.all(i.map(e=>e.catch(n=>n)))}function Qu(i,e){let n;return window.trustedTypes&&(n=window.trustedTypes.createPolicy(i,e)),n}function Zu(i,e){const n=Qu("firebase-js-sdk-policy",{createScriptURL:Yu}),r=document.createElement("script"),o=`${Ci}?l=${i}&id=${e}`;r.src=n?n==null?void 0:n.createScriptURL(o):o,r.async=!0,document.head.appendChild(r)}function ed(i){let e=[];return Array.isArray(window[i])?e=window[i]:window[i]=e,e}async function td(i,e,n,r,o,c){const h=r[o];try{if(h)await e[h];else{const g=(await Mo(n)).find(E=>E.measurementId===o);g&&await e[g.appId]}}catch(u){Y.error(u)}i("config",o,c)}async function nd(i,e,n,r,o){try{let c=[];if(o&&o.send_to){let h=o.send_to;Array.isArray(h)||(h=[h]);const u=await Mo(n);for(const g of h){const E=u.find(b=>b.measurementId===g),A=E&&e[E.appId];if(A)c.push(A);else{c=[];break}}}c.length===0&&(c=Object.values(e)),await Promise.all(c),i("event",r,o||{})}catch(c){Y.error(c)}}function id(i,e,n,r){async function o(c,...h){try{if(c==="event"){const[u,g]=h;await nd(i,e,n,u,g)}else if(c==="config"){const[u,g]=h;await td(i,e,n,r,u,g)}else if(c==="consent"){const[u,g]=h;i("consent",u,g)}else if(c==="get"){const[u,g,E]=h;i("get",u,g,E)}else if(c==="set"){const[u]=h;i("set",u)}else i(c,...h)}catch(u){Y.error(u)}}return o}function rd(i,e,n,r,o){let c=function(...h){window[r].push(arguments)};return window[o]&&typeof window[o]=="function"&&(c=window[o]),window[o]=id(c,i,e,n),{gtagCore:c,wrappedGtag:window[o]}}function sd(i){const e=window.document.getElementsByTagName("script");for(const n of Object.values(e))if(n.src&&n.src.includes(Ci)&&n.src.includes(i))return n;return null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const od=30,ad=1e3;class cd{constructor(e={},n=ad){this.throttleMetadata=e,this.intervalMillis=n}getThrottleMetadata(e){return this.throttleMetadata[e]}setThrottleMetadata(e,n){this.throttleMetadata[e]=n}deleteThrottleMetadata(e){delete this.throttleMetadata[e]}}const Uo=new cd;function ld(i){return new Headers({Accept:"application/json","x-goog-api-key":i})}async function hd(i){var e;const{appId:n,apiKey:r}=i,o={method:"GET",headers:ld(r)},c=Ju.replace("{app-id}",n),h=await fetch(c,o);if(h.status!==200&&h.status!==304){let u="";try{const g=await h.json();!((e=g.error)===null||e===void 0)&&e.message&&(u=g.error.message)}catch{}throw Z.create("config-fetch-failed",{httpStatus:h.status,responseMessage:u})}return h.json()}async function ud(i,e=Uo,n){const{appId:r,apiKey:o,measurementId:c}=i.options;if(!r)throw Z.create("no-app-id");if(!o){if(c)return{measurementId:c,appId:r};throw Z.create("no-api-key")}const h=e.getThrottleMetadata(r)||{backoffCount:0,throttleEndTimeMillis:Date.now()},u=new pd;return setTimeout(async()=>{u.abort()},Ku),Fo({appId:r,apiKey:o,measurementId:c},h,u,e)}async function Fo(i,{throttleEndTimeMillis:e,backoffCount:n},r,o=Uo){var c;const{appId:h,measurementId:u}=i;try{await dd(r,e)}catch(g){if(u)return Y.warn(`Timed out fetching this Firebase app's measurement ID from the server. Falling back to the measurement ID ${u} provided in the "measurementId" field in the local Firebase config. [${g==null?void 0:g.message}]`),{appId:h,measurementId:u};throw g}try{const g=await hd(i);return o.deleteThrottleMetadata(h),g}catch(g){const E=g;if(!fd(E)){if(o.deleteThrottleMetadata(h),u)return Y.warn(`Failed to fetch this Firebase app's measurement ID from the server. Falling back to the measurement ID ${u} provided in the "measurementId" field in the local Firebase config. [${E==null?void 0:E.message}]`),{appId:h,measurementId:u};throw g}const A=Number((c=E==null?void 0:E.customData)===null||c===void 0?void 0:c.httpStatus)===503?Dr(n,o.intervalMillis,od):Dr(n,o.intervalMillis),b={throttleEndTimeMillis:Date.now()+A,backoffCount:n+1};return o.setThrottleMetadata(h,b),Y.debug(`Calling attemptFetch again in ${A} millis`),Fo(i,b,r,o)}}function dd(i,e){return new Promise((n,r)=>{const o=Math.max(e-Date.now(),0),c=setTimeout(n,o);i.addEventListener(()=>{clearTimeout(c),r(Z.create("fetch-throttle",{throttleEndTimeMillis:e}))})})}function fd(i){if(!(i instanceof ce)||!i.customData)return!1;const e=Number(i.customData.httpStatus);return e===429||e===500||e===503||e===504}class pd{constructor(){this.listeners=[]}addEventListener(e){this.listeners.push(e)}abort(){this.listeners.forEach(e=>e())}}async function gd(i,e,n,r,o){if(o&&o.global){i("event",n,r);return}else{const c=await e,h=Object.assign(Object.assign({},r),{send_to:c});i("event",n,h)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function md(){if(Os())try{await Ds()}catch(i){return Y.warn(Z.create("indexeddb-unavailable",{errorInfo:i==null?void 0:i.toString()}).message),!1}else return Y.warn(Z.create("indexeddb-unavailable",{errorInfo:"IndexedDB is not available in this environment."}).message),!1;return!0}async function vd(i,e,n,r,o,c,h){var u;const g=ud(i);g.then(N=>{n[N.measurementId]=N.appId,i.options.measurementId&&N.measurementId!==i.options.measurementId&&Y.warn(`The measurement ID in the local Firebase config (${i.options.measurementId}) does not match the measurement ID fetched from the server (${N.measurementId}). To ensure analytics events are always sent to the correct Analytics property, update the measurement ID field in the local config or remove it from the local config.`)}).catch(N=>Y.error(N)),e.push(g);const E=md().then(N=>{if(N)return r.getId()}),[A,b]=await Promise.all([g,E]);sd(c)||Zu(c,A.measurementId),o("js",new Date);const R=(u=h==null?void 0:h.config)!==null&&u!==void 0?u:{};return R[qu]="firebase",R.update=!0,b!=null&&(R[Gu]=b),o("config",A.measurementId,R),A.measurementId}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yd{constructor(e){this.app=e}_delete(){return delete Rt[this.app.options.appId],Promise.resolve()}}let Rt={},ss=[];const os={};let ni="dataLayer",_d="gtag",as,xo,cs=!1;function Id(){const i=[];if(Ps()&&i.push("This is a browser extension environment."),Ba()||i.push("Cookies are not available."),i.length>0){const e=i.map((r,o)=>`(${o+1}) ${r}`).join(" "),n=Z.create("invalid-analytics-context",{errorInfo:e});Y.warn(n.message)}}function wd(i,e,n){Id();const r=i.options.appId;if(!r)throw Z.create("no-app-id");if(!i.options.apiKey)if(i.options.measurementId)Y.warn(`The "apiKey" field is empty in the local Firebase config. This is needed to fetch the latest measurement ID for this Firebase app. Falling back to the measurement ID ${i.options.measurementId} provided in the "measurementId" field in the local Firebase config.`);else throw Z.create("no-api-key");if(Rt[r]!=null)throw Z.create("already-exists",{id:r});if(!cs){ed(ni);const{wrappedGtag:c,gtagCore:h}=rd(Rt,ss,os,ni,_d);xo=c,as=h,cs=!0}return Rt[r]=vd(i,ss,os,e,as,ni,n),new yd(i)}function Jd(i=gi()){i=le(i);const e=qe(i,mn);return e.isInitialized()?e.getImmediate():Ed(i)}function Ed(i,e={}){const n=qe(i,mn);if(n.isInitialized()){const o=n.getImmediate();if(Ne(e,n.getOptions()))return o;throw Z.create("already-initialized")}return n.initialize({options:e})}function Td(i,e,n,r){i=le(i),gd(xo,Rt[i.app.options.appId],e,n,r).catch(o=>Y.error(o))}const ls="@firebase/analytics",hs="0.10.12";function Ad(){de(new oe(mn,(e,{options:n})=>{const r=e.getProvider("app").getImmediate(),o=e.getProvider("installations-internal").getImmediate();return wd(r,o,n)},"PUBLIC")),de(new oe("analytics-internal",i,"PRIVATE")),se(ls,hs),se(ls,hs,"esm2017");function i(e){try{const n=e.getProvider(mn).getImmediate();return{logEvent:(r,o,c)=>Td(n,r,o,c)}}catch(n){throw Z.create("interop-component-reg-failed",{reason:n})}}}Ad();var us=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var jo;(function(){var i;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function e(y,d){function p(){}p.prototype=d.prototype,y.D=d.prototype,y.prototype=new p,y.prototype.constructor=y,y.C=function(m,v,I){for(var f=Array(arguments.length-2),pe=2;pe<arguments.length;pe++)f[pe-2]=arguments[pe];return d.prototype[v].apply(m,f)}}function n(){this.blockSize=-1}function r(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.B=Array(this.blockSize),this.o=this.h=0,this.s()}e(r,n),r.prototype.s=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function o(y,d,p){p||(p=0);var m=Array(16);if(typeof d=="string")for(var v=0;16>v;++v)m[v]=d.charCodeAt(p++)|d.charCodeAt(p++)<<8|d.charCodeAt(p++)<<16|d.charCodeAt(p++)<<24;else for(v=0;16>v;++v)m[v]=d[p++]|d[p++]<<8|d[p++]<<16|d[p++]<<24;d=y.g[0],p=y.g[1],v=y.g[2];var I=y.g[3],f=d+(I^p&(v^I))+m[0]+3614090360&4294967295;d=p+(f<<7&4294967295|f>>>25),f=I+(v^d&(p^v))+m[1]+3905402710&4294967295,I=d+(f<<12&4294967295|f>>>20),f=v+(p^I&(d^p))+m[2]+606105819&4294967295,v=I+(f<<17&4294967295|f>>>15),f=p+(d^v&(I^d))+m[3]+3250441966&4294967295,p=v+(f<<22&4294967295|f>>>10),f=d+(I^p&(v^I))+m[4]+4118548399&4294967295,d=p+(f<<7&4294967295|f>>>25),f=I+(v^d&(p^v))+m[5]+1200080426&4294967295,I=d+(f<<12&4294967295|f>>>20),f=v+(p^I&(d^p))+m[6]+2821735955&4294967295,v=I+(f<<17&4294967295|f>>>15),f=p+(d^v&(I^d))+m[7]+4249261313&4294967295,p=v+(f<<22&4294967295|f>>>10),f=d+(I^p&(v^I))+m[8]+1770035416&4294967295,d=p+(f<<7&4294967295|f>>>25),f=I+(v^d&(p^v))+m[9]+2336552879&4294967295,I=d+(f<<12&4294967295|f>>>20),f=v+(p^I&(d^p))+m[10]+4294925233&4294967295,v=I+(f<<17&4294967295|f>>>15),f=p+(d^v&(I^d))+m[11]+2304563134&4294967295,p=v+(f<<22&4294967295|f>>>10),f=d+(I^p&(v^I))+m[12]+1804603682&4294967295,d=p+(f<<7&4294967295|f>>>25),f=I+(v^d&(p^v))+m[13]+4254626195&4294967295,I=d+(f<<12&4294967295|f>>>20),f=v+(p^I&(d^p))+m[14]+2792965006&4294967295,v=I+(f<<17&4294967295|f>>>15),f=p+(d^v&(I^d))+m[15]+1236535329&4294967295,p=v+(f<<22&4294967295|f>>>10),f=d+(v^I&(p^v))+m[1]+4129170786&4294967295,d=p+(f<<5&4294967295|f>>>27),f=I+(p^v&(d^p))+m[6]+3225465664&4294967295,I=d+(f<<9&4294967295|f>>>23),f=v+(d^p&(I^d))+m[11]+643717713&4294967295,v=I+(f<<14&4294967295|f>>>18),f=p+(I^d&(v^I))+m[0]+3921069994&4294967295,p=v+(f<<20&4294967295|f>>>12),f=d+(v^I&(p^v))+m[5]+3593408605&4294967295,d=p+(f<<5&4294967295|f>>>27),f=I+(p^v&(d^p))+m[10]+38016083&4294967295,I=d+(f<<9&4294967295|f>>>23),f=v+(d^p&(I^d))+m[15]+3634488961&4294967295,v=I+(f<<14&4294967295|f>>>18),f=p+(I^d&(v^I))+m[4]+3889429448&4294967295,p=v+(f<<20&4294967295|f>>>12),f=d+(v^I&(p^v))+m[9]+568446438&4294967295,d=p+(f<<5&4294967295|f>>>27),f=I+(p^v&(d^p))+m[14]+3275163606&4294967295,I=d+(f<<9&4294967295|f>>>23),f=v+(d^p&(I^d))+m[3]+4107603335&4294967295,v=I+(f<<14&4294967295|f>>>18),f=p+(I^d&(v^I))+m[8]+1163531501&4294967295,p=v+(f<<20&4294967295|f>>>12),f=d+(v^I&(p^v))+m[13]+2850285829&4294967295,d=p+(f<<5&4294967295|f>>>27),f=I+(p^v&(d^p))+m[2]+4243563512&4294967295,I=d+(f<<9&4294967295|f>>>23),f=v+(d^p&(I^d))+m[7]+1735328473&4294967295,v=I+(f<<14&4294967295|f>>>18),f=p+(I^d&(v^I))+m[12]+2368359562&4294967295,p=v+(f<<20&4294967295|f>>>12),f=d+(p^v^I)+m[5]+4294588738&4294967295,d=p+(f<<4&4294967295|f>>>28),f=I+(d^p^v)+m[8]+2272392833&4294967295,I=d+(f<<11&4294967295|f>>>21),f=v+(I^d^p)+m[11]+1839030562&4294967295,v=I+(f<<16&4294967295|f>>>16),f=p+(v^I^d)+m[14]+4259657740&4294967295,p=v+(f<<23&4294967295|f>>>9),f=d+(p^v^I)+m[1]+2763975236&4294967295,d=p+(f<<4&4294967295|f>>>28),f=I+(d^p^v)+m[4]+1272893353&4294967295,I=d+(f<<11&4294967295|f>>>21),f=v+(I^d^p)+m[7]+4139469664&4294967295,v=I+(f<<16&4294967295|f>>>16),f=p+(v^I^d)+m[10]+3200236656&4294967295,p=v+(f<<23&4294967295|f>>>9),f=d+(p^v^I)+m[13]+681279174&4294967295,d=p+(f<<4&4294967295|f>>>28),f=I+(d^p^v)+m[0]+3936430074&4294967295,I=d+(f<<11&4294967295|f>>>21),f=v+(I^d^p)+m[3]+3572445317&4294967295,v=I+(f<<16&4294967295|f>>>16),f=p+(v^I^d)+m[6]+76029189&4294967295,p=v+(f<<23&4294967295|f>>>9),f=d+(p^v^I)+m[9]+3654602809&4294967295,d=p+(f<<4&4294967295|f>>>28),f=I+(d^p^v)+m[12]+3873151461&4294967295,I=d+(f<<11&4294967295|f>>>21),f=v+(I^d^p)+m[15]+530742520&4294967295,v=I+(f<<16&4294967295|f>>>16),f=p+(v^I^d)+m[2]+3299628645&4294967295,p=v+(f<<23&4294967295|f>>>9),f=d+(v^(p|~I))+m[0]+4096336452&4294967295,d=p+(f<<6&4294967295|f>>>26),f=I+(p^(d|~v))+m[7]+1126891415&4294967295,I=d+(f<<10&4294967295|f>>>22),f=v+(d^(I|~p))+m[14]+2878612391&4294967295,v=I+(f<<15&4294967295|f>>>17),f=p+(I^(v|~d))+m[5]+4237533241&4294967295,p=v+(f<<21&4294967295|f>>>11),f=d+(v^(p|~I))+m[12]+1700485571&4294967295,d=p+(f<<6&4294967295|f>>>26),f=I+(p^(d|~v))+m[3]+2399980690&4294967295,I=d+(f<<10&4294967295|f>>>22),f=v+(d^(I|~p))+m[10]+4293915773&4294967295,v=I+(f<<15&4294967295|f>>>17),f=p+(I^(v|~d))+m[1]+2240044497&4294967295,p=v+(f<<21&4294967295|f>>>11),f=d+(v^(p|~I))+m[8]+1873313359&4294967295,d=p+(f<<6&4294967295|f>>>26),f=I+(p^(d|~v))+m[15]+4264355552&4294967295,I=d+(f<<10&4294967295|f>>>22),f=v+(d^(I|~p))+m[6]+2734768916&4294967295,v=I+(f<<15&4294967295|f>>>17),f=p+(I^(v|~d))+m[13]+1309151649&4294967295,p=v+(f<<21&4294967295|f>>>11),f=d+(v^(p|~I))+m[4]+4149444226&4294967295,d=p+(f<<6&4294967295|f>>>26),f=I+(p^(d|~v))+m[11]+3174756917&4294967295,I=d+(f<<10&4294967295|f>>>22),f=v+(d^(I|~p))+m[2]+718787259&4294967295,v=I+(f<<15&4294967295|f>>>17),f=p+(I^(v|~d))+m[9]+3951481745&4294967295,y.g[0]=y.g[0]+d&4294967295,y.g[1]=y.g[1]+(v+(f<<21&4294967295|f>>>11))&4294967295,y.g[2]=y.g[2]+v&4294967295,y.g[3]=y.g[3]+I&4294967295}r.prototype.u=function(y,d){d===void 0&&(d=y.length);for(var p=d-this.blockSize,m=this.B,v=this.h,I=0;I<d;){if(v==0)for(;I<=p;)o(this,y,I),I+=this.blockSize;if(typeof y=="string"){for(;I<d;)if(m[v++]=y.charCodeAt(I++),v==this.blockSize){o(this,m),v=0;break}}else for(;I<d;)if(m[v++]=y[I++],v==this.blockSize){o(this,m),v=0;break}}this.h=v,this.o+=d},r.prototype.v=function(){var y=Array((56>this.h?this.blockSize:2*this.blockSize)-this.h);y[0]=128;for(var d=1;d<y.length-8;++d)y[d]=0;var p=8*this.o;for(d=y.length-8;d<y.length;++d)y[d]=p&255,p/=256;for(this.u(y),y=Array(16),d=p=0;4>d;++d)for(var m=0;32>m;m+=8)y[p++]=this.g[d]>>>m&255;return y};function c(y,d){var p=u;return Object.prototype.hasOwnProperty.call(p,y)?p[y]:p[y]=d(y)}function h(y,d){this.h=d;for(var p=[],m=!0,v=y.length-1;0<=v;v--){var I=y[v]|0;m&&I==d||(p[v]=I,m=!1)}this.g=p}var u={};function g(y){return-128<=y&&128>y?c(y,function(d){return new h([d|0],0>d?-1:0)}):new h([y|0],0>y?-1:0)}function E(y){if(isNaN(y)||!isFinite(y))return b;if(0>y)return M(E(-y));for(var d=[],p=1,m=0;y>=p;m++)d[m]=y/p|0,p*=4294967296;return new h(d,0)}function A(y,d){if(y.length==0)throw Error("number format error: empty string");if(d=d||10,2>d||36<d)throw Error("radix out of range: "+d);if(y.charAt(0)=="-")return M(A(y.substring(1),d));if(0<=y.indexOf("-"))throw Error('number format error: interior "-" character');for(var p=E(Math.pow(d,8)),m=b,v=0;v<y.length;v+=8){var I=Math.min(8,y.length-v),f=parseInt(y.substring(v,v+I),d);8>I?(I=E(Math.pow(d,I)),m=m.j(I).add(E(f))):(m=m.j(p),m=m.add(E(f)))}return m}var b=g(0),R=g(1),N=g(16777216);i=h.prototype,i.m=function(){if(F(this))return-M(this).m();for(var y=0,d=1,p=0;p<this.g.length;p++){var m=this.i(p);y+=(0<=m?m:4294967296+m)*d,d*=4294967296}return y},i.toString=function(y){if(y=y||10,2>y||36<y)throw Error("radix out of range: "+y);if(k(this))return"0";if(F(this))return"-"+M(this).toString(y);for(var d=E(Math.pow(y,6)),p=this,m="";;){var v=ne(p,d).g;p=fe(p,v.j(d));var I=((0<p.g.length?p.g[0]:p.h)>>>0).toString(y);if(p=v,k(p))return I+m;for(;6>I.length;)I="0"+I;m=I+m}},i.i=function(y){return 0>y?0:y<this.g.length?this.g[y]:this.h};function k(y){if(y.h!=0)return!1;for(var d=0;d<y.g.length;d++)if(y.g[d]!=0)return!1;return!0}function F(y){return y.h==-1}i.l=function(y){return y=fe(this,y),F(y)?-1:k(y)?0:1};function M(y){for(var d=y.g.length,p=[],m=0;m<d;m++)p[m]=~y.g[m];return new h(p,~y.h).add(R)}i.abs=function(){return F(this)?M(this):this},i.add=function(y){for(var d=Math.max(this.g.length,y.g.length),p=[],m=0,v=0;v<=d;v++){var I=m+(this.i(v)&65535)+(y.i(v)&65535),f=(I>>>16)+(this.i(v)>>>16)+(y.i(v)>>>16);m=f>>>16,I&=65535,f&=65535,p[v]=f<<16|I}return new h(p,p[p.length-1]&-2147483648?-1:0)};function fe(y,d){return y.add(M(d))}i.j=function(y){if(k(this)||k(y))return b;if(F(this))return F(y)?M(this).j(M(y)):M(M(this).j(y));if(F(y))return M(this.j(M(y)));if(0>this.l(N)&&0>y.l(N))return E(this.m()*y.m());for(var d=this.g.length+y.g.length,p=[],m=0;m<2*d;m++)p[m]=0;for(m=0;m<this.g.length;m++)for(var v=0;v<y.g.length;v++){var I=this.i(m)>>>16,f=this.i(m)&65535,pe=y.i(v)>>>16,at=y.i(v)&65535;p[2*m+2*v]+=f*at,Q(p,2*m+2*v),p[2*m+2*v+1]+=I*at,Q(p,2*m+2*v+1),p[2*m+2*v+1]+=f*pe,Q(p,2*m+2*v+1),p[2*m+2*v+2]+=I*pe,Q(p,2*m+2*v+2)}for(m=0;m<d;m++)p[m]=p[2*m+1]<<16|p[2*m];for(m=d;m<2*d;m++)p[m]=0;return new h(p,0)};function Q(y,d){for(;(y[d]&65535)!=y[d];)y[d+1]+=y[d]>>>16,y[d]&=65535,d++}function j(y,d){this.g=y,this.h=d}function ne(y,d){if(k(d))throw Error("division by zero");if(k(y))return new j(b,b);if(F(y))return d=ne(M(y),d),new j(M(d.g),M(d.h));if(F(d))return d=ne(y,M(d)),new j(M(d.g),d.h);if(30<y.g.length){if(F(y)||F(d))throw Error("slowDivide_ only works with positive integers.");for(var p=R,m=d;0>=m.l(y);)p=Ue(p),m=Ue(m);var v=K(p,1),I=K(m,1);for(m=K(m,2),p=K(p,2);!k(m);){var f=I.add(m);0>=f.l(y)&&(v=v.add(p),I=f),m=K(m,1),p=K(p,1)}return d=fe(y,v.j(d)),new j(v,d)}for(v=b;0<=y.l(d);){for(p=Math.max(1,Math.floor(y.m()/d.m())),m=Math.ceil(Math.log(p)/Math.LN2),m=48>=m?1:Math.pow(2,m-48),I=E(p),f=I.j(d);F(f)||0<f.l(y);)p-=m,I=E(p),f=I.j(d);k(I)&&(I=R),v=v.add(I),y=fe(y,f)}return new j(v,y)}i.A=function(y){return ne(this,y).h},i.and=function(y){for(var d=Math.max(this.g.length,y.g.length),p=[],m=0;m<d;m++)p[m]=this.i(m)&y.i(m);return new h(p,this.h&y.h)},i.or=function(y){for(var d=Math.max(this.g.length,y.g.length),p=[],m=0;m<d;m++)p[m]=this.i(m)|y.i(m);return new h(p,this.h|y.h)},i.xor=function(y){for(var d=Math.max(this.g.length,y.g.length),p=[],m=0;m<d;m++)p[m]=this.i(m)^y.i(m);return new h(p,this.h^y.h)};function Ue(y){for(var d=y.g.length+1,p=[],m=0;m<d;m++)p[m]=y.i(m)<<1|y.i(m-1)>>>31;return new h(p,y.h)}function K(y,d){var p=d>>5;d%=32;for(var m=y.g.length-p,v=[],I=0;I<m;I++)v[I]=0<d?y.i(I+p)>>>d|y.i(I+p+1)<<32-d:y.i(I+p);return new h(v,y.h)}r.prototype.digest=r.prototype.v,r.prototype.reset=r.prototype.s,r.prototype.update=r.prototype.u,h.prototype.add=h.prototype.add,h.prototype.multiply=h.prototype.j,h.prototype.modulo=h.prototype.A,h.prototype.compare=h.prototype.l,h.prototype.toNumber=h.prototype.m,h.prototype.toString=h.prototype.toString,h.prototype.getBits=h.prototype.i,h.fromNumber=E,h.fromString=A,jo=h}).apply(typeof us<"u"?us:typeof self<"u"?self:typeof window<"u"?window:{});var nn=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};(function(){var i,e=typeof Object.defineProperties=="function"?Object.defineProperty:function(t,s,a){return t==Array.prototype||t==Object.prototype||(t[s]=a.value),t};function n(t){t=[typeof globalThis=="object"&&globalThis,t,typeof window=="object"&&window,typeof self=="object"&&self,typeof nn=="object"&&nn];for(var s=0;s<t.length;++s){var a=t[s];if(a&&a.Math==Math)return a}throw Error("Cannot find global object")}var r=n(this);function o(t,s){if(s)e:{var a=r;t=t.split(".");for(var l=0;l<t.length-1;l++){var _=t[l];if(!(_ in a))break e;a=a[_]}t=t[t.length-1],l=a[t],s=s(l),s!=l&&s!=null&&e(a,t,{configurable:!0,writable:!0,value:s})}}function c(t,s){t instanceof String&&(t+="");var a=0,l=!1,_={next:function(){if(!l&&a<t.length){var w=a++;return{value:s(w,t[w]),done:!1}}return l=!0,{done:!0,value:void 0}}};return _[Symbol.iterator]=function(){return _},_}o("Array.prototype.values",function(t){return t||function(){return c(this,function(s,a){return a})}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var h=h||{},u=this||self;function g(t){var s=typeof t;return s=s!="object"?s:t?Array.isArray(t)?"array":s:"null",s=="array"||s=="object"&&typeof t.length=="number"}function E(t){var s=typeof t;return s=="object"&&t!=null||s=="function"}function A(t,s,a){return t.call.apply(t.bind,arguments)}function b(t,s,a){if(!t)throw Error();if(2<arguments.length){var l=Array.prototype.slice.call(arguments,2);return function(){var _=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(_,l),t.apply(s,_)}}return function(){return t.apply(s,arguments)}}function R(t,s,a){return R=Function.prototype.bind&&Function.prototype.bind.toString().indexOf("native code")!=-1?A:b,R.apply(null,arguments)}function N(t,s){var a=Array.prototype.slice.call(arguments,1);return function(){var l=a.slice();return l.push.apply(l,arguments),t.apply(this,l)}}function k(t,s){function a(){}a.prototype=s.prototype,t.aa=s.prototype,t.prototype=new a,t.prototype.constructor=t,t.Qb=function(l,_,w){for(var T=Array(arguments.length-2),D=2;D<arguments.length;D++)T[D-2]=arguments[D];return s.prototype[_].apply(l,T)}}function F(t){const s=t.length;if(0<s){const a=Array(s);for(let l=0;l<s;l++)a[l]=t[l];return a}return[]}function M(t,s){for(let a=1;a<arguments.length;a++){const l=arguments[a];if(g(l)){const _=t.length||0,w=l.length||0;t.length=_+w;for(let T=0;T<w;T++)t[_+T]=l[T]}else t.push(l)}}class fe{constructor(s,a){this.i=s,this.j=a,this.h=0,this.g=null}get(){let s;return 0<this.h?(this.h--,s=this.g,this.g=s.next,s.next=null):s=this.i(),s}}function Q(t){return/^[\s\xa0]*$/.test(t)}function j(){var t=u.navigator;return t&&(t=t.userAgent)?t:""}function ne(t){return ne[" "](t),t}ne[" "]=function(){};var Ue=j().indexOf("Gecko")!=-1&&!(j().toLowerCase().indexOf("webkit")!=-1&&j().indexOf("Edge")==-1)&&!(j().indexOf("Trident")!=-1||j().indexOf("MSIE")!=-1)&&j().indexOf("Edge")==-1;function K(t,s,a){for(const l in t)s.call(a,t[l],l,t)}function y(t,s){for(const a in t)s.call(void 0,t[a],a,t)}function d(t){const s={};for(const a in t)s[a]=t[a];return s}const p="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function m(t,s){let a,l;for(let _=1;_<arguments.length;_++){l=arguments[_];for(a in l)t[a]=l[a];for(let w=0;w<p.length;w++)a=p[w],Object.prototype.hasOwnProperty.call(l,a)&&(t[a]=l[a])}}function v(t){var s=1;t=t.split(":");const a=[];for(;0<s&&t.length;)a.push(t.shift()),s--;return t.length&&a.push(t.join(":")),a}function I(t){u.setTimeout(()=>{throw t},0)}function f(){var t=An;let s=null;return t.g&&(s=t.g,t.g=t.g.next,t.g||(t.h=null),s.next=null),s}class pe{constructor(){this.h=this.g=null}add(s,a){const l=at.get();l.set(s,a),this.h?this.h.next=l:this.g=l,this.h=l}}var at=new fe(()=>new zo,t=>t.reset());class zo{constructor(){this.next=this.g=this.h=null}set(s,a){this.h=s,this.g=a,this.next=null}reset(){this.next=this.g=this.h=null}}let ct,lt=!1,An=new pe,Di=()=>{const t=u.Promise.resolve(void 0);ct=()=>{t.then(Wo)}};var Wo=()=>{for(var t;t=f();){try{t.h.call(t.g)}catch(a){I(a)}var s=at;s.j(t),100>s.h&&(s.h++,t.next=s.g,s.g=t)}lt=!1};function Te(){this.s=this.s,this.C=this.C}Te.prototype.s=!1,Te.prototype.ma=function(){this.s||(this.s=!0,this.N())},Te.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function H(t,s){this.type=t,this.g=this.target=s,this.defaultPrevented=!1}H.prototype.h=function(){this.defaultPrevented=!0};var Go=function(){if(!u.addEventListener||!Object.defineProperty)return!1;var t=!1,s=Object.defineProperty({},"passive",{get:function(){t=!0}});try{const a=()=>{};u.addEventListener("test",a,s),u.removeEventListener("test",a,s)}catch{}return t}();function ht(t,s){if(H.call(this,t?t.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,t){var a=this.type=t.type,l=t.changedTouches&&t.changedTouches.length?t.changedTouches[0]:null;if(this.target=t.target||t.srcElement,this.g=s,s=t.relatedTarget){if(Ue){e:{try{ne(s.nodeName);var _=!0;break e}catch{}_=!1}_||(s=null)}}else a=="mouseover"?s=t.fromElement:a=="mouseout"&&(s=t.toElement);this.relatedTarget=s,l?(this.clientX=l.clientX!==void 0?l.clientX:l.pageX,this.clientY=l.clientY!==void 0?l.clientY:l.pageY,this.screenX=l.screenX||0,this.screenY=l.screenY||0):(this.clientX=t.clientX!==void 0?t.clientX:t.pageX,this.clientY=t.clientY!==void 0?t.clientY:t.pageY,this.screenX=t.screenX||0,this.screenY=t.screenY||0),this.button=t.button,this.key=t.key||"",this.ctrlKey=t.ctrlKey,this.altKey=t.altKey,this.shiftKey=t.shiftKey,this.metaKey=t.metaKey,this.pointerId=t.pointerId||0,this.pointerType=typeof t.pointerType=="string"?t.pointerType:qo[t.pointerType]||"",this.state=t.state,this.i=t,t.defaultPrevented&&ht.aa.h.call(this)}}k(ht,H);var qo={2:"touch",3:"pen",4:"mouse"};ht.prototype.h=function(){ht.aa.h.call(this);var t=this.i;t.preventDefault?t.preventDefault():t.returnValue=!1};var jt="closure_listenable_"+(1e6*Math.random()|0),Ko=0;function Jo(t,s,a,l,_){this.listener=t,this.proxy=null,this.src=s,this.type=a,this.capture=!!l,this.ha=_,this.key=++Ko,this.da=this.fa=!1}function Ht(t){t.da=!0,t.listener=null,t.proxy=null,t.src=null,t.ha=null}function Vt(t){this.src=t,this.g={},this.h=0}Vt.prototype.add=function(t,s,a,l,_){var w=t.toString();t=this.g[w],t||(t=this.g[w]=[],this.h++);var T=bn(t,s,l,_);return-1<T?(s=t[T],a||(s.fa=!1)):(s=new Jo(s,this.src,w,!!l,_),s.fa=a,t.push(s)),s};function Sn(t,s){var a=s.type;if(a in t.g){var l=t.g[a],_=Array.prototype.indexOf.call(l,s,void 0),w;(w=0<=_)&&Array.prototype.splice.call(l,_,1),w&&(Ht(s),t.g[a].length==0&&(delete t.g[a],t.h--))}}function bn(t,s,a,l){for(var _=0;_<t.length;++_){var w=t[_];if(!w.da&&w.listener==s&&w.capture==!!a&&w.ha==l)return _}return-1}var Rn="closure_lm_"+(1e6*Math.random()|0),Cn={};function Ni(t,s,a,l,_){if(Array.isArray(s)){for(var w=0;w<s.length;w++)Ni(t,s[w],a,l,_);return null}return a=Ui(a),t&&t[jt]?t.K(s,a,E(l)?!!l.capture:!1,_):Xo(t,s,a,!1,l,_)}function Xo(t,s,a,l,_,w){if(!s)throw Error("Invalid event type");var T=E(_)?!!_.capture:!!_,D=Pn(t);if(D||(t[Rn]=D=new Vt(t)),a=D.add(s,a,l,T,w),a.proxy)return a;if(l=Yo(),a.proxy=l,l.src=t,l.listener=a,t.addEventListener)Go||(_=T),_===void 0&&(_=!1),t.addEventListener(s.toString(),l,_);else if(t.attachEvent)t.attachEvent(Mi(s.toString()),l);else if(t.addListener&&t.removeListener)t.addListener(l);else throw Error("addEventListener and attachEvent are unavailable.");return a}function Yo(){function t(a){return s.call(t.src,t.listener,a)}const s=Qo;return t}function Li(t,s,a,l,_){if(Array.isArray(s))for(var w=0;w<s.length;w++)Li(t,s[w],a,l,_);else l=E(l)?!!l.capture:!!l,a=Ui(a),t&&t[jt]?(t=t.i,s=String(s).toString(),s in t.g&&(w=t.g[s],a=bn(w,a,l,_),-1<a&&(Ht(w[a]),Array.prototype.splice.call(w,a,1),w.length==0&&(delete t.g[s],t.h--)))):t&&(t=Pn(t))&&(s=t.g[s.toString()],t=-1,s&&(t=bn(s,a,l,_)),(a=-1<t?s[t]:null)&&kn(a))}function kn(t){if(typeof t!="number"&&t&&!t.da){var s=t.src;if(s&&s[jt])Sn(s.i,t);else{var a=t.type,l=t.proxy;s.removeEventListener?s.removeEventListener(a,l,t.capture):s.detachEvent?s.detachEvent(Mi(a),l):s.addListener&&s.removeListener&&s.removeListener(l),(a=Pn(s))?(Sn(a,t),a.h==0&&(a.src=null,s[Rn]=null)):Ht(t)}}}function Mi(t){return t in Cn?Cn[t]:Cn[t]="on"+t}function Qo(t,s){if(t.da)t=!0;else{s=new ht(s,this);var a=t.listener,l=t.ha||t.src;t.fa&&kn(t),t=a.call(l,s)}return t}function Pn(t){return t=t[Rn],t instanceof Vt?t:null}var On="__closure_events_fn_"+(1e9*Math.random()>>>0);function Ui(t){return typeof t=="function"?t:(t[On]||(t[On]=function(s){return t.handleEvent(s)}),t[On])}function V(){Te.call(this),this.i=new Vt(this),this.M=this,this.F=null}k(V,Te),V.prototype[jt]=!0,V.prototype.removeEventListener=function(t,s,a,l){Li(this,t,s,a,l)};function z(t,s){var a,l=t.F;if(l)for(a=[];l;l=l.F)a.push(l);if(t=t.M,l=s.type||s,typeof s=="string")s=new H(s,t);else if(s instanceof H)s.target=s.target||t;else{var _=s;s=new H(l,t),m(s,_)}if(_=!0,a)for(var w=a.length-1;0<=w;w--){var T=s.g=a[w];_=Bt(T,l,!0,s)&&_}if(T=s.g=t,_=Bt(T,l,!0,s)&&_,_=Bt(T,l,!1,s)&&_,a)for(w=0;w<a.length;w++)T=s.g=a[w],_=Bt(T,l,!1,s)&&_}V.prototype.N=function(){if(V.aa.N.call(this),this.i){var t=this.i,s;for(s in t.g){for(var a=t.g[s],l=0;l<a.length;l++)Ht(a[l]);delete t.g[s],t.h--}}this.F=null},V.prototype.K=function(t,s,a,l){return this.i.add(String(t),s,!1,a,l)},V.prototype.L=function(t,s,a,l){return this.i.add(String(t),s,!0,a,l)};function Bt(t,s,a,l){if(s=t.i.g[String(s)],!s)return!0;s=s.concat();for(var _=!0,w=0;w<s.length;++w){var T=s[w];if(T&&!T.da&&T.capture==a){var D=T.listener,x=T.ha||T.src;T.fa&&Sn(t.i,T),_=D.call(x,l)!==!1&&_}}return _&&!l.defaultPrevented}function Fi(t,s,a){if(typeof t=="function")a&&(t=R(t,a));else if(t&&typeof t.handleEvent=="function")t=R(t.handleEvent,t);else throw Error("Invalid listener argument");return 2147483647<Number(s)?-1:u.setTimeout(t,s||0)}function xi(t){t.g=Fi(()=>{t.g=null,t.i&&(t.i=!1,xi(t))},t.l);const s=t.h;t.h=null,t.m.apply(null,s)}class Zo extends Te{constructor(s,a){super(),this.m=s,this.l=a,this.h=null,this.i=!1,this.g=null}j(s){this.h=arguments,this.g?this.i=!0:xi(this)}N(){super.N(),this.g&&(u.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function ut(t){Te.call(this),this.h=t,this.g={}}k(ut,Te);var ji=[];function Hi(t){K(t.g,function(s,a){this.g.hasOwnProperty(a)&&kn(s)},t),t.g={}}ut.prototype.N=function(){ut.aa.N.call(this),Hi(this)},ut.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var Dn=u.JSON.stringify,ea=u.JSON.parse,ta=class{stringify(t){return u.JSON.stringify(t,void 0)}parse(t){return u.JSON.parse(t,void 0)}};function Nn(){}Nn.prototype.h=null;function Vi(t){return t.h||(t.h=t.i())}function na(){}var dt={OPEN:"a",kb:"b",Ja:"c",wb:"d"};function Ln(){H.call(this,"d")}k(Ln,H);function Mn(){H.call(this,"c")}k(Mn,H);var Je={},Bi=null;function Un(){return Bi=Bi||new V}Je.La="serverreachability";function $i(t){H.call(this,Je.La,t)}k($i,H);function ft(t){const s=Un();z(s,new $i(s))}Je.STAT_EVENT="statevent";function zi(t,s){H.call(this,Je.STAT_EVENT,t),this.stat=s}k(zi,H);function W(t){const s=Un();z(s,new zi(s,t))}Je.Ma="timingevent";function Wi(t,s){H.call(this,Je.Ma,t),this.size=s}k(Wi,H);function pt(t,s){if(typeof t!="function")throw Error("Fn must not be null and must be a function");return u.setTimeout(function(){t()},s)}function gt(){this.g=!0}gt.prototype.xa=function(){this.g=!1};function ia(t,s,a,l,_,w){t.info(function(){if(t.g)if(w)for(var T="",D=w.split("&"),x=0;x<D.length;x++){var P=D[x].split("=");if(1<P.length){var B=P[0];P=P[1];var $=B.split("_");T=2<=$.length&&$[1]=="type"?T+(B+"="+P+"&"):T+(B+"=redacted&")}}else T=null;else T=w;return"XMLHTTP REQ ("+l+") [attempt "+_+"]: "+s+`
`+a+`
`+T})}function ra(t,s,a,l,_,w,T){t.info(function(){return"XMLHTTP RESP ("+l+") [ attempt "+_+"]: "+s+`
`+a+`
`+w+" "+T})}function Xe(t,s,a,l){t.info(function(){return"XMLHTTP TEXT ("+s+"): "+oa(t,a)+(l?" "+l:"")})}function sa(t,s){t.info(function(){return"TIMEOUT: "+s})}gt.prototype.info=function(){};function oa(t,s){if(!t.g)return s;if(!s)return null;try{var a=JSON.parse(s);if(a){for(t=0;t<a.length;t++)if(Array.isArray(a[t])){var l=a[t];if(!(2>l.length)){var _=l[1];if(Array.isArray(_)&&!(1>_.length)){var w=_[0];if(w!="noop"&&w!="stop"&&w!="close")for(var T=1;T<_.length;T++)_[T]=""}}}}return Dn(a)}catch{return s}}var Fn={NO_ERROR:0,TIMEOUT:8},aa={},xn;function $t(){}k($t,Nn),$t.prototype.g=function(){return new XMLHttpRequest},$t.prototype.i=function(){return{}},xn=new $t;function Ae(t,s,a,l){this.j=t,this.i=s,this.l=a,this.R=l||1,this.U=new ut(this),this.I=45e3,this.H=null,this.o=!1,this.m=this.A=this.v=this.L=this.F=this.S=this.B=null,this.D=[],this.g=null,this.C=0,this.s=this.u=null,this.X=-1,this.J=!1,this.O=0,this.M=null,this.W=this.K=this.T=this.P=!1,this.h=new Gi}function Gi(){this.i=null,this.g="",this.h=!1}var qi={},jn={};function Hn(t,s,a){t.L=1,t.v=qt(ge(s)),t.m=a,t.P=!0,Ki(t,null)}function Ki(t,s){t.F=Date.now(),zt(t),t.A=ge(t.v);var a=t.A,l=t.R;Array.isArray(l)||(l=[String(l)]),cr(a.i,"t",l),t.C=0,a=t.j.J,t.h=new Gi,t.g=br(t.j,a?s:null,!t.m),0<t.O&&(t.M=new Zo(R(t.Y,t,t.g),t.O)),s=t.U,a=t.g,l=t.ca;var _="readystatechange";Array.isArray(_)||(_&&(ji[0]=_.toString()),_=ji);for(var w=0;w<_.length;w++){var T=Ni(a,_[w],l||s.handleEvent,!1,s.h||s);if(!T)break;s.g[T.key]=T}s=t.H?d(t.H):{},t.m?(t.u||(t.u="POST"),s["Content-Type"]="application/x-www-form-urlencoded",t.g.ea(t.A,t.u,t.m,s)):(t.u="GET",t.g.ea(t.A,t.u,null,s)),ft(),ia(t.i,t.u,t.A,t.l,t.R,t.m)}Ae.prototype.ca=function(t){t=t.target;const s=this.M;s&&me(t)==3?s.j():this.Y(t)},Ae.prototype.Y=function(t){try{if(t==this.g)e:{const $=me(this.g);var s=this.g.Ba();const Ze=this.g.Z();if(!(3>$)&&($!=3||this.g&&(this.h.h||this.g.oa()||gr(this.g)))){this.J||$!=4||s==7||(s==8||0>=Ze?ft(3):ft(2)),Vn(this);var a=this.g.Z();this.X=a;t:if(Ji(this)){var l=gr(this.g);t="";var _=l.length,w=me(this.g)==4;if(!this.h.i){if(typeof TextDecoder>"u"){Fe(this),mt(this);var T="";break t}this.h.i=new u.TextDecoder}for(s=0;s<_;s++)this.h.h=!0,t+=this.h.i.decode(l[s],{stream:!(w&&s==_-1)});l.length=0,this.h.g+=t,this.C=0,T=this.h.g}else T=this.g.oa();if(this.o=a==200,ra(this.i,this.u,this.A,this.l,this.R,$,a),this.o){if(this.T&&!this.K){t:{if(this.g){var D,x=this.g;if((D=x.g?x.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!Q(D)){var P=D;break t}}P=null}if(a=P)Xe(this.i,this.l,a,"Initial handshake response via X-HTTP-Initial-Response"),this.K=!0,Bn(this,a);else{this.o=!1,this.s=3,W(12),Fe(this),mt(this);break e}}if(this.P){a=!0;let ie;for(;!this.J&&this.C<T.length;)if(ie=ca(this,T),ie==jn){$==4&&(this.s=4,W(14),a=!1),Xe(this.i,this.l,null,"[Incomplete Response]");break}else if(ie==qi){this.s=4,W(15),Xe(this.i,this.l,T,"[Invalid Chunk]"),a=!1;break}else Xe(this.i,this.l,ie,null),Bn(this,ie);if(Ji(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),$!=4||T.length!=0||this.h.h||(this.s=1,W(16),a=!1),this.o=this.o&&a,!a)Xe(this.i,this.l,T,"[Invalid Chunked Response]"),Fe(this),mt(this);else if(0<T.length&&!this.W){this.W=!0;var B=this.j;B.g==this&&B.ba&&!B.M&&(B.j.info("Great, no buffering proxy detected. Bytes received: "+T.length),Kn(B),B.M=!0,W(11))}}else Xe(this.i,this.l,T,null),Bn(this,T);$==4&&Fe(this),this.o&&!this.J&&($==4?Er(this.j,this):(this.o=!1,zt(this)))}else Sa(this.g),a==400&&0<T.indexOf("Unknown SID")?(this.s=3,W(12)):(this.s=0,W(13)),Fe(this),mt(this)}}}catch{}finally{}};function Ji(t){return t.g?t.u=="GET"&&t.L!=2&&t.j.Ca:!1}function ca(t,s){var a=t.C,l=s.indexOf(`
`,a);return l==-1?jn:(a=Number(s.substring(a,l)),isNaN(a)?qi:(l+=1,l+a>s.length?jn:(s=s.slice(l,l+a),t.C=l+a,s)))}Ae.prototype.cancel=function(){this.J=!0,Fe(this)};function zt(t){t.S=Date.now()+t.I,Xi(t,t.I)}function Xi(t,s){if(t.B!=null)throw Error("WatchDog timer not null");t.B=pt(R(t.ba,t),s)}function Vn(t){t.B&&(u.clearTimeout(t.B),t.B=null)}Ae.prototype.ba=function(){this.B=null;const t=Date.now();0<=t-this.S?(sa(this.i,this.A),this.L!=2&&(ft(),W(17)),Fe(this),this.s=2,mt(this)):Xi(this,this.S-t)};function mt(t){t.j.G==0||t.J||Er(t.j,t)}function Fe(t){Vn(t);var s=t.M;s&&typeof s.ma=="function"&&s.ma(),t.M=null,Hi(t.U),t.g&&(s=t.g,t.g=null,s.abort(),s.ma())}function Bn(t,s){try{var a=t.j;if(a.G!=0&&(a.g==t||$n(a.h,t))){if(!t.K&&$n(a.h,t)&&a.G==3){try{var l=a.Da.g.parse(s)}catch{l=null}if(Array.isArray(l)&&l.length==3){var _=l;if(_[0]==0){e:if(!a.u){if(a.g)if(a.g.F+3e3<t.F)Zt(a),Yt(a);else break e;qn(a),W(18)}}else a.za=_[1],0<a.za-a.T&&37500>_[2]&&a.F&&a.v==0&&!a.C&&(a.C=pt(R(a.Za,a),6e3));if(1>=Zi(a.h)&&a.ca){try{a.ca()}catch{}a.ca=void 0}}else je(a,11)}else if((t.K||a.g==t)&&Zt(a),!Q(s))for(_=a.Da.g.parse(s),s=0;s<_.length;s++){let P=_[s];if(a.T=P[0],P=P[1],a.G==2)if(P[0]=="c"){a.K=P[1],a.ia=P[2];const B=P[3];B!=null&&(a.la=B,a.j.info("VER="+a.la));const $=P[4];$!=null&&(a.Aa=$,a.j.info("SVER="+a.Aa));const Ze=P[5];Ze!=null&&typeof Ze=="number"&&0<Ze&&(l=1.5*Ze,a.L=l,a.j.info("backChannelRequestTimeoutMs_="+l)),l=a;const ie=t.g;if(ie){const en=ie.g?ie.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(en){var w=l.h;w.g||en.indexOf("spdy")==-1&&en.indexOf("quic")==-1&&en.indexOf("h2")==-1||(w.j=w.l,w.g=new Set,w.h&&(zn(w,w.h),w.h=null))}if(l.D){const Jn=ie.g?ie.g.getResponseHeader("X-HTTP-Session-Id"):null;Jn&&(l.ya=Jn,L(l.I,l.D,Jn))}}a.G=3,a.l&&a.l.ua(),a.ba&&(a.R=Date.now()-t.F,a.j.info("Handshake RTT: "+a.R+"ms")),l=a;var T=t;if(l.qa=Sr(l,l.J?l.ia:null,l.W),T.K){er(l.h,T);var D=T,x=l.L;x&&(D.I=x),D.B&&(Vn(D),zt(D)),l.g=T}else Ir(l);0<a.i.length&&Qt(a)}else P[0]!="stop"&&P[0]!="close"||je(a,7);else a.G==3&&(P[0]=="stop"||P[0]=="close"?P[0]=="stop"?je(a,7):Gn(a):P[0]!="noop"&&a.l&&a.l.ta(P),a.v=0)}}ft(4)}catch{}}var la=class{constructor(t,s){this.g=t,this.map=s}};function Yi(t){this.l=t||10,u.PerformanceNavigationTiming?(t=u.performance.getEntriesByType("navigation"),t=0<t.length&&(t[0].nextHopProtocol=="hq"||t[0].nextHopProtocol=="h2")):t=!!(u.chrome&&u.chrome.loadTimes&&u.chrome.loadTimes()&&u.chrome.loadTimes().wasFetchedViaSpdy),this.j=t?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}function Qi(t){return t.h?!0:t.g?t.g.size>=t.j:!1}function Zi(t){return t.h?1:t.g?t.g.size:0}function $n(t,s){return t.h?t.h==s:t.g?t.g.has(s):!1}function zn(t,s){t.g?t.g.add(s):t.h=s}function er(t,s){t.h&&t.h==s?t.h=null:t.g&&t.g.has(s)&&t.g.delete(s)}Yi.prototype.cancel=function(){if(this.i=tr(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const t of this.g.values())t.cancel();this.g.clear()}};function tr(t){if(t.h!=null)return t.i.concat(t.h.D);if(t.g!=null&&t.g.size!==0){let s=t.i;for(const a of t.g.values())s=s.concat(a.D);return s}return F(t.i)}function ha(t){if(t.V&&typeof t.V=="function")return t.V();if(typeof Map<"u"&&t instanceof Map||typeof Set<"u"&&t instanceof Set)return Array.from(t.values());if(typeof t=="string")return t.split("");if(g(t)){for(var s=[],a=t.length,l=0;l<a;l++)s.push(t[l]);return s}s=[],a=0;for(l in t)s[a++]=t[l];return s}function ua(t){if(t.na&&typeof t.na=="function")return t.na();if(!t.V||typeof t.V!="function"){if(typeof Map<"u"&&t instanceof Map)return Array.from(t.keys());if(!(typeof Set<"u"&&t instanceof Set)){if(g(t)||typeof t=="string"){var s=[];t=t.length;for(var a=0;a<t;a++)s.push(a);return s}s=[],a=0;for(const l in t)s[a++]=l;return s}}}function nr(t,s){if(t.forEach&&typeof t.forEach=="function")t.forEach(s,void 0);else if(g(t)||typeof t=="string")Array.prototype.forEach.call(t,s,void 0);else for(var a=ua(t),l=ha(t),_=l.length,w=0;w<_;w++)s.call(void 0,l[w],a&&a[w],t)}var ir=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function da(t,s){if(t){t=t.split("&");for(var a=0;a<t.length;a++){var l=t[a].indexOf("="),_=null;if(0<=l){var w=t[a].substring(0,l);_=t[a].substring(l+1)}else w=t[a];s(w,_?decodeURIComponent(_.replace(/\+/g," ")):"")}}}function xe(t){if(this.g=this.o=this.j="",this.s=null,this.m=this.l="",this.h=!1,t instanceof xe){this.h=t.h,Wt(this,t.j),this.o=t.o,this.g=t.g,Gt(this,t.s),this.l=t.l;var s=t.i,a=new _t;a.i=s.i,s.g&&(a.g=new Map(s.g),a.h=s.h),rr(this,a),this.m=t.m}else t&&(s=String(t).match(ir))?(this.h=!1,Wt(this,s[1]||"",!0),this.o=vt(s[2]||""),this.g=vt(s[3]||"",!0),Gt(this,s[4]),this.l=vt(s[5]||"",!0),rr(this,s[6]||"",!0),this.m=vt(s[7]||"")):(this.h=!1,this.i=new _t(null,this.h))}xe.prototype.toString=function(){var t=[],s=this.j;s&&t.push(yt(s,sr,!0),":");var a=this.g;return(a||s=="file")&&(t.push("//"),(s=this.o)&&t.push(yt(s,sr,!0),"@"),t.push(encodeURIComponent(String(a)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),a=this.s,a!=null&&t.push(":",String(a))),(a=this.l)&&(this.g&&a.charAt(0)!="/"&&t.push("/"),t.push(yt(a,a.charAt(0)=="/"?ga:pa,!0))),(a=this.i.toString())&&t.push("?",a),(a=this.m)&&t.push("#",yt(a,va)),t.join("")};function ge(t){return new xe(t)}function Wt(t,s,a){t.j=a?vt(s,!0):s,t.j&&(t.j=t.j.replace(/:$/,""))}function Gt(t,s){if(s){if(s=Number(s),isNaN(s)||0>s)throw Error("Bad port number "+s);t.s=s}else t.s=null}function rr(t,s,a){s instanceof _t?(t.i=s,ya(t.i,t.h)):(a||(s=yt(s,ma)),t.i=new _t(s,t.h))}function L(t,s,a){t.i.set(s,a)}function qt(t){return L(t,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),t}function vt(t,s){return t?s?decodeURI(t.replace(/%25/g,"%2525")):decodeURIComponent(t):""}function yt(t,s,a){return typeof t=="string"?(t=encodeURI(t).replace(s,fa),a&&(t=t.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),t):null}function fa(t){return t=t.charCodeAt(0),"%"+(t>>4&15).toString(16)+(t&15).toString(16)}var sr=/[#\/\?@]/g,pa=/[#\?:]/g,ga=/[#\?]/g,ma=/[#\?@]/g,va=/#/g;function _t(t,s){this.h=this.g=null,this.i=t||null,this.j=!!s}function Se(t){t.g||(t.g=new Map,t.h=0,t.i&&da(t.i,function(s,a){t.add(decodeURIComponent(s.replace(/\+/g," ")),a)}))}i=_t.prototype,i.add=function(t,s){Se(this),this.i=null,t=Ye(this,t);var a=this.g.get(t);return a||this.g.set(t,a=[]),a.push(s),this.h+=1,this};function or(t,s){Se(t),s=Ye(t,s),t.g.has(s)&&(t.i=null,t.h-=t.g.get(s).length,t.g.delete(s))}function ar(t,s){return Se(t),s=Ye(t,s),t.g.has(s)}i.forEach=function(t,s){Se(this),this.g.forEach(function(a,l){a.forEach(function(_){t.call(s,_,l,this)},this)},this)},i.na=function(){Se(this);const t=Array.from(this.g.values()),s=Array.from(this.g.keys()),a=[];for(let l=0;l<s.length;l++){const _=t[l];for(let w=0;w<_.length;w++)a.push(s[l])}return a},i.V=function(t){Se(this);let s=[];if(typeof t=="string")ar(this,t)&&(s=s.concat(this.g.get(Ye(this,t))));else{t=Array.from(this.g.values());for(let a=0;a<t.length;a++)s=s.concat(t[a])}return s},i.set=function(t,s){return Se(this),this.i=null,t=Ye(this,t),ar(this,t)&&(this.h-=this.g.get(t).length),this.g.set(t,[s]),this.h+=1,this},i.get=function(t,s){return t?(t=this.V(t),0<t.length?String(t[0]):s):s};function cr(t,s,a){or(t,s),0<a.length&&(t.i=null,t.g.set(Ye(t,s),F(a)),t.h+=a.length)}i.toString=function(){if(this.i)return this.i;if(!this.g)return"";const t=[],s=Array.from(this.g.keys());for(var a=0;a<s.length;a++){var l=s[a];const w=encodeURIComponent(String(l)),T=this.V(l);for(l=0;l<T.length;l++){var _=w;T[l]!==""&&(_+="="+encodeURIComponent(String(T[l]))),t.push(_)}}return this.i=t.join("&")};function Ye(t,s){return s=String(s),t.j&&(s=s.toLowerCase()),s}function ya(t,s){s&&!t.j&&(Se(t),t.i=null,t.g.forEach(function(a,l){var _=l.toLowerCase();l!=_&&(or(this,l),cr(this,_,a))},t)),t.j=s}function _a(t,s){const a=new gt;if(u.Image){const l=new Image;l.onload=N(be,a,"TestLoadImage: loaded",!0,s,l),l.onerror=N(be,a,"TestLoadImage: error",!1,s,l),l.onabort=N(be,a,"TestLoadImage: abort",!1,s,l),l.ontimeout=N(be,a,"TestLoadImage: timeout",!1,s,l),u.setTimeout(function(){l.ontimeout&&l.ontimeout()},1e4),l.src=t}else s(!1)}function Ia(t,s){const a=new gt,l=new AbortController,_=setTimeout(()=>{l.abort(),be(a,"TestPingServer: timeout",!1,s)},1e4);fetch(t,{signal:l.signal}).then(w=>{clearTimeout(_),w.ok?be(a,"TestPingServer: ok",!0,s):be(a,"TestPingServer: server error",!1,s)}).catch(()=>{clearTimeout(_),be(a,"TestPingServer: error",!1,s)})}function be(t,s,a,l,_){try{_&&(_.onload=null,_.onerror=null,_.onabort=null,_.ontimeout=null),l(a)}catch{}}function wa(){this.g=new ta}function Ea(t,s,a){const l=a||"";try{nr(t,function(_,w){let T=_;E(_)&&(T=Dn(_)),s.push(l+w+"="+encodeURIComponent(T))})}catch(_){throw s.push(l+"type="+encodeURIComponent("_badmap")),_}}function Kt(t){this.l=t.Ub||null,this.j=t.eb||!1}k(Kt,Nn),Kt.prototype.g=function(){return new Jt(this.l,this.j)},Kt.prototype.i=function(t){return function(){return t}}({});function Jt(t,s){V.call(this),this.D=t,this.o=s,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.u=new Headers,this.h=null,this.B="GET",this.A="",this.g=!1,this.v=this.j=this.l=null}k(Jt,V),i=Jt.prototype,i.open=function(t,s){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.B=t,this.A=s,this.readyState=1,wt(this)},i.send=function(t){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");this.g=!0;const s={headers:this.u,method:this.B,credentials:this.m,cache:void 0};t&&(s.body=t),(this.D||u).fetch(new Request(this.A,s)).then(this.Sa.bind(this),this.ga.bind(this))},i.abort=function(){this.response=this.responseText="",this.u=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),1<=this.readyState&&this.g&&this.readyState!=4&&(this.g=!1,It(this)),this.readyState=0},i.Sa=function(t){if(this.g&&(this.l=t,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=t.headers,this.readyState=2,wt(this)),this.g&&(this.readyState=3,wt(this),this.g)))if(this.responseType==="arraybuffer")t.arrayBuffer().then(this.Qa.bind(this),this.ga.bind(this));else if(typeof u.ReadableStream<"u"&&"body"in t){if(this.j=t.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.v=new TextDecoder;lr(this)}else t.text().then(this.Ra.bind(this),this.ga.bind(this))};function lr(t){t.j.read().then(t.Pa.bind(t)).catch(t.ga.bind(t))}i.Pa=function(t){if(this.g){if(this.o&&t.value)this.response.push(t.value);else if(!this.o){var s=t.value?t.value:new Uint8Array(0);(s=this.v.decode(s,{stream:!t.done}))&&(this.response=this.responseText+=s)}t.done?It(this):wt(this),this.readyState==3&&lr(this)}},i.Ra=function(t){this.g&&(this.response=this.responseText=t,It(this))},i.Qa=function(t){this.g&&(this.response=t,It(this))},i.ga=function(){this.g&&It(this)};function It(t){t.readyState=4,t.l=null,t.j=null,t.v=null,wt(t)}i.setRequestHeader=function(t,s){this.u.append(t,s)},i.getResponseHeader=function(t){return this.h&&this.h.get(t.toLowerCase())||""},i.getAllResponseHeaders=function(){if(!this.h)return"";const t=[],s=this.h.entries();for(var a=s.next();!a.done;)a=a.value,t.push(a[0]+": "+a[1]),a=s.next();return t.join(`\r
`)};function wt(t){t.onreadystatechange&&t.onreadystatechange.call(t)}Object.defineProperty(Jt.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(t){this.m=t?"include":"same-origin"}});function hr(t){let s="";return K(t,function(a,l){s+=l,s+=":",s+=a,s+=`\r
`}),s}function Wn(t,s,a){e:{for(l in a){var l=!1;break e}l=!0}l||(a=hr(a),typeof t=="string"?a!=null&&encodeURIComponent(String(a)):L(t,s,a))}function U(t){V.call(this),this.headers=new Map,this.o=t||null,this.h=!1,this.v=this.g=null,this.D="",this.m=0,this.l="",this.j=this.B=this.u=this.A=!1,this.I=null,this.H="",this.J=!1}k(U,V);var Ta=/^https?$/i,Aa=["POST","PUT"];i=U.prototype,i.Ha=function(t){this.J=t},i.ea=function(t,s,a,l){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+t);s=s?s.toUpperCase():"GET",this.D=t,this.l="",this.m=0,this.A=!1,this.h=!0,this.g=this.o?this.o.g():xn.g(),this.v=this.o?Vi(this.o):Vi(xn),this.g.onreadystatechange=R(this.Ea,this);try{this.B=!0,this.g.open(s,String(t),!0),this.B=!1}catch(w){ur(this,w);return}if(t=a||"",a=new Map(this.headers),l)if(Object.getPrototypeOf(l)===Object.prototype)for(var _ in l)a.set(_,l[_]);else if(typeof l.keys=="function"&&typeof l.get=="function")for(const w of l.keys())a.set(w,l.get(w));else throw Error("Unknown input type for opt_headers: "+String(l));l=Array.from(a.keys()).find(w=>w.toLowerCase()=="content-type"),_=u.FormData&&t instanceof u.FormData,!(0<=Array.prototype.indexOf.call(Aa,s,void 0))||l||_||a.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[w,T]of a)this.g.setRequestHeader(w,T);this.H&&(this.g.responseType=this.H),"withCredentials"in this.g&&this.g.withCredentials!==this.J&&(this.g.withCredentials=this.J);try{pr(this),this.u=!0,this.g.send(t),this.u=!1}catch(w){ur(this,w)}};function ur(t,s){t.h=!1,t.g&&(t.j=!0,t.g.abort(),t.j=!1),t.l=s,t.m=5,dr(t),Xt(t)}function dr(t){t.A||(t.A=!0,z(t,"complete"),z(t,"error"))}i.abort=function(t){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.m=t||7,z(this,"complete"),z(this,"abort"),Xt(this))},i.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),Xt(this,!0)),U.aa.N.call(this)},i.Ea=function(){this.s||(this.B||this.u||this.j?fr(this):this.bb())},i.bb=function(){fr(this)};function fr(t){if(t.h&&typeof h<"u"&&(!t.v[1]||me(t)!=4||t.Z()!=2)){if(t.u&&me(t)==4)Fi(t.Ea,0,t);else if(z(t,"readystatechange"),me(t)==4){t.h=!1;try{const T=t.Z();e:switch(T){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var s=!0;break e;default:s=!1}var a;if(!(a=s)){var l;if(l=T===0){var _=String(t.D).match(ir)[1]||null;!_&&u.self&&u.self.location&&(_=u.self.location.protocol.slice(0,-1)),l=!Ta.test(_?_.toLowerCase():"")}a=l}if(a)z(t,"complete"),z(t,"success");else{t.m=6;try{var w=2<me(t)?t.g.statusText:""}catch{w=""}t.l=w+" ["+t.Z()+"]",dr(t)}}finally{Xt(t)}}}}function Xt(t,s){if(t.g){pr(t);const a=t.g,l=t.v[0]?()=>{}:null;t.g=null,t.v=null,s||z(t,"ready");try{a.onreadystatechange=l}catch{}}}function pr(t){t.I&&(u.clearTimeout(t.I),t.I=null)}i.isActive=function(){return!!this.g};function me(t){return t.g?t.g.readyState:0}i.Z=function(){try{return 2<me(this)?this.g.status:-1}catch{return-1}},i.oa=function(){try{return this.g?this.g.responseText:""}catch{return""}},i.Oa=function(t){if(this.g){var s=this.g.responseText;return t&&s.indexOf(t)==0&&(s=s.substring(t.length)),ea(s)}};function gr(t){try{if(!t.g)return null;if("response"in t.g)return t.g.response;switch(t.H){case"":case"text":return t.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in t.g)return t.g.mozResponseArrayBuffer}return null}catch{return null}}function Sa(t){const s={};t=(t.g&&2<=me(t)&&t.g.getAllResponseHeaders()||"").split(`\r
`);for(let l=0;l<t.length;l++){if(Q(t[l]))continue;var a=v(t[l]);const _=a[0];if(a=a[1],typeof a!="string")continue;a=a.trim();const w=s[_]||[];s[_]=w,w.push(a)}y(s,function(l){return l.join(", ")})}i.Ba=function(){return this.m},i.Ka=function(){return typeof this.l=="string"?this.l:String(this.l)};function Et(t,s,a){return a&&a.internalChannelParams&&a.internalChannelParams[t]||s}function mr(t){this.Aa=0,this.i=[],this.j=new gt,this.ia=this.qa=this.I=this.W=this.g=this.ya=this.D=this.H=this.m=this.S=this.o=null,this.Ya=this.U=0,this.Va=Et("failFast",!1,t),this.F=this.C=this.u=this.s=this.l=null,this.X=!0,this.za=this.T=-1,this.Y=this.v=this.B=0,this.Ta=Et("baseRetryDelayMs",5e3,t),this.cb=Et("retryDelaySeedMs",1e4,t),this.Wa=Et("forwardChannelMaxRetries",2,t),this.wa=Et("forwardChannelRequestTimeoutMs",2e4,t),this.pa=t&&t.xmlHttpFactory||void 0,this.Xa=t&&t.Tb||void 0,this.Ca=t&&t.useFetchStreams||!1,this.L=void 0,this.J=t&&t.supportsCrossDomainXhr||!1,this.K="",this.h=new Yi(t&&t.concurrentRequestLimit),this.Da=new wa,this.P=t&&t.fastHandshake||!1,this.O=t&&t.encodeInitMessageHeaders||!1,this.P&&this.O&&(this.O=!1),this.Ua=t&&t.Rb||!1,t&&t.xa&&this.j.xa(),t&&t.forceLongPolling&&(this.X=!1),this.ba=!this.P&&this.X&&t&&t.detectBufferingProxy||!1,this.ja=void 0,t&&t.longPollingTimeout&&0<t.longPollingTimeout&&(this.ja=t.longPollingTimeout),this.ca=void 0,this.R=0,this.M=!1,this.ka=this.A=null}i=mr.prototype,i.la=8,i.G=1,i.connect=function(t,s,a,l){W(0),this.W=t,this.H=s||{},a&&l!==void 0&&(this.H.OSID=a,this.H.OAID=l),this.F=this.X,this.I=Sr(this,null,this.W),Qt(this)};function Gn(t){if(vr(t),t.G==3){var s=t.U++,a=ge(t.I);if(L(a,"SID",t.K),L(a,"RID",s),L(a,"TYPE","terminate"),Tt(t,a),s=new Ae(t,t.j,s),s.L=2,s.v=qt(ge(a)),a=!1,u.navigator&&u.navigator.sendBeacon)try{a=u.navigator.sendBeacon(s.v.toString(),"")}catch{}!a&&u.Image&&(new Image().src=s.v,a=!0),a||(s.g=br(s.j,null),s.g.ea(s.v)),s.F=Date.now(),zt(s)}Ar(t)}function Yt(t){t.g&&(Kn(t),t.g.cancel(),t.g=null)}function vr(t){Yt(t),t.u&&(u.clearTimeout(t.u),t.u=null),Zt(t),t.h.cancel(),t.s&&(typeof t.s=="number"&&u.clearTimeout(t.s),t.s=null)}function Qt(t){if(!Qi(t.h)&&!t.s){t.s=!0;var s=t.Ga;ct||Di(),lt||(ct(),lt=!0),An.add(s,t),t.B=0}}function ba(t,s){return Zi(t.h)>=t.h.j-(t.s?1:0)?!1:t.s?(t.i=s.D.concat(t.i),!0):t.G==1||t.G==2||t.B>=(t.Va?0:t.Wa)?!1:(t.s=pt(R(t.Ga,t,s),Tr(t,t.B)),t.B++,!0)}i.Ga=function(t){if(this.s)if(this.s=null,this.G==1){if(!t){this.U=Math.floor(1e5*Math.random()),t=this.U++;const _=new Ae(this,this.j,t);let w=this.o;if(this.S&&(w?(w=d(w),m(w,this.S)):w=this.S),this.m!==null||this.O||(_.H=w,w=null),this.P)e:{for(var s=0,a=0;a<this.i.length;a++){t:{var l=this.i[a];if("__data__"in l.map&&(l=l.map.__data__,typeof l=="string")){l=l.length;break t}l=void 0}if(l===void 0)break;if(s+=l,4096<s){s=a;break e}if(s===4096||a===this.i.length-1){s=a+1;break e}}s=1e3}else s=1e3;s=_r(this,_,s),a=ge(this.I),L(a,"RID",t),L(a,"CVER",22),this.D&&L(a,"X-HTTP-Session-Id",this.D),Tt(this,a),w&&(this.O?s="headers="+encodeURIComponent(String(hr(w)))+"&"+s:this.m&&Wn(a,this.m,w)),zn(this.h,_),this.Ua&&L(a,"TYPE","init"),this.P?(L(a,"$req",s),L(a,"SID","null"),_.T=!0,Hn(_,a,null)):Hn(_,a,s),this.G=2}}else this.G==3&&(t?yr(this,t):this.i.length==0||Qi(this.h)||yr(this))};function yr(t,s){var a;s?a=s.l:a=t.U++;const l=ge(t.I);L(l,"SID",t.K),L(l,"RID",a),L(l,"AID",t.T),Tt(t,l),t.m&&t.o&&Wn(l,t.m,t.o),a=new Ae(t,t.j,a,t.B+1),t.m===null&&(a.H=t.o),s&&(t.i=s.D.concat(t.i)),s=_r(t,a,1e3),a.I=Math.round(.5*t.wa)+Math.round(.5*t.wa*Math.random()),zn(t.h,a),Hn(a,l,s)}function Tt(t,s){t.H&&K(t.H,function(a,l){L(s,l,a)}),t.l&&nr({},function(a,l){L(s,l,a)})}function _r(t,s,a){a=Math.min(t.i.length,a);var l=t.l?R(t.l.Na,t.l,t):null;e:{var _=t.i;let w=-1;for(;;){const T=["count="+a];w==-1?0<a?(w=_[0].g,T.push("ofs="+w)):w=0:T.push("ofs="+w);let D=!0;for(let x=0;x<a;x++){let P=_[x].g;const B=_[x].map;if(P-=w,0>P)w=Math.max(0,_[x].g-100),D=!1;else try{Ea(B,T,"req"+P+"_")}catch{l&&l(B)}}if(D){l=T.join("&");break e}}}return t=t.i.splice(0,a),s.D=t,l}function Ir(t){if(!t.g&&!t.u){t.Y=1;var s=t.Fa;ct||Di(),lt||(ct(),lt=!0),An.add(s,t),t.v=0}}function qn(t){return t.g||t.u||3<=t.v?!1:(t.Y++,t.u=pt(R(t.Fa,t),Tr(t,t.v)),t.v++,!0)}i.Fa=function(){if(this.u=null,wr(this),this.ba&&!(this.M||this.g==null||0>=this.R)){var t=2*this.R;this.j.info("BP detection timer enabled: "+t),this.A=pt(R(this.ab,this),t)}},i.ab=function(){this.A&&(this.A=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.M=!0,W(10),Yt(this),wr(this))};function Kn(t){t.A!=null&&(u.clearTimeout(t.A),t.A=null)}function wr(t){t.g=new Ae(t,t.j,"rpc",t.Y),t.m===null&&(t.g.H=t.o),t.g.O=0;var s=ge(t.qa);L(s,"RID","rpc"),L(s,"SID",t.K),L(s,"AID",t.T),L(s,"CI",t.F?"0":"1"),!t.F&&t.ja&&L(s,"TO",t.ja),L(s,"TYPE","xmlhttp"),Tt(t,s),t.m&&t.o&&Wn(s,t.m,t.o),t.L&&(t.g.I=t.L);var a=t.g;t=t.ia,a.L=1,a.v=qt(ge(s)),a.m=null,a.P=!0,Ki(a,t)}i.Za=function(){this.C!=null&&(this.C=null,Yt(this),qn(this),W(19))};function Zt(t){t.C!=null&&(u.clearTimeout(t.C),t.C=null)}function Er(t,s){var a=null;if(t.g==s){Zt(t),Kn(t),t.g=null;var l=2}else if($n(t.h,s))a=s.D,er(t.h,s),l=1;else return;if(t.G!=0){if(s.o)if(l==1){a=s.m?s.m.length:0,s=Date.now()-s.F;var _=t.B;l=Un(),z(l,new Wi(l,a)),Qt(t)}else Ir(t);else if(_=s.s,_==3||_==0&&0<s.X||!(l==1&&ba(t,s)||l==2&&qn(t)))switch(a&&0<a.length&&(s=t.h,s.i=s.i.concat(a)),_){case 1:je(t,5);break;case 4:je(t,10);break;case 3:je(t,6);break;default:je(t,2)}}}function Tr(t,s){let a=t.Ta+Math.floor(Math.random()*t.cb);return t.isActive()||(a*=2),a*s}function je(t,s){if(t.j.info("Error code "+s),s==2){var a=R(t.fb,t),l=t.Xa;const _=!l;l=new xe(l||"//www.google.com/images/cleardot.gif"),u.location&&u.location.protocol=="http"||Wt(l,"https"),qt(l),_?_a(l.toString(),a):Ia(l.toString(),a)}else W(2);t.G=0,t.l&&t.l.sa(s),Ar(t),vr(t)}i.fb=function(t){t?(this.j.info("Successfully pinged google.com"),W(2)):(this.j.info("Failed to ping google.com"),W(1))};function Ar(t){if(t.G=0,t.ka=[],t.l){const s=tr(t.h);(s.length!=0||t.i.length!=0)&&(M(t.ka,s),M(t.ka,t.i),t.h.i.length=0,F(t.i),t.i.length=0),t.l.ra()}}function Sr(t,s,a){var l=a instanceof xe?ge(a):new xe(a);if(l.g!="")s&&(l.g=s+"."+l.g),Gt(l,l.s);else{var _=u.location;l=_.protocol,s=s?s+"."+_.hostname:_.hostname,_=+_.port;var w=new xe(null);l&&Wt(w,l),s&&(w.g=s),_&&Gt(w,_),a&&(w.l=a),l=w}return a=t.D,s=t.ya,a&&s&&L(l,a,s),L(l,"VER",t.la),Tt(t,l),l}function br(t,s,a){if(s&&!t.J)throw Error("Can't create secondary domain capable XhrIo object.");return s=t.Ca&&!t.pa?new U(new Kt({eb:a})):new U(t.pa),s.Ha(t.J),s}i.isActive=function(){return!!this.l&&this.l.isActive(this)};function Rr(){}i=Rr.prototype,i.ua=function(){},i.ta=function(){},i.sa=function(){},i.ra=function(){},i.isActive=function(){return!0},i.Na=function(){};function ee(t,s){V.call(this),this.g=new mr(s),this.l=t,this.h=s&&s.messageUrlParams||null,t=s&&s.messageHeaders||null,s&&s.clientProtocolHeaderRequired&&(t?t["X-Client-Protocol"]="webchannel":t={"X-Client-Protocol":"webchannel"}),this.g.o=t,t=s&&s.initMessageHeaders||null,s&&s.messageContentType&&(t?t["X-WebChannel-Content-Type"]=s.messageContentType:t={"X-WebChannel-Content-Type":s.messageContentType}),s&&s.va&&(t?t["X-WebChannel-Client-Profile"]=s.va:t={"X-WebChannel-Client-Profile":s.va}),this.g.S=t,(t=s&&s.Sb)&&!Q(t)&&(this.g.m=t),this.v=s&&s.supportsCrossDomainXhr||!1,this.u=s&&s.sendRawJson||!1,(s=s&&s.httpSessionIdParam)&&!Q(s)&&(this.g.D=s,t=this.h,t!==null&&s in t&&(t=this.h,s in t&&delete t[s])),this.j=new Qe(this)}k(ee,V),ee.prototype.m=function(){this.g.l=this.j,this.v&&(this.g.J=!0),this.g.connect(this.l,this.h||void 0)},ee.prototype.close=function(){Gn(this.g)},ee.prototype.o=function(t){var s=this.g;if(typeof t=="string"){var a={};a.__data__=t,t=a}else this.u&&(a={},a.__data__=Dn(t),t=a);s.i.push(new la(s.Ya++,t)),s.G==3&&Qt(s)},ee.prototype.N=function(){this.g.l=null,delete this.j,Gn(this.g),delete this.g,ee.aa.N.call(this)};function Cr(t){Ln.call(this),t.__headers__&&(this.headers=t.__headers__,this.statusCode=t.__status__,delete t.__headers__,delete t.__status__);var s=t.__sm__;if(s){e:{for(const a in s){t=a;break e}t=void 0}(this.i=t)&&(t=this.i,s=s!==null&&t in s?s[t]:void 0),this.data=s}else this.data=t}k(Cr,Ln);function kr(){Mn.call(this),this.status=1}k(kr,Mn);function Qe(t){this.g=t}k(Qe,Rr),Qe.prototype.ua=function(){z(this.g,"a")},Qe.prototype.ta=function(t){z(this.g,new Cr(t))},Qe.prototype.sa=function(t){z(this.g,new kr)},Qe.prototype.ra=function(){z(this.g,"b")},ee.prototype.send=ee.prototype.o,ee.prototype.open=ee.prototype.m,ee.prototype.close=ee.prototype.close,Fn.NO_ERROR=0,Fn.TIMEOUT=8,Fn.HTTP_ERROR=6,aa.COMPLETE="complete",na.EventType=dt,dt.OPEN="a",dt.CLOSE="b",dt.ERROR="c",dt.MESSAGE="d",V.prototype.listen=V.prototype.K,U.prototype.listenOnce=U.prototype.L,U.prototype.getLastError=U.prototype.Ka,U.prototype.getLastErrorCode=U.prototype.Ba,U.prototype.getStatus=U.prototype.Z,U.prototype.getResponseJson=U.prototype.Oa,U.prototype.getResponseText=U.prototype.oa,U.prototype.send=U.prototype.ea,U.prototype.setWithCredentials=U.prototype.Ha}).apply(typeof nn<"u"?nn:typeof self<"u"?self:typeof window<"u"?window:{});const ds="@firebase/firestore",fs="4.7.9";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class G{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}G.UNAUTHENTICATED=new G(null),G.GOOGLE_CREDENTIALS=new G("google-credentials-uid"),G.FIRST_PARTY=new G("first-party-uid"),G.MOCK_USER=new G("mock-user");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let xt="11.4.0";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const rt=new yn("@firebase/firestore");function re(i,...e){if(rt.logLevel<=O.DEBUG){const n=e.map(ki);rt.debug(`Firestore (${xt}): ${i}`,...n)}}function Ho(i,...e){if(rt.logLevel<=O.ERROR){const n=e.map(ki);rt.error(`Firestore (${xt}): ${i}`,...n)}}function Sd(i,...e){if(rt.logLevel<=O.WARN){const n=e.map(ki);rt.warn(`Firestore (${xt}): ${i}`,...n)}}function ki(i){if(typeof i=="string")return i;try{/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/return function(n){return JSON.stringify(n)}(i)}catch{return i}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Pi(i="Unexpected state"){const e=`FIRESTORE (${xt}) INTERNAL ASSERTION FAILED: `+i;throw Ho(e),new Error(e)}function Ct(i,e){i||Pi()}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const J={CANCELLED:"cancelled",INVALID_ARGUMENT:"invalid-argument",FAILED_PRECONDITION:"failed-precondition"};class X extends ce{constructor(e,n){super(e,n),this.code=e,this.message=n,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kt{constructor(){this.promise=new Promise((e,n)=>{this.resolve=e,this.reject=n})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vo{constructor(e,n){this.user=n,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class bd{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,n){e.enqueueRetryable(()=>n(G.UNAUTHENTICATED))}shutdown(){}}class Rd{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,n){this.changeListener=n,e.enqueueRetryable(()=>n(this.token.user))}shutdown(){this.changeListener=null}}class Cd{constructor(e){this.t=e,this.currentUser=G.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,n){Ct(this.o===void 0);let r=this.i;const o=g=>this.i!==r?(r=this.i,n(g)):Promise.resolve();let c=new kt;this.o=()=>{this.i++,this.currentUser=this.u(),c.resolve(),c=new kt,e.enqueueRetryable(()=>o(this.currentUser))};const h=()=>{const g=c;e.enqueueRetryable(async()=>{await g.promise,await o(this.currentUser)})},u=g=>{re("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=g,this.o&&(this.auth.addAuthTokenListener(this.o),h())};this.t.onInit(g=>u(g)),setTimeout(()=>{if(!this.auth){const g=this.t.getImmediate({optional:!0});g?u(g):(re("FirebaseAuthCredentialsProvider","Auth not yet detected"),c.resolve(),c=new kt)}},0),h()}getToken(){const e=this.i,n=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(n).then(r=>this.i!==e?(re("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):r?(Ct(typeof r.accessToken=="string"),new Vo(r.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const e=this.auth&&this.auth.getUid();return Ct(e===null||typeof e=="string"),new G(e)}}class kd{constructor(e,n,r){this.l=e,this.h=n,this.P=r,this.type="FirstParty",this.user=G.FIRST_PARTY,this.T=new Map}I(){return this.P?this.P():null}get headers(){this.T.set("X-Goog-AuthUser",this.l);const e=this.I();return e&&this.T.set("Authorization",e),this.h&&this.T.set("X-Goog-Iam-Authorization-Token",this.h),this.T}}class Pd{constructor(e,n,r){this.l=e,this.h=n,this.P=r}getToken(){return Promise.resolve(new kd(this.l,this.h,this.P))}start(e,n){e.enqueueRetryable(()=>n(G.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class ps{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class Od{constructor(e,n){this.A=n,this.forceRefresh=!1,this.appCheck=null,this.R=null,this.V=null,te(e)&&e.settings.appCheckToken&&(this.V=e.settings.appCheckToken)}start(e,n){Ct(this.o===void 0);const r=c=>{c.error!=null&&re("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${c.error.message}`);const h=c.token!==this.R;return this.R=c.token,re("FirebaseAppCheckTokenProvider",`Received ${h?"new":"existing"} token.`),h?n(c.token):Promise.resolve()};this.o=c=>{e.enqueueRetryable(()=>r(c))};const o=c=>{re("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=c,this.o&&this.appCheck.addTokenListener(this.o)};this.A.onInit(c=>o(c)),setTimeout(()=>{if(!this.appCheck){const c=this.A.getImmediate({optional:!0});c?o(c):re("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){if(this.V)return Promise.resolve(new ps(this.V));const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then(n=>n?(Ct(typeof n.token=="string"),this.R=n.token,new ps(n.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}function Dd(i){return i.name==="IndexedDbTransactionError"}const di="(default)";class vn{constructor(e,n){this.projectId=e,this.database=n||di}static empty(){return new vn("","")}get isDefaultDatabase(){return this.database===di}isEqual(e){return e instanceof vn&&e.projectId===this.projectId&&e.database===this.database}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var gs,C;(C=gs||(gs={}))[C.OK=0]="OK",C[C.CANCELLED=1]="CANCELLED",C[C.UNKNOWN=2]="UNKNOWN",C[C.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",C[C.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",C[C.NOT_FOUND=5]="NOT_FOUND",C[C.ALREADY_EXISTS=6]="ALREADY_EXISTS",C[C.PERMISSION_DENIED=7]="PERMISSION_DENIED",C[C.UNAUTHENTICATED=16]="UNAUTHENTICATED",C[C.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",C[C.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",C[C.ABORTED=10]="ABORTED",C[C.OUT_OF_RANGE=11]="OUT_OF_RANGE",C[C.UNIMPLEMENTED=12]="UNIMPLEMENTED",C[C.INTERNAL=13]="INTERNAL",C[C.UNAVAILABLE=14]="UNAVAILABLE",C[C.DATA_LOSS=15]="DATA_LOSS";/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */new jo([4294967295,4294967295],0);/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Nd=41943040;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ld=1048576;function ii(){return typeof document<"u"?document:null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Md{constructor(e,n,r=1e3,o=1.5,c=6e4){this.Ti=e,this.timerId=n,this.Go=r,this.zo=o,this.jo=c,this.Ho=0,this.Jo=null,this.Yo=Date.now(),this.reset()}reset(){this.Ho=0}Zo(){this.Ho=this.jo}Xo(e){this.cancel();const n=Math.floor(this.Ho+this.e_()),r=Math.max(0,Date.now()-this.Yo),o=Math.max(0,n-r);o>0&&re("ExponentialBackoff",`Backing off for ${o} ms (base delay: ${this.Ho} ms, delay with jitter: ${n} ms, last attempt: ${r} ms ago)`),this.Jo=this.Ti.enqueueAfterDelay(this.timerId,o,()=>(this.Yo=Date.now(),e())),this.Ho*=this.zo,this.Ho<this.Go&&(this.Ho=this.Go),this.Ho>this.jo&&(this.Ho=this.jo)}t_(){this.Jo!==null&&(this.Jo.skipDelay(),this.Jo=null)}cancel(){this.Jo!==null&&(this.Jo.cancel(),this.Jo=null)}e_(){return(Math.random()-.5)*this.Ho}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Oi{constructor(e,n,r,o,c){this.asyncQueue=e,this.timerId=n,this.targetTimeMs=r,this.op=o,this.removalCallback=c,this.deferred=new kt,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(h=>{})}get promise(){return this.deferred.promise}static createAndSchedule(e,n,r,o,c){const h=Date.now()+r,u=new Oi(e,n,h,o,c);return u.start(r),u}start(e){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new X(J.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then(e=>this.deferred.resolve(e))):Promise.resolve())}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}var ms,vs;(vs=ms||(ms={}))._a="default",vs.Cache="cache";/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ud(i){const e={};return i.timeoutSeconds!==void 0&&(e.timeoutSeconds=i.timeoutSeconds),e}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ys=new Map;function Fd(i,e,n,r){if(e===!0&&r===!0)throw new X(J.INVALID_ARGUMENT,`${i} and ${n} cannot be used together.`)}function xd(i){if(i===void 0)return"undefined";if(i===null)return"null";if(typeof i=="string")return i.length>20&&(i=`${i.substring(0,20)}...`),JSON.stringify(i);if(typeof i=="number"||typeof i=="boolean")return""+i;if(typeof i=="object"){if(i instanceof Array)return"an array";{const e=function(r){return r.constructor?r.constructor.name:null}(i);return e?`a custom ${e} object`:"an object"}}return typeof i=="function"?"a function":Pi()}function jd(i,e){if("_delegate"in i&&(i=i._delegate),!(i instanceof e)){if(e.name===i.constructor.name)throw new X(J.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const n=xd(i);throw new X(J.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${n}`)}}return i}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Bo="firestore.googleapis.com",_s=!0;class Is{constructor(e){var n,r;if(e.host===void 0){if(e.ssl!==void 0)throw new X(J.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=Bo,this.ssl=_s}else this.host=e.host,this.ssl=(n=e.ssl)!==null&&n!==void 0?n:_s;if(this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=Nd;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<Ld)throw new X(J.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}Fd("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=Ud((r=e.experimentalLongPollingOptions)!==null&&r!==void 0?r:{}),function(c){if(c.timeoutSeconds!==void 0){if(isNaN(c.timeoutSeconds))throw new X(J.INVALID_ARGUMENT,`invalid long polling timeout: ${c.timeoutSeconds} (must not be NaN)`);if(c.timeoutSeconds<5)throw new X(J.INVALID_ARGUMENT,`invalid long polling timeout: ${c.timeoutSeconds} (minimum allowed value is 5)`);if(c.timeoutSeconds>30)throw new X(J.INVALID_ARGUMENT,`invalid long polling timeout: ${c.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&function(r,o){return r.timeoutSeconds===o.timeoutSeconds}(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class $o{constructor(e,n,r,o){this._authCredentials=e,this._appCheckCredentials=n,this._databaseId=r,this._app=o,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new Is({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask="notTerminated"}get app(){if(!this._app)throw new X(J.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new X(J.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new Is(e),this._emulatorOptions=e.emulatorOptions||{},e.credentials!==void 0&&(this._authCredentials=function(r){if(!r)return new bd;switch(r.type){case"firstParty":return new Pd(r.sessionIndex||"0",r.iamToken||null,r.authTokenFactory||null);case"provider":return r.client;default:throw new X(J.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(n){const r=ys.get(n);r&&(re("ComponentProvider","Removing Datastore"),ys.delete(n),r.terminate())}(this),Promise.resolve()}}function Hd(i,e,n,r={}){var o;const c=(i=jd(i,$o))._getSettings(),h=Object.assign(Object.assign({},c),{emulatorOptions:i._getEmulatorOptions()}),u=`${e}:${n}`;c.host!==Bo&&c.host!==u&&Sd("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used.");const g=Object.assign(Object.assign({},c),{host:u,ssl:!1,emulatorOptions:r});if(!Ne(g,h)&&(i._setSettings(g),r.mockUserToken)){let E,A;if(typeof r.mockUserToken=="string")E=r.mockUserToken,A=G.MOCK_USER;else{E=Fa(r.mockUserToken,(o=i._app)===null||o===void 0?void 0:o.options.projectId);const b=r.mockUserToken.sub||r.mockUserToken.user_id;if(!b)throw new X(J.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");A=new G(b)}i._authCredentials=new Rd(new Vo(E,A))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ws="AsyncQueue";class Es{constructor(e=Promise.resolve()){this.Vu=[],this.mu=!1,this.fu=[],this.gu=null,this.pu=!1,this.yu=!1,this.wu=[],this.a_=new Md(this,"async_queue_retry"),this.bu=()=>{const r=ii();r&&re(ws,"Visibility state changed to "+r.visibilityState),this.a_.t_()},this.Su=e;const n=ii();n&&typeof n.addEventListener=="function"&&n.addEventListener("visibilitychange",this.bu)}get isShuttingDown(){return this.mu}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.Du(),this.vu(e)}enterRestrictedMode(e){if(!this.mu){this.mu=!0,this.yu=e||!1;const n=ii();n&&typeof n.removeEventListener=="function"&&n.removeEventListener("visibilitychange",this.bu)}}enqueue(e){if(this.Du(),this.mu)return new Promise(()=>{});const n=new kt;return this.vu(()=>this.mu&&this.yu?Promise.resolve():(e().then(n.resolve,n.reject),n.promise)).then(()=>n.promise)}enqueueRetryable(e){this.enqueueAndForget(()=>(this.Vu.push(e),this.Cu()))}async Cu(){if(this.Vu.length!==0){try{await this.Vu[0](),this.Vu.shift(),this.a_.reset()}catch(e){if(!Dd(e))throw e;re(ws,"Operation failed with retryable error: "+e)}this.Vu.length>0&&this.a_.Xo(()=>this.Cu())}}vu(e){const n=this.Su.then(()=>(this.pu=!0,e().catch(r=>{this.gu=r,this.pu=!1;const o=function(h){let u=h.message||"";return h.stack&&(u=h.stack.includes(h.message)?h.stack:h.message+`
`+h.stack),u}(r);throw Ho("INTERNAL UNHANDLED ERROR: ",o),r}).then(r=>(this.pu=!1,r))));return this.Su=n,n}enqueueAfterDelay(e,n,r){this.Du(),this.wu.indexOf(e)>-1&&(n=0);const o=Oi.createAndSchedule(this,e,n,r,c=>this.Fu(c));return this.fu.push(o),o}Du(){this.gu&&Pi()}verifyOperationInProgress(){}async Mu(){let e;do e=this.Su,await e;while(e!==this.Su)}xu(e){for(const n of this.fu)if(n.timerId===e)return!0;return!1}Ou(e){return this.Mu().then(()=>{this.fu.sort((n,r)=>n.targetTimeMs-r.targetTimeMs);for(const n of this.fu)if(n.skipDelay(),e!=="all"&&n.timerId===e)break;return this.Mu()})}Nu(e){this.wu.push(e)}Fu(e){const n=this.fu.indexOf(e);this.fu.splice(n,1)}}class Vd extends $o{constructor(e,n,r,o){super(e,n,r,o),this.type="firestore",this._queue=new Es,this._persistenceKey=(o==null?void 0:o.name)||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new Es(e),this._firestoreClient=void 0,await e}}}function Xd(i,e){const n=typeof i=="object"?i:gi(),r=typeof i=="string"?i:di,o=qe(n,"firestore").getImmediate({identifier:r});if(!o._initialized){const c=Ma("firestore");c&&Hd(o,...c)}return o}(function(e,n=!0){(function(o){xt=o})(st),de(new oe("firestore",(r,{instanceIdentifier:o,options:c})=>{const h=r.getProvider("app").getImmediate(),u=new Vd(new Cd(r.getProvider("auth-internal")),new Od(h,r.getProvider("app-check-internal")),function(E,A){if(!Object.prototype.hasOwnProperty.apply(E.options,["projectId"]))throw new X(J.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new vn(E.options.projectId,A)}(h,o),h);return c=Object.assign({useFetchStreams:n},c),u._setSettings(c),u},"PUBLIC").setMultipleInstances(!0)),se(ds,fs,e),se(ds,fs,"esm2017")})();export{Xd as a,Jd as b,Wd as c,zd as d,Kd as g,Vc as i,Gd as o,se as r,qd as s};
