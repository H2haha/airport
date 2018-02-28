var host = "https://p.pdhz-dddc.cn:8447";
//完善信息页面
 $(function() {
     var date = new Date();
     date.setHours(0);
     date.setMinutes(0);
     var date02 = new Date();
     // date02.setHours(12);
     date02.setMinutes(59);
     var opt3 = {
         theme: 'ios', //设置显示主题

         mode: 'scroller', //设置日期选择方式，这里用滚动

         display: 'bottom', //设置控件出现方式及样式
         preset: 'time', //日期:年 月 日 时 分
         minDate: date,
         // maxDate:date02,
         // maxDate:new Date(nowData.getFullYear(),nowData.getMonth(),nowData.getDate()+7,22,00),
         dateFormat: 'mm-dd', // 日期格式

         dateOrder: 'mmdd', //面板中日期排列格式
         stepMinute: 30, //设置分钟步长

         yearText: '年',

         monthText: '月',

         dayText: '日',

         hourText: '时',

         minuteText: '分',

         lang: 'zh' //设置控件语言};

     };
     $('#test3').mobiscroll(opt3);
 });
 //返回上一个页面
 $(".return").click(function() {
     window.history.go(-1); //返回上一页
 });
 //提示
 function layer(msg, fun) {
     var str = $('<div id="layer"><div class="layer-bg" style="position: fixed;top: 0;left: 0;width: 100%;height: 100%;z-index: 9999;background-color:transparent;"></div><div class="my_layer" style="position:fixed;top:2rem;left: 50%;z-index:10000;width:80%;margin-left:-40%;opacity:0.8;background:#222222;border-radius:100px;"><div style="color:#ffffff!important;height:50px;line-height:50px; text-align:center;">' + msg + '</div></div></div>');
     $('body').append(str);
     setTimeout(function() {
         $('#layer').remove();
         fun && fun();
     }, 2000);
 } //提示
