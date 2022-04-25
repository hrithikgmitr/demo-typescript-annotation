import React, { useEffect, useState } from 'react';
import { ImmersiveReaderConatiner } from './component/ImmersiveReaderConatiner';
import { getAzureToken } from './component/immersiveReaderHelper';
import { MyComponent } from './component/RichTextEditor';
// import {TextHtmlFile} from './component/TextHtmlfile'
import { commentHasPassageIdContent, passageText, string2, string3, STRING_VALUE, title} from './utils/golbalVar'

// let token ="eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6ImpTMVhvMU9XRGpfNTJ2YndHTmd2UU8yVnpNYyIsImtpZCI6ImpTMVhvMU9XRGpfNTJ2YndHTmd2UU8yVnpNYyJ9.eyJhdWQiOiJodHRwczovL2NvZ25pdGl2ZXNlcnZpY2VzLmF6dXJlLmNvbS8iLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC9hZWJkZTU4YS03MGJkLTQ1YmEtODlkNS1lMjg5NTc0ZmUwODUvIiwiaWF0IjoxNjQ4NTM3OTc3LCJuYmYiOjE2NDg1Mzc5NzcsImV4cCI6MTY0ODU0MTg3NywiYWlvIjoiRTJaZ1lHRE04VERwK05yQ3VITWhqM0hLMDdvREFBPT0iLCJhcHBpZCI6IjBlNTQzNjkxLTdkOTMtNGU2YS05Y2U5LWY2YWViMTBlMTM1NiIsImFwcGlkYWNyIjoiMSIsImlkcCI6Imh0dHBzOi8vc3RzLndpbmRvd3MubmV0L2FlYmRlNThhLTcwYmQtNDViYS04OWQ1LWUyODk1NzRmZTA4NS8iLCJvaWQiOiJlNjg4YTIxNi04M2U5LTQ1NjUtYTU4Ny1jNzAwZWZhM2MzOTIiLCJyaCI6IjAuQVNjQWl1VzlycjF3dWtXSjFlS0pWMF9naFpBaU1YM0lLRHhIb08yT1UzU2JiVzBuQUFBLiIsInN1YiI6ImU2ODhhMjE2LTgzZTktNDU2NS1hNTg3LWM3MDBlZmEzYzM5MiIsInRpZCI6ImFlYmRlNThhLTcwYmQtNDViYS04OWQ1LWUyODk1NzRmZTA4NSIsInV0aSI6IlZkWEtPLU5VeUVpSlB1N0xhdjlvQVEiLCJ2ZXIiOiIxLjAifQ.mEmbX1P223vZVJs9regttw53CsCbi2kiOCe7I6oebvsaXpA_l8Fijuz3TOKxoPuFR8Fv92kEPqWw2BoSnlkfUQ0BP1myxod7vLjyBAkhcoqXGrTcTT6N_-NKqfIFl69kDp4CMOw2ZfiBVIoq5r_QYvfyiMSpJAEu6lFp2GC4Bq5eE8GSPzQDikIf4hQ86RjZv7p-Zb04DvfeOOY_Wwyqt4mOFtMHSbXtbYHJoUIk21uoWl1gqjzrusNZQBBTxGiLGPCplK5C9a9B9wdmGhfgI6Vr1Qt6HrUHaFF83D1dYacgerVXkY1YCAqsJ9wLjmwiW3DWZPTJQqwycGEWbw197w";
// let subdomain="perfectionsub";
// let title="jj";
// let passageText="";
// let commentHasPassageIdContent=false;
// passageData.title="";
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
      <ImmersiveReaderConatiner STRING_VALUE={string3} commentHasPassageIdContent={commentHasPassageIdContent} title={title} passageText={passageText} token={response.token} subdomain={response.subdomain}/>
      {/* <TextHtmlFile stringValue = {string3}/>
       */}
       <MyComponent/>
    </div>
  );
}

export default App;
