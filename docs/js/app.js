!function(e){function t(t){for(var r,l,i=t[0],c=t[1],u=t[2],p=0,s=[];p<i.length;p++)l=i[p],Object.prototype.hasOwnProperty.call(o,l)&&o[l]&&s.push(o[l][0]),o[l]=0;for(r in c)Object.prototype.hasOwnProperty.call(c,r)&&(e[r]=c[r]);for(f&&f(t);s.length;)s.shift()();return a.push.apply(a,u||[]),n()}function n(){for(var e,t=0;t<a.length;t++){for(var n=a[t],r=!0,i=1;i<n.length;i++){var c=n[i];0!==o[c]&&(r=!1)}r&&(a.splice(t--,1),e=l(l.s=n[0]))}return e}var r={},o={0:0},a=[];function l(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,l),n.l=!0,n.exports}l.m=e,l.c=r,l.d=function(e,t,n){l.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},l.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},l.t=function(e,t){if(1&t&&(e=l(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(l.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)l.d(n,r,function(t){return e[t]}.bind(null,r));return n},l.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return l.d(t,"a",t),t},l.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},l.p="";var i=window.webpackJsonp=window.webpackJsonp||[],c=i.push.bind(i);i.push=t,i=i.slice();for(var u=0;u<i.length;u++)t(i[u]);var f=c;a.push([398,1]),n()}({397:function(e,t,n){},398:function(e,t,n){"use strict";n.r(t);var r=n(1),o=n.n(r),a=n(156),l=n.n(a);function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function c(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){u(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function u(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var f=function(e,t){switch(t.type){case"SET_NEW_MESSAGE":return c(c({},e),{},{message:t.value});default:return e}},p={message:"Hello World"};function s(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if("undefined"==typeof Symbol||!(Symbol.iterator in Object(e)))return;var n=[],r=!0,o=!1,a=void 0;try{for(var l,i=e[Symbol.iterator]();!(r=(l=i.next()).done)&&(n.push(l.value),!t||n.length!==t);r=!0);}catch(e){o=!0,a=e}finally{try{r||null==i.return||i.return()}finally{if(o)throw a}}return n}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return m(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return m(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function m(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var b=Object(r.createContext)(p),y=function(e){var t=e.children,n=s(Object(r.useReducer)(f,p),2),a=n[0],l=n[1];return o.a.createElement(b.Provider,{value:[a,l]},t)},d=n(22);function g(){return(g=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}var h=d.a.p.withConfig({displayName:"Text__Paragraph",componentId:"frgtqj-0"})(["margin:0;padding:0;font-size:",";font-weight:",";;color:",";font-family:'Roboto',sans-serif;"],(function(e){return e.size?"".concat(e.size,"px"):"13px"}),(function(e){return e.bold?700:400}),(function(e){return e.color?e.color:"#424242"})),v=function(e){return o.a.createElement(h,g({as:"span"},e))},O=(d.a.a.withConfig({displayName:"Text__CleanAnchor",componentId:"frgtqj-1"})(["display:inline-block;text-decoration:none;font-weight:normal;color:#424242;pointer-events:",";cursor:",";vertical-align:middle;&:link,&:visited,&:hover,&:active{text-decoration:none;font-weight:normal;}"],(function(e){return e.disabled?"none":"auto"}),(function(e){return e.disabled?"default":"pointer"})),Object(d.a)(h).withConfig({displayName:"Text__SeparatorLabel",componentId:"frgtqj-2"})(["position:relative;font-size:12px;color:#aaa;padding:10px 0;overflow:hidden;width:100%;text-align:center;&:before,&:after{position:absolute;top:51%;overflow:hidden;width:50%;height:1px;content:'a0';background-color:#ddd;margin-left:5%;}&:before{margin-left:-55%;text-align:right;}"])),j=Object(d.a)((function(e){var t=e.className,n=e.icon,r=n instanceof Array&&n.length>0?n[0]:"fas",a=n instanceof Array&&n.length>1?n[1]:"fa-exclamation-triangle";return o.a.createElement("i",{className:"".concat(t," ").concat(r," ").concat(a)})})).withConfig({displayName:"Icon",componentId:"zykk6n-0"})(["display:inline-block;margin-right:",";margin-left:",";font-size:",";color:",";"],(function(e){return e.right?"".concat(e.right,"px"):"0"}),(function(e){return e.left?"".concat(e.left,"px"):"0"}),(function(e){return e.size?"".concat(e.size,"px"):"13px"}),(function(e){return e.color||"#aaa"}));function w(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var E=Object(d.a)("div").withConfig({displayName:"Form___StyledDiv",componentId:"enj0v8-0"})(["margin-bottom:10px;"]),x=Object(d.a)(h).withConfig({displayName:"Form___StyledParagraph",componentId:"enj0v8-1"})(["margin-bottom:5px;"]),S=function(e){var t=e.label,n=w(e,["label"]);return o.a.createElement(E,null,o.a.createElement("label",null,o.a.createElement(x,{size:11},t),o.a.createElement("input",n)))},P=n(160);function _(){return(_=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}function I(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var A=function(e){var t=e.label,n=e.icon,r=e.onClick,a=e.children,l=I(e,["label","icon","onClick","children"]);return o.a.createElement(P.Button,_({btnSize:"extra-small",btnStyle:"flat",onClick:function(t){r&&r(t),"submit"===e.type&&t.preventDefault()}},l),n&&o.a.createElement(j,{icon:n,size:12,right:t?10:0}),t||a)};function C(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if("undefined"==typeof Symbol||!(Symbol.iterator in Object(e)))return;var n=[],r=!0,o=!1,a=void 0;try{for(var l,i=e[Symbol.iterator]();!(r=(l=i.next()).done)&&(n.push(l.value),!t||n.length!==t);r=!0);}catch(e){o=!0,a=e}finally{try{r||null==i.return||i.return()}finally{if(o)throw a}}return n}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return k(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return k(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function k(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var z=d.a.div.withConfig({displayName:"App__Content",componentId:"jxf9ic-0"})(["width:960px;margin:30px auto 0 auto;text-align:center;"]),N=d.a.div.withConfig({displayName:"App__Container",componentId:"jxf9ic-1"})(["margin:40px 0;text-align:left;"]),M=function(){var e=C(Object(r.useContext)(b),2),t=e[0],n=e[1];return o.a.createElement(z,null,o.a.createElement(h,{size:32},"react-boilerplate"),o.a.createElement(O,null,"Store"),o.a.createElement(N,null,o.a.createElement(h,null,"Message from store: ",o.a.createElement(v,{bold:!0},t.message))),o.a.createElement(N,null,o.a.createElement(S,{label:"New Message",value:t.message,onChange:function(e){return n({type:"SET_NEW_MESSAGE",value:e.target.value})}})),o.a.createElement(O,null,"Some components"),o.a.createElement(N,null,o.a.createElement(A,{label:"Button"}),o.a.createElement(A,{btnStyle:"primary",label:"Primary Button"}),o.a.createElement(A,{icon:["fas","fa-edit"],label:"Button with icon"})),o.a.createElement(N,null,o.a.createElement(j,{icon:["fab","fa-fort-awesome"],size:24,color:"red"}),o.a.createElement(v,null,"(Icon)")),o.a.createElement(N,null,o.a.createElement(S,{label:"Input label",placeholder:"Input..."})))};n(171),n(396),n(397);l.a.render(o.a.createElement(y,null,o.a.createElement(M,null)),document.getElementById("app"))}});