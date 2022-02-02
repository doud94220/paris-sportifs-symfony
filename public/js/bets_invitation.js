$(document).ready(function () {

    $("form").on('submit', function (e) {

        var error = false;

        $('form').find('select').each(function () {

            if ($(this).val() == '') {
                error = true;
                $(this).css("border", "1px solid red");
            }
        });

        if (error == true) {
            $("#error-msg").text("Some fields are not filled in. Please Check the red fields.");
            e.preventDefault(); // Ne pas valider le formulaire
        }
    });

    $("select").on("change", function () {
        if ($(this).css("border-top-color") == 'rgb(255, 0, 0)' && $(this).val() !== '') {
            $(this).css("border", "1px solid black");
            $("#error-msg").text('');
        }
    });

});