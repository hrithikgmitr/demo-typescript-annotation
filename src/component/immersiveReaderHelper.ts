import $ from "jquery";
import { optionObjectType } from "../utils/globalInterface";
import { imersiveReaderPreferencesKey } from "../utils/golbalVar";

////////////////// Function To create content for immersive reader//////////////////
// Input: commentHasPassageIdContent :True/False
//        dataContents:String// the Passagevalue string which passage is made
//        _title: String// IF Passage has Title
//        _passageText:String// IF Passage has text 
// 
export function StringFromImmersive(commentHasPassageIdContent:Boolean,dataContents:String, _title:String='', _passageText:String=""){

    // let textAnnotaionHasLineNumber=false;
    let dataContentForImmersive: string=""
    // let datahasspecialCharterer=false 
    // let navigateToImmersiveReader = false; 
    let dataContentsArray:Array<string>=[];
    dataContentsArray = commentHasPassageIdContent ? _passageText.split(/<hr\/?>/) :dataContents.split('<hr/>');
    var tempContentForImmersive = "";
    var tempContentForImmersiveArray: any[]=[];
    dataContentsArray && dataContentsArray.forEach((value:any, index:any) => {
        tempContentForImmersive = value.replace(/(<br\/>(.||[\n])?<br\/>)+/g, "~")
        tempContentForImmersive = value.replace(/(<br \/>(.||[\n])?<br \/>)+/g, "~");
        tempContentForImmersive = value.replace(/\n+/g, "\n")
        tempContentForImmersive = tempContentForImmersive.replace(/(<span class=('||")lineNum('||")>[0-9]+<\/span>)+/g, '<span class="lineNum"></span>')
        tempContentForImmersive = tempContentForImmersive.replace(/(<span id=('||")(.+?)backlink('||")>((.|\n)+?)<\/span>)+/g, '<span class="endnote--backlink"></span>')
        tempContentForImmersive = tempContentForImmersive.replace(/(<(div) class=('||")style_dd_footnote(_hanging|)('||")>((.|\n)+?)<\/(div)>)+/g, '<div class="style_dd_footnote_hanging"></div>')
        tempContentForImmersive = tempContentForImmersive.replace(/(<(p) class=('||")style_dd_footnote(_hanging|)('||")>((.|\n)+?)<\/(p)>)+/g, '<p class="style_dd_footnote_hanging"></p>');
        tempContentForImmersiveArray.push(tempContentForImmersive)
    })
     dataContentForImmersive = tempContentForImmersiveArray.join("");
   
    if (dataContentForImmersive) {
        var jsonOnjInArr: any[] = [];
        var splitValue = dataContentForImmersive.split('~')
        splitValue.forEach((content: string) => {
            jsonOnjInArr.push('<li>' + content + '<\li>');
        })
        dataContentForImmersive=jsonOnjInArr.join('');
        let finObj = document.createElement('div');
        finObj.innerHTML=dataContentForImmersive;
        let removeFinOBj : NodeListOf<Element> = finObj.querySelectorAll('.lineNum') ;
        removeFinOBj=removeFinOBj.length? removeFinOBj :finObj.querySelectorAll('.ap_lineNum') ;
        if(removeFinOBj.length){
            for (let removeSub of removeFinOBj as any){
                removeSub.parentNode.removeChild(removeSub);
            } 
        }
        let removePTag =finObj.getElementsByTagName('p');
        if(removePTag.length){
            for (let removePSub of removePTag as any){
                removePSub.innerHTML= removePSub.innerHTML.trim();
            } 
        }
        let dataContentForImmersiveArray =[]
        let ChildrenNodelist: NodeListOf<ChildNode>=finObj.childNodes
        for (let sub of ChildrenNodelist as any){
            dataContentForImmersiveArray.push(sub.innerHTML);
        } 
    
        dataContentForImmersive=dataContentForImmersiveArray.join("");
        
        dataContentForImmersive = dataContentForImmersive.replace(/(<p class="body_lt_.*?<\/p>)/g, '$1<p></p>');
    }
    let content = {
        title: _title,
        chunks: [{
            content: dataContentForImmersive,
            lang: 'en',
            mimeType: 'text/html',
        }]
    };
   
    return content
}
// Get http Request
  export const getHttpRequest = function(
    settings: Object,
    _callBackFn?: Function,
    _errorCallBackFn?: Function,
      ) {
    sendHttpRequest(settings,_callBackFn,_errorCallBackFn)
  }
  
// Sends resquest to Client Server
  export const sendHttpRequest = function(
    settings: Object,
    _callBackFn?: Function,
    _errorCallBackFn?: Function,
    key?: string | undefined
  ) {
    let request: any = $.ajax(settings);
    request.done(function(data: any) {
      if (typeof _callBackFn !== 'undefined') {
        _callBackFn(data);
        request = null;
      }
    });
    request.fail(function() {
      if (typeof _errorCallBackFn !== 'undefined') {
        _errorCallBackFn(request.status);
      }
      request = null;
    });
  };

 // Get Microsoft Azure token via Promise 
export function getAzureToken(_async=true,_data="") {
    return new Promise((resolve,reject)=>{
        var request = {
        url: 'https://qa1.perfectionnext.com/api/endpoint/azure/auth/token/retrieve',
        xhrFields: {
            withCredentials: true
        },
        headers: {
            "Content-Type": "application/json",
        },
        async: _async,
        crossDomain: true,
        method: "GET",
        data: _data
    };
    getHttpRequest(
        request,
        function(_data: {} | PromiseLike<{}> | undefined) {
          resolve(_data);
        },
        function(error: any) {
          reject(error);
        }
      );
        
})
}
// Function Run when Immersive Reader Closes
export function onExitImmersiveReader(){
    ///Can add any flag and varaible with needs to be updated accordingly 
    console.log("on exit")
}

// Use to add Extra Functionality on Immersive Reader
// return optionObject zfor immersive reader;
export function  populateImmersiveObject(){

  // to get Stored setting form local storage
  const storedUserPreferences = localStorage.getItem(imersiveReaderPreferencesKey);
  let optionObject: optionObjectType={
    uiZIndex: 0,
    preferences: null,
    onPreferencesChanged: undefined,
    onExit: undefined
  }
  let userPreferences = storedUserPreferences === null ? "" : storedUserPreferences; 
  optionObject["uiZIndex"]= 1000000;
  optionObject["preferences"]= userPreferences;
  optionObject["onPreferencesChanged"]= (value:any) => {
     userPreferences = value;
    localStorage.setItem(imersiveReaderPreferencesKey, userPreferences);
   }
  // runs when Immersive Reader is exited 
  optionObject["onExit"]= ()=>{onExitImmersiveReader()};
  
  return optionObject;
}

