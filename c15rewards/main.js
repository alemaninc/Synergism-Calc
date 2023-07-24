"use strict"
function format(num) {
  if (num>1e6) return num.toExponential(2).replace("+","")
  if (num>1e3) return Math.floor(num)
  return Math.floor(num*100)/100
}
var rewards = {
  1:{
    text:"All Cube Types I: +{v}%",
    color:"#ffffff",
    req:750,
    value:function(expo){return 2*Math.log2(expo/175)}
  },
  2:{
    text:"Ascension Count: +{v}%",
    color:"#ffffff",
    req:1500,
    value:function(expo){return 5*Math.log2(expo/375)}
  },
  3:{
    text:"Coin Exponent: +{v}%",
    color:"#ffffff",
    req:3000,
    value:function(expo){return 2/3*Math.log2(expo/750)}
  },
  4:{
    text:"Taxes: -{v}%",
    color:"#ffffff",
    req:5000,
    value:function(expo){return 100*(1-0.98**Math.log2(expo/1250))}
  },
  5:{
    text:"Obtainium: +{v}%",
    color:"#ffffff",
    req:7500,
    value:function(expo){return 20*(expo/7500)**0.75}
  },
  6:{
    text:"Offerings: +{v}%",
    color:"#ffffff",
    req:7500,
    value:function(expo){return 20*(expo/7500)**0.75}
  },
  7:{
    text:"Accelerators: +{v}% [Uncorruptable!]",
    color:"#ffffff",
    req:1e4,
    value:function(expo){return 5*Math.log2(expo/2500)}
  },
  8:{
    text:"Multipliers: +{v}% [Uncorruptable!]",
    color:"#ffffff",
    req:1e4,
    value:function(expo){return 5*Math.log2(expo/2500)}
  },
  9:{
    text:"Rune EXP: +{v}%",
    color:"#ffffff",
    req:2e4,
    value:function(expo){return 100*(expo/2e4)**1.5}
  },
  10:{
    text:"Rune Effectiveness: +{v}%",
    color:"#ffffff",
    req:4e4,
    value:function(expo){return 100/33*Math.log2(expo/1e4)}
  },
  11:{
    text:"All Cube Types II: +{v}%",
    color:"#ffffff",
    req:6e4,
    value:function(expo){return Math.log2(expo/1.5e4)}
  },
  12:{
    text:"Challenge 1-5 Requirement Scaling: -{v}%",
    color:"#ffffff",
    req:1e5,
    value:function(expo){return 100*(1-0.98**Math.log2(expo/2.5e4))}
  },
  13:{
    text:"Challenge 6-10 Requirement Scaling: -{v}%",
    color:"#ffffff",
    req:1e5,
    value:function(expo){return 100*(1-0.98**Math.log2(expo/2.5e4))}
  },
  14:{
    text:"Ant Speed: +{v}% [Uncorruptable!]",
    color:"#ffffff",
    req:2e5,
    value:function(expo){return 100*((1+Math.log2(expo/2e5))**4-1)}
  },
  15:{
    text:"Bonus Ant Levels: +{v}%",
    color:"#ffffff",
    req:5e5,
    value:function(expo){return 5*Math.log2(expo/1.5e5)}
  },
  16:{
    text:"All Cube Types III: +{v}%",
    color:"#ffffff",
    req:1e6,
    value:function(expo){return 2/3*Math.log2(expo/2.5e5)}
  },
  17:{
    text:"Talisman Effectiveness: +{v}%",
    color:"#ffffff",
    req:3e6,
    value:function(expo){return 5*Math.log2(expo/7.5e5)}
  },
  18:{
    text:"Global Speed: +{v}%",
    color:"#ffffff",
    req:1e7,
    value:function(expo){return 5*Math.log2(expo/2.5e6)}
  },
  19:{
    text:"Blessing Effectiveness: +{v}%",
    color:"#ffffff",
    req:3e7,
    value:function(expo){return 20*(expo/3e7)**0.25}
  },
  20:{
    text:"Ascend Building Effectiveness: +{v}%",
    color:"#ffffff",
    req:1e8,
    value:function(expo){return 20*(expo/1e8)**(2/3)}
  },
  21:{
    text:"All Cube Types IV: +{v}%",
    color:"#ffffff",
    req:5e8,
    value:function(expo){return 0.5*Math.log2(expo/1.25e8)}
  },
  22:{
    text:"Spirit Effectiveness: +{v}%",
    color:"#ffffff",
    req:2e9,
    value:function(expo){return 20*(expo/2e9)**0.25}
  },
  23:{
    text:"Ascension Score: +{v}%",
    color:"#ffffff",
    req:1e10,
    value:function(expo){return 20*(expo/1e10)**0.25}
  },
  24:{
    text:"Quarks: +{v}%",
    color:"#fafad2",
    req:1e11,
    value:function(expo){return Math.log2(1.65e18/3.125e9)}
  },
  25:{
    text:"Hepteracts: Unlocked!",
    color:"#ffc0cb",
    req:1e15,
    value:function(expo){return null}
  },
  26:{
    text:"Challenge Hepteract: Unlocked!",
    color:"#ff0000",
    req:2e15,
    value:function(expo){return null}
  },
  27:{
    text:"All Cube Types V: +{v}%",
    color:"#ffffff",
    req:4e15,
    value:function(expo){return Math.log2(expo/3.90625e12)/3}
  },
  28:{
    text:"Powder Conversion: +{v}%",
    color:"#ffffff",
    req:7e15,
    value:function(expo){return Math.log2(expo/2.1875e14)*2}
  },
  29:{
    text:"Abyss Hepteract: Unlocked!",
    color:"#808080",
    req:1e16,
    value:function(expo){return null}
  },
  30:{
    text:"Constant Upgrade 2: +{v}%",
    color:"#ffffff",
    req:2e16,
    value:function(expo){return 1.05-0.05/2**(expo/1e18)}
  },
  31:{
    text:"Accelerator Hepteract: Unlocked!",
    color:"#ff9900",
    req:3.33e16,
    value:function(expo){return null}
  },
  32:{
    text:"Accelerator Boost Hepteract: Unlocked!",
    color:"#00ffff",
    req:3.33e16,
    value:function(expo){return null}
  },
  33:{
    text:"Multiplier Hepteract: Unlocked!",
    color:"#cc66cc",
    req:3.33e16,
    value:function(expo){return null}
  },
  34:{
    text:"Free Daily Overflux Orbs: +{v} at the start of the day",
    color:"#ffc0cb",
    req:2e17,
    value:function(expo){return Math.floor((expo/5e14)**0.5)}
  },
  35:{
    text:"Ascension Speed: +{v}%",
    color:"#ff9900",
    req:1.5e18,
    value:function(expo){return 5+2*Math.log2(expo/1.5e18)}
  },
}
function calculate() {
  let expo = Number(document.getElementById("expo").value)
  let out = "<ol>"
  for (let i=1;i<36;i++) {next=rewards[i];if (expo>=next.req) out += "<li style=\"color:"+next.color+"\">"+next.text.replace("{v}",format(next.value(expo)))+"</li>"}
  out += "</ol>"
  document.getElementById("out1").innerHTML = out
  let overallCubeMult = [1,11,16,21,27].map(x => expo>=rewards[x].req?(1+rewards[x].value(expo)/100):1).reduce((x,y)=>x*y)
  document.getElementById("out2").innerHTML = "<li>All Cube Types (overall): +"+format((overallCubeMult-1)*100)+"%</li>"
}
window.setInterval(calculate,50)