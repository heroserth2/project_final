var data = false
var deleteData = false
//import swal from '../node_modules/sweetalert';

function addTEST() {
    deleteData=false
    data=false  
    disFunction()
    disableMenuAll()
        enableMenu('saveMenu')
}
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

function insertTEST() {
    // var a = confirm("ต้องการบันทึกหรือไม่")
    // if (a) {
        // data = true
        // disableMenuAll()
        // enableMenu('addMenu')
        // enableMenu('editMenu')
        // enableMenu('deleteMenu')
        // enableFunction()
    // }
    swal("Hello world!");
    // Swal.fire({
    //     title: "สำนักงานเทศบาล", 
    //     html: "ต้องการบันทึกหรือไม่",  
    //     showCancelButton: true,
    //     confirmButtonColor: "#009688",
    //     confirmButtonText: "Yes",
    //     cancelButtonText: "No",
    //     cancelButtonColor: '#dc3545',
    //     closeOnConfirm: false,
    //     closeOnCancel: false
    //   })
    //   .then((result) => {
    //     if (result.value) {
    //         Swal.fire("บันทึกสำเร็จ", {
    //         icon: "success",
    //         confirmButtonColor: "#009688",
    //         closeOnConfirm: false
    //       });
    //       data = true
    //       disableMenuAll()
    //       enableMenu('addMenu')
    //       enableMenu('editMenu')
    //       enableMenu('deleteMenu')
    //       enableFunction()
    //     } else if (result.dismiss === Swal.DismissReason.cancel) {
    //         Swal.fire("บันทึกล้มเหลว");
    //     }
    //   });
}
function editTEST(){
    if(!deleteData){
        disableMenuAll()
        enableMenu('saveMenu')
        disFunction()  
    }else{
        alert('ข้อมูลอยู่ในสถานะลบแล้ว')
    }
}

function deleteTEST(){
    deleteData = true
    disableMenuAll()
    enableMenu('addMenu')
    enableMenu('editMenu')
    enableMenu('restoreMenu')
}

function restoreTEST(){
    deleteData = false
    disableMenuAll()
    enableMenu('addMenu')
    enableMenu('editMenu')
    enableMenu('deleteMenu')
}
