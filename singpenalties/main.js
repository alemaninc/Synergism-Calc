"use strict"
function val(element) {
	let e=document.getElementById(element)
	return e.type=="checkbox"?e.checked:Number(e.value)
}
function effectiveSing(singCount) {
	let num=Math.max(singCount-val("penaltyDebuff"),0)
	x=num*Math.min(4.75,1+0.075*num)
	if(val("noOcteractActive")){x*=((val("noOcteractCompletions")+1)**3)}
	if(num>10){x*=1.5*Math.min(4,num/8-1/4)}
	if(num>25){x*=2.5*Math.min(6,num*0.06-0.5)}
	if(num>36){x*=4*Math.min(5,num/18-1)*1.1**Math.min(num-36,64)}
	if(num>50){x*=5*Math.min(8,num/25-1)*1.1**Math.min(num-50,50)}
	if(num>100){x*=num*0.08*1.1**(num-100)}
	if(num>150){x*=2*1.05**(num-150)}
	if(num>200){x*=1.5*1.275**(num-200)}
	if(num>215){x*=1.25*1.2**(num-215)}
	if(num>230){x*=2}
	return x
}
const penaltyList = [
	{
		name:"Global Speed",
		color:"royalblue",
		value:function(x){return 1+effectiveSing(x)**0.5/4},
		min:0
	},{
		name:"Ascension Speed",
		color:"orange",
		value:function(x){return (x<150)?(1+effectiveSing(x)**0.5/5):(1+effectiveSing(x)**0.75/1e4)},
		min:0
	},{
		name:"Offering Gain",
		color:"gold",
		value:function(x){return (1+effectiveSing(Math.min(x,150)))**0.5},
		min:0
	},{
		name:"Obtainium Gain",
		color:"steelblue",
		value:function(x){return (1+effectiveSing(Math.min(x,150)))**0.5},
		min:0
	},{
		name:"Cube Gain",
		color:"yellow",
		value:function(x){return ((x<150)?(1+effectiveSing(x)**0.5/4):(1+effectiveSing(x)**0.75/1e3))*1.02**Math.max(x-100,0)},
		min:0
	},{
		name:"Research Costs",
		color:"#008000",
		value:function(x){return 1+effectiveSing(x)**0.5/2},
		min:0
	},{
		name:"Cube Upgrade costs",
		color:"silver",
		value:function(x){return (1+effectiveSing(x))**(1/3)},
		min:0
	},{
		name:"Platonic Upgrade costs",
		color:"#ffffff",
		value:function(x){return (x>36)?(1+effectiveSing(x)**0.3/12):1},
		min:36
	},{
		name:"Hepteract costs",
		color:"#ffffff",
		value:function(x){return (x>50)?(1+effectiveSing(x)**0.22/25):1},
		min:50
	},{
		name:"Difficulty divider from upgrades",
		color:"#ffff00",
		value:function(x){return (1+0.01*val("wowPassZ")*x)*(1+0.001*val("chronometerZ")*x)*(1+0.0005*val("photokinetics")*x)*(1+0.0002*val("exokinetics")*x)},
		min:0,
	},{
		name:"Overall difficulty",
		color:"#ff0000",
		value:function(x){return [[1,1],[4,1],[7,1],[8,1],[9,-1]].map(i=>penaltyList[i[0]].value(x)**i[1]).reduce((x,y)=>x*y)},
		min:0
	}
]
function format(x){return x<1e3?x.toPrecision(3):x<1e6?(Math.floor(x/1e3)+","+String(Math.floor(x%1e3)).padStart(3,"0")):x.toExponential(2).replace("+","")}
function calculate() {
	let out="<table><th class=\"col1\">Penalty</th><th class=\"col2\">Current value</th><th class=\"col3\">Next value</th><th class=\"col4\">Change</th>"
	for(let i of penaltyList.filter(x=>Math.max(val("initialSing"),val("finalSing"))>x.min)){let initial=i.value(val("initialSing")),final=i.value(val("finalSing"));out+="<tr style=\"color:"+i.color+"\"><td class=\"col1\">"+i.name+"</td><td class=\"col2\">"+format(initial)+"</td><td class=\"col3\">"+format(final)+"</td><td class=\"col4\">"+((initial>final)?(" ÷ "+format(initial/final)):(final>initial)?(" × "+format(final/initial)):"No change")}
	out+="</table>"
	document.getElementById("output").innerHTML=out
}