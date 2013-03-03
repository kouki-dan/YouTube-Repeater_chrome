/*
   function onRequest(tabId, selectInfo){
   chrome.tabs.getSelected(null,function(tab){
   if(tab.url.indexOf("http://www.youtube.com") == 0 ||
   tab.url.indexOf("https://www.youtube.com") ){
   chrome.pageAction.show(tabId);
   }
   else{
   chrome.pageAction.hide();
   }
   });
   sendResponse({});


   };
   chrome.tabs.onSelectionChanged.addListener(onRequest)
 */

var repeat = false;
var first = true;
var drawIcon;
var switchRepeat;
chrome.tabs.onUpdated.addListener(function(tabId,changeInfo,tab){
    if(changeInfo.status == "complete" ){
      if (tab.url.indexOf('http://www.youtube.com') == 0 ||
         tab.url.indexOf('https://www.youtube.com') == 0 ){
        chrome.pageAction.show(tabId);
        first = false;
        
        var img = new Image()
        img.src = "icon-19.png";
        var icon = document.createElement("canvas");
        icon.width = "19";
        icon.height = "19";
        var ctx = icon.getContext("2d");

        drawIcon = function(flag){
          ctx.clearRect(0,0,19,19);
          ctx.drawImage(img,0,0);
          if(flag){
            ctx.fillStyle = "RGBA(0,0,0,0.5)";
            ctx.fillRect(0,0,19,19);
          }
        }
        img.onload = function(){
          drawIcon(true);

          chrome.pageAction.setIcon(
              {"imageData":ctx.getImageData(0,0,19,19),"tabId":tabId}
          );
        }
        chrome.pageAction.onClicked.removeListener(switchRepeat);
        switchRepeat = function(tab){
          //TODO:リピート、ノンリピートの切り替え
          repeat = !repeat;
          if(repeat){
            //Icon書き換え、リピート開始 
            drawIcon(false);
            chrome.pageAction.setIcon(
                {"imageData":ctx.getImageData(0,0,19,19),"tabId":tabId}
            );
            chrome.tabs.sendRequest(tabId,{"repeat":repeat},function(){});        
          }
          else{
            //Icon書き換え、リピートやめる
            drawIcon(true);
            chrome.pageAction.setIcon(
                {"imageData":ctx.getImageData(0,0,19,19),"tabId":tabId}
            );
            chrome.tabs.sendRequest(tabId,{"repeat":repeat},function(){});          
          }
        }



        chrome.pageAction.onClicked.addListener(switchRepeat);
     }
    }
});



