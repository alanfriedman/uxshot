!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t(require("hotkeys-js")):"function"==typeof define&&define.amd?define(["hotkeys-js"],t):"object"==typeof exports?exports.uxshot=t(require("hotkeys-js")):e.uxshot=t(e.hotkeys)}(this,function(e){return function(e){var t={};function n(o){if(t[o])return t[o].exports;var i=t[o]={i:o,l:!1,exports:{}};return e[o].call(i.exports,i,i.exports,n),i.l=!0,i.exports}return n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)n.d(o,i,function(t){return e[t]}.bind(null,i));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){const{default:o}=n(1),i="uxshot-banner";let a,r=!1;e.exports=function({videoKey:e="ctrl+r",screenshotKey:t="ctrl+s",description:n}={}){let d,c;o(e,function(e,t){r?p():m("video")}),o(t,async function(e,t){await m("image"),setTimeout(async()=>{const e=function(e){u.currentTime=e;const t=document.createElement("canvas");t.height=u.videoHeight,t.width=u.videoWidth,t.getContext("2d").drawImage(u,0,0,t.width,t.height);const n=new Image;return n.src=t.toDataURL(),n}(0);if("data:,"===e.src)return;p("image");const t=await fetch(e.src);f(await t.blob())},1e3)});let s=[];const u=document.createElement("video");function p(e){r&&(r=!1,d&&(d.stop(),d=null,c.getTracks().forEach(e=>e.stop()),c=null,s=[]))}function l(){document.getElementById(i).remove()}async function f(e){let t,o=new FormData;o.append("mediaType",a),o.append("media",e),n&&(t=await n(),o.append("description",t));const r=await fetch("https://uxshot.com/upload",{body:o,method:"post"}),d=(await r.json()).data.url;try{await navigator.clipboard.writeText(d)}catch(e){}const c=document.createElement("input");c.type="text",c.setAttribute("readonly",!0),c.value=d,Object.assign(c.style,{borderRadius:"3px",outline:"none",border:"none",width:"150px",marginRight:"5px"});const s=document.createElement("button");s.innerHTML="Copy",Object.assign(s.style,{});const u=document.createElement("div");u.id=i,Object.assign(u.style,{position:"fixed",top:"10px",right:"10px",background:"white",borderRadius:"5px",display:"flex",alignItems:"center",fontFamily:"sans-serif",padding:"10px 15px",padding:"10px 15px",border:"1px solid #cacaca"}),s.addEventListener("click",()=>{c.select(),document.execCommand("copy"),u.remove()});const p=document.createElement("button");p.addEventListener("click",l),p.innerHTML="&times;",Object.assign(p.style,{background:"transparent",color:"white",border:"none",fontSize:"14px",marginLeft:"5px"}),u.appendChild(c),u.appendChild(s),document.body.appendChild(u)}async function m(e){const t=document.getElementById(i);t&&t.remove(),a=e,r=!0;try{const e=(c=await function(){if(navigator.getDisplayMedia)return navigator.getDisplayMedia({video:!0,audio:!0});if(navigator.mediaDevices&&navigator.mediaDevices.getDisplayMedia)return navigator.mediaDevices.getDisplayMedia({video:!0,audio:!1});throw new Error("getDisplayMedia API is not supported in this browser")}()).getTracks()[0],t=e.getSettings&&e.getSettings();!t.displaySurface||t.displaySurface,u.srcObject=c,(d=new MediaRecorder(c,{mimeType:"video/webm; codecs=vp8"})).ondataavailable=function(e){void 0!==e.data&&0!==e.data.size&&s.push(e.data)},d.addEventListener("stop",()=>{const e=new Blob(s,{type:"video/webm"});"video"===a&&f(e)}),d.addEventListener("start",()=>{}),d.start(),c.addEventListener("inactive",e=>{r&&"video"===a&&p()}),c.addEventListener("active",e=>{}),c.addEventListener("addtrack",e=>{})}catch(e){console.error(e)}}u.setAttribute("autoplay",!0)}},function(t,n){t.exports=e}])});