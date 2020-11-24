var toggleFiltersBoxActive = false;
//function for toggle filters
function toggleFiltersBox(thisElement, id, collapsed) {
	if(toggleFiltersBox==true) return false;
	toggleFiltersBoxActive = true;
	$('#'+id).toggle('slow', function() {
		if($('#Arrow'+id).hasClass('GrayArrowHorizontal')) {
			$(thisElement).parent().css('border-bottom','1px solid #9EA0A1');
			$('#Arrow'+id).removeClass('GrayArrowHorizontal').addClass('GrayArrowVertical');
		} else {
			$(thisElement).parent().css('border-bottom','0px');
			$('#Arrow'+id).removeClass('GrayArrowVertical').addClass('GrayArrowHorizontal');
		}
		toggleFiltersBoxActive = false;
	});
}
function reload_page_with_filter(currentPage, filterId, filterVal, paramExists, checked_item, one_value,clicked_on_other,requestMethod,modRParamName,modRAlternativeURL) {

 //window.console.log('page: ' + currentPage + ' filterID: ' + filterId + ' VAL: ' + filterVal + ' params: ' + paramExists + ' one_value: ' + one_value + ' clicked_on_other: ' + clicked_on_other + ' request: ' + requestMethod + ' prepareMod: ' + modRParamName + ' alternativeURL: ' + modRAlternativeURL);

	var str = '';
	var strChosenParam = '';
	if(requestMethod == 'post') {

		if(one_value=='false') {

			var elementValues = '';
			if(clicked_on_other=='true') { // clicked on the name and not the input
				if($('#'+filterId+filterVal).is(':checked')) {
					$('#'+filterId+filterVal).attr('checked', false);
				} else {
					$('#'+filterId+filterVal).attr('checked', true);
				}
			}

			jQuery('.'+filterId+':checked').each(function(e,a) {
				itemValue = jQuery(this).attr('value');
				elementValues += itemValue+';';
				// add paypal to the url
				if(modRParamName!='') { 
					if(jQuery(this).attr(modRParamName) != '' && typeof(jQuery(this).attr(modRParamName)) != "undefined" && jQuery(this).attr(modRParamName) !== null) {
						strChosenParam = '/'+jQuery(this).attr(modRParamName);
						$('#formFilters').attr('action',currentPage+strChosenParam);
					}
				}
			});
			$('#'+filterId).attr('value',elementValues);
		}
		$('#formFilters').submit();
	} else { // get
		if(one_value=='false') {
			if(clicked_on_other=='true') { // clicked on the name div and not the input element
				if($('#'+filterId+filterVal).is(':checked')) {
					$('#'+filterId+filterVal).attr('checked', false);
				} else {
					$('#'+filterId+filterVal).attr('checked', true);
				}
			}
			var allValuesStr = '';
			var count = 0;

			jQuery('.'+filterId+':checked').each(function(e,a) {

				itemValue = jQuery(this).attr('value');
				if(modRParamName.length>0) {
					if(count == 0) {
						//newModRParamVal = $('#'+filterId+'Name'+itemValue).attr("value");
						//strChosenParam = '/'+newModRParamVal;
						strChosenParam = '/'+jQuery(this).attr(modRParamName);
					}
				} else {
					strChosenParam += itemValue+';';
				}
				allValuesStr   += itemValue+';';
				count++;
			});

			$('#'+filterId).attr('value',allValuesStr);
		} else {
			if(modRParamName.length>0) {
				selectedValue = jQuery('#'+filterId+' option:selected').attr(modRParamName);
				if(selectedValue != '') {
				strChosenParam = '/'+selectedValue;
				} else {
					strChosenParam = '';
				}
			} else {
				if(filterVal!='' && paramExists=='false') {
					str += '&'+filterId+'='+filterVal;
				} else if (filterVal!='' && one_value=='true') {
					str += '&'+filterId+'='+filterVal;
				} else {
					str += '';
				}
			}
		}
		if(strChosenParam == '' && modRAlternativeURL != '') {
			strChosenParam = modRAlternativeURL;
		}

		//alert(currentPage+' | '+str+' | '+strChosenParam);

		$('#formFilters').attr('action',currentPage+str+strChosenParam);
		$('#formFilters').submit();
	}
}
function reload_page(currentPage,element) {
	window.location.href = currentPage+'ResultsPerPage='+element.value;
}
function reload_page_order(currentPage,element) {
	window.location.href = currentPage;
}
function getExpandLocations(locations,current_url) {
	$.get("/common/directory/directory_ajax.php",{ action:'get_expanded_locations', locations:locations, current_url:current_url } ,function(data) {
		if(data!='') {
			$('#MoreLocationsLink').hide();
			$('#LocationBoxContainer').html(data);
		}
   });
}

