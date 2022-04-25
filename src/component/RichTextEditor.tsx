import React, { useRef, useState } from 'react';
import SunEditor from 'suneditor-react';
import SunEditorCore from "suneditor/src/lib/core";
// import ReactSummernote from 'react-summernote';
import 'suneditor/dist/css/suneditor.min.css'; // Import Sun Editor's CSS File
import { commentHasPassageIdContent, passageText, string2, string3, STRING_VALUE, title} from '../utils/golbalVar'
import { circle_plugin_command, custom_container,custom_containerhigh, underline_plugin_command,doubleunderline_plugin_command} from './textannoation';
import { hiliteColor} from 'suneditor/src/plugins'
export const MyComponent = (props:any) => {
 const[textannotationString,settextannotationString] =useState(string3);
  const editor :any= useRef<SunEditorCore>();
 let  showInline= (toolbar:any, context:any)=>{
    // console.log(toolbar, context)
  }
  const customizeTextstylecheck=(element:any) => {
    return element && element.nodeType !== 3 && /^(strong|span|CIRCLE|UNDERLINE|DOUBLEUNDERLINE|font|b|var|i|em|u|ins|s|strike|del|sub|sup|mark|a|label|code|summary)$/i.test(element.nodeName)
  };

  const getSunEditorInstance = (sunEditor: SunEditorCore) => {
    editor.current = sunEditor;
    // console.log(editor.current);
    editor.current.core.util.isTextStyleElement=customizeTextstylecheck;
    // let data:any=localStorage.getItem("annotation");
    // editor.current.setContents(data)
    console.log(editor.current);
  }


const onloadFunction =(e:any)=>{
  // let manipulate=string3;
  let data:any=localStorage.getItem("annotation");
  // let datavalue:any[]=JSON.parse(data);
  // datavalue.forEach((elem:any)=>{
  //   // console.log(elem);
  //   // console.log(manipulate.indexOf(elem[0]));
  //   manipulate=manipulate.replace(elem[0],elem[1]);
  // })
  // editor.current.setContents(data)
  settextannotationString(data);
  
}
// let see=false;
const handleKeyDown=(event:KeyboardEvent)=>{
  event.preventDefault();

	console.log(event); //Get the keydown event
}
const handleMousedown=(event:MouseEvent)=>{
      // event.preventDefault();
      // console.log(editor.current);
      // console.log(editor.current.core);
      // console.log(editor.current)
      
        // editor.current.core.nodeChange(null, ["background-color","color","border-radius","border","padding"], ['circle'], true)
    
}
const handleFocus=(event:any)=>{
  event.preventDefault()
	console.log(event); //Get the focus event
}

  return (
    <div>
      <p> My Other Contents </p>
      <SunEditor name="my-editor"
      onKeyDown={handleKeyDown}
      onLoad={onloadFunction}
      onMouseDown={handleMousedown}
      setContents={textannotationString}
      height="100%"
      // onFocus={handleFocus}
      autoFocus={false}
      getSunEditorInstance={getSunEditorInstance}
      setOptions={{
        callBackSave:(contents, isChanged)=>{
          // console.log(ref.current)
          // console.log(editor)
          // see=true;
          console.log(editor.current);

          console.log(contents);
            localStorage.setItem("annotation",contents);
  
        },
        addTagsWhitelist:"CIRCLE|UNDERLINE|DOUBLEUNDERLINE",
        plugins:[hiliteColor,circle_plugin_command,custom_container,custom_containerhigh,underline_plugin_command,doubleunderline_plugin_command],
        buttonList: [
          [ "custom_containerhighli","customCommand_underline","customCommand_doubleunderline","customCommand_circle","custom_container",'save',]
      ],
        colorList: [
          '#ccc', '#dedede', 'OrangeRed', 'Orange', 'RoyalBlue', 'SaddleBrown'
      ],
        mode:"balloon"}}

      />
    </div>
  );
};

