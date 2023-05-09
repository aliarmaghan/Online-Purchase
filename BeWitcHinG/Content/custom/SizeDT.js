let resultData
$(function () {
    //click event opening popup
    $('#btnAdd').click(function () {
        /*$("#roleError").text("");*/
        $("#num_Size_Name").hide();
        $('#exampleModalLabel').text('');
        $('#exampleModalLabel').text('Add Size Detail');
        $('#btnAddUpdate').text('');
        $('#btnAddUpdate').text('Submit');
        $('#AddUpdateSizeDT').modal('show');
    });




    // click event form add and update
    $('#btnAddUpdate').click(function (event) {
        event.preventDefault();
        debugger
        // second way to validate if element contains form element
        if ($('#formSizeDT').valid()) {

            let isActive = false;
            let sizeName_A = $('#A_Size_Name').val();
            let sizeName_N = $('#N_Size_Name').val();
            let sizeId = $('#hdnSizeDT').val();
            let ddlid = $('#Ref_Size_Id option:selected').val();


            if (sizeId == "" || sizeId == undefined) {
                sizeId = 0;
            }


            if ($('#IS_ACTIVE').is(':checked')) {

                isActive = true;
            }

            const obj = {
                A_Size_Name: sizeName_A,
                N_Size_Name: sizeName_N,
                IS_ACTIVE: isActive,
                Ref_Size_Id: ddlid,
                S_Id: parseInt(sizeId)
            }

            $('#tableSizeDT').DataTable();
            addSizeDT(obj);
        }
    });
    //$('select option:contains("Alphabet")').prop('selected', true);
    //$('select option[value="1"]').attr("selected", true);

    $("#Ref_Size_Id").change(function () {
        if($('#Ref_Size_Id :selected').text() === 'Alphabet')
        {
            $("#num_Size_Name").hide();
            $("#alpa_Size_Name").show();
            
        }
        else {
            $("#alpa_Size_Name").hide();
            $("#num_Size_Name").show();

        }
    });

    // close event
    $('.btnClose').click(function () {
        resetForm();
        $('#AddUpdateSizeDT').modal('hide');
    });


    getSizeDTData(0);
    $('#tableSizeDT').DataTable();
});




// get getSizeDTData
function getSizeDTData(id) {
    debugger
    $.ajax({
        type: 'GET',
        url: "/admin/master/GetSizeDetailList?id=" + id + "",
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
            //console.log(JSON.parse(result.Data));

            resultData = JSON.parse(result.Data);
            //calling function bindTable the data
            bindTable(resultData.sizeDetails);
            //calling function bindDropDown 
            bindDropDown(resultData.sizeMTModels);

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
            $('#AddUpdateSizeDT').modal('hide');
        },
        error: function () {
            $.toast({
                heading: "Error",
                text: "Error : Request could not be processed. Try again Later",
                showHideTransition: 'slide',
                icon: "error",
                position: 'top-right',
            });
            $('#AddUpdateSizeDT').modal('hide');
        }
    });
}


// add SizeDT
function addSizeDT(sizeDTData) {
    debugger
    $.ajax({
        type: 'POST',
        url: "/admin/master/AddSizeDT",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify(sizeDTData),
        //headers: {
        //    'X-XSRF-TOKEN': getCookie("XSRF-TOKEN"),
        //},
        success: function (result) {
            //console.log(result);
            //console.log(result.StatusCode);
            //console.log(result.Message);
            resetForm();
            $('#hdnSizeDT').val('');
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

                    getSizeDTData(0);

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
            $('#AddUpdateSizeDT').modal('hide');
        },
        error: function () {
            $.toast({
                heading: "Error",
                text: "Error : Request could not be processed. Try again Later",
                showHideTransition: 'slide',
                icon: "error",
                position: 'top-right',
            });
            $('#AddUpdateSizeDT').modal('hide');
        }
    });
}




