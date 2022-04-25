

export const circle_plugin_command = {
    name: 'customCommand_circle',
    display: 'command',

    title:'circle', 
    buttonClass:'', 
    innerHTML:``,

    add: function (core, targetElement) {
        const context = core.context;
        context.customCommand_circle = {
            targetButton: targetElement
        };
    },
    active: function (element) {
        if (!element) {
            this.util.removeClass(this.context.customCommand_circle.targetButton, 'active');
        } else if (/^circle$/i.test(element.nodeName) && element.style.backgroundColor.length > 0) {
            
            this.nodeChange(null, ['border-bottom',"line-height"], ['doubleunderline'], true);
            this.util.addClass(this.context.customCommand_circle.targetButton, 'active');
            return true;
        }

        return false;
    },
    action: function () {
        if(this.RangerToFillAfterFocusOut){

        let {endContainer,endOffset,startContainer,startOffset}=this.RangerToFillAfterFocusOut
        this.setRange(startContainer,startOffset,endContainer,endOffset);
        this.RangerToFillAfterFocusOut=null;
        }
        if(this.util.hasClass(this.context.customCommand_underline.targetButton, 'active')){
            this.nodeChange(null, ["line-height","text-decoration",".tempannotation"], ['underline'], true)
        }
        if(this.util.hasClass(this.context.customCommand_doubleunderline.targetButton, 'active')){
            this.nodeChange(null, ['border-bottom',"line-height"], ['doubleunderline'], true);
        }
        if (!this.util.hasClass(this.context.customCommand_circle.targetButton, 'active')) {
            const newNode = this.util.createElement('circle');
                console.log(this);
            
            newNode.style.backgroundColor = 'transparent';
            newNode.style.color="#000";
            newNode.style.borderRadius= "15px";
            newNode.style.border="1px solid black";
            newNode.style.padding=" 1px 5px 1px 5px";
            // this.nodeChange(null, ['border-bottom',"line-height"], ['doubleunderline'], true);
            this.nodeChange(newNode, ["background-color","color","border-radius","border","padding"], null, true);
        } else {
            this.nodeChange(null, ["background-color","color","border-radius","border","padding"], ['circle'], true);
        }
    }
}
export const underline_plugin_command = {
    name: 'customCommand_underline',
    display: 'command',

    title:'underline', 
    buttonClass:'', 
    
    innerHTML:``,

    add: function (core, targetElement) {
        const context = core.context;
        context.customCommand_underline = {
            targetButton: targetElement
        };
    },
    active: function (element) {
        if (!element) {
            this.util.removeClass(this.context.customCommand_underline.targetButton, 'active');
        } else if (/^underline$/i.test(element.nodeName) &&element.style.textDecoration.length) {
            this.util.addClass(this.context.customCommand_underline.targetButton, 'active');
            return true;
        }

        return false;
    },
    action: function () {
        if(this.RangerToFillAfterFocusOut){

        let {endContainer,endOffset,startContainer,startOffset}=this.RangerToFillAfterFocusOut
        this.setRange(startContainer,startOffset,endContainer,endOffset);
        this.RangerToFillAfterFocusOut=null;
        }
        if (!this.util.hasClass(this.context.customCommand_underline.targetButton, 'active')) {
            const newNode = this.util.createElement('underline');
            this.util.addClass(newNode,"tempannotation");
            newNode.setAttribute("data", "5");
            newNode.style.textDecoration = 'underline';
            newNode.style.lineHeight= "1.5";
            this.nodeChange(newNode, ["line-height"], null, true);
        } else {

            this.nodeChange(null, ["line-height","text-decoration",".tempannotation"], ['underline'], true);
        }
    }
}

export const doubleunderline_plugin_command = {
    name: 'customCommand_doubleunderline',
    display: 'command',

    title:'doubleunderline', 
    buttonClass:'', 
    
    innerHTML:``,

    add: function (core, targetElement) {
        const context = core.context;
        context.customCommand_doubleunderline = {
            targetButton: targetElement
        };
    },
    active: function (element) {
        if (!element) {
            this.util.removeClass(this.context.customCommand_doubleunderline.targetButton, 'active');
        } else if (/^doubleunderline$/i.test(element.nodeName) &&element.style.borderBottom.length) {
            this.util.addClass(this.context.customCommand_doubleunderline.targetButton, 'active');
            return true;
        }

        return false;
    },
    action: function () {
        if(this.RangerToFillAfterFocusOut){

        let {endContainer,endOffset,startContainer,startOffset}=this.RangerToFillAfterFocusOut
        this.setRange(startContainer,startOffset,endContainer,endOffset);
        this.RangerToFillAfterFocusOut=null;
        }
        if (!this.util.hasClass(this.context.customCommand_doubleunderline.targetButton, 'active')) {
            const newNode = this.util.createElement('doubleunderline');
            newNode.style.borderBottom = '4px double #000000';
            newNode.style.lineHeight= "1.5";
            this.nodeChange(newNode, ["border-bottom","line-height"], null, null);
        } else {
            this.nodeChange(null, ['border-bottom',"line-height"], ['doubleunderline'], true);
        }
    }
}

