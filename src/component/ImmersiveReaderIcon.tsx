import React from "react";
import logo from '../assests/images/immersivereader_icon.svg'
import { launchAsync }  from  "@microsoft/immersive-reader-sdk";
import './immersive.css'

function ImmersiveReaderLaunch(content:any,token:any,subdomain:any,optionObject:any){
  // uses Npm install to get the function 
  //the inputs: Token,Subdomain ,content ,OptionObject created
  // opens immersive Reader
   launchAsync(token,subdomain,content,optionObject)
}

export function ImmersiveReaderIcon(props: { content: any; token: any; subdomain: any; optionObject: any; }) {
    return (
      <React.Fragment>
        <img onClick ={()=>ImmersiveReaderLaunch(props.content,props.token,props.subdomain,props.optionObject)} src={logo} className="immersive-logo " alt="logo" /> 
      </React.Fragment>
    );
  }

