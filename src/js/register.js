(function (w, u) {
    $('#register').click(() => {
        let result = true;
        if ($('#Name').val() == "") {
            $('#error-info-Name').css('display', 'inline');
            result = false;
            $('#Name').focus(() => {
                $('#error-info-Name').css('display', 'none');
            });
        }
        if ($('#Email').val() == "") {
            $('#error-info-Email').css('display', 'inline');
            result = false;
            $('#Email').focus(() => {
                $('#error-info-Email').css('display', 'none');
            });
        }
        else {
            if (/^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/.test($('#Email').val()) == false) {

                $('#error-info-Email').text("请输入合法的邮箱地址");
                $('#error-info-Email').css('display', 'inline');
                $('#Password').focus(() => {
                    $('#error-info-Email').css('display', 'none');
                    $('#error-info-Email').text("请输入邮箱");
                });
            }
        }
        if ($('#Password').val() == "") {
            $('#error-info-Password').css('display', 'inline');
            result = false;
            $('#Password').focus(() => {
                $('#error-info-Password').css('display', 'none');
            });
        }
        if ($('#ConfirmPassword').val() == "") {
            $('#error-info-ConfirmPassword').css('display', 'inline');
            result = false;
            $('#ConfirmPassword').focus(() => {
                $('#error-info-ConfirmPassword').css('display', 'none');
            });
        }
        else if ($('#Password').val().length < 8) {
            $('#error-info-Password').text("密码必须大于八位");
            $('#error-info-Password').css('display', 'inline');
            $('#Password').focus(() => {
                $('#error-info-Password').css('display', 'none');
                $('#error-info-Password').text("请输入密码");
            });
        }
        else if ($('#Password').val() != $('#ConfirmPassword').val()) {
            $('#error-info-ConfirmPassword').text("两次输入不同");
            $('#error-info-ConfirmPassword').css('display', 'inline');
            $('#Password').focus(() => {
                $('#error-info-Password').css('display', 'none');
                $('#error-info-ConfirmPassword').text("请输入确认密码");
            });
            $('#ConfirmPassword').focus(() => {
                $('#error-info-ConfirmPassword').css('display', 'none');
                $('#error-info-ConfirmPassword').text("请输入确认密码");
            });
            result = false;
        }
        if (result) {
            $.ajax({
                url: 'reg-req',
                data: {
                    Name: $('#Name').val(),
                    Email: $('#Email').val(),
                    Password: $('#Password').val()
                },
                type: 'GET',
                success: (result) => {
                    result = JSON.parse(result);
                    if(result.code == 1){
                        alert(`注册失败，用户名${$('#Name').val()}已经存在`);
                    }
                    else{
                        window.localStorage.setItem("user",JSON.stringify({
                            Name: $('#Name').val(),
                            Email: $('#Email').val()
                        }));
                        window.location.href = '/';
                    }
                },
                error: (e) => {
                    alert(`错误提示:${e.status} ${e.statusText}`);
                }
            })
        }
    });
})(window, undefined)