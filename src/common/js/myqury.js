/*
正则大全调用方法
 // checkReg.tel(666);
    // checkReg.email();

    //调用封装的插件
    var str = '2323ss.com';
    var res = checkReg.email(str);
    console.log(res);

*/
//正则大全
var checkReg = {
    //账号
    username: function (str) {
        var reg = /^[a-z][\w\-]{5,19}$/;
        return reg.test(str);
    },
    //昵称
    nickname: function (str) {
        var reg = /^[\u2E80-\u9FFF]+$/;
        return reg.test(str);
    },
    email: function (str) {
        var reg = /^[\w#$!\-]+@[\w#$!\-]+\.[a-zA-Z]+$/;
        return reg.test(str);
    },
    //身份证
    identity: function (str) {
        var reg = /^(\d{17}|\d{14})[\dx]$/;
        return reg.test(str);
    },
    tel: function (str) {
        var reg = /^1[3-9]\d{9}$/;
        return reg.test(str);
    },

    //生日
    birthday: function (str) {
        var reg = /^\d{4}([\/\-]?)\d{1,2}\1\d{1,2}$/;
        return reg.test(str);
    },
    //密码
    password: function (str) {
        var reg = /^\S{6,20}$/;
        return reg.test(str);
    },

    //自动写入生日
    newBir: function (str) {
        var reg = /\d{6}(\d{8})\d{4}/;
        return reg.test(str);
    }


}