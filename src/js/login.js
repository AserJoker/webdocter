(function(w,u){
    $('#login').click(()=>{
        let result = true;
        if($('#Email').val()==''){
            $('#error-info-Email').css('display','inline');
            $('#Email').focus(()=>{
                $('#error-info-Email').css('display','none');
            })
            result = false;
        }
        if($('#Password').val()==''){
            $('#error-info-Password').css('display','inline');
            $('#Password').focus(()=>{
                $('#error-info-Password').css('display','none');
            })
            result = false;
        }
        if(result){
            $.ajax({
                type:'GET',
                url:'login-req',
                data:{
                    Email:$('#Email').val(),
                    Password:$('#Password').val()
                },
                error:(e)=>{
                    alert(`错误提示:${e.status} ${e.statusText}`);
                },
                success:(result)=>{
                    result = JSON.parse(result);
                    if(result.code == 0){
                        window.localStorage.setItem('user',JSON.stringify(result.user));
                        window.location.href = '/';
                    }
                    else{
                        alert('登录失败，邮箱或者密码错误');
                    }
                }
            })
        }
    })
})(window,undefined)