function getCollapsedLocations(locations,current_url) {

    $.get("/common/directory/directory_ajax.php",{ action:'get_collapsed_locations', locations:locations, current_url:current_url } ,function(data) {
        if(data!='') {
            $('#MoreLocationsLink').hide();
            $('#LocationBoxContainer').html($(data).html());
        }
    });
}

function getExpandCountries( countries, current_url ){

    $.get("/common/directory/directory_ajax.php",
        { action:'get_expanded_countries', countries:countries, current_url:current_url},
        function(data) {

            if( data != '' ) {
            	
                $('#MoreCountriesLink').hide();
                $('#OfferedStocksBoxContainer').html(data);
            }
    });
}

function getCollapseCountries( countries, current_url ){

    $.get("/common/directory/directory_ajax.php",
        { action:'get_collapsed_countries', countries:countries, current_url:current_url},
        function(data) {

            if( data != '' ) {

                $('#MoreCountriesLink').hide();
                $('#OfferedStocksBoxContainer').html(data);
            }
        });
}

function getExpandPaymentMethods(payment_methods,current_url) {
	$.get("/common/directory/directory_ajax.php",{ action:'get_expanded_payment_methods', payment_methods:payment_methods, current_url:current_url } ,function(data) {
		if(data!='') {
			$('#MorePaymentMethodsLink').hide();
			$('#PaymentMethodsOuterContainer').html(data);
		}
   });
}

function getCollapsedPaymentMethods(payment_methods,current_url) {
    $.get("/common/directory/directory_ajax.php",{ action:'get_collapsed_payment_methods', payment_methods:payment_methods, current_url:current_url } ,function(data) {
        if(data!='') {
            $('#MorePaymentMethodsLink').hide();
            $('#PaymentMethodsOuterContainer').html(data);
        }
    });
}

function getExpandSupportedLanguages(SupportedLanguages,current_url) {

    $.get("/common/directory/directory_ajax.php",{ action:'get_expanded_supported_languages', SupportedLanguages:SupportedLanguages, current_url:current_url } ,function(data) {
		if(data!='') {
			$('#MoreSupportedLanguagesLink').hide();
			$('#SupportedLanguagesBoxContainer').html(data);
		}
   });
}

function getCollapsedSupportedLanguages(SupportedLanguages,current_url) {
    $.get("/common/directory/directory_ajax.php",{ action:'get_collapsed_supported_languages', SupportedLanguages:SupportedLanguages, current_url:current_url } ,function(data) {
        if(data!='') {
            $('#MoreSupportedLanguagesLink').hide();
            $('#SupportedLanguagesBoxContainer').html(data);
        }
    });
}

