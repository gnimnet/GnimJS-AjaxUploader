/*
 *  This JavaScript file for Ajax Upload JavaScript component
 *  this component works for GnimJS
 *  Version 0.1.1
 *  Write by Ming
 *  Date 2012.10.31
 */
(function(i,b,n){function d(a){return a===n||a===b}function f(a,e){for(var c in g)this[c]=g[c];c=i(a);if(1!=c.length)throw Error("selector should find only one element");c.addClass(o);i('<form encType="multipart/form-data" method="post" class="'+k+'"><div class="'+l+'"></div><div class="'+m+'"></div></form>').appendTo(c);this._$dom=c;this._files={};this[h]={};d(e)||this.setConfig(e)}var p=0,q=0,o="uploader-con",k="uploader-form",l="uploader-input-con",m="uploader-iframe-con",h="param",g={param:b,
action:b,onSubmit:b,onComplete:b,uploading:!1,_files:b,_iframe:b,_$dom:b};f.prototype={setConfig:function(a){d(a)||(d(a[h])||(this[h]=a[h]),d(a.action)||(this.action=a.action),d(a.onSubmit)||(this.onSubmit=a.onSubmit),d(a.onComplete)||(this.onComplete=a.onComplete))},addFile:function(a){this.removeFile(a);var e="uploader-input-"+p++;this._files[a]=e;i('<input name="'+a+'" class="uploader-input '+e+'" type="file" multiple />').appendTo(this._$dom.find("."+l))},removeFile:function(a){d(this._files[a])||
(this._$dom.find("."+this._files[a]).remove(),delete this._files[a])},removeAllFile:function(){for(var a in this._files)this.removeFile(a)},submit:function(){var a=this;if(!a.onSubmit||!a.onSubmit()){var e=a._iframe="uploader-iframe-"+q++;i('<iframe id="'+e+'" name="'+e+'" class="uploader-iframe" src="javascript:;" style="display:none;"></iframe>').load(function(){if(a.uploading){var b=a._$dom.find(".uploader-iframe")[0],b=b.contentDocument?b.contentDocument:document.frames[e].document;if(a.onComplete)a.onComplete(b.body.innerHTML);
a.uploading=!1}}).appendTo(a._$dom.find("."+m).empty());var c=a._$dom.find("."+k)[0];c.target=e;var b=a.action,d=0<b.indexOf("?"),f=a[h],j;for(j in f){var g=encodeURIComponent(f[j]);d?b+="&"+j+"="+g:(b+="?"+j+"="+g,d=!0)}c.action=b;c.submit();a.uploading=!0}}};window.AjaxUploader=f})(Gnim);
