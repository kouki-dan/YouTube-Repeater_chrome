
var e = document.createEvent("Event");
e.initEvent('repeatButtonPushed',true,true);

//chrome.extension.sendRequest({},function(response){});
var repeat = false
chrome.extension.onRequest.addListener(
    function(request,sender,sendResponse){
      if(repeat != request.repeat){
        document.dispatchEvent(e);
      }
      repeat = request.repeat;

      sendResponse({});
    }
);



// YouTubeAPIのaddEventListenerのListenerは、グローバルにないと呼び出せないため
//グローバルに直接スクリプトを追加する

sc = document.createElement("script");
sc.innerText = 'var repeat_aFOUEAF = false;function repeater_aFOUEAF(state){if(state == 0 && repeat_aFOUEAF){player_aFOUEAF.playVideo();}}var player_aFOUEAF = document.getElementsByTagName("embed")[0];window.addEventListener("load",function(){if(player_aFOUEAF){if(player_aFOUEAF.addEventListener){player_aFOUEAF.addEventListener("onStateChange","repeater_aFOUEAF");}}},true);document.addEventListener("repeatButtonPushed",function(){repeat_aFOUEAF = !repeat_aFOUEAF;});';

document.head.appendChild(sc);


/*//sc.innerTextに入れてるソース
var repeat_aFOUEAF = false;
function repeater_aFOUEAF(state){
  if(state == 0 && repeat_aFOUEAF){
    player_aFOUEAF.playVideo();
  }
}
var player_aFOUEAF = document.getElementsByTagName("embed")[0];
window.addEventListener("load",function(){
  if(player_aFOUEAF){
    if(player_aFOUEAF.addEventListener){
      player_aFOUEAF.addEventListener("onStateChange","repeater_aFOUEAF");
    }
  }
},true);
document.addEventListener("repeatButtonPushed",function(){
  repeat_aFOUEAF = !repeat_aFOUEAF;
});
*/