export const custom_container = {
   
    name: 'custom_container',

    display: 'container',

    
    add: function (core, targetElement) {
        const context = core.context;
        context.custom_container = {};
        let listDiv = this.setSubmenu(core);

       
        listDiv.querySelector('#summerNoteCommentInput').addEventListener("focus",this.onFocus.bind(core));
        listDiv.querySelector("#summerNoteCommentInput").addEventListener("focusout",this.onFocusOut.bind(core))

        core.initMenuTarget(this.name, targetElement, listDiv);
    },

    setSubmenu: function (core) {
        const listDiv = core.util.createElement('DIV');
        const icons = core.icons; // assets/defaultIcons.js
        listDiv.className = 'se-menu-container se-submenu se-list-layer';
        listDiv.innerHTML = '' +
            '<div class="se-list-inner">' +
                '<div class="se-form-group">' +
                    '<div>' +
                        `<input id="summerNoteCommentInput"  placeholder="Enter your comments/notes.">` +
                    '</div>' +
                '</div>' +
            '</div>';

        return listDiv;
    },    
    onFocusOut:function(){
        let valueFromInputcommentbox=this._d.getElementById("summerNoteCommentInput").value;
        if(valueFromInputcommentbox.length){
            this._d.getElementById("summerNoteCommentInput").value='';
        };
        this.containerOff();
    },
    onFocus:function(){
        this.RangerToFillAfterFocusOut=this.getRange()
        this.removeRange();
        // let menitray=this.plugins.hiliteColor;
        // let buttonraget=this.allCommandButtons.customCommand_circle;
        // console.log(menitray.add(this,buttonraget));
        // console.log( this.context.colorPicker);
        // console.log(this);
    //    console.log( colorPicker); 
    },
    
};

export const custom_containerhigh = {
    name: 'custom_containerhighli',

    display: 'container',
    add: function (core, targetElement) {

        let menitray=core.plugins.hiliteColor;
        menitray.add(core,targetElement);
        
        const context = core.context;
        context.hiliteColor = {
            previewEl: null,
            colorInput: null,
            colorList: null
        };
        let listDiv = this.setSubmenu(core);
        listDiv.querySelectorAll(".se-form-group")[0].remove()
        listDiv.addEventListener('click', this.pickup.bind(core));
        context.hiliteColor.colorList = listDiv.querySelectorAll('li button');
        core.initMenuTarget(this.name, targetElement, listDiv);
    },
    setSubmenu: function (core) {
        const listDiv = core.util.createElement('DIV');
        let colorPicker=core.context.colorPicker;
        console.log(colorPicker);
        listDiv.className = 'se-menu-container se-submenu se-list-layer';
        listDiv.innerHTML = colorPicker.colorListHTML;
        if(core.RangerToFillAfterFocusOut){
        let {endContainer,endOffset,startContainer,startOffset}=core.RangerToFillAfterFocusOut
            core.setRange(startContainer,startOffset,endContainer,endOffset);
            core.RangerToFillAfterFocusOut=null;
        console.log(core);
        }
        return listDiv;
    },    

     /**
     * @Override _colorPicker
     */
    onClickButton:function(e){

    },
    onChangeInput: function (e) {
        this.plugins.colorPicker.setCurrentColor.call(this, e.target.value);
    },

    submit: function () {
        this.plugins.hiliteColor.applyColor.call(this, this.context.colorPicker._currentColor);
    },

    pickup: function (e) {
        e.preventDefault();
        e.stopPropagation();
        
        if(this.util.hasClass(this.context.customCommand_underline.targetButton, 'active')){
            this.nodeChange(null, ["line-height","text-decoration",".tempannotation"], ['underline'], true)
        }
        this.plugins.hiliteColor.applyColor.call(this, e.target.getAttribute('data-value'));
    },

    remove: function () {
        this.nodeChange(null, ['background-color'], ['span'], true);
        // this.submenuOff();
    },

};
// export const plugin_submenu = {
//     // @Required @Unique
//     // plugin name
//     name: 'custom_plugin_submenu',

