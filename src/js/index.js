(function(w,u){
    $('#logout').click(()=>{
        w.localStorage.removeItem('user');
        w.location.href +='/login.html';
    })
})(window,undefined)