const i=t=>{const[s,o]=t.split(":").map(Number),r=s>=12?"PM":"AM";return`${s%12||12}:${o.toString().padStart(2,"0")} ${r}`};export{i as f};
