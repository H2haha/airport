//日历初始化
 $(function(){
     var test = window.location.href;
     var nowData = new Date();
     //转化时间戳为时间
     function timestampToTime(timestamp) {
         var date = new Date(timestamp);
         var M = (date.getMonth() + 1 < 10 ? (date.getMonth() + 1) : date.getMonth() + 1) + '月';
         var D = date.getDate() + '日';
         return M + D; //这里只返回月日
     }
     var date = new Date();
     var date02 = new Date(date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate());
     //获取日期对象的时间戳
     var timeStamp = date02.getTime();
     //增加一天
     var timeStamp02 = parseInt(timeStamp) + 3600 * 24 * 1000 + 6 * 3600 * 1000;
     //增加三天
     var timeStamp03 = parseInt(timeStamp) + 3600 * 24 * 3 * 1000;
     window.nowTimes = new Date(nowData.getTime() + 2 * 3600 * 1000);
     var opt = {

         theme: 'ios', //设置显示主题 

         mode: 'scroller', //设置日期选择方式，这里用滚动

         display: 'bottom', //设置控件出现方式及样式
         preset: 'datetime', //日期:年 月 日 时 分
         minDate: new Date(nowData.getTime() + 2 * 3600 * 1000),
         // maxDate:new Date(parseInt(timeStamp) + 3600 * 24 * 1000*90 + 6 * 3600 * 1000),
         // maxDate:new Date(nowData.getFullYear(),nowData.getMonth(),nowData.getDate()+7,22,00),
         dateFormat: 'mm-dd', // 日期格式
         /*dateStrMouth:"月",
         dateStrDay:"日",*/
         dateOrder: 'mmdd', //面板中日期排列格式
         defaultDate: nowTimes,
         stepMinute: 1, //设置分钟步长

         yearText: '年',

         monthText: '月',

         dayText: '日',

         hourText: '时',

         minuteText: '分',

         lang: 'zh' //设置控件语言};

     };
     var opt2 = {

         theme: 'ios', //设置显示主题 

         mode: 'scroller', //设置日期选择方式，这里用滚动

         display: 'bottom', //设置控件出现方式及样式

         preset: 'date', //日期:年 月 日 时 分

         minDate: new Date(timeStamp03),
         maxDate:new Date(timeStamp+3600 * 24 * 1000 * 89),
         dateFormat: 'mm-dd', // 日期格式

         dateOrder: 'mmdd', //面板中日期排列格式

         stepMinute: 1, //设置分钟步长

         yearText: '年',

         monthText: '月',

         dayText: '日',

         hourText: '时',

         minuteText: '分',

         lang: 'zh' //设置控件语言};

     };
     $('#test').on("touchstart", function() {
         var date = new Date();
         var time = date.getTime();
         time = time + 2 * 3600 * 1000;
         date = new Date(time);
         opt.minDate = date;
         $('#test').mobiscroll(opt);
     });
     $('#test').val(timestampToTime(timeStamp02) + new Date(timeStamp02).getHours() +"时"+"0分");
     $('#test').mobiscroll(opt);
     $("#test2").on("touchstart", function() {
         if (!$("#test")[0].obj) { return }
         var arr = $("#test")[0].obj._tempWheelArray;
         var date = new Date(2018 + "/" + (parseInt(arr[0]) + 1) + "/" + arr[1]);
         date.setHours(arr[2]);
         date.setMinutes(arr[3]);
         var timeStampA = date.getTime();
         timeStampA = timeStampA + 3600 * 24 * 1000 * 3;
         opt2.minDate = new Date(timeStampA);
         $('#test2').mobiscroll(opt2);
         // $('#test2').trigger("click");
     });
     $('#test2').mobiscroll(opt2);
     $('#test2').val(timestampToTime(timeStamp03));
     // $('#test2').on("pullValue",function(){
     //     var csDate1=new Date(timeStamp02);
     //     var csDate2=new Date(timeStamp03);
     //     var ele1=$('#test');
     //     var ele2=$('#test2');

     //     if(ele1[0].obj){
     //         csDate1=ele1[0].obj.getDate(ele1[0].obj._tempWheelArray);
     //     }
     //     if(ele2[0].obj){
     //         csDate2=ele2[0].obj.getDate(ele2[0].obj._tempWheelArray);
     //     }
     //     if(csDate2-csDate1<3600*24*1000){
     //         alert("小于三天");
     //         this.click();
     //     }
     // });
     $('#test').on("pullValue", function() {
         // debugger;
         var csDate1 = new Date(timeStamp02);
         var csDate2 = new Date(timeStamp03);
         var ele1 = $('#test');
         var ele2 = $('#test2');
         if (ele1[0].obj) {
             csDate1 = ele1[0].obj.getDate(ele1[0].obj._tempWheelArray);
         }
         if (ele2[0].obj) {
             csDate2 = ele2[0].obj.getDate(ele2[0].obj._tempWheelArray);
         }
         if (csDate2 - csDate1 < 3600 * 24 * 1000) {
             // alert("小于三天");
             layer('亲,最少3天起订哦~~');
             this.obj.ishide = true;
             this.obj._isInput = false;

         } else {
             this.obj.ishide = false;
             this.obj._isInput = true;
         }
     });
     //客服电话
      $("#serve").click(function() { 
              $(".service-bg,.layer").show(); 
                    // layer2(test);
      });
      $("#delete").click(function() {
           $(".service-bg,.layer").hide(); 
      });

 function layer(msg, fun) {
     var str = $('<div id="layer"><div class="layer-bg" style="position: fixed;top: 0;left: 0;width: 100%;height: 100%;z-index: 9999;background-color:transparent;"></div><div class="my_layer" style="position:fixed;top:2rem;left: 50%;z-index:10000;width:80%;margin-left:-40%;opacity:0.8;background:#222222;border-radius:100px;"><div style="color:#ffffff!important;height:50px;line-height:50px; text-align:center;">' + msg + '</div></div></div>');
     $('body').append(str);
     setTimeout(function() {
         $('#layer').remove();
         fun && fun();
     }, 2000);
 } //提示
 //layer end
 
$(".order").click(function() {
    var passenger =GetQueryString("passengerId");
      var access =GetQueryString("accessKey");
    window.location.href = "MoreExplanation.html"+"?passengerId="+passenger+"&accessKey="+access;
});
 // 获取地址参数
 function GetQueryString(name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
            var r = window.location.search.substr(1).match(reg); //获取url中"?"符后的字符串并正则匹配
            var context = "";
            if (r != null)
                context = r[2];
            reg = null;
            r = null;
            return context == null || context == "" || context == "undefined" ? "" : context;
        };
     $("#next").click(function() {
        console.log("日期",$("#test2").val(),$("#test").val());
     //首页数值存储
     var parkOrderApiRequest = {};
      parkOrderApiRequest.passengerId = GetQueryString("passengerId");
      parkOrderApiRequest.access2 = GetQueryString("accessKey");
      console.log(parkOrderApiRequest.access2);
     // parkOrderApiRequest.provinceName = "";
     // parkOrderApiRequest.cityName = "";
     // parkOrderApiRequest.parkLongitude = "";
     // parkOrderApiRequest.parkLatitude = "";
     // parkOrderApiRequest.parkAddress = "";
     // parkOrderApiRequest.parkAddress = ""; 
         var s = $("#test").val().replace("月", ",").replace("日", ",").replace("时", ",").replace("分", "").split(",");
         console.log(s);
         var parkTime = new Date();
         parkTime.setMonth(parseInt(s[0])-1);
         parkTime.setDate(parseInt(s[1]));
         parkTime.setHours(parseInt(s[2]));
          parkOrderApiRequest.parkTime = parkTime;
         var e = $("#test2").val().replace("月", ",").replace("日", "").split(",");
         var takeCarTime = new Date();
         takeCarTime.setMonth(parseInt(e[0])-1);
         takeCarTime.setDate(parseInt(e[1]));
         takeCarTime.setHours(parseInt(23));
         parkOrderApiRequest.takeCarTime =takeCarTime;
         // console.log(takeCarTime.format("yyyy-MM-dd hh"), parkTime.format("yyyy-MM-dd hh"))
         console.log(parseInt((takeCarTime - parkTime) / (1000 * 60 * 60 * 24)) +1);
         parkOrderApiRequest.parkDays = parseInt((new Date(takeCarTime) - new Date(parkTime)) / (1000 * 60 * 60 * 24)) + 1;
         console.log(parkOrderApiRequest.parkDays);
         parkOrderApiRequest.orderMoney = parkOrderApiRequest.parkDays*30;
         localStorage.setItem("parkOrderApiRequest", JSON.stringify(parkOrderApiRequest));
         console.log(s, e);
          window.location.href = "information.html";
     });
     $(".location").click(function() {
          window.location.href="mapcontent.html";
     });

 });