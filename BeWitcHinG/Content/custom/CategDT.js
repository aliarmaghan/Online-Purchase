let userList;

$(function () {

    $('#btnCategDt').click(function () {

        $('#addCategDT').modal('show');


    });

    $('.btnEdit').click(function (e) {
        debugger;
        e.preventDefault();
        const categId = parseInt(e.currentTarget.dataset.categdtid);
        getCategDTData(categId);

    });

    $('.btnAddCategDt').click(function (event) {
        event.preventDefault();

        // second way to validate if element contains form element
        if ($('#formCategDT').valid()) {

            let isActive = false;
            let itemName = $('#ITEM_NAME').val();
            let itemCode = $('#CODE').val();
            let ddlid = $('#CATEGORYID option:selected').val();

            //let categId = $('#hdnCategId').val();


            //if (categId == "" || categId == undefined) {
            //    categId = 0;
            //}


            if ($('#IS_ACTIVE').is(':checked')) {

                isActive = true;
            }

            const obj = {
                ITEM_NAME: itemName,
                CODE: itemCode,
                CATEGORYID: ddlid,
                IS_ACTIVE: isActive,
            }
            /*console.log(obj)*/
            addCategData(obj);


        }

    });

    $('.BtnEditCateg').click(function (event) {
        event.preventDefault();
        debugger

        if ($('#formEditCategDT').valid()) {

            let isActive = false;
            let itemName = $('#u_item_name').val();
            let itemCode = $('#u_item_code').val();

            let ddlid = $('#categ_dll option:selected').val();

            let categId = $('#hdnUCategId').val();

            if (categId == "" || categId == undefined) {
                categId = 0;
            }


            if ($('#u_is_active').is(':checked')) {

                isActive = true;
            }

            const obj = {
                ITEM_NAME: itemName,
                CODE: itemCode,
                CATEGORYID: ddlid,
                IS_ACTIVE: isActive,
                ID: categId
            }
            console.log(obj)
            addCategData(obj);


        }

    });

    $('.BtnClose').click(function () {
        resetForm()
        $('#editCategDT').modal('hide');
    });

    $('.btnClose').click(function () {
        resetForm()
        $('#addCategDT').modal('hide');
    });

    getCategDTData(0)




    //$('#startDate').addEventListener('change', (e) => {
    //    let startDateVal = e.target.value
    //    $('#startDateSelected').innerText = startDateVal
    //})

    //$('#endDate').addEventListener('change', (e) => {
    //    let endDateVal = e.target.value
    //    $('#endDateSelected').innerText = endDateVal
    //})

});



function getCategDTData(id) {
    debugger
    $.ajax({
        type: 'GET',
        url: "/admin/master/GetCategoryDetailsList?id=" + id + "",
        contentType: "application/json",
        dataType: "json",

        success: function (result) {


            var resultData = JSON.parse(result.Data);

            //calling function bind the data
            /*console.log(userList)*/
            bindTable(resultData.categList);
            bindDropDown(resultData.categoryModels);

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
            $('#addCategDT').modal('hide');
            $('#editCategDT').modal('hide');
        },
        error: function () {
            $.toast({
                heading: "Error",
                text: "Error : Request could not be processed. Try again Later",
                showHideTransition: 'slide',
                icon: "error",
                position: 'top-right',
            });
            $('#addCategDT').modal('hide');
            $('#editCategDT').modal('hide');
        }
    });
}


function bindTable(data) {

    debugger
    let dynamicString = '';
    dynamicString += '<table class="table table-hover" /*id="tableBrand"*/>'
    dynamicString += '<thead>';
    dynamicString += '<tr>';
    dynamicString += '<th>Category</th>';
    dynamicString += '<th>item Name</th>';
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
            dynamicString += '<td>' + val.ITEM_NAME + '</td>';
            dynamicString += '<td>' + val.MODIFIED_DATE + '</td>';
            dynamicString += '<td>' + val.MODIFIED_BY + '</td>';
            dynamicString += '<td>' + val.IS_ACTIVE + '</td>';
            dynamicString += '<td>';
            dynamicString += '<a href = "#" class="btnEdit" data-categDTId=' + val.ID + ' > <i class="mdi mdi-grease-pencil text-primary"></i></a>';
            dynamicString += '&nbsp;&nbsp;&nbsp;<a href="#" class="btnDelete" data-categDTId=' + val.ID + '><i class="mdi mdi-delete text-danger"></i></a >';
            dynamicString += '</td >';
            dynamicString += '</tr>';
        });
    }
    dynamicString += '</tbody>';
    dynamicString += '</table>';
    $('#divCategDt').html("");
    $('#divCategDt').append(dynamicString);

    //edit event
    $('.btnEdit').click(function (e) {
        debugger;
        e.preventDefault();
        const categDTId = parseInt(e.currentTarget.dataset.categdtid);

        getEditData(categDTId)

    });

    $('.btnDelete').click(function (e) {

        e.preventDefault();
        debugger
        const categId = parseInt(e.currentTarget.dataset.categdtid);
        deleteCategory(categId)

        setTimeout(function () {

            getCategDTData(0);

        }, 500);
    });

}

