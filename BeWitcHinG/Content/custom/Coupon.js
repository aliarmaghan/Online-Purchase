let CouponList
$(function () {

    //click event opening popup
    $('#btnAdd').click(function () {
        $('#exampleModalLabel').text('');
        $('#exampleModalLabel').text('Add Coupon');
        $('#btnAddUpdate').text('');
        $('#btnAddUpdate').text('Submit');
        $('#AddUpdateCoupon').modal('show');
    });

    // click event form add and update
    $('#btnAddUpdate').click(function (event) {
        event.preventDefault();
        debugger
        // second way to validate if element contains form element
        if ($('#formCoupon').valid()) {

            let isActive = false;
            let couponNAME = $('#COUPON_NAME').val();
            let remarks = $('#REMARKS').val();
            let expFROM = $('#EXP_FROM').val();
            let expTO = $('#EXP_TO').val();
            let coupID = $('#hdnCoupId').val();


            if (coupID == "" || coupID == undefined) {
                coupID = 0;
            }


            if ($('#IS_ACTIVE').is(':checked')) {

                isActive = true;
            }

            const obj = {
                COUPON_NAME: couponNAME,
                REMARKS: remarks,
                EXP_FROM: expFROM,
                EXP_TO: expTO,
                IS_ACTIVE: isActive,
                COUPON_ID: parseInt(coupID)
            }

            $('#tableCoupon').DataTable();
            addCoupon(obj);
        }
    });

    getCouponData(0);
    // close event
    $('.btnClose').click(function () {
        resetForm();
        $('#AddUpdateCoupon').modal('hide');
    });

});

// get getCouponData
function getCouponData(id) {
    debugger
    $.ajax({
        type: 'GET',
        url: "/admin/master/GetCouponList?id=" + id + "",
        contentType: "application/json",
        dataType: "json",
        async: false,
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
            $('#AddUpdateCoupon').modal('hide');
        }
    })
}


//addCoupon
function addCoupon(couponData) {
    debugger
    $.ajax({
        type: 'POST',
        url: "/admin/master/AddCoupon",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify(couponData),
        //headers: {
        //    'X-XSRF-TOKEN': getCookie("XSRF-TOKEN"),
        //},
        success: function (result) {
            //console.log(result);
            //console.log(result.StatusCode);
            //console.log(result.Message);
            resetForm();
            $('#hdnCoupId').val('');
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

                    getCouponData(0);

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
            $('#AddUpdateCoupon').modal('hide');
        },
        error: function () {
            $.toast({
                heading: "Error",
                text: "Error : Request could not be processed. Try again Later",
                showHideTransition: 'slide',
                icon: "error",
                position: 'top-right',
            });
            $('#AddUpdateCoupon').modal('hide');
        }
    });
}





//bind Table
function bindTable(data) {
    debugger;
    let dynamicString = '';
    dynamicString += '<table class="table table-hover" id="tableCoupon">';
    dynamicString += '<thead>';
    dynamicString += '<tr>';
    dynamicString += '<th>Coupon</th>';
    dynamicString += '<th>Remarks</th>';
    dynamicString += '<th>Exp From</th>';
    dynamicString += '<th>Exp To</th>';
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
            dynamicString += '<td>' + val.COUPON_NAME + '</td>';
            dynamicString += '<td>' + val.REMARKS + '</td>';
            dynamicString += '<td>' + val.EXP_FROM + '</td>';
            dynamicString += '<td>' + val.EXP_TO + '</td>';
            dynamicString += '<td>' + val.MODIFIED_DATE + '</td>';
            dynamicString += '<td>' + val.MODIFIED_BY + '</td>';
            dynamicString += '<td>' + val.IS_ACTIVE + '</td>';
            dynamicString += '<td>';
            dynamicString += '<a href = "#" class="btnEdit" data-cpnid=' + val.COUPON_ID + ' > <i class="mdi mdi-grease-pencil text-primary"></i></a>';
            dynamicString += '&nbsp;&nbsp;&nbsp;<a href="#" class="btnDelete" data-cpnid=' + val.COUPON_ID + '><i class="mdi mdi-delete text-danger"></i></a >';
            dynamicString += '</td >';
            dynamicString += '</tr>';
        });
    }
    dynamicString += '</tbody >';
    dynamicString += '</table>';
    $('#divCoupon').html("");
    $('#divCoupon').html(dynamicString);


    $('#tableCoupon').DataTable();

    ////CLICK EVENT FOR EDIT
    //$('.btnEdit').click(function (e) {
    //    e.preventDefault();
    //    const szdtId = parseInt(e.currentTarget.dataset.szdtid);
    //    geteditdata(szdtId);

    //});

    //////CLICK EVENT FOR DELETE
    //$('.btnDelete').click(function (e) {
    //    e.preventDefault();
    //    const szdtId = parseInt(e.currentTarget.dataset.szdtid);
    //    deleteSzMt(szdtId)

    //    setTimeout(function () {

    //        getSizeDTData(0);

    //    }, 500);
    //});


    
}

//RESETTING THE FORM ELEMENT
function resetForm() {
    ///resetting all the fields inside the form
    $('#AddUpdateCoupon').find('form').trigger('reset');
    // removing validation when closing popup
    $('#formCoupon').find('span.text-danger.field-validation-valid').html("");


}