function resetDirectoryFilters(currentPage,elementsByPostGetStr) {
	if(elementsByPostGetStr.length>0) {

		var elementsByPostGetArr = elementsByPostGetStr.split(',');
		jQuery.each(elementsByPostGetArr, function() {

			console.log( $('#'+this).attr('name') );

			if($('#'+this).type=='select') {
				$('#'+this).selectedIndex = -1;
			} else {

				$('#'+this).val('');
				$('.checkboxData').val('');
			}
		});
	}
//	if(currentPage=='') {
//		currentPage = '?';
//	}
	$('#formFilters').attr('action',currentPage);
	$('#formFilters').submit();
}
function changeDirectoryRowColor(countId, bgClassFirstCell, bgClass, bgClassFirstCellHover, bgClassHover) {
	if( !$('#DirectoryCheckBox'+countId).is(':checked') ) {
		$('#DirectoryRow'+countId+' .firstCell').removeClass(bgClassFirstCell).addClass(bgClassFirstCellHover);
		$('#DirectoryRow'+countId+' .Cell').removeClass(bgClass).addClass(bgClassHover);
		$('#DirectoryRow'+countId+' .firstCellRegular').removeClass(bgClassFirstCell).addClass(bgClassFirstCellHover);
		$('#DirectoryRow'+countId+' .CellRegular').removeClass(bgClass).addClass(bgClassHover);
	}
}
function selectDirectoryRow(countId, bgClassFirstCell, bgClass, bgClassFirstCellHover, bgClassHover) {
	if( $('#DirectoryCheckBox'+countId).is(':checked') ) { // this row is checked. So uncheck it
		$('#DirectoryCheckBox'+countId).attr('checked', false);
		$('#DirectoryRow'+countId+' .firstCell').removeClass(bgClassFirstCellHover).addClass(bgClassFirstCell);
		$('#DirectoryRow'+countId+' .Cell').removeClass(bgClassHover).addClass(bgClass);
		$('#DirectoryRow'+countId+' .firstCellRegular').removeClass(bgClassFirstCellHover).addClass(bgClassFirstCell);
		$('#DirectoryRow'+countId+' .CellRegular').removeClass(bgClassHover).addClass(bgClass);
	} else {
		$('#DirectoryCheckBox'+countId).attr('checked', true); // this row is not checked. So check it
		$('#DirectoryRow'+countId+' .firstCell').removeClass(bgClassFirstCell).addClass(bgClassFirstCellHover);
		$('#DirectoryRow'+countId+' .Cell').removeClass(bgClass).addClass(bgClassHover);
		$('#DirectoryRow'+countId+' .firstCellRegular').removeClass(bgClassFirstCell).addClass(bgClassFirstCellHover);
		$('#DirectoryRow'+countId+' .CellRegular').removeClass(bgClass).addClass(bgClassHover);
	}
}
function printSliderFixedAmounts(sliderId,currentValue,min,max,valMap,currentLocation,filterId,minContainerId,paramExists,checked_item,one_value,postfix_value,requestMethod,siteIsRTL,is_descending) {
	var min_value = 0;
	var isRTL_value;

	if(isNaN(min)) {
		min_value = 0;
	} else {
		min_value = 0;
	}
	if(siteIsRTL=='yes') {
		isRTL_value = true;
	} else {
		isRTL_value = false;
	}
	//isRTL: false,
	$(function() {
		$("#"+sliderId).slider({
			value:currentValue,
			min: min_value,
			max: valMap.length - 1,
			isRTL: isRTL_value,
			stop: function(event, ui) {
				if((currentValue != ui.value) ) { //&& (currentValue!=1 || ui.value!=0)
					$('#'+filterId).attr('value',valMap[$("#"+sliderId).slider("value")]);
					reload_page_with_filter(currentLocation,filterId,valMap[$("#"+sliderId).slider("value")],paramExists,checked_item,one_value,false,requestMethod,'');
				}
			},
			slide: function(event, ui) {
				var changingVal = ui.value;
				if(ui.value == 0) {
					$('#'+minContainerId+' span').html(min);
				} else {
					$('#'+minContainerId+' span').html(valMap[changingVal]+postfix_value);
				}
			}
		});
		newVal = valMap[ $("#"+sliderId).slider("value") ];
		if(newVal > 0 && is_descending=='false') {
			$('#'+minContainerId+' span').html(valMap[ $("#"+sliderId).slider("value") ] + postfix_value);
		} else if(newVal>=0 && (newVal!=5 && newVal!=200000) && is_descending=='true') {
			$('#'+minContainerId+' span').html(valMap[ $("#"+sliderId).slider("value") ] + postfix_value);
		} else {
			$('#'+minContainerId+' span').html( min);
		}
	});
}
function printSliderRangesFixedAmounts(sliderId,currentValueFrom,currentValueTo,min,max,valMap,currentLocation,filterIdFrom,filterIdTo,minContainerId,maxContainerId,paramExists,checked_item,one_value,postfix_value,requestMethod,siteIsRTL,is_descending) {
	var min_value = 0;
	var isRTL_value;

	if(isNaN(min)) {
		min_value = 0;
	} else {
		min_value = 0;
	}
	if(siteIsRTL=='yes') {
		isRTL_value = true;
	} else {
		isRTL_value = false;
	}
	//isRTL: false,
	$(function() {
		$("#"+sliderId).slider({
			range: true,
			values:[ currentValueFrom, currentValueTo ],
			min: min_value,
			max: valMap.length - 1,
			isRTL: isRTL_value,
			stop: function(event, ui) {
				if((currentValueFrom != ui.values[ 0 ]) ) { 
					$('#'+filterIdFrom).attr('value',valMap[$("#"+sliderId).slider("values",0)]);
					reload_page_with_filter(currentLocation,filterIdFrom,valMap[$("#"+sliderId).slider("values",0)],paramExists,checked_item,one_value,false,requestMethod,'');
				}
				if((currentValueTo != ui.values[ 1 ]) ) { 
					$('#'+filterIdTo).attr('value',valMap[$("#"+sliderId).slider("values",1)]);
					reload_page_with_filter(currentLocation,filterIdTo,valMap[$("#"+sliderId).slider("values",1)],paramExists,checked_item,one_value,false,requestMethod,'');
				}
			},
			slide: function(event, ui) {
				var changingValFrom = ui.values[0];
				var changingValTo = ui.values[1];
				if(ui.values[0] == 0) {
					$('#'+minContainerId+' span').html(min);
				} else {
					$('#'+minContainerId+' span').html(valMap[changingValFrom]+postfix_value);
				}
				if(ui.values[1] == valMap.length - 1) {
					$('#'+maxContainerId+' span').html( max );
				} else {
					$('#'+maxContainerId+' span').html(valMap[changingValTo]+postfix_value);
				}
			}
		});
		newValFrom = valMap[ $("#"+sliderId).slider("values",0) ];
		newValTo = valMap[ $("#"+sliderId).slider("values",1) ];
		//alert($("#"+sliderId).slider("values",1));
		if(newValFrom > 0 && is_descending=='false') {
			$('#'+minContainerId+' span').html(valMap[ $("#"+sliderId).slider("values",0) ] + postfix_value);
		} else if(newValFrom>=0 && (newValFrom!=5 && newValFrom!=200000) && is_descending=='true') {
			$('#'+minContainerId+' span').html(valMap[ $("#"+sliderId).slider("values",0) ] + postfix_value);
		} else {
			$('#'+minContainerId+' span').html( min );
		}
		if(newValTo > 0 && is_descending=='false') {
			$('#'+maxContainerId+' span').html(valMap[ $("#"+sliderId).slider("values",1) ] + postfix_value);
		} else if(newValTo>=0 && (newValTo!=5 && newValTo!=200000) && is_descending=='true') {
			$('#'+maxContainerId+' span').html(valMap[ $("#"+sliderId).slider("values",1) ] + postfix_value);
		} else {
			$('#'+maxContainerId+' span').html( max);
		}
	});
}
//////////Directory Top Search ////////////////////
var count_li_next = 2;
var count_li_prev = 0;
var count_li_selected = 0;
var count_new_li = 0;
var search_text_assigned = false;
var search_list_find = false;
var userId = '';
function directoryUpdateAutoComplete(element, evt, userType, userSupportedType) {
	if((evt.keyCode>=48 && evt.keyCode<=90) || (evt.keyCode>=96 && evt.keyCode<=111) || evt.keyCode==38 || evt.keyCode==40 || evt.keyCode==8 || evt.keyCode==46) {
		count_li_next = 2;
		count_li_prev = 0;
		count_li_selected = 0;
		count_new_li = 1;
		if($(element).val().length>=1) {
			if(evt.keyCode == 40 || evt.keyCode == 38) {
				if($('.li_search_list').length>0) {
					search_text_assigned = true;
					$('.li_search_list').each(function() {
						if($(this).is('.highlight') && count_li_selected==0) {
							count_li_selected=1;
							$(this).removeClass('highlight');
							if(evt.keyCode == 40) {
								$('#search_li_'+count_li_next).addClass('highlight');
								count_new_li = count_li_next;
							} else {
								if(count_li_prev > 0) {
									$('#search_li_'+count_li_prev).addClass('highlight');
									count_new_li = count_li_prev;
								} else {
									$('.search_inner_container ul li:last').addClass('highlight');
									count_new_li = $('.li_search_list').length;
								}
							}
						}
						count_li_next++;
						count_li_prev++;
					});
					var str = ReplaceAll($('#search_li_'+count_new_li+' .name').html(), '<b>', '');
						str = ReplaceAll(str, '</b>', '');
						str = ReplaceAll(str, '<B>', '');
						str = ReplaceAll(str, '</B>', '');
					$('#DirectorySearchText').val( str );
					if(count_li_selected == 0) {
						$('.search_inner_container ul li:first').addClass('highlight');
						count_li_selected = 1;
						count_new_li = count_li_selected;
					}
					$('#HeaderSearchForm').attr('action',$('#search_li_'+count_new_li+' .link').html());
				}
			} else {
				if(window.SearchStartTimerIsOn==1) {
					clearTimeout(window.SearchStartTimer);
				}
		  		window.DirectoryAllowAutoCompleteFlag = 0;
		  		window.SearchStartTimer = setTimeout('DirectoryAllowAutoComplete()', 170); 
		  		window.SearchStartTimerIsOn = 1;
		  		setTimeout(function() { DirectoryCheckAutoComplete($(element).val(), userType, userSupportedType); }, 170);
			}
		} else {
			$('#DirectorySearchListContainer').html('&nbsp;');
		}
	}
}
function DirectoryAllowAutoComplete() {
	window.DirectoryAllowAutoCompleteFlag = 1;
}
function DirectoryCheckAutoComplete(search_text, userType, userSupportedType) {
	if(window.DirectoryAllowAutoCompleteFlag==1) {
		DirectoryExecuteAutoComplete(search_text, userType, userSupportedType);
	}
}
function DirectoryExecuteAutoComplete(search_text, userType, userSupportedType) {
	$.get("/common/directory/directory_ajax.php",{ action:'get_auto_complete', search_text: search_text, userType: userType, userSupportedType: userSupportedType } ,function(data) {
		if(data!='') {
			$('#DirectorySearchListContainer').html(data);
  			search_text_assigned = false;
  			search_list_find = true;
		} else {
			$('.li_search_list').html('');
			$('#DirectorySearchListContainer').html('&nbsp;');
			search_list_find = false;
		}
   });
}
function DirectoryAddSearchEvents() { 
	$('.ul_search_list li').each(function() {
		// Add onClick, blur, onmouseover, onmouseout  to each li
		$(this).click(function() {
			var str = ReplaceAll($(this).find('.name').html(), '<b>', '');
			str = ReplaceAll(str, '</b>', '');
			str = ReplaceAll(str, '<B>', '');
			str = ReplaceAll(str, '</B>', '');
			$('#DirectorySearchText').val( str );
			$('#HeaderSearchForm').submit();
		}).blur(function() {
			$(this).removeClass('highlight');
		}).mouseover(function() {
			var str = ReplaceAll($(this).find('.name').html(), '<b>', '');
			str = ReplaceAll(str, '</b>', '');
			str = ReplaceAll(str, '<B>', '');
			str = ReplaceAll(str, '</B>', '');

			$('#DirectorySearchText').val( str );

			$('#HeaderSearchForm').attr('action',$('#'+$(this).attr('id')+' .link').html());
			
			$(this).addClass('highlight');
			search_text_assigned = true;
		}).mouseout(function() {
			$(this).removeClass('highlight');
		});
	});
	$('#HeaderSearchForm').submit(function() {
		if(search_text_assigned!=true && ($('.ul_search_list').length>0) ) {
			currentLocation = $('#DirectorySearchcurrentLocation').val();
			$('#HeaderSearchForm').attr('action',$('#DirectorySearchcurrentLocation').val());
			reload_page_with_filter(currentLocation,'search_text',$("#DirectorySearchText").val(),false,false,true,false,'get','');
		}
	});
}
function validateDirectorySearchForm(search_form) {
	if((($('#HeaderSearchForm').val().length>=1) && ($('.ul_search_list').length>0)) || search_list_find == true) {
		return true;
	} else {
		return false;
	}
}

