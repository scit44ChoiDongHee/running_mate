import{u as a,j as e,c as o,N as u}from"./index-50ec8743.js";import{u as h,H as p,M as j,U as f}from"./navigation-icon.config-3192d1f6.js";import{S as v}from"./SidePanel-602de7ca.js";import{H as N,a as y}from"./HorizontalMenuContent-d252ce99.js";import{V as H}from"./Views-fbc3bf99.js";import"./CloseButton-82af4221.js";import"./Logo-2f25aa44.js";import"./index-ec9d12a3.js";import"./isNil-95d9b4b6.js";const g=t=>{const{className:n,contained:i}=t,s=a(r=>r.theme.navMode),l=a(r=>r.theme.themeColor),c=a(r=>r.theme.primaryColorLevel),m=a(r=>r.auth.user.authority),{larger:d}=h(),x=()=>s===u?`bg-${l}-${c} secondary-header-${s}`:`secondary-header-${s}`;return e.jsx(e.Fragment,{children:d.md&&e.jsx("div",{className:o("h-16 flex items-center",x(),n),children:e.jsx("div",{className:o("flex items-center px-4",i&&"container mx-auto"),children:e.jsx(N,{manuVariant:s,userAuthority:m})})})})},w=()=>e.jsxs(e.Fragment,{children:[e.jsx(y,{}),e.jsx(j,{})]}),C=()=>e.jsxs(e.Fragment,{children:[e.jsx(v,{}),e.jsx(f,{hoverable:!1})]}),F=()=>e.jsx("div",{className:"app-layout-simple flex flex-auto flex-col min-h-screen",children:e.jsx("div",{className:"flex flex-auto min-w-0",children:e.jsxs("div",{className:"flex flex-col flex-auto min-h-screen min-w-0 relative w-full",children:[e.jsx(p,{container:!0,className:"shadow dark:shadow-2xl",headerStart:e.jsx(w,{}),headerEnd:e.jsx(C,{})}),e.jsx(g,{contained:!0}),e.jsx(H,{pageContainerType:"contained"})]})})});export{F as default};