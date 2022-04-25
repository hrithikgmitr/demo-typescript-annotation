import React, { useEffect, useState } from 'react';
import { ImmersiveReaderConatiner } from './component/ImmersiveReaderConatiner';
import { getAzureToken } from './component/immersiveReaderHelper';
import { MyComponent } from './component/RichTextEditor';
// import {TextHtmlFile} from './component/TextHtmlfile'
import { commentHasPassageIdContent, passageText, string2, string3, STRING_VALUE, title} from './utils/golbalVar'


function App() {
  let [response,setresponse]=useState({token:"",subdomain:""})
  useEffect(() => {
    (async () => {
      const resp:any = await getAzureToken();
      if(resp.data){
        setresponse(resp.data);
      }
   })();
   
  }, []);

  return (
    <div className="App">
      {/* <ImmersiveReaderConatiner STRING_VALUE={string3} commentHasPassageIdContent={commentHasPassageIdContent} title={title} passageText={passageText} token={response.token} subdomain={response.subdomain}/>
      {/* <TextHtmlFile stringValue = {string3}/>
       */} 
       <MyComponent/>
    </div>
  );
}

export default App;
