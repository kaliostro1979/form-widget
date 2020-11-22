function callForm({
                      url: url,
                      action: action
                  }) {
    /*Get data from API*/

    fetch(url)
        .then((req) => {
            return req.json()
        })
        .then((res) => {
            res.data.map((e) => {
                getUserData(e.first_name, e.last_name)
            })
        });


    function getUserData(first_name, last_name) {
        $('#cont_name').append('<option value=' + `\"${first_name} ${last_name}"/` + '>' + `${first_name}  ${last_name}` + '</option>');
    }

    /*End of get data*/


    /*Form submission*/

    function createForm() {
        $('.form-block')
            .append(
                '<form id="form-main" action="">' +
                '<div class="name-date-row">' +
                '<select name="contact_name" id="cont_name" required>\n' + '<option value="" disabled selected>Select Name</option>\n' + '</select>' +
                '<input data-toggle="datepicker" placeholder="Select Date" class="date-select" required>' +
                '</div>' +
                '<textarea name="" cols="30" rows="10" class="text-msg"></textarea>' +
                '<button type="submit" class="submit-btn">Submit</button>' +
                '</form>')
    }

    createForm();

    $('.submit-btn').on('click', function (event) {
        event.preventDefault();
        let fullName = $('#cont_name').val();
        let selectedDate = $('.date-select').val();
        let textMessage = $('.text-msg').val();
        if (fullName == null || selectedDate == '') {
            if(fullName == null){
                $('#cont_name').addClass('field-error')
            }
            if (selectedDate == ''){
                $('.date-select').addClass('field-error')
            }
        } else {
            createModal();
            $('.selected-name').val(fullName);
            $('.selected-date').val(selectedDate);
            $('.selected-message p').text(textMessage);
        }
    });

    $('#cont_name').on('change', function () {
       if($(this).val()!=null){
           $('#cont_name').removeClass('field-error')
       }
    });

    $('.date-select').on('change', function () {
        if($(this).val()!=null){
            $('.date-select').removeClass('field-error')
        }
    });


    function createModal() {
        $('body').append(
            '<div class="modal-cover"></div>' +
            '<div class="form-modal">' +
            '<form action=' + `${action}` + '>' +
            '<label for="modal-selected-name">Selected Name:</label>' +
            '<input id="modal-selected-name" class="selected-name" disabled>' +
            '<label for="modal-selected-date">Selected Date:</label>' +
            '<input id="modal-selected-date" class="selected-date" disabled>' +
            '<label for="modal-selected-msg">Message:</label>' +
            '<div id="modal-selected-msg" class="selected-message" rows="10" disabled><p></p></div>' +
            '<button type="submit" class="modal-submit-btn">Submit</button>' +
            '</form>' +
            '</div>'
        );
        $('.modal-cover').on('click', function (event) {
            event.stopPropagation();
            if ($(event.target).has('modal-cover')) {
                $('.form-modal').remove();
                $('.modal-cover').remove();
            } else {

            }
        })
    }
}