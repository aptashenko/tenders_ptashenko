const r=()=>({formatAmount:(t,o)=>`${t.toLocaleString("uk-UA",{minimumFractionDigits:2,maximumFractionDigits:2}).replace(".",",")} ${o}`,unformatAmount:(t,o)=>{const n=t.replace(` ${o}`,"");return Number(n)}});export{r as u};