//日期格式化
Date.prototype.format = function(fmt) {
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
    }
    return fmt;
}
//information 信息取值
$(function() {
    var parkOrderApiRequest = JSON.parse(localStorage.getItem("parkOrderApiRequest"));
    console.log(parkOrderApiRequest.parkDays, parkOrderApiRequest.parkDays * 30);
    var day = parkOrderApiRequest.parkDays;
    //共多少天
    $(".day").html('共' + day + '天');
    //起止时间
    var pt = new Date(parkOrderApiRequest.parkTime);
    parkOrderApiRequest.parkTime = pt;
    console.log(pt);
    console.log(pt.getMonth());
    var startTime = (pt.getMonth() + 1) + "月" + pt.getDate() + "日" + pt.getHours() + "时";
    $(".start").html(startTime);
    //结束时间
    var et = new Date(parkOrderApiRequest.takeCarTime);
    parkOrderApiRequest.takeCarTime = et;
    var endTime = (et.getMonth() + 1) + "月" + et.getDate() + "日";
    $(".end").html(endTime);
    //钱数
    var orderMoney = parkOrderApiRequest.orderMoney;
    $("#count-money").html("¥" + orderMoney);
    $("#count-money2").html("¥" + orderMoney);
    $("#countday").html("(" + day + "天" + ")");
    //form表单校验
    $(".pay-btn").click(function() {
        var test3 = $("#test3").val();
        var name = $(".name").val();
        var phone = $(".phone").val();
        var plate = $(".plate").val();
         //正则表达式，十一位数字的电话号码
      var phoneReg = /^(0|86|17951)?(13[0-9]|15[012356789]|17[0-9]|18[0-9]|14[57])[0-9]{8}$/;
      var plateReg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4,5}[A-Z0-9挂学警港澳]{1}$/;   
     if (test3 == ""||name==""||phone==""||plate==""){
          layer("亲，您有未填写的选项哦！");
        }else if(!phoneReg.test(phone)||phone.length<11){
                layer("亲，您的手机号码不正确哦！");
      }else if(!plateReg.test(plate)){
             layer("亲，您的车牌号不正确哦！");
      }else{
           order();
       };
    });

    var orderIds;
    //下单接口
    function order() {
        //取车
        var s = $("#test3").val().replace("时", ",").replace("分", "").split(",");
        var parkTime2 = new Date(parkOrderApiRequest.takeCarTime);
        parkTime2.setHours(parseInt(s[0]));
        parkTime2.setMinutes(parseInt(s[1]));
        var param = {};
        if(orderIds != null){
            param.orderId = orderIds
        }
        param.passengerId = parkOrderApiRequest.passengerId;
        param.orderMoney = parkOrderApiRequest.orderMoney;
        // console.log(param.orderMoney);
        param.parkTime = parkOrderApiRequest.parkTime.format("yyyy-MM-dd hh:mm:ss");
        param.takeCarTime = parkTime2.format("yyyy-MM-dd hh:mm:ss");
        param.parkDays = parkOrderApiRequest.parkDays;
        param.contactPerson =  encodeURI($(".name").val());
        param.contactPhone = $(".phone").val();
        param.plateNo = encodeURI($(".plate").val());
        param.provinceName = encodeURI("北京市");
        param.cityName =  encodeURI("北京市");
        param.parkLongitude = 116.5316400000;
        param.parkLatitude = 40.0403200000;
        param.parkAddress = encodeURI("北京市朝阳区京密路与顺白路交叉路口");
        param.accessKey= parkOrderApiRequest.access2;
        param.timestamp= new Date().getTime();
        $.ajax({
            async: true,
            url: host + "/h5/auth/park/order/v1/saveParkOrder",
            type: "post",
            dataType: "jsonp", // 返回的数据类型，设置为JSONP方式
            jsonp: 'callback', //指定一个查询参数名称来覆盖默认的 jsonp 回调参数名 callback
            jsonpCallback: 'handleResponse', //设置回调函数名
            data: param,
            success: function(response) {
                if (response.code == 200) {
                    layer("亲，您已成功下单！")
                    $(".ordercode").val(response.result);
                         orderId = $(".ordercode").val(); 
                         orderIds=orderId;
                          App(orderId);
                }else if(response.code == 3001){
                      layer("亲，您的订单已存在！");
                      orderIds=orderId;
                       App(orderId);
                }
            },
            error: function(jqXHR,textStatus) {
               layer(textStatus);
               
            }
        });
    };
//调取app支付
function App(orderId){ 
    // $(".layer").show();
    if (isIOS()) {       
        var orderName = orderId;
        window.webkit.messageHandlers.getPay.postMessage({order:orderName});
    } else {        //执行安卓
      JavascriptInterface.getPay(orderId);
          }
};
function isIOS() {
    //判断是安卓还是ios端
    if (/(android)/i.test(navigator.userAgent)) {
        return false;
    } else if (/(ipad|iphone|mac)/i.test(navigator.userAgent)) {
        return true;
    }
};
//收起与展开
    $(".top").click(function() {
             $(".pay-ct").show();
             $(".top").hide();
             $(".down").show();
                $(".pay-ct2").hide();

    });
        $(".down").click(function() {
             $(".pay-ct").hide();
             $(".top").show();
             $(".down").hide();
                $(".pay-ct2").show();

    });

   
    // order end
    //支付接口
    // $(".pay-btn").click(function() {
    //     $(".paybg").hide();
    //     $(".mesure-bg").show();
    // });
    // $(".cancel").click(function() {
    //     $(".paybg").show();
    //     $(".mesure-bg").hide();
    // });
    // 支付接口
    //支付宝支付
    // $(".zf").click(function() {
    //     pay();
    // });
    // function pay() {
    //     var param = {};
    //     param.orderId = $("#ordercode").val();
    //     param.payType = 1;
    //     $.ajax({
    //         async: true,
    //         url: host + "/park/pay/v1/orderPrePay",
    //         type: "post",
    //         dataType: "jsonp", // 返回的数据类型，设置为JSONP方式
    //         jsonp: 'callback', //指定一个查询参数名称来覆盖默认的 jsonp 回调参数名 callback
    //         jsonpCallback: 'handleResponse', //设置回调函数名
    //         data: param,
    //         contentType: "application/jsonp; charset=utf-8",
    //         success: function(response) {
    //             if (response.code == 200) {
    //                 layer("成功");
    //             }
    //         },
    //         error: function() {

    //         }
    //     });
    // }
});