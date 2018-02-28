 var host = "https://p.pdhz-dddc.cn:8447";
 // var parkOrderApiRequest = JSON.parse(localStorage.getItem("parkOrderApiRequest"));
//获取当前页面的url
    var test = window.location.href;
    // alert(test);
    //以等号为节点将其转换成数组
    var tests = test.split("?");
    var passengerId;
    // console.log(tests)
  	//遍历数组拿到下标获取第二个元素
    // for(var s = 0;s<tests.length;s++){
    //     var s = tests[1];
    //     var testss = s.split("&");
    //     var t = testss[0];
    //     var t1 = t.split("=");
    //     passengerId = t1[1];    
    // }; 
    for(var s = 0;s<tests.length;s++){
        var s = tests[1];
        var testss = s.split("&");
        var t = testss[0];
        var tt = testss[1];
        var t1 = t.split("=");
        passengerId = t1[1];
        var tt1 = tt.split("="); 
        accessKey = tt1[1];  
    };
    console.log(passengerId);
    console.log(accessKey);
var timestamp =new Date().getTime();
var param ={};
    param.passengerId = passengerId;
    param.accessKey = accessKey;
    param.timestamp = timestamp;
    $.ajax({
        type: "post",
        url:host+"/dingding-api/h5/auth/park/order/v1/parkOrderList",
        async: true,
        dataType: "jsonp", // 返回的数据类型，设置为JSONP方式
        jsonp: 'callback', //指定一个查询参数名称来覆盖默认的 jsonp 回调参数名 callback
        jsonpCallback: 'handleResponse', //设置回调函数名
        data:param,
        success: function(data) {
            if (data.code == 200) {
                console.log(data);
            }
            var datas = data.result;
            // console.log(datas);
            if(datas==""){
            	var content = $('<div class="content">' + "<--您还没有订单哦！-->" + '</div>');
            	content.appendTo(".MEbox");
            }
            for (var i = 0; i <datas.length; i++) {
            	if(datas[i].orderId !==""){
                	switch(datas[i].orderStatus){
                		case 7:
                			var aa = $('<a class="aa">' + '</a>')
                			aa.appendTo(".MEbox");
                    		var MEstopCar = $('<div class="MEstopCar">' + '</div>')
                    		MEstopCar.appendTo(aa);
                    		var p1 = $('<p class="cancelMEline>' + '</p>')
                    		var p2 =$('<p  class="MEpone">' +' </p>')
                    		var img1 = $('<img src="images/jichangweizhi@1.5x.png"  class="MEimage"/>')
                    		var span1 = $('<span class="cancelcapitalAirport">' + "首都机场" + '</span>')
                    		var span2 = $('<span class="cancelstopcar">' + "自助停车+接送" + '</span>')
                    		var span3 = $('<span class="cancelPDstopcar">' + "(庞大叮叮泊车)" + '</span>')
                    		var p3 =$('<p  class="MEptwo">' + '</p>')
                            function add0(m){return m<10?'0'+m:m }  
                            function formatDate(needTime2) {  
                                //needTime是整数，否则要parseInt转换  
                                var time = new Date(needTime2);  
                                var y = time.getFullYear();  
                                var m = time.getMonth()+1;  
                                var d = time.getDate();  
                                var h = time.getHours();  
                                var mm = time.getMinutes();  
                                var time = add0(m)+'-'+add0(d);
                                return  time;
                            }  
                    		var span4 = $('<span class="cancelGo">' + formatDate(datas[i].parkTime)+" 出发" + '</span>')
                    		var span6 = $('<span class="cancelGoPay">' + "已取消" +'</span>')
							var span7 = $('<span class="orderId" style="display:none">' + datas[i].orderId +'</span>')
			                p1.appendTo(MEstopCar);
			                p2.appendTo(MEstopCar);
			                img1.appendTo(p2);
			                span1.appendTo(p2);
			                span2.appendTo(p2);
			                span3.appendTo(p2);
			                p3.appendTo(MEstopCar);
			                span4.appendTo(p3);
			                span6.appendTo(p3);
							span7.appendTo(p3);
			                break; 
			            case 3:
			            	var aa = $('<a class="aa">' + '</a>')
                			aa.appendTo(".MEbox");
                    		var MEstopCar = $('<div class="MEstopCar">' + '</div>')
                    		MEstopCar.appendTo(aa);
                    		var p1 = $('<p class="waitMEline>' + '</p>')
                    		var p2 =$('<p  class="MEpone">' +' </p>')
                    		var img1 = $('<img src="images/jichangweizhi@1.5x.png"  class="MEimage"/>')
                    		var span1 = $('<span class="waitcapitalAirport">' + "首都机场" + '</span>')
                    		var span2 = $('<span class="waitstopcar">' + "自助停车+接送" + '</span>')
                    		var span3 = $('<span class="waitPDstopcar">' + "(庞大叮叮泊车)" + '</span>')
                    		var p3 =$('<p  class="MEptwo">' + '</p>')
                            function add0(m){return m<10?'0'+m:m }  
                            function formatDate(needTime2) {  
                                //needTime是整数，否则要parseInt转换  
                                var time = new Date(needTime2);  
                                var y = time.getFullYear();  
                                var m = time.getMonth()+1;  
                                var d = time.getDate();  
                                var h = time.getHours();  
                                var mm = time.getMinutes();  
                                var time = add0(m)+'-'+add0(d);
                                return  time;
                            }  
                            var span4 = $('<span class="waitGo">' + formatDate(datas[i].parkTime)+" 出发" + '</span>')
                    		var span5 = $('<span class="alreadyPayMoney">' + "￥"+ datas[i].orderMoney + '</span>')
                    		var span6 = $('<span class="alreadyGoPay">' + "已支付" +'</span>')
							var span7 = $('<span class="orderId" style="display:none">' + datas[i].orderId +'</span>')
			                p1.appendTo(MEstopCar);
			                p2.appendTo(MEstopCar);
			                img1.appendTo(p2);
			                span1.appendTo(p2);
			                span2.appendTo(p2);
			                span3.appendTo(p2);
			                p3.appendTo(MEstopCar);
			                span4.appendTo(p3);
			                span5.appendTo(p3);
			                span6.appendTo(p3);
							span7.appendTo(p3);
			                break;
			            case 1:
                    		var aa = $('<a class="aa">' + '</a>')
                			aa.appendTo(".MEbox");
                    		var MEstopCar = $('<div class="MEstopCar">' + '</div>')
                    		MEstopCar.appendTo(aa);
                    		var p1 = $('<p class="waitMEline>' + '</p>')
                    		var p2 =$('<p  class="MEpone">' +' </p>')
                    		var img1 = $('<img src="images/jichangweizhi@1.5x.png"  class="MEimage"/>')
                    		var span1 = $('<span class="waitcapitalAirport">' + "首都机场" + '</span>')
                    		var span2 = $('<span class="waitstopcar">' + "自助停车+接送" + '</span>')
                    		var span3 = $('<span class="waitPDstopcar">' + "(庞大叮叮泊车)" + '</span>')
                    		var p3 =$('<p  class="MEptwo">' + '</p>')
                            function add0(m){return m<10?'0'+m:m }  
                            function formatDate(needTime2) {  
                                //needTime是整数，否则要parseInt转换  
                                var time = new Date(needTime2);  
                                var y = time.getFullYear();  
                                var m = time.getMonth()+1;  
                                var d = time.getDate();  
                                var h = time.getHours();  
                                var mm = time.getMinutes();  
                                var time = add0(m)+'-'+add0(d);
                                return  time;
                            }  
                            var span4 = $('<span class="waitGo">' + formatDate(datas[i].parkTime)+" 出发" + '</span>')
                    		var span5 = $('<span class="waitPayMoney">' + "￥"+ datas[i].orderMoney + '</span>')
                    		var span6 = $('<span class="waitGoPay">' + "待支付" +'</span>')
							var span7 = $('<span class="orderId" style="display:none">' + datas[i].orderId +'</span>')
			                p1.appendTo(MEstopCar);
			                p2.appendTo(MEstopCar);
			                img1.appendTo(p2);
			                span1.appendTo(p2);
			                span2.appendTo(p2);
			                span3.appendTo(p2);
			                p3.appendTo(MEstopCar);
			                span4.appendTo(p3);
			                span5.appendTo(p3);
			                span6.appendTo(p3);
							span7.appendTo(p3);
			                break;
            		}
            	}
            }
        }
    });
	window.onload = function () {
		var lists = $('.aa');
		// console.log(lists);
		for(var i=0;i<lists.length;i++){
			(function(i){
				lists[i].onclick=function(){
					var orderId = $(this).find('.orderId').text()
					$(this).attr("href","WaitPayOrders.html"+"?orderId="+orderId+"&passengerId="+passengerId+"&accessKey="+accessKey);
				}
			})(i);
		}
	}