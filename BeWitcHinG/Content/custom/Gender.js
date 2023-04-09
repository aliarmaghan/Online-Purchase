let userList;
$(function () {
    //click event opening modal popup
    $('#btnAdd').click(function () {
        $('#AddUpdateGender').modal('show');
    });


    // click event form add 
    $('#btnAddGen').click(function (event) {
        event.preventDefault();
        debugger
        // second way to validate if element contains form element
        if ($('#formGender').valid()) {

            let isActive = false;
            let genType = $('#GEN_TYPE').val();
            let genCode = $('#GEN_CODE').val();

            if ($('#IS_ACTIVE').is(':checked')) {

                isActive = true;
            }

            const obj = {
                GEN_TYPE: genType,
                GEN_CODE: genCode,
                IS_ACTIVE: isActive
            }

            $('#tableGender').DataTable();
            addGender(obj);
            console.log(obj);
       
        }


    });


    // click event form update 
    $('#btnUpdateGen').click(function (event) {
        event.preventDefault();
        debugger
        // second way to validate if element contains form element
        if ($('#formGenderUpdate').valid()) {

            let isActive = false;
            let genType = $('#Updt_GEN_TYPE').val();
            let genCode = $('#Updt_GEN_CODE').val();
            let genId = $('#hdnGenId').val();

            if (genId == "" || genId == undefined) {
                genId = 0;
            }


            if ($('#Updt_IS_ACTIVE').is(':checked')) {

                isActive = true;
            }

            const obj = {
                GEN_TYPE: genType,
                GEN_CODE: genCode,
                IS_ACTIVE: isActive,
                ID: parseInt(genId)
            }

            $('#tableGender').DataTable();
            console.log(obj);
            addGender(obj);
        }
    });

    // close event
    $('.btnClose').click(function () {
        resetForm();
        $('#AddUpdateGender').modal('hide');
    });

    getGenderData(0);
    $('#tableGender').DataTable();

});


// add category
function addGender(genData) {
    debugger
    $.ajax({
        type: 'POST',
        url: "/admin/master/AddGender",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify(genData),
        //headers: {
        //    'X-XSRF-TOKEN': getCookie("XSRF-TOKEN"),
        //},
        success: function (result) {
            //console.log(result);
            //console.log(result.StatusCode);
            //console.log(result.Message);
            resetForm();
            $('#hdnGenId').val('');
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

                    getGenderData(0);

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
            $('#AddUpdateGender').modal('hide');
        },
        error: function () {
            $.toast({
                heading: "Error",
                text: "Error : Request could not be processed. Try again Later",
                showHideTransition: 'slide',
                icon: "error",
                position: 'top-right',
            });
            $('#AddUpdateGender').modal('hide');
        }
    });
}



// get categoryData
function getGenderData(id) {
    debugger
    $.ajax({
        type: 'GET',
        url: "/admin/master/GetGenderList?id=" + id + "",
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
            $('#AddUpdateGender').modal('hide');
        },
        error: function () {
            $.toast({
                heading: "Error",
                text: "Error : Request could not be processed. Try again Later",
                showHideTransition: 'slide',
                icon: "error",
                position: 'top-right',
            });
            $('#AddUpdateGender').modal('hide');
        }
    });
}



//RESETTING THE FORM ELEMENT
function resetForm() {
    ///resetting all the fields inside the form
    $('#AddUpdateGender').find('form').trigger('reset');
    // removing validation when closing popup
    $('#formGender').find('span.text-danger.field-validation-valid').html("");


}

//Binding table
function bindTable(data) {
    let dynamicString = '';
    dynamicString += '<table class="table table-hover" id="tableGender">';
    dynamicString += '<thead>';
    dynamicString += '<tr>';
    dynamicString += '<th>Gender</th>';
    dynamicString += '<th>Code</th>';
    dynamicString += '<th>Created Date</th>';
    dynamicString += '<th>Created By</th>';
    dynamicString += '<th>Is Active</th>';
    dynamicString += '<th>Action</th>';
    dynamicString += '</tr>';
    dynamicString += '</thead>';
    dynamicString += '<tbody>';

    if (data.length > 0) {
        debugger;
        $.each(data, function (key, val) {
            dynamicString += '<tr>';
            dynamicString += '<td>' + val.GEN_TYPE + '</td>';
            dynamicString += '<td>' + val.GEN_CODE + '</td>';
            dynamicString += '<td>' + val.MODIFIED_DATE + '</td>';
            dynamicString += '<td>' + val.MODIFIED_BY + '</td>';
            dynamicString += '<td>' + val.IS_ACTIVE + '</td>';
            dynamicString += '<td>';
            dynamicString += '<a href = "#" class="btnEdit" data-genId=' + val.ID + ' > <i class="mdi mdi-grease-pencil text-primary"></i></a>';

            dynamicString += '&nbsp;&nbsp;&nbsp; <a href="#" class="btnDelete" data-genId=' + val.ID + '><i class="mdi mdi-delete text-danger"></i></a>';
            dynamicString += '</td>';
            dynamicString += '</tr>';

        });
    }
    dynamicString += '</tbody >';
    dynamicString += '</table >';
    $('#divGen').html("");
    $('#divGen').html(dynamicString);


    $('#tableGender').DataTable();

        // CLICK EVENT FOR EDIT
    $('.btnEdit').click(function (e) {
        debugger
        alert(1);
        e.preventDefault();
        const genderId = parseInt(e.currentTarget.dataset.genid);
        geteditdata(genderId);
    });

}



// Get Edit Function
function geteditdata(id) {
    $.ajax({
        type: 'GET',
        url: "/admin/master/GetGenderList?id=" + id + "",
        contentType: "application/json",
        dataType: "json",
        success: function (result) {
            //ressting the form
            resetForm();

            // setting the data to modal popup
            let data = JSON.parse(result.Data);
            let genObj = data[0];
            console.log(genObj);
            $('#Updt_GEN_TYPE').val(genObj.GEN_TYPE);
            $('#Updt_GEN_CODE').val(genObj.GEN_CODE);
            $('#Updt_IS_ACTIVE').prop('checked', genObj.IS_ACTIVE);
            $('#hdnGenId').val(genObj.ID)
            $('#UpdateGender').modal('show');


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


    // close event
    $('.UbtnClose').click(function () {
        resetForm();
        $('#UpdateGender').modal('hide');
    });

}