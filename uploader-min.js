/*
 *  This JavaScript file for Ajax Upload JavaScript component
 *  this component works for GnimJS
 *  Version 0.1.2
 *  Write by Ming
 *  Date 2014.01.08
 */
(function(f,b,q){function d(a){return a===q||a===b}function g(a,e){for(var c in h)this[c]=h[c];c=f(a);if(1!=c.length)throw Error("selector should find only one element");c.addClass(r);f('<form encType="multipart/form-data" method="post" class="'+m+'"><div class="'+n+'"></div><div class="'+p+'"></div></form>').appendTo(c);this._$dom=c;this._files={};this[k]={};d(e)||this.setConfig(e)}var s=0,t=0,r="uploader-con",m="uploader-form",n="uploader-input-con",p="uploader-iframe-con",k="param",h={param:b,
action:b,onSubmit:b,onComplete:b,uploading:!1,_files:b,_iframe:b,_$dom:b};g.prototype={setConfig:function(a){d(a)||(d(a[k])||(this[k]=a[k]),d(a.action)||(this.action=a.action),d(a.onSubmit)||(this.onSubmit=a.onSubmit),d(a.onComplete)||(this.onComplete=a.onComplete))},addFile:function(a,e){this.removeFile(a);var c="uploader-input-"+s++;this._files[a]=c;f('<input name="'+a+'" class="uploader-input '+c+'" type="file"'+(e?" multiple":"")+" />").appendTo(this._$dom.find("."+n))},removeFile:function(a){d(this._files[a])||
(this._$dom.find("."+this._files[a]).remove(),delete this._files[a])},removeAllFile:function(){for(var a in this._files)this.removeFile(a)},submit:function(){var a=this;if(!a.onSubmit||!a.onSubmit()){var e=a._iframe="uploader-iframe-"+t++;f('<iframe id="'+e+'" name="'+e+'" class="uploader-iframe" src="javascript:;" style="display:none;"></iframe>').load(function(){if(a.uploading){var b=a._$dom.find(".uploader-iframe")[0],b=b.contentDocument?b.contentDocument:document.frames[e].document;if(a.onComplete)a.onComplete(f(b.body).text());
a.uploading=!1}}).appendTo(a._$dom.find("."+p).empty());var c=a._$dom.find("."+m)[0];c.target=e;var b=a.action,d=0<b.indexOf("?"),g=a[k],l;for(l in g){var h=encodeURIComponent(g[l]);d?b+="&"+l+"="+h:(b+="?"+l+"="+h,d=!0)}c.action=b;c.submit();a.uploading=!0}}};window.AjaxUploader=g})(Gnim);
