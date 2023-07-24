"use strict";
const d = {		// d for "document"
	element(elem) {
		if (typeof elem == "object") return elem;		// if input is already an element
		return document.getElementById(elem);				// if input is an id. Both retrieve an element, this is error detection.
	},
	innerHTML(element,value) {
		d.element(element).innerHTML = value;						// sets the innerHTML of an element
	},
	display(element, value) {
		d.element(element).style.display = value;				// sets the display mode of an element
	},
	/*
	1 element: class name
	2 elements: id, value
	*/
	class() {
		if (arguments.length==1) return document.getElementsByClassName(arguments[0]);	 // gets elements by class name
		if (arguments.length==2) d.element(arguments[0]).className = arguments[1];			 // sets the class of an element
	},
	tr(id,state) {
		if (state) d.element(id).removeAttribute("hidden");				// shows and hides table rows
		else d.element(id).setAttribute("hidden","hidden");
	}
}
function dictionary(key,array) {
	return array.map(x => x[0]).includes(key)?array[array.map(x => x[0]).indexOf(key)][1]:undefined;
}
const allCubeTypes = ["cub34","cub56","hept","oct"]
const resources = [allCubeTypes,"off","obt"].flat()
function resourceIntToOut(x){return dictionary(x,[["cub34","Cube/Tess."],["cub56","Hyper./Plat."],["hept","Hepteract"],["oct","Octeract"],["off","Offering"],["obt","Obtainium"]])}
d.innerHTML("resourceWeights",resources.map(i=>"<label for=\""+i+"Weight\">"+resourceIntToOut(i)+" weight: </label><input id=\""+i+"Weight\" type=\"number\" value=\"1\" onChange=\"showHideUpgs()\">").join("<br>"))
function val(element) {
	let e=document.getElementById(element)
	return e.type=="checkbox"?e.checked:Number(e.value)
}
function addCodeInterval(c4=val("calculator4"),) {
	return (val("antiquities")?2880:3600)*(1-c4/25)*Math.max(0.4,1-val("sing")*(val("sing")>200?0.0025:val("sing")>125?0.00125:0))
}
const upgrades = {
	offeringEX:{
		name:"Offering EX",
		baseCost:150,
		costScale:10,
		max:100,
		affects:["off"],
		effect:x=>1+x/25,
		unlocked:()=>val("sing")<20
	},
	offeringAuto:{
		name:"Offering Auto",
		baseCost:150,
		costScale:10,
		max:100,
		affects:["off"],
		effect:x=>1+x/50,
		unlocked:()=>val("sing")<20
	},
	obtainiumEX:{
		name:"Obtainium EX",
		baseCost:150,
		costScale:10,
		max:100,
		affects:["obt"],
		effect:x=>1+x/25,
		unlocked:()=>val("sing")<20
	},
	obtainiumAuto:{
		name:"Obtainium Auto",
		baseCost:150,
		costScale:10,
		max:100,
		affects:["obt"],
		effect:x=>1+x/50,
		unlocked:()=>val("sing")<20
	},
	cashGrab:{
		name:"Cash Grab",
		baseCost:100,
		costScale:40,
		max:100,
		affects:["off","obt"],
		effect:x=>1+x/100,
		unlocked:()=>val("sing")<20
	},
	seasonPass:{
		name:"Season Pass 1",
		baseCost:500,
		costScale:75,
		max:100,
		affects:["cub34"],
		effect:x=>1+x*0.0225,
		unlocked:()=>(val("sing")<51)&&(val("shopLevel")>0)
	},
	seasonPass2:{
		name:"Season Pass 2",
		baseCost:2500,
		costScale:250,
		max:100,
		affects:["cub56"],
		effect:x=>1+x*0.015,
		unlocked:()=>(val("sing")<51)&&(val("shopLevel")>0)
	},
	seasonPass3:{
		name:"Season Pass 3",
		baseCost:5000,
		costScale:500,
		max:100,
		affects:["hept","oct"],
		effect:x=>1+x*0.015,
		unlocked:()=>(val("sing")<51)&&(val("shopLevel")>0)
	},
	chronometer:{
		name:"Chronometer",
		baseCost:2000,
		costScale:500,
		max:100,
		affects:"speed",
		effect:x=>1+x*0.012,
		unlocked:()=>(val("sing")<51)&&(val("shopLevel")>0)
	},
	calculator3:{
		name:"PL-AT Ω",
		baseCost:10000,
		costScale:2000,
		max:10,
		affects:["cub34","cub56","hept"],
		effect:x=>1+x/(val("expert")?50:60),
		unlocked:()=>val("shopLevel")>0
	},
	calculator4:{
		name:"PL-AT δ",
		baseCost:1e7,
		costScale:1e6,
		max:10,
		affects:["cub34","cub56","hept"],
		effect:x=>1+(val("expert")?720:600)/addCodeInterval(x),  // assume calc 3 is maxed
		unlocked:()=>val("shopLevel")>1
	},
	calculator6:{
		name:"QUAAA-T",
		baseCost:1e11,
		costScale:2e10,
		max:100,
		affects:["oct"],
		effect:x=>1+x/addCodeInterval(),  // assume calc 4 is maxed
		unlocked:()=>val("shopLevel")>3
	},
	chronometer2:{
		name:"Chronometer 2",
		baseCost:5000,
		costScale:1500,
		max:100,
		affects:"speed",
		effect:x=>1+x*0.006,
		unlocked:()=>(val("sing")<51)&&(val("shopLevel")>0)
	},
	chronometer3:{
		name:"Chronometer 3",
		baseCost:250,
		costScale:250,
		max:1000,
		affects:"speed",
		effect:x=>1+x*0.015,
		unlocked:()=>val("shopLevel")>1
	},
	seasonPassY:{
		name:"Season Pass Y",
		baseCost:10000,
		costScale:1500,
		max:100,
		affects:allCubeTypes,
		effect:x=>1+x*0.0075,
		unlocked:()=>val("shopLevel")>0
	},
	seasonPassZ:{
		name:"Season Pass Z",
		baseCost:250,
		costScale:250,
		max:1000,
		affects:allCubeTypes,
		effect:x=>1+x*val("sing")/100,
		unlocked:()=>val("shopLevel")>1
	},
	cashGrab2:{
		name:"Cash Grab 2",
		baseCost:5e3,
		costScale:5e3,
		max:1e3,
		affects:["off","obt"],
		effect:x=>1+x/200,
		unlocked:()=>val("shopLevel")>2
	},
	chronometerZ:{
		name:"Chronometer Z",
		baseCost:12500,
		costScale:12500,
		max:1e3,
		affects:"speed",
		effect:x=>1+x*val("sing")/1000,
		unlocked:()=>val("shopLevel")>2
	},
	offeringEX2:{
		name:"Offering EX 2",
		baseCost:1e4,
		costScale:1e4,
		max:1e3,
		affects:["off"],
		effect:x=>1+x*val("sing")/100,
		unlocked:()=>val("shopLevel")>2
	},
	obtainiumEX2:{
		name:"Obtainium EX 2",
		baseCost:1e4,
		costScale:1e4,
		max:1e3,
		affects:["obt"],
		effect:x=>1+x*val("sing")/100,
		unlocked:()=>val("shopLevel")>2
	},
	seasonPassLost:{
		name:"Season Pass LOST",
		baseCost:1e6,
		costScale:25e3,
		max:1e3,
		affects:["oct"],
		effect:x=>1+x/1e3,
		unlocked:()=>val("shopLevel")>2
	},
	offeringEX3:{
		name:"Offering EX 3",
		baseCost:1,
		costScale:125e10,
		max:1e3,
		affects:["off"],
		effect:x=>1.02**x,
		unlocked:()=>val("shopLevel")>3
	},
	obtainiumEX3:{
		name:"Obtainium EX 3",
		baseCost:1,
		costScale:125e10,
		max:1e3,
		affects:["obt"],
		effect:x=>1.02**x,
		unlocked:()=>val("shopLevel")>3
	},
	chronometerInfinity:{
		name:"Chronometer Infinity",
		baseCost:1,
		costScale:25e11,
		max:1e3,
		affects:"speed",
		effect:x=>1.01**x,
		unlocked:()=>val("shopLevel")>3
	},
	seasonPassInfinity:{
		name:"Wow Pass Infinity",
		baseCost:1,
		costScale:375e10,
		max:1e3,
		affects:allCubeTypes,
		effect:x=>1.02**x,
		unlocked:()=>val("shopLevel")>3
	}
}
d.innerHTML("shopUpgrades",Object.keys(upgrades).map(x=>"<div id=\"div_"+x+"\"><label for=\""+x+"\">"+upgrades[x].name+":</label><input id=\""+x+"\" type=\"number\" min=\"0\" max=\""+upgrades[x].max+"\" step=\"1\" value=\"0\"></div>").join("<br>"))
function importGame() {
	let save = JSON.parse(atob(d.element("import").value))
	for (let i of Object.keys(upgrades)) {d.element(i).value=save.shopUpgrades[i]}
	d.element("quarks").value=Math.floor(save.worlds)
	d.element("sing").value=save.singularityCount
	d.element("antiquities").checked = save.runelevels[6]>0
	d.element("expert").checked = save.singularityUpgrades.expertPack.level>0
	d.element("shopLevel").value=(save.singularityUpgrades.wowPass4.level)>0?5:(save.singularityUpgrades.wowPass3.level)>0?4:(save.singularityUpgrades.wowPass2.level)>0?3:(save.singularityUpgrades.wowPass.level)>0?2:((save.ascensionCount>0)||(save.singularityCount>0))?1:0
	showHideUpgs()
}
var calcInProgress = false
var calcObject
function upgLevel(name) {return calcInProgress?calcObject[name]:val(name)}
function upgCost(name) {return upgrades[name].baseCost+upgrades[name].costScale*upgLevel(name)}
function affectingUpgrades() {return Object.keys(upgrades).filter(x=>upgrades[x].unlocked()&&(upgLevel(x)<upgrades[x].max)&&(upgrades[x].affects=="speed"?allCubeTypes:upgrades[x].affects).map(y=>val(y+"Weight")>0).includes(true))}
function upgradeResEfficiency(name,resource) {return val(resource+"Weight")*(Math.log10(upgrades[name].effect(upgLevel(name)+1))-Math.log10(upgrades[name].effect(upgLevel(name))))/upgCost(name)}
function upgradeEfficiency(name) {
	if (upgrades[name].affects=="speed") {return ["cub34","cub56","hept"].map(res=>upgradeResEfficiency(name,res)).reduce((x,y)=>x+y)+upgradeResEfficiency(name,"oct")/2}
	else {return upgrades[name].affects.map(res=>upgradeResEfficiency(name,res)).reduce((x,y)=>x+y)}
}
function bestNext() {
	let out = ""
	let bestEff = 0
	for (let i of affectingUpgrades()) {
		let eff = upgradeEfficiency(i)
		if (eff>bestEff) {
			out=i
			bestEff=eff
		}
	}
	return out
}
function showHideUpgs() {
	for (let i of Object.keys(upgrades)) d.display("div_"+i,affectingUpgrades().includes(i)?"inline-block":"none")
}
showHideUpgs()
function calculate() {
	calcObject = Object.fromEntries(affectingUpgrades().map(x=>[x,val(x)]))
	calcInProgress = true
	let unspent = val("quarks")
	while (true) {
		let next = bestNext()
		let cost = upgCost(next)
		if (cost>unspent) {
			let out = "<span style=\"color:#00ffff\">"+Math.floor(unspent)+" Quarks left</span>"
			let increases = Object.fromEntries(resources.map(x=>[x,0]))
			for (let i of Object.keys(calcObject).filter(x=>calcObject[x]!==val(x))) {
				if (upgrades[i].affects=="speed") {
					for (let j of ["cub34","cub56","hept"]) {increases[j]+=Math.log10(upgrades[i].effect(calcObject[i]))-Math.log10(upgrades[i].effect(val(i)))}
					increases.oct+=(Math.log10(upgrades[i].effect(calcObject[i]))-Math.log10(upgrades[i].effect(val(i))))/2
				} else {for (let j of upgrades[i].affects) {increases[j]+=Math.log10(upgrades[i].effect(calcObject[i]))-Math.log10(upgrades[i].effect(val(i)))}}
				out+="<br>"+upgrades[i].name+": "+calcObject[i]
			}
			out += "<br>Save for "+upgrades[next].name+"<br>"
			for (let i of Object.keys(increases)) {out+="<br>"+resourceIntToOut(i)+" boost: +"+((10**increases[i]-1)*100).toFixed(1)+"%"}
			d.innerHTML("out",out)
			calcInProgress=false
			return
		} else {
			unspent-=cost
			calcObject[next]++
		}
	}
}