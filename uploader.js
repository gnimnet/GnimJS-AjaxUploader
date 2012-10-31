/*
 *  This JavaScript file for Ajax Upload JavaScript component
 *  this component works for GnimJS
 *  Version 0.1.1
 *  Write by Ming
 *  Date 2012.10.31
 */
(function($,NULL,UNDEFINED){
    /* private static variables for AjaxUploader */
    var _input_autoid=0;
    var _iframe_autoid=0;
    var _INPUT_AUTO_ID_PREFIX='uploader-input-';
    var _IFRAME_AUTO_ID_PREFIX='uploader-iframe-';
    var _EMPTY_IFRAME_URL='javascript:;';
    var _CLASS_CON='uploader-con';
    var _CLASS_FORM='uploader-form';
    var _CLASS_INPUT_CON='uploader-input-con';
    var _CLASS_INPUT='uploader-input';
    var _CLASS_IFRAME_CON='uploader-iframe-con';
    var _CLASS_IFRAME='uploader-iframe';
    var _CONFIG_PARAM='param';
    var _CONFIG_ACTION='action';
    var _CONFIG_ON_SUBMIT='onSubmit';
    var _CONFIG_ON_COMPLETE='onComplete';
    /* private static functions for AjaxUploader */
    /**
     * judge an object is null or undefined
     * @param obj the object
     * @return object is null or empty
     */
    function _isNullOrUndefined(obj){
        return obj===UNDEFINED||obj===NULL;
    }
    /**
     * just an empty function
     */
    function _nop(){}
    /* public & private variables for AjaxUploader */
    var _vars={
        param:NULL,//upload param
        action: NULL,//submit action
        onSubmit:NULL,//on submit listener
        onComplete:NULL,//on complete listener
        uploading:false,//uploading flag
        _files:NULL,//file name & id pool
        _iframe:NULL,//current iframe id
        _$dom:NULL//container dom
    };
    /* public & private functions for AjaxUploader */
    AjaxUploader.prototype={
        setConfig:setConfig,
        addFile:addFile,
        removeFile:removeFile,
        removeAllFile:removeAllFile,
        submit:submit
    }
    /**
     * constructor of AjaxUploader
     * @param con AjaxUploader container selector or item
     * @param config AjaxUploader init param
     */
    function AjaxUploader(con,config){
        var objThis=this;
        //create public & private variable
        for(var name in _vars){
            objThis[name]=_vars[name];
        }
        //init AjaxUploader DOM
        var $con=$(con);
        if($con.length!=1){
            throw new Error('selector should find only one element');
        }
        $con.addClass(_CLASS_CON);
        $('<form encType="multipart/form-data" method="post" class="'+_CLASS_FORM+'">'+
            '<div class="'+_CLASS_INPUT_CON+'"></div>'+
            '<div class="'+_CLASS_IFRAME_CON+'"></div>'+
            '</form>').appendTo($con);
        objThis._$dom=$con;
        objThis._files={};
        objThis[_CONFIG_PARAM]={};
        if(!_isNullOrUndefined(config)){
            objThis.setConfig(config);
        }
    }
    /**
     * set uploader config
     * @param config uploader config
     */
    function setConfig(config){
        var objThis=this;
        if(!_isNullOrUndefined(config)){
            if(!_isNullOrUndefined(config[_CONFIG_PARAM])){
                objThis[_CONFIG_PARAM]=config[_CONFIG_PARAM];
            }
            if(!_isNullOrUndefined(config[_CONFIG_ACTION])){
                objThis[_CONFIG_ACTION]=config[_CONFIG_ACTION];
            }
            if(!_isNullOrUndefined(config[_CONFIG_ON_SUBMIT])){
                objThis[_CONFIG_ON_SUBMIT]=config[_CONFIG_ON_SUBMIT];
            }
            if(!_isNullOrUndefined(config[_CONFIG_ON_COMPLETE])){
                objThis[_CONFIG_ON_COMPLETE]=config[_CONFIG_ON_COMPLETE];
            }
        }
    }
    /**
     * add a file input by name
     * @param name file input name field value
     */
    function addFile(name){
        var objThis=this;
        objThis.removeFile(name);
        var autoid=_INPUT_AUTO_ID_PREFIX+(_input_autoid++);
        objThis._files[name]=autoid;
        $('<input name="'+name+'" class="'+_CLASS_INPUT+' '+autoid+'" type="file" multiple />')
            .appendTo(objThis._$dom.find('.'+_CLASS_INPUT_CON));
    }
    /**
     * remove file input by name
     */
    function removeFile(name){
        var objThis=this;
        if(!_isNullOrUndefined(objThis._files[name])){
            objThis._$dom.find('.'+objThis._files[name]).remove();
            delete objThis._files[name];
        }
    }
    /**
     * remove all file inputs
     */
    function removeAllFile(){
        var objThis=this;
        for(var f in objThis._files){
            objThis.removeFile(f);
        }
    }
    /**
     * submit upload form
     */
    function submit(){
        var objThis=this;
        //try onSubmit()
        if(objThis[_CONFIG_ON_SUBMIT]){
            var rtn=objThis[_CONFIG_ON_SUBMIT]();//call onSubmit() function
            if(rtn)return;//if onSubmit() return true,exit submit
        }
        //build submit iframe
        var autoid=objThis._iframe=_IFRAME_AUTO_ID_PREFIX+(_iframe_autoid++);
        $('<iframe id="'+autoid+'" name="'+autoid+'" class="'+_CLASS_IFRAME+'" src="'+_EMPTY_IFRAME_URL+'" style="display:none;"></iframe>')
            .load(function(){
                if(objThis.uploading){
                    var iframe=objThis._$dom.find('.'+_CLASS_IFRAME)[0];
                    var doc = iframe.contentDocument ? iframe.contentDocument : document.frames[autoid].document;
                    if(objThis[_CONFIG_ON_COMPLETE]){
                        objThis[_CONFIG_ON_COMPLETE](doc.body.innerHTML);//call onComplete() function
                    }
                    objThis.uploading=false;
                }
            }).appendTo(objThis._$dom.find('.'+_CLASS_IFRAME_CON).empty());
        //set form target & action
        var form=objThis._$dom.find('.'+_CLASS_FORM)[0];
        form.target=autoid;
        var action=objThis[_CONFIG_ACTION];
        var start=action.indexOf("?")>0;
        var param=objThis[_CONFIG_PARAM];
        for(var p in param){
            var paramVal=encodeURIComponent(param[p]);
            if(start){
                action+='&'+p+'='+paramVal;
            }else{
                action+='?'+p+'='+paramVal;
                start=true;
            }
        }
        form.action=action;
        form.submit();
        //set doing upload
        objThis.uploading=true;
    }
    /* set AjaxUploader to window */
    window.AjaxUploader=AjaxUploader;
})(Gnim);
