"use strict"
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
const resources = ["cubes","obtainium","octeracts","offerings"]
function resourceIntToOut(name) {return dictionary(name,[["cubes","Cube"],["obtainium","Obtainium"],["octeracts","Octeracts"],["offerings","Offerings"]])}
for (let i=1;i<5;i++) {
	d.element("octeractUpgradesFreeLevels").innerHTML += "<label for=\"octFreeLevelIncrease"+i+"\">Octeract Free Sing Level "+i+":</label><input id=\"octFreeLevelIncrease"+i+"\" "+((i==4)?("type=\"number\" value=\"0\" min=\"0\" max=\"40\" step=\"1\">"):("type=\"checkbox\""))+"</input><br>"
}
d.innerHTML("resourceWeights",resources.map(i=>"<label for=\""+i+"Weight\">"+resourceIntToOut(i)+" weight: </label><input id=\""+i+"Weight\" type=\"number\" value=\"1\">").join("<br>"))
const upgradeData = {
	off1:{
		name:"Offering Charge",
		base:1,
		max:-1,
		boost:x=>1+x*0.02,
		sing:1,
		affects:["offerings"],
	},
	off2:{
		name:"Offering Storm",
		base:25,
		max:25,
		boost:x=>1+x*0.08,
		sing:1,
		affects:["offerings"]
	},
	off3:{
		name:"Offering Tempest",
		base:500,
		max:40,
		boost:x=>1+x*0.04,
		sing:1,
		affects:["offerings"]
	},
	obt1:{
		name:"Obtainium Wave",
		base:1,
		max:-1,
		boost:x=>1+x*0.02,
		sing:1,
		affects:["obtainium"]
	},
	obt2:{
		name:"Obtainium Flood",
		base:25,
		max:25,
		boost:x=>1+x*0.08,
		sing:1,
		affects:["obtainium"]
	},
	obt3:{
		name:"Obtainium Tsunami",
		base:500,
		max:40,
		boost:x=>1+x*0.04,
		sing:1,
		affects:["obtainium"]
	},
	cub1:{
		name:"Cube Flame",
		base:1,
		max:-1,
		boost:x=>1+x*0.01,
		sing:1,
		affects:["cubes","octeracts"]
	},
	cub2:{
		name:"Cube Blaze",
		base:25,
		max:25,
		boost:x=>1+x*0.08,
		sing:1,
		affects:["cubes","octeracts"]
	},
	cub3:{
		name:"Cube Inferno",
		base:500,
		max:40,
		boost:x=>1+x*0.04,
		sing:1,
		affects:["cubes","octeracts"]
	},
	oct1:{
		name:"Octeract Absinthe",
		base:2e4,
		max:-1,
		boost:x=>1+x*0.0125,
		sing:36,
		affects:["octeracts"]
	},
	oct2:{
		name:"Pieces of Eight",
		base:4e4,
		max:25,
		boost:x=>1+x*0.05,
		sing:36,
		affects:["octeracts"]
	},
	oct3:{
		name:"The Obelisk Shaped like an Octagon.",
		base:2.5e5,
		max:50,
		boost:x=>1+x*0.025,
		sing:55,
		affects:["octeracts"]
	},
	oct4:{
		name:"Octahedral Synthesis",
		base:7.5e5,
		max:100,
		boost:x=>1+x*0.02,
		sing:77,
		affects:["octeracts"]
	},
	oct5:{
		name:"The Eighth Wonder of the World",
		base:7777777,
		max:200,
		boost:x=>1+x*0.01,
		sing:100,
		affects:["octeracts"]
	},
	cit1:{
		name:"Citadel of Singularity",
		base:5e5,
		max:-1,
		boost:x=>(1+x*0.02)*(1+Math.floor(x/10)*0.01),
		sing:100,
		affects:["cubes","obtainium","offerings"]
	},
	cit2:{
		name:"Citadel of 'Singularity': The Real Edition",
		base:1e14,
		max:100,
		boost:x=>(1+x*0.02)*(1+Math.floor(x/10)*0.01),
		sing:210,
		affects:["cubes","obtainium","offerings"]
	}
}
function visibleUpgrades(mode=d.element("mode").value) {return Object.keys(upgradeData).filter(x=>(mode=="distribute"?true:upgradeData[x].affects.includes(mode))&&(Number(d.element("singularity").value)>=upgradeData[x].sing))}
d.innerHTML("singUpgrades",Object.keys(upgradeData).map(i=>"<tr id=\"singUpg_"+i+"_Row\"><td>"+upgradeData[i].name+"</td><td><label for=\"singUpg_"+i+"_Level\">Level:</label><input id=\"singUpg_"+i+"_Level\" type=\"number\" value=\"0\" min=\"0\" step=\"1\"></td><td>"+(["obt","off","cub"].includes(i.substring(0,3))?("<label for=\"singUpg_"+i+"_FreeLevel\">Free level:</label><input id=\"singUpg_"+i+"_FreeLevel\" type=\"number\" value=\"0\" min=\"0\">"):"")+"</td></tr>").join(""))
function updateSingUpgradeText() {
	for (let i of Object.keys(upgradeData)) {
		if (visibleUpgrades().includes(i)) {
			d.tr("singUpg_"+i+"_Row",true)
			if (upgradeData[i].max!==-1) d.element("singUpg_"+i+"_Level").max = upgradeData[i].max+Number(d.element("octeractUpgradeMaxLevelIncrease").value)
		} else {
			d.tr("singUpg_"+i+"_Row",false)
		}
	}
}
updateSingUpgradeText()
function singUpgradePurchasedLevel(x,next="") {return (calcInProgress?calcObject[x]:Number(d.element("singUpg_"+x+"_Level").value))+(x==next?1:0)}
function singUpgradeFreeLevel(x,next="") {
	let out = ["cub","obt","off"].includes(x.substring(0,3))?Number(d.element("singUpg_"+x+"_FreeLevel").value):(x=="cit1")?singUpgradePurchasedLevel("cit2",next):0
	return (out>singUpgradePurchasedLevel(x,next))?(singUpgradePurchasedLevel(x,next)+Math.sqrt(out-singUpgradePurchasedLevel(x,next))):out
}
function effectiveSingUpgradeLevel(x,next="") {
	let linearLevels = singUpgradePurchasedLevel(x,next)+singUpgradeFreeLevel(x,next)
	let polynomialLevels = 0
	if (d.element("octFreeLevelIncrease1").checked) {
		let exponent = 0.6
		if (d.element("octFreeLevelIncrease2").checked) exponent += 0.05
		if (d.element("octFreeLevelIncrease3").checked) exponent += 0.05
		if (Number(d.element("octFreeLevelIncrease4").value)>0) exponent += 0.01+0.001*Number(d.element("octFreeLevelIncrease4").value)
		polynomialLevels = (singUpgradePurchasedLevel(x,next)*singUpgradeFreeLevel(x,next))**exponent
	}
	return Math.max(linearLevels,polynomialLevels)
}
function calculateBoostExponent(next,mode=d.element("mode").value) {
	return Math.log10(visibleUpgrades(mode).map(i=>upgradeData[i].boost(effectiveSingUpgradeLevel(i,next))).reduce((x,y)=>x*y))
}
function singUpgradeMaxLevel(name) {
	return (upgradeData[name].max==-1)?Infinity:(name=="cit2")?100:(upgradeData[name].max+Number(d.element("octeractUpgradeMaxLevelIncrease").value))
}
function singUpgradeCost(name) {
	let upg = upgradeData[name]
	let level = singUpgradePurchasedLevel(name)
	if (level==singUpgradeMaxLevel(name)) return Infinity
	if (name=="cit2") return upg.base*(level*2+1)
	if (upg.max==-1) {
		let out = upg.base
		out *= level+1
		if (level>=100) out *= level/50
		if (level>=400) out *= level/100
		return out
	} else {
		return upg.base*(level+1)
	}
}
function affectingUpgrades(mode) {
	return visibleUpgrades(mode).filter(x=>singUpgradePurchasedLevel(x)!==singUpgradeMaxLevel(x))
}
function bestNext() {
	let best = "null"
	let efficiency = 0
	let mode = d.element("mode").value
	for (let i of affectingUpgrades(mode)) {
		let nextEff = ((mode=="distribute")?resources.map(x=>(calculateBoostExponent(i,x)-calculateBoostExponent("",x))*d.element(x+"Weight").value).reduce((x,y)=>x+y):(calculateBoostExponent(i)-calculateBoostExponent("")))/singUpgradeCost(i)
		if (nextEff>efficiency) {
			efficiency = nextEff
			best = i
		}
	}
	return best
}
function resourceWeightHTML() {d.display("resourceWeights",d.element("mode").value=="distribute"?"inline-block":"none")}
resourceWeightHTML()
var calcInProgress = false
var calcObject
function calculate() {
	calcObject = Object.fromEntries(visibleUpgrades().map(x=>[x,singUpgradePurchasedLevel(x)]))
	calcInProgress = true
	let gq = Number(d.element("goldenQuarks").value)
	let prevMults = Object.fromEntries(resources.map(x=>[x,calculateBoostExponent("",x)]))
	while (true) {
		let next = bestNext()
		let cost = singUpgradeCost(next)
		if (cost>gq) {
			let out = "<span style=\"color:gold\">"+Math.floor(gq)+" Golden Quarks left</span>"
			for (let i of Object.keys(calcObject)) out += "<br><span style=\"color:"+dictionary(i.substring(0,3),[["cub","#ffff00"],["obt","#3333cc"],["off","gold"],["oct","#ff0000"],["cit","#999999"]])+"\">"+upgradeData[i].name+": "+calcObject[i]+"</span>"
			out += "<br>Save for "+upgradeData[next].name+"<br>"
			let newMults = Object.fromEntries(resources.map(x=>[x,calculateBoostExponent("",x)]))
			for (let i of d.element("mode").value=="distribute"?resources:[d.element("mode").value]) out += "<br><span style=\"color:"+dictionary(i.substring(0,3),[["cub","#ffff00"],["obt","#3333cc"],["off","gold"],["oct","#ff0000"]])+"\">"+resourceIntToOut(i)+" boost: +"+((10**(newMults[i]-prevMults[i])-1)*100).toFixed(1)+"%</span>"
			d.innerHTML("out",out)
			calcInProgress = false
			return
		} else {
			gq-=cost
			calcObject[next]++
		}
	}
}
function importGame() {
	let save = JSON.parse(atob(d.element("import").value))
	d.element("goldenQuarks").value = Math.floor(save.goldenQuarks)
	d.element("singularity").value = save.singularityCount
	d.element("octeractsUnlocked").checked = save.singularityUpgrades.octeractUnlock.level>0
	d.element("octFreeLevelIncrease1").checked = save.octeractUpgrades.octeractImprovedFree.level>0
	d.element("octFreeLevelIncrease2").checked = save.octeractUpgrades.octeractImprovedFree2.level>0
	d.element("octFreeLevelIncrease3").checked = save.octeractUpgrades.octeractImprovedFree3.level>0
	d.element("octFreeLevelIncrease4").value = save.octeractUpgrades.octeractImprovedFree4.level
	d.element("octeractUpgradeMaxLevelIncrease").value = save.octeractUpgrades.octeractSingUpgradeCap.level
	d.element("singUpg_off1_Level").value = save.singularityUpgrades.singOfferings1.level
	d.element("singUpg_off1_FreeLevel").value = save.singularityUpgrades.singOfferings1.freeLevels
	d.element("singUpg_off2_Level").value = save.singularityUpgrades.singOfferings2.level
	d.element("singUpg_off2_FreeLevel").value = save.singularityUpgrades.singOfferings2.freeLevels
	d.element("singUpg_off3_Level").value = save.singularityUpgrades.singOfferings3.level
	d.element("singUpg_off3_FreeLevel").value = save.singularityUpgrades.singOfferings3.freeLevels
	d.element("singUpg_obt1_Level").value = save.singularityUpgrades.singObtainium1.level
	d.element("singUpg_obt1_FreeLevel").value = save.singularityUpgrades.singObtainium1.freeLevels
	d.element("singUpg_obt2_Level").value = save.singularityUpgrades.singObtainium2.level
	d.element("singUpg_obt2_FreeLevel").value = save.singularityUpgrades.singObtainium2.freeLevels
	d.element("singUpg_obt3_Level").value = save.singularityUpgrades.singObtainium3.level
	d.element("singUpg_obt3_FreeLevel").value = save.singularityUpgrades.singObtainium3.freeLevels
	d.element("singUpg_cub1_Level").value = save.singularityUpgrades.singCubes1.level
	d.element("singUpg_cub1_FreeLevel").value = save.singularityUpgrades.singCubes1.freeLevels
	d.element("singUpg_cub2_Level").value = save.singularityUpgrades.singCubes2.level
	d.element("singUpg_cub2_FreeLevel").value = save.singularityUpgrades.singCubes2.freeLevels
	d.element("singUpg_cub3_Level").value = save.singularityUpgrades.singCubes3.level
	d.element("singUpg_cub3_FreeLevel").value = save.singularityUpgrades.singCubes3.freeLevels
	d.element("singUpg_oct1_Level").value = save.singularityUpgrades.singOcteractGain.level
	for (let i=2;i<6;i++) d.element("singUpg_oct"+i+"_Level").value = save.singularityUpgrades["singOcteractGain"+i].level
	d.element("singUpg_cit1_Level").value = save.singularityUpgrades.singCitadel.level
	d.element("singUpg_cit2_Level").value = save.singularityUpgrades.singCitadel2.level
	updateSingUpgradeText()
}