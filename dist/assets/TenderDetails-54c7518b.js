import{u as r}from"./main-store-0568071c.js";import{L as n,i as o,E as c,o as u,a as i,t,f as l}from"./index-93ced3f1.js";const d={key:0},D={__name:"TenderDetails",setup(m){const a=r(),{currentRoute:s}=n(),e=o(null);return c(async()=>{e.value=await a.getTenderDetails(s.value.params.id)}),(_,f)=>e.value?(u(),i("div",d,t(e.value.data.title)+" "+t(e.value.data.tenderID),1)):l("",!0)}};export{D as default};
