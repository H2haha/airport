$(function() {
    //支付成功页面
    var host = "https://p.pdhz-dddc.cn:8447";
    paySuccess();

    function paySuccess() {
         var parkOrderApiRequest = JSON.parse(localStorage.getItem("parkOrderApiRequest"));
        var param = {};
        param.orderId = localStorage.getItem("orderNumber"); 
         console.log(parkOrderApiRequest.access);
        param.accessKey= parkOrderApiRequest.access2;
        param.timestamp= new Date().getTime();
        // param.orderId="201802051844204209";
        console.log(param.orderId);
        $.ajax({
            async: true,
            url: host + "/h5/auth/park/order/v1/parkOrderInfo",
            type: "post",
            dataType: "jsonp", // 返回的数据类型，设置为JSONP方式
            jsonp: 'callback', //指定一个查询参数名称来覆盖默认的 jsonp 回调参数名 callback
            jsonpCallback: 'handleResponse', //设置回调函数名
            data: param,
            success: function(response) {
                if (response.code == 200) {
                    $(".s-money").html("¥" + response.result.orderMoney);
                    $(".code").html(response.result.orderId);
                    $(".s-money2").html("¥" + response.result.orderMoney);

                    if (response.result.payType == 1) {
                        $(".s-method").html("支付宝");
                    } else if (response.result.payType == 2) {
                        $(".s-method").html("微信");
                    }
                }
            },
            error: function(e) {
                console.log(e);
            }
        });
    }
$(".back").click(function() {
      var parkOrderApiRequest = JSON.parse(localStorage.getItem("parkOrderApiRequest"));
             console.log(parkOrderApiRequest.passengerId);
    window.location.href="index.html"+"?passengerId="+parkOrderApiRequest.passengerId+"&accessKey="+parkOrderApiRequest.access2;
});
});