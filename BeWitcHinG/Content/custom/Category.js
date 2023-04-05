let userList;
$(function () {

    const message = $('#hdnMessage').val();
    const response = parseInt($('#hdnValue').val());
    let heading = '', icon = ''

    if (message != "" && message != undefined) {

        if (response == 1) {
            heading = 'Success';
            icon = 'success';
        }
        else {
            heading = 'Error';
            icon = 'error';
        }

        $.toast({
            heading: heading,
            text: message,
            showHideTransition: 'slide',
            icon: icon,
            position: 'top-right',
        })
    }

    //click event opening modal popup
    $('#btnAdd').click(function () {
        /*$("#roleError").text("");*/
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

            if ($('#IS_ACTIVE').is(':checked')) {

                isActive = true;
            }

            const obj = {
                CATEGORY_NAME: categoryName,
                CATEGORY_CODE: categoryCode,
                IS_ACTIVE: isActive
            }

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
        ///resetting all the fields inside the form
        $('#AddUpdateCategory').find('form').trigger('reset');
        // removing validation when closing popup
        $('#formCategory').find('span.text-danger.field-validation-valid').html("");
        $('#AddUpdateCategory').modal('hide');
    });


    var table = $('#tableBrand').DataTable();

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
            console.log(result);
            console.log(result.StatusCode);
            console.log(result.Message);
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
    if (data.length > 0) {
        let dynamicString = '';

        $.each(data, function (key, val) {

            dynamicString += '<tr>';
            dynamicString += '<td>' + val.CATEGORY_NAME + '</td>';
            dynamicString += '<td>' + val.CATEGORY_CODE + '</td>';
            dynamicString += '<td>' + val.MODIFIED_DATE + '</td>';
            dynamicString += '<td>' + val.MODIFIED_BY + '</td>';
            dynamicString += '<td>' + val.IS_ACTIVE + '</td>';
            dynamicString += '<td>Action</td>';
            dynamicString += '</tr>';
        });
        $('#tblBody').html("");
        $('#tblBody').html(dynamicString);
    }

}








//JSON.stringify (model class, json object is used to serialize and convert data into json string)

//JSON.parse is used to convert json string to json object