function changeSelectRegion(){

    if ($('#selectByRegion').is(':checked')) {

        $('#allCountries').attr('checked', false);
        $('input[name^="region_"]').removeAttr('disabled');

    }else{

        $('#allCountries').attr('checked', true);
        $('input[name^="region_"]').attr('disabled','disabled');
    }
    //$('#region_3').toggle(this.checked).removeAttr('disabled');
}

function changeSelectAll(){

    if ($('#allCountries').is(':checked')) {

        $('#selectByRegion').attr('checked', false);
        $('input[name^="region_"]').attr('disabled','disabled');

        //clean all
        $('input[name^="region_"]').attr('checked', false);
        $('#Country').val( '' );
        $('#OfferedStocksMarket').val( '' );
        $('#formFilters').submit();

    }else{

        $('#selectByRegion').attr('checked', true);
        $('input[name^="region_"]').removeAttr('disabled');
    }
}

function regionCheckChanged( regionID ){

    $.ajax({
        type: 'POST',
        url: '/common/directory/directory_ajax.php',
        data:  { action : 'getRegionCountries', region : regionID },
        dataType: "text",
        success: function ( json ) {

            var selectedCountriesStr = $('#Country').val();
            var selectedRegions      = $('#OfferedStocksMarket').val();

            $.each($.parseJSON( json ), function( countryID , obj ) {

                var extraStr = countryID + ';';
                if( $('#region_' + regionID).is(':checked') )
                    selectedCountriesStr += extraStr;
                else
                    selectedCountriesStr = selectedCountriesStr.replace( extraStr, '' );
            });

            var regionStr = regionID + ';'
            if( $('#region_' + regionID).is(':checked') )
                selectedRegions += regionStr;
            else
                selectedRegions = selectedRegions.replace( regionStr, '' );
            

            $('#Country').val( selectedCountriesStr );
            $('#OfferedStocksMarket').val( selectedRegions );

            $('#formFilters').submit();
        }
    });
}

$( document ).ready(function(){

  if( $('input[name^="region_"]').is(':checked') ){

      $('#allCountries').attr('checked', false);
      $('#selectByRegion').attr('checked', true);
      $('input[name^="region_"]').removeAttr('disabled','disabled');
  }
});
////////// End Directory Top Search ////////////////

