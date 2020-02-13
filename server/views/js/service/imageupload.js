let selectImageFile = 0
let fileImage = []
var totalFiles = [];
let files
let filePdf = {
    name: '',
    data: ''
  }
let testInsertRequest = {
    no: '',
    year: '2563',
    personal_id_owner: 'P000001',
    request_type_id: 15,
    staff_id_alderman: 'S0001',
    establishment_id: '',
    staff_id_money: 'S0001',
    reference_id: 'YES',
    train_id: 'YES',
    personal_id_assistant: '',
    staff_id_approve: 'S0001',
    menu: 'ใบอนุญาตจัดตั้งสถานที่จำหน่ายอาหาร',
    date_submission: '30-05-2563',
    date_approve: '30-05-2563',
    doc_no1: 'N',
    doc_no2: 'N',
    doc_no3: 'Y',
    doc_no4: 'Y',
    doc_no5: 'Y',
    doc_no6: 'Y',
    subcategory: '',
    product_type: '',
    sell_start: '13:48:00.000',
    sell_end: '13:48:00.000',
    sell_allow: 'Y',
    receipt_order: '',
    receipt_fine: 10,
    receipt_fee: 15.5,
    receipt_total: '',
    //
    receipt_date: '30-05-2563',
    date_issued: '30-05-2563',
    date_expired: '30-05-2563',
    //
    condition_no_1: '',
    condition_no_2: '',
    condition_no_3: '',
    condition_no_4: '',
    image_name: '',
    total_image: 0,
    status: '',
    delete_logic: '',
    is_deleted: '',
    last_update: '20-05-2563',
    user_update: 'ADMIN'
  
  }
  let testE = {
    id: '',
    address_id: 'SAVE',
    perosonal_id: 'P000001',
    is_land_owned: 'YES',
    type: '',
    name: '',
    machine_size: 15,
    area_size: 15.5,
    worker: 77.5,
    phone: '-',
    fax: '',
    grond: ''
  }
  let address = {
    id: "",
    home_number: 'test',
    moo: 'test',
    trxk: 'test',
    sxy: '',
    building: '',
    road: '',
    district_name: 'test',
    amphur_name: 'test',
    province_name: 'test'
  }
  let address2 = {
    id: "",
    home_number: 'test',
    moo: 'test',
    trxk: 'test',
    sxy: 'test',
    building: 'test',
    road: 'test',
    district_name: 'test',
    amphur_name: 'test',
    province_name: 'test'
  }
  let land = {
    id: "",
    address_id: "",
    title: 'test',
    name: 'test',
    surname: 'test',
    birthday: "",
    phone: "-",
  }
  let referecneData = {
    id: '',
    title: 'นาย',
    name: 'แชมป์',
    surname: 'แชมป์',
    status: 'น้อง',
    phone: '0616577015'
  }
  let trianData = {
    id: '',
    issuse: 'สำนักงานเทศบาล',
    date_exp: '02-05-2541',
    date_issued: '02-05-2563'
  }
  let inAddress = {
    is_address_changed:false,
    id: "",
    home_number: "-",
    moo: '',
    trxk: '',
    sxy: '',
    building: '',
    road: '',
    district_name: "",
    amphur_name: "",
    province_name: ""
};
let inPersonal = {
    is_personal_changed:false,
    id: "",
    address_id: "",
    title: "",
    type: "",
    name: "",
    surname: "",
    nationality: '',
    race: '',
    birthday: '',
    personal_id: "",
    card_issued: "",
    card_expipe: '',
    phone: "",
    fax: ''
};
function handleFileSelect(evt) {
    var files = evt.target.files;
    for (var i = 0, f; f = files[i]; i++) {
        if (!f.type.match('image.*')) {
            continue;
        }
        if (selectImageFile < 8) {
            totalFiles.push(f)
            var reader = new FileReader();
            reader.onload = (function (theFile) {
                return function (e) {
                    var span = document.createElement('span');
                    span.innerHTML =
                        [
                            `<div class="col" style="width: 25%; height: 50%; ">
                <img 
                width=100% 
                height=85% 
                src="`
                            , e.target.result,
                            '" title="', escape(theFile.name), '"/>'
                            , "<br><button type='button' class='delete image'" +
                            "onclick='deleteImage()' >ลบรูปภาพนี้</button>", "</div>"
                        ].join('');

                    document.getElementById('outputImage').insertBefore(span, null);
                };
            })(f);
            reader.readAsDataURL(f);
            selectImageFile = selectImageFile + 1
          
        }
        console.log(totalFiles)
    }
}
function deleteImage() {
    var index = Array.from(document.getElementById('outputImage').children).indexOf(event.target.parentNode.parentNode)
    document.querySelector("#outputImage").removeChild(document.querySelectorAll('#outputImage span')[index]);
    totalFiles.splice(index, 1);
    document.getElementById('uploadFile').value = ''
    selectImageFile = selectImageFile - 1
    console.log(totalFiles)
}
function searchImage(){

}
function insetImage() {
    return new Promise((resolve, reject) => {
        console.log("insertToDatabase");
        var formData = new FormData();
        for( var i = 0; i < totalFiles.length; i++ ){
            let file = totalFiles[i];
            console.log(file);
            formData.append('files'+i, file);
        }
        formData.append('maxSizeImage', totalFiles.length)
        axios.post("http://localhost:5000/insert/request", formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
            .then(data => {
                return resolve(data.data);
            });
    });
}


function pdfFile(evt) {
    files = evt.target.files[0];
    console.log(files)
}
function preInsert(){
    let arrayItem = []
    // request, personal, Edata, address, land, addressOwner, file, reference, train
    //personal เป็น  array  index ที่ 0 เป็น personal , index ที่ 1 เป็น address 
    let personalArray =[]
    personalArray.push(inPersonal)
    personalArray.push(inAddress)

    arrayItem.push(testInsertRequest) // request 0
    arrayItem.push(personalArray) // personal 1 
    arrayItem.push(testE) // Edata 2 
    arrayItem.push(address) // address 3
    arrayItem.push(land) // land 4
    arrayItem.push(address2) // addressOwner 5
    arrayItem.push(filePdf) // file 6
    arrayItem.push(referecneData) // reference 7
    arrayItem.push(trianData) // train 8
    return arrayItem
}
function insertE() {
    return new Promise((resolve, reject) => {
        console.log("insertToDatabase");
        var formData = new FormData();
        formData.append('files', files);
       
        formData.append("gropData", JSON.stringify(preInsert()));
        axios.post("http://localhost:5000/insert/request", formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
            .then(data => {
                return resolve(data.data);
            });
    });
}