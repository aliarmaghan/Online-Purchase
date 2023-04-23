var userList;
$(function () {


    //click event opening popup
    $('#btnAdd').click(function () {
        /*$("#roleError").text("");*/

        $('#exampleModalLabel').text('');
        $('#exampleModalLabel').text('Add Size Type');
        $('#btnAddUpdate').text('');
        $('#btnAddUpdate').text('Submit');
        $('#AddUpdateSizeMT').modal('show');
    });


    // click event form add and update
    $('#btnAddUpdate').click(function (event) {
        event.preventDefault();
        debugger
        // second way to validate if element contains form element
        if ($('#formSizeMT').valid()) {
            let flagCheckType = true;


            $.map(userList, function (v, i) {

                if (v.Size_Type.toLowerCase() === $('#Size_Type').val().toLowerCase()) {
                    flagCheckType = false;
                }
            })


            if (flagCheckType == false) {

                $.toast({
                    heading: "Duplicate Data",
                    text: $('#Size_Type').val() + " is already added.",
                    showHideTransition: 'slide',
                    icon: "error",
                    position: 'top-right',
                });

                return false;
            }

            // checking if exist




            let isActive = false;
            let sizeType = $('#Size_Type').val();
            let sizeId = $('#hdnSizeMT').val();

            if (sizeId == "" || sizeId == undefined) {
                sizeId = 0;
            }


            if ($('#IS_ACTIVE').is(':checked')) {

                isActive = true;
            }

            const obj = {
                Size_Type: sizeType,
                IS_ACTIVE: isActive,
                Size_Id: parseInt(sizeId)
            }
            //var ans = dupValidate(obj)
            $('#tableSizeMT').DataTable();
            //if (ans == false) {
            addSizeMT(obj);
            //}

        }
    });

    // close event
    $('.btnClose').click(function () {
        resetForm();
        $('#AddUpdateSizeMT').modal('hide');
    });
    debugger;
    var result = getSizeMTData(0);
    result = JSON.parse(result)
    userList = JSON.parse(result.Data);
    console.log(userList)
    $('#tableSizeMT').DataTable();



});


// add SizeMT
function addSizeMT(sizeMTData) {
    debugger
    $.ajax({
        type: 'POST',
        url: "/admin/master/AddSizeMT",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify(sizeMTData),
        //headers: {
        //    'X-XSRF-TOKEN': getCookie("XSRF-TOKEN"),
        //},
        success: function (result) {
            //console.log(result);
            //console.log(result.StatusCode);
            //console.log(result.Message);
            resetForm();
            $('#hdnCategId').val('');
            if (result.StatusCode == 200) {
                $.toast({
                    heading: "Success",
                    text: result.Message,
                    showHideTransition: 'slide',
                    icon: "success",
                    position: 'top-right',
                });

                //calling all the data
                setTimeout(function () {

                    getSizeMTData(0);

                }, 500);
            }
            else {
                $.toast({
                    heading: "Error",
                    text: result.Message,
                    showHideTransition: 'slide',
                    icon: "error",
                    position: 'top-right',
                });
            }
            $('#AddUpdateSizeMT').modal('hide');
        },
        error: function () {
            $.toast({
                heading: "Error",
                text: "Error : Request could not be processed. Try again Later",
                showHideTransition: 'slide',
                icon: "error",
                position: 'top-right',
            });
            $('#AddUpdateSizeMT').modal('hide');
        }
    });
}

