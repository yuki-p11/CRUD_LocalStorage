var emptyrow="<tr><td colspan='6' class='text-center'>No records availlable</td></tr>"

$(document).ready(function(){
    // $("#yform").submit(function(event){
    //     event.preventDefault();
    //     if(isValid()){
    //         $(this).submit();
    //     }
    //     else{alert("Enter valid shit");}
    // });

    loadDataFromLocal();

    $("#tblData").on("click",".btn-edit",function(){
        const name=$(this).parent().parent().find(".txtName").html();
        const contact=$(this).parent().parent().find(".txtContact").html();
        const id = $(this).parent().parent().find(".txtName").attr("data-id");
        $("#txtName").val(name);
        $("#txtContact").val(contact);
        $("#txtid").val(id);
        $("#btnSave").text("Update");
    });

    $("#tblData").on("click",".btn-delete",function(){
        const id=$(this).parent().parent().find(".txtName").attr("data-id");
        DeleteDataLocal(id);
    });

    $(".form-row").submit(function(event){
        event.preventDefault();
        if(isValid()){
            $(this).submit();
        }
        else{alert("Enter valid shit");}
    });

    // $("#btnSave").click(
    //     function(){

    //         if($("#txtid").val()==''){adddatatolocal();}
    //         else{updateDataLocal();}
    //     }
    // );

    $("#btnSave").click(function() {
        if ($("#txtName").val() === "" || $("#txtContact").val() === "") {
            alert("Please enter valid data.");
        }
        else if($("#txtContact").val().length!=10) { alert("Please enter valid contact.");} 
        else {
            if ($("#txtid").val() == '') {
                adddatatolocal();
            } else {
                updateDataLocal();
            }
        }
    });
    
    $("#btnClear").click(
        function(){
            clearform();
        }
    );
});

$('#txtName').click(
    function() {
      $(this).stop().animate({ opacity: 0.5}, 300);
    },
    function() {
      $(this).stop().animate({ opacity: 1 }, 300);
    }
);


$('#txtContact').keyup(function () {
 this.value = this.value.replace(/[^0-9]/g,'');
});

$('#txtContact').on('input', function() {
    $(this).val($(this).val().replace(/\D/g, '').substring(0, 10));
});

//Functions Implementations

function clearform(){
    $("#txtName").val("");
    $("#txtContact").val("");
    $("#btnSave").val("Add");
}

function addemptyrow(){
    if($("#tblData tbody").children().children().length==0){
        $("#tblData tbody").append(emptyrow);
    }
}

function loadDataFromLocal(){
    let ld=localStorage.getItem('localData');
    if(ld){
        $("#tblData tbody").html("");
        let la=JSON.parse(ld);
        let index=1;
        la.forEach(element =>{
            let dynamicRow="<tr>";
                dynamicRow= dynamicRow+"<td class='text-center'>"+index+"</td>";
                dynamicRow= dynamicRow+"<td class='txtName text-center' data-id ="+element.id +">" +element.name+"</td>";
                dynamicRow= dynamicRow+"<td class='txtContact text-center' >" +element.contact+"</td>";
                dynamicRow= dynamicRow+"<td class='action text-center'>";
                dynamicRow = dynamicRow + "<button class='btn btn-sm btn-dark btn-edit'> Edit</button>";
                dynamicRow = dynamicRow + "&nbsp;";
                dynamicRow = dynamicRow + "<button class='btn btn-sm btn-danger btn-delete'> Delete</button>";
                dynamicRow= dynamicRow+"</td>";
                dynamicRow= dynamicRow+"</tr>";
                $("#tblData tbody").append(dynamicRow);
                index++;
                })
            }
                addemptyrow();
        }

function adddatatolocal() {
        let ld = localStorage.getItem('localData');
        let la = ld ? JSON.parse(ld) : []; // Initialize to an empty array if no data is present
        const obj = {
            id: la.length + 1,
            name: $("#txtName").val(),
            contact: $("#txtContact").val()
        };
        la.push(obj);
        localStorage.setItem('localData', JSON.stringify(la));
        loadDataFromLocal();
        clearform();
    }

function adddatatolocal() {
        let ld = localStorage.getItem('localData');
        let la = ld ? JSON.parse(ld) : []; // Initialize to an empty array if localData doesn't exist
      
        const obj = {
          id: la.length + 1,
          name: $("#txtName").val(),
          contact: $("#txtContact").val()
        };
      
        la.push(obj);
        localStorage.setItem('localData', JSON.stringify(la));
        loadDataFromLocal();
        clearform();
      }   

// function adddatatolocal(){
//     let ld=localStorage.getItem('localData');
//     if(ld){
//         let la=JSON.parse(ld);
//         const obj={
//             id:la.length+1,
//             name:$("#txtName").val(),
//             contact:$("#txtContact").val()
//         };
//         la.push(obj);
//         localStorage.setItem('localData',JSON.stringify(la));
//         loadDataFromLocal();
//         addemptyrow();
//     }
//     clearform();

// }

function updateDataLocal(){
    let ld=localStorage.getItem('localData');
    let la=JSON.parse(ld);
    const old=la.find(m=>m.id==$("#txtid").val());
    old.name=$("#txtName").val();
    old.contact=$("#txtContact").val();
    localStorage.setItem('localData',JSON.stringify(la));
    loadDataFromLocal();
    clearform();

}

function DeleteDataLocal(id){
    let ld=localStorage.getItem('localData');
    let la=JSON.parse(ld);
    let i=0;
    while(i<la.length){
        if(la[i].id==Number(id)){
            la.splice(i,1);
        }
        else{
            ++i;
        }
    }
    localStorage.setItem('localData',JSON.stringify(la));
    loadDataFromLocal();
}


function isValid(){
    let name= $("#txtName").val();
    let contact=$("#txtContact").val();
    if(name==="" || contact===""){
        return false;
    }
    return true;
}