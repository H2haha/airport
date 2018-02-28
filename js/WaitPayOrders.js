var host = "https://p.pdhz-dddc.cn:8447";
//获取当前页面的url
    var test = window.location.href;
    // alert(test);
    //以等号为节点将其转换成数组
    var tests = test.split("?");
    var orderId;var passengerId;
  	//遍历数组拿到下标获取第二个元素
    for(var s = 0;s<tests.length;s++){
        var s = tests[1];
        var testss = s.split("&");
        var t = testss[0];
        var tt = testss[1];
        var tt2 = testss[2];
        var t1 = t.split("=");
        orderId = t1[1];
        console.log(orderId);
        var tt1 = tt.split("="); 
        passengerId = tt1[1];
        console.log(passengerId);
        var tt2 = tt2.split("="); 
        accessKey = tt2[1];
        console.log(accessKey);
    };
    
    $(".quxiao").click(function(){
    	$(".quxiao a").attr('href',"removeOrders.html"+"?orderId="+orderId+"&passengerId="+ passengerId+"&accessKey="+accessKey);
    })
    	var timestamp=new Date().getTime();
		var param ={};
        param.orderId = orderId;
        param.timestamp = timestamp;
        param.accessKey = accessKey;
        $.ajax({
            type: "post",
            url:host+"/dingding-api/h5/auth/park/order/v1/parkOrderInfo",
            async: true,
            dataType: "jsonp", // 返回的数据类型，设置为JSONP方式
            jsonp: 'callback', //指定一个查询参数名称来覆盖默认的 jsonp 回调参数名 callback
            jsonpCallback: 'handleResponse', //设置回调函数名
            data:param,
            success: function(data) {
                if (data.code == 200) {
                    console.log(data);
                var datas = data.result;
        		if(datas.orderStatus!==""){
        			//已取消
        			if(datas.orderStatus==7){//7
        				$('.divline .divtwo').text("已取消").css({"color":"#333333"});
        				$('.foboxonecontent .div .divone').text("订单编号  " +　datas.orderId);
						function add0(m){return m<10?'0'+m:m }  
						function formatDate(needTime2) {  
						    //needTime是整数，否则要parseInt转换  
						    var time = new Date(needTime2);  
						    var y = time.getFullYear();  
							var m = time.getMonth()+1;  
							var d = time.getDate();  
							var h = time.getHours();  
						    var mm = time.getMinutes();  
						    var time = y+'-'+add0(m)+'-'+add0(d)+' '+add0(h)+':'+add0(mm);
							return  time;
						}  
						$('.foboxtwocontent .div .div2one').text("泊车时间 : " + formatDate(datas.parkTime));
					    $('.foboxtwocontent .divline .div2one').text("取车时间 : " + formatDate(datas.takeCarTime));
					    $('.foboxsixcontent .div3one').text("预定日期 : " + formatDate(datas.createTime));
						$(".foboxfivecontent .div .div2one").text("联系人 :" + " " +datas.contactPerson);
						$(".foboxfivecontent .div .div3one").text("联系手机 :" + " " + datas.contactPhone);
						$(".foboxfivecontent .div .div4one").text("车牌号 :" + " " + datas.plateNo);
						$(".waitpay .paymoeny").text("￥"+datas.orderMoney);
						$('.foboxonecontent .div .divtwo').hide();
						$(".fobox .quxiao").hide();
						$('.fobottom').hide();
						$(".nullbottom").hide();
					//已支付
        			}else if(datas.orderStatus==3){//3
        				$('.divline .divtwo').text("已支付").css({"color":" #000000"});
        				$('.foboxonecontent .div .divone').text("订单编号  " +　datas.orderId);
        				$('.foboxonecontent .div .divtwo').text("￥"+datas.orderMoney).css({"color":"#333333"});
        				$('.foboxtwocontent .div .div2one').text("泊车时间 : " + formatDate(datas.parkTime));
					    $('.foboxtwocontent .divline .div2one').text("取车时间 : " + formatDate(datas.takeCarTime));
					    $('.foboxsixcontent .div3one').text("预定日期 : " + formatDate(datas.createTime));
						function add0(m){return m<10?'0'+m:m }  
						function formatDate(needTime2) {  
						    //needTime是整数，否则要parseInt转换  
						    var time = new Date(needTime2);  
						    var y = time.getFullYear();  
							var m = time.getMonth()+1;  
							var d = time.getDate();  
							var h = time.getHours();  
						    var mm = time.getMinutes();  
						    var time = y+'-'+add0(m)+'-'+add0(d)+' '+add0(h)+':'+add0(mm);
							return  time;
						}  
						var time1 = formatDate(datas.parkTime);
						var time2 = formatDate(datas.takeCarTime);
						var time3 = formatDate(datas.createTime);
						$(".foboxfivecontent .div .div2one").text("联系人 :" + " " +datas.contactPerson);
						$(".foboxfivecontent .div .div3one").text("联系手机 :" + " " + datas.contactPhone);
						$(".foboxfivecontent .div .div4one").text("车牌号 :" + " " + datas.plateNo);
						$(".waitpay .paymoeny").text("￥"+datas.orderMoney);
						$(".fobox .quxiao").hide();
						$('.fobottom').hide();
						$(".nullbottom").hide();
						$(".foboxsever").hide();
					//待支付
        			}else if(datas.orderStatus==1){//1
        				$('.divline .divtwo').text("待支付").css({"color":"#E04D54"});
        				$('.foboxonecontent .div .divone').text("订单编号  " +　datas.orderId);
        				$('.foboxonecontent .div .divtwo').css({"color":"#333333"});
						function add0(m){return m<10?'0'+m:m }  
						function formatDate(needTime2) {  
						    //needTime是整数，否则要parseInt转换  
						    var time = new Date(needTime2);  
						    var y = time.getFullYear();  
							var m = time.getMonth()+1;  
							var d = time.getDate();  
							var h = time.getHours();  
						    var mm = time.getMinutes();  
						    var time = y+'-'+add0(m)+'-'+add0(d)+' '+add0(h)+':'+add0(mm);
							return  time;
						}  
						$('.foboxtwocontent .div .div2one').text("泊车时间 : " + formatDate(datas.parkTime));
					    $('.foboxtwocontent .divline .div2one').text("取车时间 : " + formatDate(datas.takeCarTime));
					    $('.foboxsixcontent .div3one').text("预定日期 : " + formatDate(datas.createTime));
						$(".foboxfivecontent .div .div2one").text("联系人 :" + " " +datas.contactPerson);
						$(".foboxfivecontent .div .div3one").text("联系手机 :" + " " + datas.contactPhone);
						$(".foboxfivecontent .div .div4one").text("车牌号 :" + " " + datas.plateNo);
						$('.foboxonecontent .div .divtwo').text("￥"+datas.orderMoney).css({"color":"#E04D54"});
						$(".waitpay .paymoeny").text("￥"+datas.orderMoney);
		                   	$(".fobottom .gotopay").click(function() {
		                   	    var orderId2 =datas.orderId;
		                   	    console.log(orderId2);
		                       //调取app支付
		                       // alert(123); 
		                        App(orderId2); 
		                        //调取app方法
		                       function App(orderId2) {
		                           if (isIOS()) {
		                               // layer("nnn");
		                               // window.webkit.messageHandlers.getPay.postMessage({ orderId: orderId2 });
		                           var orderName = orderId2;
                                  window.webkit.messageHandlers.getPay.postMessage({order:orderName});
		                           } else { //执行安卓
		                           	  // alert(456);
		                              // alert(orderId2);
		                               JavascriptInterface.getPay(orderId2);
		                           }
		                       }
		                       function isIOS() {
		                           //判断是安卓还是ios端
		                           if (/(android)/i.test(navigator.userAgent)) {
		                               return false;
		                           } else if (/(ipad|iphone|mac)/i.test(navigator.userAgent)) {
		                               return true;
		                           }
		                       };
		                      
		                   })//gotopay click end;

        			}//待支付 end
        		}
            }//200 code
            }//success 结束
        });