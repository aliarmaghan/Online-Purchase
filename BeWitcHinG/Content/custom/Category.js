let userList;
$(function () {
    //click event opening modal popup
    $('#btnAdd').click(function () {
        /*$("#roleError").text("");*/

        $('#exampleModalLabel').text('');
        $('#exampleModalLabel').text('Add Category');
        $('#btnAddUpdate').text('');
        $('#btnAddUpdate').text('Submit');
        $('#AddUpdateCategory').modal('show');
    });


    // click event form add and update
    $('#btnAddUpdate').click(function (event) {
        event.preventDefault();
        debugger
        // second way to validate if element contains form element
        if ($('#formCategory').valid()) {

            let isActive = false;
            let categoryName = $('#CATEGORY_NAME').val();
            let categoryCode = $('#CATEGORY_CODE').val();
            let categoryId = $('#hdnCategId').val();

            if (categoryId == "" || categoryId == undefined) {
                categoryId = 0;
            }


            if ($('#IS_ACTIVE').is(':checked')) {

                isActive = true;
            }

            const obj = {
                CATEGORY_NAME: categoryName,
                CATEGORY_CODE: categoryCode,
                IS_ACTIVE: isActive,
                CATEGORY_ID: parseInt(categoryId)
            }

            $('#tableCategory').DataTable();
            addCategory(obj);


            //console.log(obj);
            // console.log("isactive :" + isActive + " categName: " + categoryName + " code: " + categoryCode);
        }
        // ------ first way to validate
        //if (categoryName == "" || categoryName == undefined) {
        //    $.toast({
        //        heading: "Error",
        //        text: "Please enter category name",
        //        showHideTransition: 'slide',
        //        icon: "error",
        //        position: 'top-right',
        //    })
        //    return false;
        //}

    });

    // close event
    $('.btnClose').click(function () {
        resetForm();
        $('#AddUpdateCategory').modal('hide');
    });

    getCategoryData(0);
    $('#tableCategory').DataTable();

});
// NOTE : To modify or get data in client site  we have to parse(i.e Json.parse) it in object.  we cant read data which is in string in client site programming


// add category
function addCategory(categData) {
    debugger
    $.ajax({
        type: 'POST',
        url: "/admin/master/addcategory",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify(categData),
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
            $('#AddUpdateCategory').modal('hide');
        },
        error: function () {
            $.toast({
                heading: "Error",
                text: "Error : Request could not be processed. Try again Later",
                showHideTransition: 'slide',
                icon: "error",
                position: 'top-right',
            });
            $('#AddUpdateCategory').modal('hide');
        }
    });
}



// get categoryData
function getCategoryData(id) {
    debugger
    $.ajax({
        type: 'GET',
        url: "/admin/master/getcategorylist?id=" + id + "",
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
            console.log(result.Data);
            console.log(JSON.parse(result.Data));

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
            $('#AddUpdateCategory').modal('hide');
        },
        error: function () {
            $.toast({
                heading: "Error",
                text: "Error : Request could not be processed. Try again Later",
                showHideTransition: 'slide',
                icon: "error",
                position: 'top-right',
            });
            $('#AddUpdateCategory').modal('hide');
        }
    });
}



//bind table
function bindTable(data) {
    debugger;
    let dynamicString = '';
    dynamicString += '<table class="table table-hover" id="tableCategory">';
    dynamicString += '<thead>';
    dynamicString += '<tr>';
    dynamicString += '<th>Category</th>';
    dynamicString += '<th>Code</th>';
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
            dynamicString += '<td>' + val.CATEGORY_NAME + '</td>';
            dynamicString += '<td>' + val.CATEGORY_CODE + '</td>';
            dynamicString += '<td>' + val.MODIFIED_DATE + '</td>';
            dynamicString += '<td>' + val.MODIFIED_BY + '</td>';
            dynamicString += '<td>' + val.IS_ACTIVE + '</td>';
            dynamicString += '<td>';
            dynamicString += '<a href = "#" class="btnEdit" data-categId=' + val.CATEGORY_ID + ' > <i class="mdi mdi-grease-pencil text-primary"></i></a>';
            dynamicString += '&nbsp;&nbsp;&nbsp;<a href="#" class="btnDelete" data-categId=' + val.CATEGORY_ID + '><i class="mdi mdi-delete text-danger"></i></a >';
            dynamicString += '</td >';
            dynamicString += '</tr>';
        });
    }
    dynamicString += '</tbody >';
    dynamicString += '</table>';
    $('#divCateg').html("");
    $('#divCateg').html(dynamicString);


    $('#tableCategory').DataTable();

    // CLICK EVENT FOR EDIT
    $('.btnEdit').click(function (e) {
        e.preventDefault();
        const categoryId = parseInt(e.currentTarget.dataset.categid);
        geteditdata(categoryId);

    });

    //CLICK EVENT FOR DELETE
    $('.btnDelete').click(function (e) {
        e.preventDefault();
        const categoryId = parseInt(e.currentTarget.dataset.categid);
        deleteCateg(categoryId)

        setTimeout(function () {

            getCategoryData(0);

        }, 500);
    });

}


// get category on edit
function geteditdata(id) {

    $.ajax({
        type: 'GET',
        url: "/admin/master/getcategorylist?id=" + id + "",
        contentType: "application/json",
        dataType: "json",
        success: function (result) {
            //ressting the form
            resetForm();
            $('#exampleModalLabel').text('');
            $('#exampleModalLabel').text('Update Category');
            $('#btnAddUpdate').text('');
            $('#btnAddUpdate').text('Update');

            // setting the data to modal popup
            let data = JSON.parse(result.Data);
            let categObj = data[0];
            console.log(categObj);
            $('#CATEGORY_NAME').val(categObj.CATEGORY_NAME);
            $('#CATEGORY_CODE').val(categObj.CATEGORY_CODE);
            $('#IS_ACTIVE').prop('checked', categObj.IS_ACTIVE);
            $('#hdnCategId').val(categObj.CATEGORY_ID)
            $('#AddUpdateCategory').modal('show');


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
    $('#AddUpdateCategory').find('form').trigger('reset');
    // removing validation when closing popup
    $('#formCategory').find('span.text-danger.field-validation-valid').html("");


}

// DELETE THE RECORD
function deleteCateg(id) {
    $.ajax({
        type: 'POST',
        url: "/admin/master/DeleteCategory?id=" + id + "",
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







//JSON.stringify (model class, json object is used to serialize and convert data into json string)

//JSON.parse is used to convert json string to json object