//     // @Required
//     // data display
//     display: 'submenu',

//     // @Options
//     title: 'Custom plugin of the submenu',
//     buttonClass: '', 
//     innerHTML: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/></svg>',

//     // @Required
//     // add function - It is called only once when the plugin is first run.
//     // This function generates HTML to append and register the event.
//     // arguments - (core : core object, targetElement : clicked button element)
//     add: function (core, targetElement) {

//         // @Required
//         // Registering a namespace for caching as a plugin name in the context object
//         const context = core.context;
//         context.customSubmenu = {
//             targetButton: targetElement,
//             textElement: null,
//             currentSpan: null
//         };

//         // Generate submenu HTML
//         // Always bind "core" when calling a plugin function
//         let listDiv = this.setSubmenu(core);

//         // Input tag caching
//         context.customSubmenu.textElement = listDiv.querySelector('input');

//         // You must bind "core" object when registering an event.
//         /** add event listeners */
//         listDiv.querySelector('.se-btn-primary').addEventListener('click', this.onClick.bind(core));
//         listDiv.querySelector('.se-btn').addEventListener('click', this.onClickRemove.bind(core));

//         // @Required
//         // You must add the "submenu" element using the "core.initMenuTarget" method.
//         /** append target button menu */
//         core.initMenuTarget(this.name, targetElement, listDiv);
//     },

//     setSubmenu: function (core) {
//         const listDiv = core.util.createElement('DIV');
//         // @Required
//         // A "se-submenu" class is required for the top level element.
//         listDiv.className = 'se-menu-container se-submenu se-list-layer';
//         listDiv.innerHTML = '' +
//             '<div class="se-list-inner">' +
//                 '<ul class="se-list-basic" style="width: 230px;">' +
//                     '<li>' +
//                         '<div class="se-form-group">' +
//                             '<input class="se-input-form" type="text" placeholder="insert text" style="border: 1px solid #CCC;" />' +
//                             '<button type="button" class="se-btn-primary se-tooltip">' +
//                                 '<strong>OK</strong>' +
//                                 '<span class="se-tooltip-inner">' +
//                                     '<span class="se-tooltip-text">Append span</span>' +
//                                 '</span>' +
//                             '</button>' +
//                             '<button type="button" class="se-btn se-tooltip">' +
//                                 '<strong>X</strong>' +
//                                 '<span class="se-tooltip-inner">' +
//                                     '<span class="se-tooltip-text">Remove</span>' +
//                                 '</span>' +
//                             '</button>' +
//                         '</div>' +
//                     '</li>' +
//                 '</ul>' +
//             '</div>';

//         return listDiv;
//     },

//     // @Override core
//     // Plugins with active methods load immediately when the editor loads.
//     // Called each time the selection is moved.
//     active: function (element) {
//         // If no tag matches, the "element" argument is called with a null value.
//         if (!element) {
//             this.util.removeClass(this.context.customSubmenu.targetButton, 'active');
//             this.context.customSubmenu.textElement.value = '';
//             this.context.customSubmenu.currentSpan = null;
//         } else if (this.util.hasClass(element, 'se-custom-tag')) {
//             this.util.addClass(this.context.customSubmenu.targetButton, 'active');
//             this.context.customSubmenu.textElement.value = element.textContent;
//             this.context.customSubmenu.currentSpan = element;
//             return true;
//         }

//         return false;
//     },

//     // @Override submenu
//     // Called after the submenu has been rendered
//     on: function () {
//         this.context.customSubmenu.textElement.focus();
//     },

//     onClickRemove: function () {
//         const span = this.context.customSubmenu.currentSpan;
//         if (span) {
//             this.util.removeItem(span);
//             this.context.customSubmenu.currentSpan = null;

//             // this.submenuOff();
//             this.focus();
//         }
//     },

//     onClick: function () {
//         const value = this.context.customSubmenu.textElement.value.trim();
//         if (!value) return;

//         const span = this.context.customSubmenu.currentSpan;
//         if (span) {
//             span.textContent = value;
//             this.setRange(span, 1, span, 1);
//         } else {
//             this.functions.insertHTML('<span class="se-custom-tag">' + value + '</span>', true);
//             this.context.customSubmenu.textElement.value = '';
//         }
       
//         // this.submenuOff();
//     }
// };