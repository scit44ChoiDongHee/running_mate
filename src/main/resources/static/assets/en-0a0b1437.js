import{x as _,l as c}from"./index-50ec8743.js";function i(n,o){for(var t=0;t<o.length;t++){const e=o[t];if(typeof e!="string"&&!Array.isArray(e)){for(const r in e)if(r!=="default"&&!(r in n)){const a=Object.getOwnPropertyDescriptor(e,r);a&&Object.defineProperty(n,r,a.get?a:{enumerable:!0,get:()=>e[r]})}}}return Object.freeze(Object.defineProperty(n,Symbol.toStringTag,{value:"Module"}))}var s={exports:{}};(function(n,o){(function(t,e){n.exports=e()})(c,function(){return{name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),ordinal:function(t){var e=["th","st","nd","rd"],r=t%100;return"["+t+(e[(r-20)%10]||e[r]||e[0])+"]"}}})})(s);var u=s.exports;const p=_(u),d=i({__proto__:null,default:p},[u]);export{d as e};