function bindDropDown(data) {
    debugger
    $("#CATEGORYID").empty();
    var optionhtml = '';
    optionhtml += '<option value="" selected disabled>--Select Category--</option>';
    $.each(data, function (key, val) {
        optionhtml += '<option value="' + val.CATEGORY_ID + '">' + val.CATEGORY_NAME + '</option>';

    });
    $("#CATEGORYID").append(optionhtml);
    //$.each(data, function (key, val) {
    //    $("#REF_CATEGORY").append($("<option/>").val(this.KeyName).text(this.ValueName));
    //});
}

function addCategData(categData) {
    debugger
    $.ajax({
        type: 'POST',
        url: "/admin/master/AddCategoryDetails",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify(categData),

        success: function (result) {
            //console.log(result);
            //console.log(result.StatusCode);
            //console.log(result.Message);
            resetForm()
            $('#hdnCategId').val('');
            if (result.StatusCode == 200) {
                $.toast({
                    heading: "Success",
                    text: result.Message,
                    showHideTransition: 'slide',
                    icon: "success",
                    position: 'top-right',
                });

                // calling all the data
                setTimeout(function () {

                    getCategDTData(0);

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
            $('#addCategDT').modal('hide');

        },
        error: function () {
            $.toast({
                heading: "Error",
                text: "Error : Request could not be processed. Try again Later",
                showHideTransition: 'slide',
                icon: "error",
                position: 'top-right',
            });
            $('#addCategDT').modal('hide');
        }
    });

}

function resetForm() {
    ///resetting all the fields inside the form
    $('#addCategDT').find('form').trigger('reset');
    $('#editCategDT').find('form').trigger('reset');
    // removing validation when closing popup
    $('#formCategDT').find('span.text-danger.field-validation-valid').html("");
    $('#formEditCategDT').find('span.text-danger.field-validation-valid').html("");
}

function getEditData(id) {
    debugger;
    $.ajax({
        type: 'GET',
        url: "/admin/master/GetCategoryDetailsList?id=" + id + "",
        contentType: "application/json",
        dataType: "json",
        success: function (result) {

            resetForm();

            let data = JSON.parse(result.Data);
            bindDropDownListOnEdit(data.categoryModels);
            let categ = data.categList

            let categData = categ[0];
            // console.log(data);
            /*$('#categ_dll').val(ddlData.CATEGORY_NAME);*/
            $('#u_item_name').val(categData.ITEM_NAME);
            $('#u_item_code').val(categData.CODE);
            $('#u_is_active').prop('checked', categData.IS_ACTIVE);
            $('#hdnUCategId').val(categData.ID);
            $('#categ_dll').val(categData.REF_CATEGORY);
            //$('#categ_dll option:selected').text(ddl.CATEGORY_NAME);

            $('#editCategDT').modal('show');



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

function bindDropDownListOnEdit(data) {
    debugger
    $("#categ_dll").empty();
    var optionhtml = '';
    optionhtml += '<option value="" selected disabled>--Select Category--</option>';
    $.each(data, function (key, val) {
        optionhtml += '<option value="' + val.CATEGORY_ID + '">' + val.CATEGORY_NAME + '</option>';

    });
    $("#categ_dll").append(optionhtml);

}

function deleteCategory(id) {
    debugger;
    $.ajax({
        type: 'POST',
        url: "/admin/master/DeleteCategoryDetails?id=" + id + "",
        contentType: "application/json",
        dataType: "json",
        success: function (result) {
            //ressting the form
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