import{u as o,a as _,j as s,s as x,c as S,S as T,L as E,b as m,d as u,N,e as y,f as A}from"./index-50ec8743.js";import{w as f}from"./SidePanel-602de7ca.js";import{u as v,N as j,n as D}from"./navigation-icon.config-3192d1f6.js";import{S as R}from"./ScrollBar-050a09ef.js";import{L}from"./Logo-2f25aa44.js";import{V as M}from"./VerticalMenuContent-480cf565.js";const V=({className:i})=>{const n=o(d=>d.theme.layout.sideNavCollapse),t=_(),{larger:l}=v(),r=()=>{t(x(!n))};return s.jsx(s.Fragment,{children:l.md&&s.jsx("div",{className:i,onClick:r,children:s.jsx(j,{className:"text-2xl",toggled:n})})})},G=f(V),O={width:m,minWidth:m},I={width:u,minWidth:u},F=()=>{const i=o(e=>e.theme.themeColor),n=o(e=>e.theme.primaryColorLevel),t=o(e=>e.theme.navMode),l=o(e=>e.theme.mode),r=o(e=>e.theme.direction),d=o(e=>e.base.common.currentRouteKey),a=o(e=>e.theme.layout.sideNavCollapse),h=o(e=>e.auth.user.authority),{larger:p}=v(),g=()=>t===N?`bg-${i}-${n} side-nav-${t}`:`side-nav-${t}`,C=()=>t===N?y:t===A?l:t,c=s.jsx(M,{navMode:t,collapsed:a,navigationTree:D,routeKey:d,userAuthority:h,direction:r});return s.jsx(s.Fragment,{children:p.md&&s.jsxs("div",{style:a?I:O,className:S("side-nav",g(),!a&&"side-nav-expand"),children:[s.jsx("div",{className:"side-nav-header",children:s.jsx(L,{mode:C(),type:a?"streamline":"full",className:a?T:E})}),a?c:s.jsx("div",{className:"side-nav-content",children:s.jsx(R,{autoHide:!0,direction:r,children:c})})]})})};export{F as S,G as a};