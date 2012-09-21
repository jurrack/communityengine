/*
	TinyAutoSave 2.1.3 March 19, 2011) plugin for TinyMCE
	http://tinyautosave.googlecode.com/
	Copyright (c) 2008-2011 Todd Northrop
	http://www.speednet.biz/
	Dual licensed under the MIT or GPL Version 2 licenses.
*/
(function(){var p="function",e="string",i="unload",d=true,l="OK",s="TinyAutoSave",b=null,a=false,L="2.1.3",c="tinyautosave",h=a,o=a,m=a,D={"%":"%1","&":"%2",";":"%3","=":"%4","<":"%5"},C={"%1":"%","%2":"&","%3":";","%4":"=","%5":"<"},t=[],q={},u={},n="TinyAutoSave_Test_",g=b,r={dataKey:s,cookieFilter:b,saveDelegate:b,saveFinalDelegate:b,restoreDelegate:b,disposeDelegate:b,restoreImage:"",progressImage:"progress.gif",intervalSeconds:60,retentionMinutes:20,minSaveLength:50,askBeforeUnload:a,canRestore:a,busy:a,timer:b};try{localStorage.setItem(n,l);if(localStorage.getItem(n)===l){localStorage.removeItem(n);h=d}}catch(M){try{sessionStorage.setItem(n,l);if(sessionStorage.getItem(n)===l){sessionStorage.removeItem(n);o=d}}catch(M){m=tinymce.isIE}}tinymce.PluginManager.requireLangPack(c);tinymce.create("tinymce.plugins.TinyAutoSavePlugin",{editor:b,url:"",key:"",onPreSave:b,onPostSave:b,onSaveError:b,onPreRestore:b,onPostRestore:b,onRestoreError:b,showSaveProgress:d,progressDisplayTime:1200,init:function(d,l){var h="mceTinyAutoSaveRestore",f=this,o=tinymce.is,q=tinymce.resolve,a,k,n;f.editor=d;f.id=d.id;f.url=l;f.key=d.getParam(c+"_key",d.id);a=B(f);a.restoreImage=l+"/images/restore."+(tinymce.isIE6?"gif":"png");f.setProgressImage(l+"/images/"+r.progressImage);a.intervalSeconds=Math.max(1,parseInt(d.getParam(c+"_interval_seconds",b)||d.getParam(c+"_interval",a.intervalSeconds)));a.retentionMinutes=Math.max(1,parseInt(d.getParam(c+"_retention_minutes",b)||d.getParam(c+"_retention",a.retentionMinutes)));a.minSaveLength=Math.max(1,parseInt(d.getParam(c+"_minlength",a.minSaveLength)));f.showSaveProgress=d.getParam(c+"_showsaveprogress",f.showSaveProgress);a.askBeforeUnload=d.getParam(c+"_ask_beforeunload",a.askBeforeUnload);a.saveDelegate=j(f,z);a.saveFinalDelegate=j(f,x);a.restoreDelegate=j(f,y);d.addCommand("mceTinyAutoSave",a.saveDelegate);d.addCommand(h,a.restoreDelegate);d.addButton(c,{title:c+".restore_content",cmd:h,image:a.restoreImage});a.timer=window.setInterval(a.saveDelegate,a.intervalSeconds*1e3);tinymce.dom.Event.add(window,i,a.saveFinalDelegate);d.onRemove.add(a.saveFinalDelegate);a.askBeforeUnload&&tinymce.dom.Event.add(window,i,tinymce.plugins.AutoSavePlugin._beforeUnloadHandler);d.onInit.add(function(){if(m){if(!g)g=d.getElement();g.style.behavior="url('#default#userData')"}a.canRestore=f.hasSavedContent();k=d.getParam(c+"_oninit",b);if(o(k,e)){n=q(k);o(n,p)&&n.apply(f)}d.controlManager.setDisabled(c,!a.canRestore)})},getInfo:function(){return{longname:s,author:"Speednet",authorurl:"http://www.speednet.biz/",infourl:"http://tinyautosave.googlecode.com/",version:L}},clear:function(){var d=this,e=d.editor,b=f(d);if(h)localStorage.removeItem(b.dataKey);else if(o)sessionStorage.removeItem(b.dataKey);else if(m)E(d);else tinymce.util.Cookie.remove(b.dataKey);b.canRestore=a;e.controlManager.setDisabled(c,d)},hasSavedContent:function(){var g=this,b=f(g),i=new Date,c,e;try{if(h||o){c=((h?localStorage.getItem(b.dataKey):sessionStorage.getItem(b.dataKey))||"").toString(),e=c.indexOf(",");if(e>8&&e<c.length-1){if(new Date(c.slice(0,e))>i)return d;if(h)localStorage.removeItem(b.dataKey);else sessionStorage.removeItem(b.dataKey)}return a}else if(m)return(w(g)||"").length>0;return(tinymce.util.Cookie.get(b.dataKey)||"").length>0}catch(j){return a}},setProgressImage:function(a){tinymce.is(a,e)&&I(f(this).progressImage=a)},"static":{_beforeUnloadHandler:function(){var b;tinymce.each(tinyMCE.editors,function(c){if(c.getParam("fullscreen_is_enabled"))return;if(c.isDirty()){b=c.getLang("autosave.unload_msg");return a}});return b}}});function K(){var b=this,a=f(b);a.timer&&window.clearInterval(a.timer);tinymce.dom.Event.remove(window,i,a.saveFinalDelegate);a.askBeforeUnload&&tinymce.dom.Event.remove(window,i,tinymce.plugins.AutoSavePlugin._beforeUnloadHandler);b.editor.onRemove.remove(a.saveFinalDelegate);A(b)}function k(a){if(!a)return d;var c,b,f=tinymce.is;if(f(a,e)){c=u[a];if(c)b=c[a];else u[a]=b=tinymce.resolve(a)}else if(f(a,p))b=a;else return d;return b.apply(this)}function x(){var a=f(this);a.saveDelegate();a.disposeDelegate()}function z(){var g=this,q=g.editor,b=f(g),u=tinymce.is,n=a,t=new Date,i,l,r,j,p,s;if(q&&!b.busy){b.busy=d;i=q.getContent();if(u(i,e)&&i.length>=b.minSaveLength){if(!k.call(g,g.onPreSave)){b.busy=a;return a}l=new Date(t.getTime()+b.retentionMinutes*6e4);try{if(h)localStorage.setItem(b.dataKey,l.toString()+","+v(i));else if(o)sessionStorage.setItem(b.dataKey,l.toString()+","+v(i));else if(m)J(g,i,l);else{r=b.dataKey+"=";j="; expires="+l.toUTCString();document.cookie=r+H(i).slice(0,4096-r.length-j.length)+j}n=d}catch(w){k.call(g,g.onSaveError)}if(n){p=q.controlManager;b.canRestore=d;p.setDisabled(c,a);if(g.showSaveProgress){j=tinymce.DOM.get(p.get(c).id);if(j){s=b.restoreImage;j.firstChild.src=b.progressImage;window.setTimeout(function(){j.firstChild.src=s},Math.min(g.progressDisplayTime,b.intervalSeconds*1e3-100))}}k.call(g,g.onPostSave)}}b.busy=a}return n}function y(){var g=this,l=g.editor,j=f(g),i=b,q=tinymce.is,n,p;if(l&&j.canRestore&&!j.busy){j.busy=d;if(!k.call(g,g.onPreRestore)){j.busy=a;return}try{if(h||o){i=((h?localStorage.getItem(j.dataKey):sessionStorage.getItem(j.dataKey))||"").toString();n=i.indexOf(",");if(n==-1)i=b;else i=F(i.slice(n+1,i.length))}else if(m)i=w(g);else{p=j.cookieFilter.exec(document.cookie);if(p)i=G(p[1])}if(!q(i,e))l.windowManager.alert(c+".no_content");else if(l.getContent().replace(/\s|&nbsp;|<\/?p[^>]*>|<br[^>]*>/gi,"").length===0){l.setContent(i);k.call(g,g.onPostRestore)}else l.windowManager.confirm(c+".warning_message",function(b){if(b){l.setContent(i);k.call(g,g.onPostRestore)}j.busy=a},g)}catch(r){k.call(g,g.onRestoreError)}j.busy=a}}function J(a,c,b){g.setAttribute(f(a).dataKey,c);g.expires=b.toUTCString();g.save("TinyMCE")}function w(a){g.load("TinyMCE");return g.getAttribute(f(a).dataKey)}function E(a){g.removeAttribute(f(a).dataKey)}function H(a){return a.replace(/[\x00-\x1f]+|&nbsp;|&#160;/gi," ").replace(/(.)\1{5,}|[%&;=<]/g,function(a){return a.length>1?"%0"+a.charAt(0)+a.length.toString()+"%":D[a]})}function G(a){return a.replace(/%[1-5]|%0(.)(\d+)%/g,function(c,f,e){var a,b,d;if(c.length==2)return C[c];for(a=[],b=0,d=parseInt(e);b<d;b++)a.push(f);return a.join("")})}function v(a){return a.replace(/,/g,"&#44;")}function F(a){return a.replace(/&#44;/g,",")}function I(b){var a=t.length;t[a]=new Image;t[a].src=b}function j(b,a){return function(){return a.apply(b)}}function B(a){var b=a.key,c=q[b];if(!c)c=q[b]=tinymce.extend({},r,{dataKey:r.dataKey+b,saveDelegate:j(a,z),saveFinalDelegate:j(a,x),restoreDelegate:j(a,y),disposeDelegate:j(a,K),cookieFilter:new RegExp("(?:^|;\\s*)"+r.dataKey+b+"=([^;]*)(?:;|$)","i")});return c}function f(a){return q[a.key]}function A(a){delete q[a.key]}tinymce.PluginManager.add(c,tinymce.plugins.TinyAutoSavePlugin)})();