// get getSizeMTData
function getSizeMTData(id) {
    debugger
    return $.ajax({
        type: 'GET',
        url: "/admin/master/GetSizeMTList?id=" + id + "",
        contentType: "application/json",
        dataType: "json",
        async: false,
        //data: JSON.stringify(categData),

        //headers: {
        //    'X-XSRF-TOKEN': getCookie("XSRF-TOKEN"),
        //},
        success: function (result) {
            //console.log(result);
            //console.log(result.StatusCode);
            //console.log(result.Message);
            //console.log(result.Data);
            //console.log(JSON.parse(result.Data));

            //userList = JSON.parse(result.Data);
            //calling function bind the data
            bindTable(JSON.parse(result.Data));

            //userList = JSON.parse(result.Data);


            if (result.StatusCode == 200) {
                $.toast({
                    heading: "Success",
                    text: result.Message,
                    showHideTransition: 'slide',
                    icon: "success",
                    position: 'top-right',
                });
            }
            else {
                $.toast({
                    heading: "Error",
                    text: result.Message,
                    showHideTransition: 'slide',
                    icon: "error",
                    position: 'top-right',
                });
            }
            $('#AddUpdateSizeMT').modal('hide');
        },
        error: function () {
            $.toast({
                heading: "Error",
                text: "Error : Request could not be processed. Try again Later",
                showHideTransition: 'slide',
                icon: "error",
                position: 'top-right',
            });
            $('#AddUpdateSizeMT').modal('hide');
        }
    }).responseText;
}



//bind table
function bindTable(data) {

    debugger;
    let dynamicString = '';
    dynamicString += '<table class="table table-hover" id="tableSizeMT">';
    dynamicString += '<thead>';
    dynamicString += '<tr>';
    dynamicString += '<th>Size Type</th>';
    dynamicString += '<th>Created Date</th>';
    dynamicString += '<th>Created By</th>';
    dynamicString += '<th>Is Active</th>';
    dynamicString += '<th>Action</th>';
    dynamicString += '</tr>';
    dynamicString += '</thead>';
    dynamicString += '<tbody>';
    if (data.length > 0) {
        $.each(data, function (key, val) {
            dynamicString += '<tr>';
            dynamicString += '<td>' + val.Size_Type + '</td>';
            dynamicString += '<td>' + val.MODIFIED_DATE + '</td>';
            dynamicString += '<td>' + val.MODIFIED_BY + '</td>';
            dynamicString += '<td>' + val.IS_ACTIVE + '</td>';
            dynamicString += '<td>';
            dynamicString += '<a href = "#" class="btnEdit" data-szmtid=' + val.Size_Id + ' > <i class="mdi mdi-grease-pencil text-primary"></i></a>';
            dynamicString += '&nbsp;&nbsp;&nbsp;<a href="#" class="btnDelete" data-szmtid=' + val.Size_Id + '><i class="mdi mdi-delete text-danger"></i></a >';
            dynamicString += '</td >';
            dynamicString += '</tr>';
        });
    }
    dynamicString += '</tbody >';
    dynamicString += '</table>';
    $('#divSizeMT').html("");
    $('#divSizeMT').html(dynamicString);


    $('#tableSizeMT').DataTable();

    //CLICK EVENT FOR EDIT
    $('.btnEdit').click(function (e) {
        e.preventDefault();
        const szmtId = parseInt(e.currentTarget.dataset.szmtid);
        geteditdata(szmtId);

    });

    ////CLICK EVENT FOR DELETE
    $('.btnDelete').click(function (e) {
        e.preventDefault();
        const szmtId = parseInt(e.currentTarget.dataset.szmtid);
        deleteSzMt(szmtId)

        setTimeout(function () {

            getSizeMTData(0);

        }, 500);
    });

}


// get edit 
function geteditdata(id) {

    $.ajax({
        type: 'GET',
        url: "/admin/master/GetSizeMTList?id=" + id + "",
        contentType: "application/json",
        dataType: "json",
        success: function (result) {
            //ressting the form
            resetForm();
            $('#exampleModalLabel').text('');
            $('#exampleModalLabel').text('Update Size Type');
            $('#btnAddUpdate').text('');
            $('#btnAddUpdate').text('Update');

            // setting the data to modal popup
            let data = JSON.parse(result.Data);
            let szmtObj = data[0];
            console.log(szmtObj);
            $('#Size_Type').val(szmtObj.Size_Type);
            $('#IS_ACTIVE').prop('checked', szmtObj.IS_ACTIVE);
            $('#hdnCategId').val(szmtObj.Size_Id)
            $('#AddUpdateSizeMT').modal('show');


        },
        error: function () {
            $.toast({
                heading: "Error",
                text: "Error : Request could not be processed. Try again Later",
                showHideTransition: 'slide',
                icon: "error",
                position: 'top-right',
            });

        }
    });


}

