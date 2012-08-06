/*
 *  This JavaScript file for Ajax Upload JavaScript component
 *  this component works for GnimJS
 *  Version 0.1.0
 *  Write by Ming
 *  Date 2010.12.28
 */
(function(f,b,n){function c(a){return a===n||a===b}function g(a,d){for(var e in h)this[e]=h[e];this._selector=a;this._files={};e=f(a);if(1!=e.length)throw Error("selector should find only one element");e.addClass(o);f('<form encType="multipart/form-data" method="post" class="'+k+'"><div class="'+l+'"></div><div class="'+m+'"></div></form>').appendTo(a);this[i]={};c(d)||this.setConfig(d)}var p=0,q=0,o="uploader-con",k="uploader-form",l="uploader-input-con",m="uploader-iframe-con",i="param",h={param:b,
action:b,onSubmit:b,onComplete:b,uploading:!1,_files:b,_iframe:b,_selector:b};g.prototype={setConfig:function(a){c(a)||(c(a[i])||(this[i]=a[i]),c(a.action)||(this.action=a.action),c(a.onSubmit)||(this.onSubmit=a.onSubmit),c(a.onComplete)||(this.onComplete=a.onComplete))},addFile:function(a){this.removeFile(a);var d="uploader-input-"+p++;this._files[a]=d;f('<input name="'+a+'" class="uploader-input '+d+'" type="file" multiple />').appendTo(this._selector+"."+l)},removeFile:function(a){c(this._files[a])||(f(this._selector+
"."+this._files[a]).remove(),delete this._files[a])},removeAllFile:function(){for(var a in this._files)this.removeFile(a)},submit:function(){var a=this;if(!a.onSubmit||!a.onSubmit()){var d=a._iframe="uploader-iframe-"+q++;f('<iframe id="'+d+'" name="'+d+'" class="uploader-iframe" src="javascript:;" style="display:none;"></iframe>').load(function(){if(a.uploading){var b=f(a._selector+".uploader-iframe")[0],b=b.contentDocument?b.contentDocument:document.frames[d].document;if(a.onComplete)a.onComplete(b.body.innerHTML);
a.uploading=!1}}).appendTo(f(a._selector+"."+m).empty());var e=f(a._selector+"."+k)[0];e.target=d;var b=a.action,c=0<b.indexOf("?"),g=a[i],j;for(j in g){var h=encodeURIComponent(g[j]);c?b+="&"+j+"="+h:(b+="?"+j+"="+h,c=!0)}e.action=b;e.submit();a.uploading=!0}}};window.AjaxUploader=g})(Gnim);
