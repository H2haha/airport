
$(function(){
var host = "https://p.pdhz-dddc.cn:8447";
//取消原因 订单id
var orderId;var passengerId;
var test = window.location.href;
//以等号为节点将其转换成数组
var tests = test.split("?");
//遍历数组拿到下标获取第二个元素
for(var s = 0;s<tests.length;s++){
    var s = tests[1];
    var testss = s.split("&");
    var t = testss[0];
    var tt = testss[1];
    var tt2 = testss[2];
    var t1 = t.split("=");
    orderId = t1[1];
    var tt1 = tt.split("="); 
    passengerId = tt1[1];
    var tt2 = tt2.split("="); 
    accessKey = tt2[1];  
};
console.log(accessKey);
console.log(passengerId);
console.log(accessKey);
var arrayObj = new Array();
var cancelReasons;
var cancelReason;
$("ul li").click(function(){
    $(this).attr("flag","true");
    $(this).find("img").attr("src","images/right.png");
    var ather =  $(this);
    var cs =  ather.siblings();
    cs.attr("falg","false");
    if($(this).attr("flag") == "true"){
        cancelReasons=($(this).find(".lileft").text()); 
        cs.find("img").attr("src","images/point.png");     
    }
    arrayObj.push(cancelReasons);
    cancelReason = arrayObj[arrayObj.length-1];  
    console.log(arrayObj);
    console.log(cancelReason);
});
var timestamp=new Date().getTime();
$(".robottom a").click(function(){
    var param ={};
    param.cancelReason = encodeURI(cancelReason);
    param.orderId = orderId;
    param.timestamp = timestamp;
    param.accessKey = accessKey;
    // alert(orderId);
    // console.log(param.cancelReason);
    $.ajax({
        type: "post",
        url: host + "/dingding-api/h5/auth/park/order/v1/cancelParkOrder",
        async: true,
        dataType: "jsonp", // 返回的数据类型，设置为JSONP方式
        jsonp: 'callback', //指定一个查询参数名称来覆盖默认的 jsonp 回调参数名 callback
        jsonpCallback: 'handleResponse', //设置回调函数名
        data:param,
        success: function(data) {
            if (data.code == 200){
                // window.location.href='WaitPayOrders.html'+'?orderId='+orderId+'&passengerId='+passengerId+'&accessKey='+accessKey;
            }//success end
            App(); 
            //调取app方法
            function App() {
               if (isIOS()) {
                window.webkit.messageHandlers.goBack.postMessage({null:null});
                 } else { //执行安卓
                   JavascriptInterface.goBack();
                 }
            }
            function isIOS() {
                 //判断是安卓还是ios端
                 if (/(android)/i.test(navigator.userAgent)) {
                     return false;
                 } else if (/(ipad|iphone|mac)/i.test(navigator.userAgent)) {
                     return true;
                 }
            };// goBack 
        }
    }); 
}) 
});