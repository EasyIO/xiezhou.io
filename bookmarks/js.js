window.onscroll = function(){
  //回到顶部
  var sllTop = document.documentElement.scrollTop||document.body.scrollTop;
  if(sllTop>240){
    $('#get-top').css('display','block')
  }else{
    $('#get-top').css('display','none')
  }
}
$('#get-top').click(function(){ 
  $('body,html').animate({
    scrollTop: 0
  }, 800);//点击回到顶部按钮，缓懂回到顶部,数字越小越快
})
// 显示/隐藏二级菜单
$(".left-menu-btn").hover(function(){
  $('#tow-nav').fadeIn(200);
},function(){
  $("#tow-nav").hover(function(){
    $('#tow-nav').fadeIn(0);
  },function(){
    $('#tow-nav').fadeOut(0)
  });
  $('#tow-nav').fadeOut(0)
})


//判断用户使用的设备
var deviceVal  = browserRedirect();
function browserRedirect() {
  var sUserAgent = navigator.userAgent.toLowerCase();
  var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
  var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
  var bIsMidp = sUserAgent.match(/midp/i) == "midp";
  var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
  var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
  var bIsAndroid = sUserAgent.match(/android/i) == "android";
  var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
  var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
  if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
    return 'phone';
  } else {
    return 'pc';
  }
}

/*
 * 2018-6-12更新
 * 解决在低分辨率下首页内容过高导致滚动条出现，影响主题背景图片不全屏的问题
 * 解决方式：对于屏幕分辨率高度低于845px显示器，改变首页的内容为6块区域。
 */

 (function(){
  //当浏览器窗口被调整大小时触发
  window.onresize = function(){
    ShowHideElement("i-link-box","linkList-item",845);
  }
  window.onload = function(){
    ShowHideElement("i-link-box","linkList-item",845); 
  }
  function ShowHideElement(Element1, Element2, Vaule){
    var Person = document.getElementsByClassName(Element1);
    var BoxHeight = document.getElementsByClassName(Element2);
    var WindowHeight = window.innerHeight||document.body.clientHeight;
    //遍历获取到的元素
    for(var i=6; i<Person.length; i++){
      if(WindowHeight <= Vaule && deviceVal === "pc"){
        Person[i].style.display = "none";
        BoxHeight[0].style.marginTop="5px";
      }else{
        Person[i].style.display = "block";
        BoxHeight[0].style.marginTop="0px";
      }
    }
  }
  window.ShowHideElement = ShowHideElement;
}());
    
var now = -1;
var resLength = 0;
var thisSearch = 'https://www.google.com/search?q=';
var thisSearchIcon = './logo_2.jpg';
var storage = window.localStorage;
if(!storage.stopHot){
    storage.stopHot = true
}
storage.stopHot == 'false' ? $('#hot-btn').addClass('off') : $('#hot-btn').removeClass('off');
var ssData = storage.searchEngine;
if(storage.searchEngine != undefined){
  ssData = ssData.split(','); 
  thisSearch = ssData[0];
  $('.search-icon').attr('src', ssData[1])
}

// 按键松开时执行
$('#txt').keyup(function(e){
  // 判断输入框是否有内容
  if($('#txt').val() != ''){
      $('.search-clear').css('display','block');
    $('.search-clear').click(function(){
      $('#txt').val('');
      $('#box ul').html('');
      $('.search-clear').css('display','none')
    })
  }else{
    $('.search-clear').css('display','none')
  }

  if(e.keyCode == 38 || e.keyCode == 40 || storage.stopHot != 'true'){
      return
  };
  var dat = {
      wd: $('#txt').val()
  };
  if($('#txt').val()!=''){
      $('#box ul').text('');
      $('#box').css('display','block');
        $.ajax({
          type: "GET",
          url: "https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su",
          async: true,
          data: dat,
          dataType : 'jsonp',
          jsonp: 'cb',
          success: function(res){
              for(var i = 0; i < res.s.length; i++){
                  resLength = res.s.length;
                  oli_i = '<li>'+res.s[i]+'</li>';
                  $('#box ul').append(oli_i);
                  
                  $('#box ul li').eq(i).click(function(){
                      $('#txt').val(this.innerHTML);
                      window.open(thisSearch + this.innerHTML);
                      $('#box ul').html('');
                      $('#box').css('display','none')
                  })
              };
                    //$('#box ul').html() === '' ? $('#box').css('height','0px') : $('#box').css('height','auto');
          },
          error: function(res){
              console.log(res)  
          }
      });
  }else{
      $('#box ul').html('')
      //$('#box ul').html() === '' ? $('#box').css('height','0px') : $('#box').css('height','auto');
  };
});

$('#txt').keydown(function(ev){
    if(ev.keyCode==40){
      now++;
      if(now > resLength-1){   
        now = 0;
      }
      $('#box ul li').eq(now).addClass('current').siblings().removeClass('current')
      $('#txt').val($('#box ul li').eq(now).text())   
    };
    if(ev.keyCode==38){
        if(now == -1 || now == 0){
          now = resLength
        }
        now--
        $('#box ul li').eq(now).addClass('current').siblings().removeClass('current');
        $('#txt').val($('#box ul li').eq(now).text())
    };
    if(ev.keyCode==13){
		var textValue = $('#txt').val();
		if(textValue != ''){
			window.open(thisSearch + $('#txt').val())
			// $('#txt').val('');
			$('#box ul').html('')
		// }else{
		// 	new $.zui.Messager('请输入关键字', {
		// 		icon: 'bell', // 定义消息图标
		// 		type: 'danger',
		// 		placement: 'top',
		// 		close: false
		// 	}).show();
		}
	}
})

$(function(){
  //$('#box ul').html() === '' ? $('#box').css('height','0px') : $('#box').css('height','auto');
  var search = {
    data: [{
      name: '百度',
      img: 'images/logo.jpg',
      url: 'https://www.baidu.com/s?wd='
    }, {
      name: '谷歌',
      img: 'images/logo_2.jpg',
      url: 'https://www.google.com/search?q='
    }, {
      name: '必应',
      img: 'images/logo_3.jpg',
      url: 'https://cn.bing.com/search?q='
    }, {
      name: '好搜',
      img: 'images/logo_4.jpg',
      url: 'https://www.so.com/s?q='
    }, {
      name: '搜狗',
      img: 'images/logo_5.jpg',
      url: 'https://www.sogou.com/web?query='
    }]
  }
  for(var i = 0; i < search.data.length; i++){
    var addList = '<li><img src="' + search.data[i].img + '"/>' + search.data[i].name + '</li>'
    $('.search-engine-list').append(addList);
  }

  $('.search-icon, .search-engine').hover(function() {
    $('.search-engine').css('display', 'block')
  }, function() {
    $('.search-engine').css('display', 'none')
  });

  $('#hot-btn').on('click', function() {
    $(this).toggleClass('off');
    if(storage.stopHot == 'true'){
      storage.stopHot = false
    }else{
      storage.stopHot = true
    }
    console.log(storage.stopHot)
  });

  $('.search-engine-list li').click(function() {
    var _index = $(this).index();
    var thisImg = $(this).children().attr('src');
    $('.search-icon').attr('src', thisImg)
    thisSearch = search.data[_index].url;
    $('.search-engine').css('display', 'none')

    storage.searchEngine = [thisSearch, thisImg]
  })
})
$("#search-btn").click(function(){
  var textValue = $('#txt').val();
  if(textValue != ''){
            window.open(thisSearch + $('#txt').val())
        // $('#txt').val('');
        $('#box ul').html('')
  }
});



