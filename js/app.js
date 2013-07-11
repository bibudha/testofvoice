var DescriptionVoice,EmailVoice,subjectVoice,mobileBackgroundVoice; // variables for voice recording
	function voiceRecording() {
		var featureRelId = getUrlVars()['transferId'];
		var userSiteId = getUrlVars()['touchId'];
		var featureId = getUrlVars()['mId'];
		var url = baseUrl + 'web/web/getMenuHtml/' + featureId + '/' + featureRelId + '/' + userSiteId;

		var data = '';
		//alert(url);
		doAjaxCall(url, data, false, function (html) {
			if ($.isEmptyObject(html)) {
				$('#main-content').html('Sorry we have an Empty data');
			} else {
				console.log(html);
				alert(html);
				$.each(html, function (i,item){
					DescriptionVoice = item.Description;
					EmailVoice = item.Email;
					subjectVoice = item.subject;
					mobileBackgroundVoice = item.mobileBackground;
					alert('url:'+baseUrl+mobileBackgroundVoice);
					$('body').css('background-image', 'url(' + baseUrl+mobileBackgroundVoice + ')');
					
				})
			}
		});
	}

	function wufoohtml() {
			var featureRelId = getUrlVars()['transferId'];
			var userSiteId = getUrlVars()['touchId'];
			var featureId = getUrlVars()['mId'];
			var url = baseUrl + 'web/web/getMenuHtml/' + featureId + '/' + featureRelId + '/' + userSiteId;
			var data ='';	
			alert(url);
				doAjaxCall(url, data, false, function (html) {
			if ($.isEmptyObject(html)) {
				$('#main-content').html('Sorry we have an Empty data');
			} else {
				if(html.length==1){
				$.each(html, function (i,item){  
					returnUrl = "index.html";
				 wufooActive(item.url,returnUrl);
				})
				}else{
				var htmlData = '<ul data-role="listview" data-inset="false" data-divider-theme="d" id="aboutclass">'
					$.each(html,function(i,item){
					htmlData += '<li><a href="app_wufoo_d.html?itemId='+ item.wuFooId + '&transferId ='+ featureRelId + 'mId='+ featureId +'&touchId=' + userSiteId + '" rel="external" >' + item.name + '</a></li>';
					});
					htmlData +='</ul>';	
				}
				
				$('#main-content').html(htmlData);	
				 try {
                $("#aboutclass").listview('refresh');
				} catch (e) {
					$("#aboutclass").listview();
				}
			}
		}); 
	}
	
	function wufoohtmlbyId() {
			
			var featureRelId = getUrlVars()['transferId'];
			var userSiteId = getUrlVars()['touchId'];
			var featureId = getUrlVars()['mId'];
			var wufooId = getUrlVars()['itemId'];
			var url = baseUrl + 'web/web/getwufooById/' + wufooId + '/' + userSiteId;
			var data ='';	
			alert(url);
				doAjaxCall(url, data, false, function (html) {
			if ($.isEmptyObject(html)) {
				$('#main-content').html('Sorry we have an Empty data');
			} else {
				console.log(html);
				$.each(html, function (i,item){ 
				returnUrl = "app_wufoo.html?mId=" + featureId + "&transferId=" + featureRelId + "&touchId=" + userSiteId;
				 wufooActive(item.url,returnUrl);
				})
				
				//$('#main-content').html(htmlData);	
			}
		}); 
	}
	function wufooActive(src,exitDone) {
		
         var ref = window.open(src, '_self');
         
         ref.addEventListener('exit', function() {
		 window.location.href = exitDone;
		 });
    }