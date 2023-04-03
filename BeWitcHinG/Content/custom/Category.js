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

    var table = $('#tableBrand').DataTable();

    //click event opening modal popup 
    $('#btnAdd').click(function () {
        $('#AddUpdateCategory').modal('show');
    });

    //click event for add update
    $('#btnAddUpdate').click(function (event) {
        event.preventDefault();

        // second way to validate if element contains form element
        if ($('#formCategory').valid()) {

            let isActive = false;
            let categoryName = $('#CATEGORY_NAME').val();
            let categoryCode = $('#CATEGORY_CODE').val();

            if ($('#IS_ACTIVE').is(':checked')) {

                isActive = true;
            }

            console.log("isactive : " + isActive + " categName : " + categoryName + " code : " + categoryCode);

        }
        

        
        //------first way to validate
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


});