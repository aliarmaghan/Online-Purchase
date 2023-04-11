let userList;
$(function () {
    //click event opening popup
    $('#btnAdd').click(function () {
        /*$("#roleError").text("");*/

        $('#exampleModalLabel').text('');
        $('#exampleModalLabel').text('Add Size MT');
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

            $('#tableCategory').DataTable();
            addSizeMT(obj);
        }
    });

    // close event
    $('.btnClose').click(function () {
        //resetForm();
        $('#AddUpdateSizeMT').modal('hide');
    });

    //getCategoryData(0);
    $('#tableCategory').DataTable();
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

                    getCategoryData(0);

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



// get categoryData
function getSizeMTData(id) {
    debugger
    $.ajax({
        type: 'GET',
        url: "/admin/master/GetSizeMTList?id=" + id + "",
        contentType: "application/json",
        dataType: "json",
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

            userList = JSON.parse(result.Data);
            //calling function bind the data
            bindTable(userList);

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
    });
}


//bind table
function bindTable(data) {
    debugger;
    if (data.length > 0) {
        let dynamicString = '';

        dynamicString += '<table class="table table-hover" id="tableCategory">';
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
        $.each(data, function (key, val) {

            dynamicString += '<tr>';
            dynamicString += '<td>' + val.Size_Type + '</td>';
            dynamicString += '<td>' + val.MODIFIED_DATE + '</td>';
            dynamicString += '<td>' + val.MODIFIED_BY + '</td>';
            dynamicString += '<td>' + val.IS_ACTIVE + '</td>';
            dynamicString += '<td>';
            dynamicString += '<a href = "#" class="btnEdit" data-categId=' + val.Size_Id + ' > <i class="mdi mdi-grease-pencil text-primary"></i></a>';
            dynamicString += '&nbsp;&nbsp;&nbsp;<a href="#" class="btnDelete" data-categId=' + val.Size_Id + '><i class="mdi mdi-delete text-danger"></i></a >';
            dynamicString += '</td >';
            dynamicString += '</tr>';
        });
        dynamicString += '</tbody >';
        dynamicString += '</table>';
        $('#divSizeMT').html("");
        $('#divSizeMT').html(dynamicString);


        $('#tableCategory').DataTable();

        // CLICK EVENT FOR EDIT
        //$('.btnEdit').click(function (e) {
        //    e.preventDefault();
        //    const categoryId = parseInt(e.currentTarget.dataset.categid);
        //    geteditdata(categoryId);

        //});

        ////CLICK EVENT FOR DELETE
        //$('.btnDelete').click(function (e) {
        //    e.preventDefault();
        //    const categoryId = parseInt(e.currentTarget.dataset.categid);
        //    deleteCateg(categoryId)

        //    setTimeout(function () {

        //        getCategoryData(0);

        //    }, 500);
        //});

    }

}


//RESETTING THE FORM ELEMENT
function resetForm() {
    ///resetting all the fields inside the form
    $('#AddUpdateCategory').find('form').trigger('reset');
    // removing validation when closing popup
    $('#formCategory').find('span.text-danger.field-validation-valid').html("");


}