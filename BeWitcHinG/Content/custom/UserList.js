$(function () {
    //Click Event For Open Pop-up
    $('#btnAdd').click(function () {
        $('#exampleModalLabel').text('');
        $('#exampleModalLabel').text('Add User');
        $('#btnAddUpdate').text('');
        $('#btnAddUpdate').text('Submit');
        $('#AddUpdateUserList').modal('show');
    });

    $("form#formUserList").submit(function (event) {
        event.preventDefault();
        debugger
        if ($('#formUserList').valid()) {
            var formData = new FormData(this);
            console.log(formData)

            AddUserDetail(formData);

        }
        return false;
    });
    

    // close event
    $('.btnClose').click(function () {
        resetForm();
        $('#AddUpdateUserList').modal('hide');
    });


    getUserListData(0);
    //$('#tableUserList').DataTable();

    
});


// get userlist
function getUserListData(id) {
    debugger
    $.ajax({
        type: 'GET',
        url: "/admin/master/GetUserList?id=" + id + "",
        contentType: "application/json",
        dataType: "json",
        async: false,
 
        success: function (result) {
            console.log(result.Data);
            resultData = JSON.parse(result.Data);

            //calling function bind the data
            bindTable(resultData.userlists);
            bindDropDownCountry(resultData.countryModels);
            bindDropDownRole(resultData.roleModels);
            bindDropDownState(resultData.stateModels);
            bindDropDownCity(resultData.cityModels);
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
            //$('#AddUpdateSizeMT').modal('hide');
        },
        error: function () {
            $.toast({
                heading: "Error",
                text: "Error : Request could not be processed. Try again Later",
                showHideTransition: 'slide',
                icon: "error",
                position: 'top-right',
            });
            //$('#AddUpdateSizeMT').modal('hide');
        }
    })
}

function AddUserDetail(userData) {
    debugger;
    $.ajax({
        url: "/admin/master/AddUser",
        type: 'POST',
        data: userData,
        success: function (result) {
            resetForm();
            $('#hdnuslistId').val('');
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

                    getUserListData(0);

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
            $('#AddUpdateUserList').modal('hide');

        },
        error: function () {
            $.toast({
                heading: "Error",
                text: "Error : Request could not be processed. Try again Later",
                showHideTransition: 'slide',
                icon: "error",
                position: 'top-right',
            });
            $('#AddUpdateUserList').modal('hide');

        },
        cache: false,
        contentType: false,
        processData: false


    });


}



//bind Table
function bindTable(data) {
    debugger;
    let dynamicString = '';
    dynamicString += '<table class="table table-hover" id="tableUserList">';
    dynamicString += '<thead>';
    dynamicString += '<tr>';
    dynamicString += '<th>User Name</th>';
    dynamicString += '<th>Role</th>';
    dynamicString += '<th>Email</th>';
    dynamicString += '<th>Phone</th>';
    dynamicString += '<th>Address</th>';
    dynamicString += '<th>Landmark</th>';
    dynamicString += '<th>Pincode</th>';
    dynamicString += '<th>PROFILE PIC</th>';
    dynamicString += '<th>Action</th>';
    dynamicString += '</tr>';
    dynamicString += '</thead>';
    dynamicString += '<tbody>';
    if (data.length > 0) {
        $.each(data, function (key, val) {
            dynamicString += '<tr>';
            dynamicString += '<td>' + val.USERNAME + '</td>';
            dynamicString += '<td>' + val.ROLE + '</td>';
            dynamicString += '<td>' + val.EMAIL + '</td>';
            dynamicString += '<td>' + val.PHONENUMBER + '</td>';
            dynamicString += '<td>' + val.ADDRESS + '</td>';
            dynamicString += '<td>' + val.LANDMARK + '</td>';
            dynamicString += '<td>' + val.PINCODE + '</td>';
            dynamicString += '<td><img src="' + val.PIC + '" alt="Profile Pic"></td>';
            dynamicString += '<td>';
            dynamicString += '<a href = "#" class="btnEdit" data-cpnid=' + val.USERID + ' > <i class="mdi mdi-grease-pencil text-primary"></i></a>';
            dynamicString += '&nbsp;&nbsp;&nbsp;<a href="#" class="btnDelete" data-cpnid=' + val.USERID + '><i class="mdi mdi-delete text-danger"></i></a >';
            dynamicString += '</td >';
            dynamicString += '</tr>';
        });
    }
    dynamicString += '</tbody >';
    dynamicString += '</table>';
    $('#divUserlist').html("");
    $('#divUserlist').html(dynamicString);


    $('#tableUserList').DataTable();

    ////CLICK EVENT FOR EDIT
    //$('.btnEdit').click(function (e) {
    //    debugger
    //    e.preventDefault();
    //    const cpnId = parseInt(e.currentTarget.dataset.cpnid);
    //    geteditdata(cpnId);

    //});

    //////CLICK EVENT FOR DELETE
    //$('.btnDelete').click(function (e) {
    //    debugger
    //    e.preventDefault();
    //    const cpnId = parseInt(e.currentTarget.dataset.cpnid);
    //    deleteCoupon(cpnId)

    //    setTimeout(function () {

    //        getCouponData(0);

    //    }, 500);
    //});
}

//bind DropDownRole
function bindDropDownRole(data) {
    $("#ROLE").empty();
    var optionhtml = '';
    optionhtml += '<option value="" selected disabled>--Select Role--</option>';
    $.each(data, function (key, val) {
        optionhtml += '<option value="' + val.ID + '">' + val.ROLE + '</option>';
    });
    $("#ROLE").append(optionhtml);
}

//RESETTING THE FORM ELEMENT
function resetForm() {
    ///resetting all the fields inside the form
    $('#AddUpdateUserList').find('form').trigger('reset');
    // removing validation when closing popup
    $('#formUserList').find('span.text-danger.field-validation-valid').html("");


}

//bind DropDownCountry
function bindDropDownCountry(data) {
    $("#ID").empty();
    var optionhtml = '';
    optionhtml += '<option value="" selected disabled>--Select Country--</option>';
    $.each(data, function (key, val) {
        optionhtml += '<option value="' + val.ID + '">' + val.COUNTRY_NAME + '</option>';
    });
    $("#ID").append(optionhtml);
}
//bind DropDownState
function bindDropDownState(data) {
    $("#STATEID").empty();
    var optionhtml = '';
    optionhtml += '<option value="" selected disabled>--Select State--</option>';
    $.each(data, function (key, val) {
        optionhtml += '<option value="' + val.STATEID + '">' + val.STATENAME + '</option>';
    });
    $("#STATEID").append(optionhtml);
}
//bind DropDownCity
function bindDropDownCity(data) {
    $("#CITYID").empty();
    var optionhtml = '';
    optionhtml += '<option value="" selected disabled>--Select City--</option>';
    $.each(data, function (key, val) {
        optionhtml += '<option value="' + val.CITYID + '">' + val.CITYNAME + '</option>';
    });
    $("#CITYID").append(optionhtml);
}