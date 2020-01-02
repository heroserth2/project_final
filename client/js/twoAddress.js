//list จังหวัดทั้งหมด
let provice = [];
let amphur = [];
let district = [];

// สำหรับ จ/อ/ต ช่องที่หนึ่ง
let addressProvice = [];
let addressAmphur = [];
let addressDistrict = [];

//สำหรับเก็บจังหวัดที่เลือกไว้
let buiddingProvice = [];
let buiddingAmphur   =[];
let buiddingDistrict =[];

//ตัวแปรเอาไว้ชี้ว่าเลือกจังหวัดอะไรไว้
var aProviceId = 1;
var wProviceId = 1;

function getProvice() {
    return new Promise((resolve, reject) => {
        axios.get('http://localhost:5000/get/provice/').then((result) => {
            resolve(result.data);
            for (let i = 0; i < result.data.length; i++) {
                provice.push(result.data[i])
            }
            console.log(result.data)
            resolve(result.data);
        })
    })
}
function getAmphur() {
    return new Promise((resolve, reject) => {
        axios.get('http://localhost:5000/get/amphur/').then((result) => {
            resolve(result.data);
            for (let i = 0; i < result.data.length; i++) {
                amphur.push(result.data[i])
            }
            console.log(result.data)
            resolve(result.data);
        })
    })
}
function getDistrict() {
    return new Promise((resolve, reject) => {
        axios.get('http://localhost:5000/get/district/').then((result) => {
            resolve(result.data);
            for (let i = 0; i < result.data.length; i++) {
                district.push(result.data[i])
            }
            console.log(result.data)
            resolve(result.data);
        })
    })
}
function removeAlloption(id) {
    console.log(id)
    var select = document.getElementById(id);
    var length = select.options.length;
    for (i = 0, c = 0; i < length; i++) {
        select.options[c] = null;
    }
}

//Address Buidding 

function wdistrictSelect(amphurId) {
    buiddingDistrict =[]
   
    for(let i = 0 ; i< district.length ; i++){
        if(district[i].AMPHUR_ID == amphurId && district[i].PROVINCE_ID == wProviceId){
            buiddingDistrict.push(district[i])
        }
    }
    removeAlloption('wSubdistrict')
    for (let i = 0; i < buiddingDistrict.length; i++) {
        var select = document.getElementById("wSubdistrict");
        var option = document.createElement("option");
        option.text = buiddingDistrict[i].DISTRICT_NAME;
        option.value = buiddingDistrict[i].DISTRICT_NAME;
        select.add(option);
    }
   
}
function wamphurSelect(proviceId) {
    buiddingAmphur =[]
    wProviceId = proviceId
    for(let i = 0 ; i< amphur.length ; i++){
        if(amphur[i].PROVINCE_ID == proviceId){
            buiddingAmphur.push(amphur[i])
        }
    }
    removeAlloption('wDistrict')
    for (let i = 0; i < buiddingAmphur.length; i++) {
        var select = document.getElementById("wDistrict");
        var option = document.createElement("option");
        option.text = buiddingAmphur[i].AMPHUR_NAME;
        option.value = buiddingAmphur[i].AMPHUR_ID;
        select.onchange = function () { wdistrictSelect(select.value) };
        select.add(option);
    }
   
}
function wchageProvice(proviceId){
    wamphurSelect(proviceId)
    wdistrictSelect(buiddingAmphur[0].AMPHUR_ID)
}
function wcreateSelectProvice(data) {
    for (let i = 0; i < data.length; i++) {
        var select = document.getElementById("wProvince");
        var option = document.createElement("option");
        option.text = data[i].PROVINCE_NAME;
        option.value = data[i].PROVINCE_ID;

        select.onchange = function () { wchageProvice(select.value) };
        select.add(option);
    }
}


//Address
function districtSelect(amphurId) {
    addressDistrict =[]
   
    for(let i = 0 ; i< district.length ; i++){
        if(district[i].AMPHUR_ID == amphurId && district[i].PROVINCE_ID == aProviceId){
            addressDistrict.push(district[i])
        }
    }
    removeAlloption('subdistrict')
    for (let i = 0; i < addressDistrict.length; i++) {
        var select = document.getElementById("subdistrict");
        var option = document.createElement("option");
        option.text = addressDistrict[i].DISTRICT_NAME;
        option.value = addressDistrict[i].DISTRICT_NAME;
        select.add(option);
    }
   
}
function amphurSelect(proviceId) {
    addressAmphur =[]
    aProviceId = proviceId
    for(let i = 0 ; i< amphur.length ; i++){
        if(amphur[i].PROVINCE_ID == proviceId){
            addressAmphur.push(amphur[i])
        }
    }
    removeAlloption('district')
    for (let i = 0; i < addressAmphur.length; i++) {
        var select = document.getElementById("district");
        var option = document.createElement("option");
        option.text = addressAmphur[i].AMPHUR_NAME;
        option.value = addressAmphur[i].AMPHUR_ID;
        select.onchange = function () { districtSelect(select.value) };
        select.add(option);
    }
   
}
function chageProvice(proviceId){
    amphurSelect(proviceId)
    districtSelect(addressAmphur[0].AMPHUR_ID)
}
function createSelectProvice(data) {
    for (let i = 0; i < data.length; i++) {
        var select = document.getElementById("province");
        var option = document.createElement("option");
        option.text = data[i].PROVINCE_NAME;
        option.value = data[i].PROVINCE_ID;

        select.onchange = function () { chageProvice(select.value) };
        select.add(option);
    }
}


//ฟังชันเริ่มต้น
function runForm() {
    getProvice().then((data) => {
        createSelectProvice(data)
        wcreateSelectProvice(data)

        getAmphur().then((data) =>{
            amphurSelect(1)
            wamphurSelect(1)
            getDistrict().then((districtTemp) =>{
                districtSelect(addressAmphur[0].AMPHUR_ID)
                wdistrictSelect(buiddingAmphur[0].AMPHUR_ID)
            })
        })
       
    })
   
}
function getProviceName(proviceId){
    for(let i = 0 ; i < provice.length ; i++){
        if(provice[i].PROVINCE_ID == proviceId){
            return provice[i].PROVINCE_NAME
        }
    }
}

function getAmphurName(amphurId){
    for(let i = 0 ; i < amphur.length ; i++){
        if(amphur[i].AMPHUR_ID == amphurId){
            return amphur[i].AMPHUR_NAME
        }
    }
}

runForm()