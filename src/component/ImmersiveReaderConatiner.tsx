import React from "react";
import { contrainer } from "../utils/globalInterface";
import { populateImmersiveObject, StringFromImmersive } from "./immersiveReaderHelper";
import { ImmersiveReaderIcon } from "./ImmersiveReaderIcon";

// Contatiner for immersive reader 
export function ImmersiveReaderConatiner(props: contrainer) {
    let content=StringFromImmersive(props.commentHasPassageIdContent,props.STRING_VALUE,props.title,props.passageText);
    let optionObject= populateImmersiveObject()
    
    return (
      <React.Fragment>
          <ImmersiveReaderIcon content={content} token={props.token} subdomain={props.subdomain} optionObject={optionObject} />
      </React.Fragment>
    );
  }

