(function(w,u){
    if(w.localStorage.getItem('password')){
        $('#Password').val(w.localStorage.getItem('password'));
        $('#Email').val(w.localStorage.getItem('email'));
        $('#rememberpwd').prop('checked',true);
    }
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
                        if($('#rememberpwd').prop('checked')){
                            window.localStorage.setItem('password',$('#Password').val());
                            window.localStorage.setItem('email',$('#Email').val());
                        }
                        else{
                            window.localStorage.removeItem('password');
                            window.localStorage.removeItem('email');
                        }
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