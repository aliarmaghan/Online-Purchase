$(function () {
    //Click Event For Open Pop-up
    //$('#btnAdd').click(function () {
    //    $('#exampleModalLabel').text('');
    //    $('#exampleModalLabel').text('Add User List');
    //    $('#btnAddUpdate').text('');
    //    $('#btnAddUpdate').text('Submit');
    //    //$('#AddUpdateCoupon').modal('show');
    //});
    getUserListData(0);

    //// close event
    //$('.btnClose').click(function () {
    //    resetForm();
    //    $('#AddUpdateCoupon').modal('hide');
    //});


    
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
        //data: JSON.stringify(categData),

        //headers: {
        //    'X-XSRF-TOKEN': getCookie("XSRF-TOKEN"),
        //},
        success: function (result) {
            //console.log(result);
            //console.log(result.StatusCode);
            //console.log(result.Message);
            //console.log(result.Data);
            console.log(result.Data);
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