//RESETTING THE FORM ELEMENT
function resetForm() {
    ///resetting all the fields inside the form
    $('#AddUpdateSizeMT').find('form').trigger('reset');
    // removing validation when closing popup
    $('#formSizeMT').find('span.text-danger.field-validation-valid').html("");


}

// DELETE THE RECORD
function deleteSzMt(id) {
    $.ajax({
        type: 'POST',
        url: "/admin/master/DeleteSizeMT?id=" + id + "",
        contentType: "application/json",
        dataType: "json",
        success: function (result) {
            //ressting the form
            resetForm();

            $.toast({
                heading: "Warning",
                text: result.Message,
                showHideTransition: 'slide',
                icon: "warning",
                position: 'top-right',
            });


        },
        error: function () {
            $.toast({
                heading: "Error",
                text: "Error : Request could not be processed. Try again Later",
                showHideTransition: 'slide',
                icon: "error",
                position: 'top-right',
            });

        }
    });
}


function dupValidate(obj) {
    var rv = true;
    debugger
    $.ajax({
        type: 'GET',
        url: "/admin/master/GetSizeMTList",
        contentType: "application/json",
        dataType: "json",

        success: function (result) {
            //console.log(result);
            //console.log(result.StatusCode);
            //console.log(result.Message);
            //console.log(result.Data);
            //console.log(JSON.parse(result.Data));

            userList = JSON.parse(result.Data);
            //console.log(userList);
            //$for(let i = 0; i < userList.length; i++){
            //    if (value.Size_Type == obj.Size_Type) {
            //        $.toast({
            //            heading: "Error",
            //            text: "Duplicate Data",
            //            showHideTransition: 'slide',
            //            icon: "warning",
            //            position: 'top-right',
            //        });
            //        //$("#Size_Type").focus(function () {
            //        //    $(this).addClass("focused");
            //        //});

            //        $('#AddUpdateSizeMT').modal('show');
            //        rv = true;
            //        alert(rv);

            //    } else {
            //        rv = false;
            //        alert(rv);

            //    }
            //    return rv;
            //}
            $.each(userList, function (index, value) {
                console.log(value.Size_Type);
                console.log(obj.Size_Type);
                if (value.Size_Type == obj.Size_Type) {
                    $.toast({
                        heading: "Duplicate Data",
                        text: "You can't insert duplicate data",
                        showHideTransition: 'slide',
                        icon: "warning",
                        position: 'top-right',
                    });
                    //$("#Size_Type").focus(function () {
                    //    $(this).addClass("focused");
                    //});

                    $('#AddUpdateSizeMT').modal('hide');
                    rv = true;
                    alert(rv);

                } else {
                    rv = false;
                    alert(rv);

                }
                return rv;
            });

            //else {
            //    $.toast({
            //        heading: "Error",
            //        text: result.Message,
            //        showHideTransition: 'slide',
            //        icon: "error",
            //        position: 'top-right',
            //    });
            //}

        },
        error: function () {
            $.toast({
                heading: "Error",
                text: "Error : Request could not be processed. Try again Later",
                showHideTransition: 'slide',
                icon: "error",
                position: 'top-right',
            });
            $('#AddUpdateSizeMT').modal('hide');
        }

    });
}



//function returnType(1) {

//    if (1 == 1) {
//        return true;
//    }
//    else {
//        return false;
//    }

//}