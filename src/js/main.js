$(function () {
    // 初始化数据
    getPictures();
    getMembers();

    // $('#left .menu-list .picture-switch').click(function (e) {
    //     e.preventDefault();
    //     $('#left .menu-list .picture').attr('show', 'true');
    //     $('#left .menu-list .picture').toggle('normal');
    // });

    // 头像悬浮提示
    $('#avatar').popover(
        {
            trigger: 'hover',
            html: true,
            template: '<div style="background:red;font-size:3rem">待补</div>',
        }
    );
})


function getPictures() {
    // $.ajax 请求成功回调 fill_pictures
    // fake
    var data = [
        { src: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1935784661,2721433377&fm=26&gp=0.jpg' },
        { src: 'http://b-ssl.duitang.com/uploads/item/201809/01/20180901223759_aQvNR.jpeg' },
        { src: 'http://i1.hdslb.com/bfs/archive/86354fc994e795f70ea02dfe6a08d9b9b77e83ec.png' },
        { src: 'http://b-ssl.duitang.com/uploads/item/201808/16/20180816155327_LlCfk.thumb.700_0.jpeg' },
    ]
    fill_pictures(data);
}


function getMembers() {
    // $.ajax 请求成功回调 fill_members
    // fake
    var data = [
        { name: 'a' },
        { name: 'b' },
        { name: 'c' },
    ]
    fill_members(data);
}

// 填充图片列表
function fill_pictures(data) {
    var left = '';
    var image = '';
    for (var i = 0; i < data.length; i++) {
        left += '<li onclick="_click(this)" data-index="' + i + '"  data-src="' + data[i].src + '"><a>' + '图片' + (i + 1) + '</a></li>';
        image += '<img src="' + data[i].src + '"/>';
    }
    $('#collapsePictures').html(left);
    $('#main .picture').html(image);

    init_canvas(data);
}

// 填充成员列表
function fill_members(data) {
    var member = '';
    for (var i = 0; i < data.length; i++) {
        member += '<li onclick="_click2(this)" data-index="' + i + '">' + '成员' + data[i].name + '</li>';
    }
    $('#room .room').html(member);
}



// 点击图片列item
function _click(obj) {
    var index = $(obj).attr('data-index');
    var src = $(obj).attr('data-src');
    console.log(index);
    $('#canvas').css('background', 'url("'+src+'")');
    $('#canvas').css('backgroundSize', '100% 100%');
    clearCanvas();
    $('#canvas')[0].index = index;
}

// 点击成员列item
function _click2(obj) {
    var index = parseInt($(obj).attr('data-index'));
    console.log(index);
    alert('成员' + (index + 1))
}

function choose_room() {
    $('#chatroom').toggle('normal');
    $('#room .room').toggle('normal');
}

// 发送聊天消息
function send() {
    var message = $('.message').val().trim();
    if (message == null)
        return;

    // socket
    $('.chat_box').text(message);
}

// 提交诊断结果
function submit() {
    var locations = $('#canvas')[0].locations;
    console.log(locations);
    if (locations.size < $('#canvas')[0].data.length){
        alert('尚未完全诊断');
        return
    }
    // 提交
    alert('提交成功');
}

function choose_file() {
    $("#upload").click();
    $("#upload").on("change", function () {
        var objUrl = getObjectURL(this.files[0]); //获取图片的路径，该路径不是图片在本地的路径
        if (objUrl) {
            $("#headPic").attr("src", objUrl); //将图片路径存入src中，显示出图片
            var formData = new FormData();
            var pic1 = this.files[0];
            formData.append('smfile', pic1);
            console.log(formData);
            $.ajax({
                url: 'https://sm.ms/api/upload', //图片上传接口,暂时用图床代替
                type: 'post',
                data: formData,
                cache: false,
                processData: false,
                contentType: false,
                success: function (data) {
                    console.log(data);
                    alert('上传成功')
                }
            })
        }
    });


}


function getObjectURL(file) {
    var url = null;
    if (window.createObjectURL != undefined) { // basic
        url = window.createObjectURL(file);
    } else if (window.URL != undefined) { // mozilla(firefox)
        url = window.URL.createObjectURL(file);
    } else if (window.webkitURL != undefined) { // webkit or chrome
        url = window.webkitURL.createObjectURL(file);
    }
    return url;
}

function uploadPicture() {
    $.ajaxFileUpload({
        url: "uploadHeadPic",
        fileElementId: "upload", //文件上传域的ID，这里是input的ID
        dataType: 'json', //返回值类型 一般设置为json
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        success: function (data) {
            if (data.code == 200) {
                alert('上传成功');
            }
        }

    });
}


// 初始化canvas
function init_canvas(data) {
    var locations = new Map();
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    canvas.data = data;
    canvas.index = 0;   //暂时代替图片的唯一标志
    canvas.locations = locations;
    canvas.style.background = "url("+data[0].src+")"
    canvas.style.backgroundSize = "100% 100%";
    var x = -1.0;
    var y = -1.0;
    function getLocation(x, y) {
        var bbox = canvas.getBoundingClientRect();
        return {
            x: (x - bbox.left) * (canvas.width / bbox.width),
            y: (y - bbox.top) * (canvas.height / bbox.height)
        };
    }
    canvas.onmousedown = function (e) {
        canvas.height = canvas.height;
        var location = getLocation(e.clientX, e.clientY);
        x = location.x;
        y = location.y;
        canvas.locations.set(canvas.index,{x:x,y:y});
        console.log(canvas.locations);
        ctx.strokeStyle = "#000000"; //改变画笔颜色
        ctx.lineWidth = 1;
        ctx.arc(location.x, location.y, 60, 0, 2 * Math.PI);
        ctx.stroke();
    };

}

function clearCanvas() {
    var c = document.getElementById("canvas");
    var cxt = c.getContext("2d");
    x = -1.0;
    y = -1.0;
    c.height = c.height;
}