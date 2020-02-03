//รอ ไปแยก
let selectImageFile = 0
let maxImageFile = 4
// function checkPhoneInput(tagId) {
//     var text = document.getElementById(tagId).value
//     text = text.replace(/(\d{3})(\d{7})/, "$1-$2");
//     document.getElementById(tagId).value = text
// }
var totalFiles = [];
function handleFileSelect(evt) {
    var files = evt.target.files;
    for (var i = 0, f; f = files[i]; i++) {
        if (!f.type.match('image.*')) {
            continue;
        }
        if (selectImageFile < maxImageFile) {
            totalFiles.push(f)
            var reader = new FileReader();
            reader.onload = (function (theFile) {
                return function (e) {
                    var span = document.createElement('span');
                    span.innerHTML =
                        [
                            `<div class="col" style="width: 25%; height: 100%; ">
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
    }
}
function deleteImage() {
    var index = Array.from(document.getElementById('outputImage').children).indexOf(event.target.parentNode.parentNode)
    document.querySelector("#outputImage").removeChild(document.querySelectorAll('#outputImage span')[index]);
    totalFiles.splice(index, 1);
    document.getElementById('uploadFile').value = ''
    selectImageFile = selectImageFile - 1
}

const month = {
    'มกราคม': 1,
    'กุมภาพันธ์': 2,
    'เดือนมีนาคม': 3,
    'เมษายน': 4,
    'พฤษภาคม': 5,
    'มิถุนายน': 6,
    'กรกฎาคม': 7,
    'สิงหาคม': 8,
    'กันยายน': 9,
    'ตุลาคม': 10,
    'พฤศจิกายน': 11,
    'ธันวาคม': 12
}
// sortTable //
function sortTable(n, id, type) {
    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById(id);
    switching = true;
    dir = "asc";
    while (switching) {
        switching = false;
        rows = table.rows;
        for (i = 1; i < (rows.length - 1); i++) {
            shouldSwitch = false;
            x = rows[i].getElementsByTagName("TD")[n];
            y = rows[i + 1].getElementsByTagName("TD")[n];
            if (type === "date") {
                var tempdateX = x.innerHTML.split(' ')
                var tempdateY = y.innerHTML.split(' ')
                var dayX, dayY, monthX, monthY, yearX, yearY
                dayX = tempdateX[0]
                dayY = tempdateY[0]
                monthX = tempdateX[1]
                monthY = tempdateY[1]
                yearX = tempdateX[2]
                yearY = tempdateY[2]
                if (dir === "asc") {
                    if (yearX > yearY) {
                        shouldSwitch = true;
                        break;
                    } else if (yearX == yearY && month[monthX] > month[monthY]) {
                        shouldSwitch = true;
                        break;
                    } else if (yearX == yearY && month[monthX] == month[monthY] && dayX > dayY) {
                        shouldSwitch = true;
                        break;
                    }
                } else if (dir == "desc") {
                    if (yearX < yearY) {
                        shouldSwitch = true;
                        break;
                    } else if (yearX == yearY && month[monthX] < month[monthY]) {
                        shouldSwitch = true;
                        break;
                    } else if (yearX == yearY && month[monthX] == month[monthY] && dayX < dayY) {
                        shouldSwitch = true;
                        break;
                    }
                }
            } else if (type === "dateExp") {
                var tempX = x.innerHTML.split(' ')
                var tempY = y.innerHTML.split(' ')
                var dateX, dateY
                dateX = tempX[0]
                dateY = tempY[0]
                if (dir == "asc") {
                    if (dateX != 'หมดอายุ' && dateY != 'หมดอายุ') {
                        if (parseInt(dateX) > parseInt(dateY)) {
                            shouldSwitch = true;
                            break;
                        }
                    } else if (parseInt(tempX[1]) > parseInt(tempY[1])) {
                        shouldSwitch = true;
                        break;
                    }
                } else if (dir == "desc") {
                    if (dateX != 'หมดอายุ' && dateY != 'หมดอายุ') {
                        if (parseInt(dateX) < parseInt(dateY)) {
                            shouldSwitch = true;
                            break;
                        }
                    } else if (parseInt(tempX[1]) < parseInt(tempY[1])) {
                        shouldSwitch = true;
                        break;
                    }
                }
            } else {
                if (dir == "asc") {
                    if (x.innerHTML > y.innerHTML) {
                        shouldSwitch = true;
                        break;
                    }
                } else if (dir == "desc") {
                    if (x.innerHTML < y.innerHTML) {
                        shouldSwitch = true;
                        break;
                    }
                }
            }
        }
        if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
            switchcount++;
        } else {
            if (switchcount == 0 && dir == "asc") {
                dir = "desc";
                switching = true;
            }
        }
    }
}

// check phone //
function checkPhone(value, id) {
    let tempCheck = value.split("")
    if (tempCheck[0] === '-') {
        document.getElementById(id).value = '-'
    }
    if (tempCheck[0] != '0' && tempCheck != '-') {
        document.getElementById(id).value = ''
    }
    for (let i = 1; i < tempCheck.length; i++) {
        if (tempCheck[0] === '0') {
            if (tempCheck[1] === '0') {
                document.getElementById(id).value = '0'
            }
            if (tempCheck[i] === '-') {
                document.getElementById(id).value = value.slice(0, value.length - 1)
            }
        }
    }
}

function formatPhone(value) {
    if ((value.length === 1 && value === '-') || (value.slice(0, 1) === '0' && value.slice(1, 2) != 0 && value.length === 10 && !isNaN(value))) {
        return true
    } else {
        return false
    }
}

// format oderId //
function checkOrderNo(value, id) {
    let tempCheck = value.split("")
    // format_example = 00/2563  length = 7
    let formatCheck = ''
    for (let i = 0; i < tempCheck.length; i++) {

        if (i === 2) {
            if (tempCheck[2] === '/') {
                formatCheck = formatCheck + tempCheck[2]
                //     console.log(value.slice(0, value.length-1))
                // document.getElementById(id).value = value.slice(0, value.length-1) + '/'
            } else {
                formatCheck = formatCheck + '/'
            }

        } else {
            if (!isNaN(tempCheck[i])) {
                formatCheck = formatCheck + tempCheck[i]
            }
        }
    }
    document.getElementById(id).value = formatCheck
}

// logout system//
function exitPage() {
    Swal.fire({
        title: "สำนักงานเทศบาล",
        html: "ต้องการออกจากระบบหรือไม่",
        showCancelButton: true,
        customClass: 'swal-height',
        confirmButtonColor: "#009688",
        confirmButtonText: "ใช่",
        cancelButtonText: "ไม่ใช่",
        cancelButtonColor: '#dc3545',
        closeOnConfirm: false,
        closeOnCancel: false
    })
        .then((result) => {
            if (result.value) {
                document.getElementById('exitMenu').classList.add('disableds')
                logout()
            }
        });
}
function logout() {
    location.replace("/logout")
}

// top menu //
function disableMenuAll() {
    document.getElementById('addMenu').classList.add('disableds')
    document.getElementById('saveMenu').classList.add('disableds')
    document.getElementById('editMenu').classList.add('disableds')
    document.getElementById('restoreMenu').classList.add('disableds')
    document.getElementById('deleteMenu').classList.add('disableds')
}
function enableMenu(id) {
    document.getElementById(id).classList.remove('disableds')
}

// set form disable //

function enableFunction() {
    document.getElementById("disable").disabled = true;
}
function disableFunction() {
    document.getElementById("disable").disabled = false;
}

// reset form 
function resetFunction() {
    document.getElementById("form").reset();
}

// food train 
function enFood() {
    document.getElementById("disableFood").disabled = false;
}
function disFood() {
    document.getElementById("disableFood").disabled = true;
}

// move to request page by type
function toRequest(value) {
    let type = ''

    if (value.path != undefined) {
        type = value
    } else {
        type = value.path[0].textContent
    }

    switch (type) {
        case 'กิจการฌาปณสถาน':
            window.location.href = '../request/request_crematory.html'
            break;
        case 'กิจการที่เป็นอันตรายต่อสุขภาพ':
            window.location.href = '../request/request_health_danger.html'
            break;
        case 'ใบอนุญาตให้ใช้สถานที่เป็นตลาดเอกชน':
            window.location.href = '../request/request_market.html'
            break;
        case 'หนังสือรับรองการแจ้งจัดตั้งสถานที่สะสมอาหาร':
            window.location.href = '../request/request_area_less_correct.html'
            break;
        case 'หนังสือรับรองการแจ้งจัดตั้งสถานที่จำหน่ายอาหาร':
            window.location.href = '../request/request_area_less_sell.html'
            break;
        case 'ใบอนุญาตจัดจัดตั้งสถานที่สะสมอาหาร':
            window.location.href = '../request/request_area_more_correct.html'
            break;
        case 'ใบอนุญาตจัดตั้งสถานที่จำหน่ายอาหาร':
            window.location.href = '../request/request_area_more_sell.html'
            break;
        case 'ใบอนุญาตเร่ขายสินค้าในที่หรือทางสาธารณะ':
            window.location.href = '../request/request_public_hawk.html'
            break;
        default:
            //ใบอนุญาตจำหน่ายสินค้าในที่หรือทางสาธารณะ
            window.location.href = '../request/request_public_sell.html'
            break;
    }
}

//check  object isEmpty
function isEmpty(arg) {
    for (var item in arg) {
        return false;
    }
    return true;
}