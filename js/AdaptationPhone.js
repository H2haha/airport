(function(window){
    //获取页面宽度
    var winW =document.documentElement.clientWidth ||document.body.clientWidth;
    //根据页面宽度设置html字体大小
    document.documentElement.style.fontSize =winW / 3.75 + "px";
    //当页面大小发生改变,重新修正rem为新窗口尺寸的3.75分之一
    window.onresize =function(){
        document.documentElement.style.fontSize =(document.documentElement.clientWidth ||document.body.clientWidth) /3.75 + "px";
    }
})(window);

// var parkOrderApiRequest = {
//    id:null,//主键ID
//    passengerId: null,//乘客ID
//    provinceName: null,//省份名称
//    cityName: null,//城市名称
//    parkLongitude: null,//经度
//    parkLatitude: null,//纬度
//    parkAddress: null,//停车场详细地址
//    parkDays: null,//停车天数
//    parkTime: null,//停车时间
//    takeCarTime: null,//取车时间
//    orderMoney: null,//订单金额
//    contactPerson: null,//联系人
//    contactPhone: null,//联系电话
//    plateNo: null,//车牌号
//    orderId: null,//订单编号
//    orderStatus: null,//订单状态 1:待支付 3：已支付 5：已完成 7：已取消
//    payType: null,//支付类型 1：支付宝 2:微信
//    payMoney: null,//支付金额
//    cancelTime: null,//取消时间
//    cancelReason: null,//取消原因
//    cityName: null,//主键ID
//    createTime: null  //下单时间
//  };