//bind Table
function bindTable(data) {
    debugger;
    let dynamicString = '';
    dynamicString += '<table class="table table-hover" id="tableSizeDT">';
    dynamicString += '<thead>';
    dynamicString += '<tr>';
    dynamicString += '<th>Size</th>';
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
            dynamicString += '<td>' + val.Size_Name + '</td>';
            dynamicString += '<td>' + val.Size_Type + '</td>';
            dynamicString += '<td>' + val.MODIFIED_DATE + '</td>';
            dynamicString += '<td>' + val.MODIFIED_BY + '</td>';
            dynamicString += '<td>' + val.IS_ACTIVE + '</td>';
            dynamicString += '<td>';
            dynamicString += '<a href = "#" class="btnEdit" data-szdtid=' + val.S_Id + ' > <i class="mdi mdi-grease-pencil text-primary"></i></a>';
            dynamicString += '&nbsp;&nbsp;&nbsp;<a href="#" class="btnDelete" data-szdtid=' + val.S_Id + '><i class="mdi mdi-delete text-danger"></i></a >';
            dynamicString += '</td >';
            dynamicString += '</tr>';
        });
    }
    dynamicString += '</tbody >';
    dynamicString += '</table>';
    $('#divSizeDT').html("");
    $('#divSizeDT').html(dynamicString);


    $('#tableSizeDT').DataTable();

    //CLICK EVENT FOR EDIT
    $('.btnEdit').click(function (e) {
        e.preventDefault();
        const szdtId = parseInt(e.currentTarget.dataset.szdtid);
        geteditdata(szdtId);

    });

    ////CLICK EVENT FOR DELETE
    $('.btnDelete').click(function (e) {
        e.preventDefault();
        const szdtId = parseInt(e.currentTarget.dataset.szdtid);
        deleteSzMt(szdtId)

        setTimeout(function () {

            getSizeDTData(0);

        }, 500);
    });

}


// get edit 
function geteditdata(id) {

    $.ajax({
        type: 'GET',
        url: "/admin/master/GetSizeDetailList?id=" + id + "",
        contentType: "application/json",
        dataType: "json",
        success: function (result) {
            console.log(result);
            //ressting the form
            resetForm();
            $('#exampleModalLabel').text('');
            $('#exampleModalLabel').text('Update Size');
            $('#btnAddUpdate').text('');
            $('#btnAddUpdate').text('Update');

            // setting the data to modal popup
            let data = JSON.parse(result.Data);
            bindDropDown(data.sizeMTModels);
            let szdtObj = data.sizeDetails;
            //console.log(szdtObj);
            let szdtData = szdtObj[0];
            console.log(szdtData);
            $('#Ref_Size_Id').val(szdtData.Ref_Size_Id);
            if ($('#Ref_Size_Id :selected').text() === 'Alphabet') {
                $("#num_Size_Name").hide();
                $("#alpa_Size_Name").show();
                $('#A_Size_Name').val(szdtData.Size_Name);

            }
            else {
                $("#alpa_Size_Name").hide();
                $("#num_Size_Name").show();
                $('#N_Size_Name').val(szdtData.Size_Name);

            }
            //$('#Size_Name').val(szdtData.Size_Name);
            $('#IS_ACTIVE').prop('checked', szdtData.IS_ACTIVE);
            $('#hdnSizeDT').val(szdtData.S_Id)
            $('#AddUpdateSizeDT').modal('show');


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
    $('#AddUpdateSizeDT').find('form').trigger('reset');
    // removing validation when closing popup
    $('#formSizeDT').find('span.text-danger.field-validation-valid').html("");


}


//bind DropDown
function bindDropDown(data) {
    $("#Ref_Size_Id").empty();
    debugger
    var optionhtml = '';
    

    $.each(data, function (key, val) {
        optionhtml += '<option value="' + val.Size_Id + '">' + val.Size_Type + '</option>';

    });
    $("#Ref_Size_Id").append(optionhtml);
    
}



// DELETE THE RECORD
function deleteSzMt(id) {
    $.ajax({
        type: 'POST',
        url: "/admin/master/DeleteSizeDT?id=" + id + "",
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