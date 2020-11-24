// File: event_chart.js
if(!FPCharts||"object"!=typeof FPCharts)var FPCharts={};FPCharts.Utils&&"object"==typeof FPCharts.Utils||(FPCharts.Utils={}),FPCharts.tmp&&"object"==typeof FPCharts.tmp||(FPCharts.tmp={}),FPCharts.tmp.translations&&"object"==typeof FPCharts.tmp.translations||(FPCharts.tmp.translations={}),FPCharts.Utils.get_translation&&"function"==typeof FPCharts.Utils.get_translation||(FPCharts.Utils.get_translation=function(a){var b=FPCharts.tmp.translations[a];return"string"==typeof b?b:a}),FPCharts.Utils.set_translation&&"function"==typeof FPCharts.Utils.set_translation||(FPCharts.Utils.set_translation=function(a,b){return FPCharts.tmp.translations[a]=b});var EventChart=function(a,b,c){var d=function(a){return"No"===a[2]},e=a.data.filter(d),f=function(b){return b?a.data:e},g={fontsize:"11px",decimals:2,unit:"",hideWatermark:!1,chart:{width:600,height:350}},h=window.parent===window;if(c=Highcharts.merge(g,c),b=b||"container",a.unit&&(c.unit=a.unit),!$("#"+b).length)return!1;if(a.data.length<2)return $("#"+b).html(FPCharts.Utils.get_translation("No data to display")),!1;Highcharts.setOptions({lang:{rangeSelectorZoom:""}});var i=new Highcharts.StockChart({chart:{renderTo:b,style:{fontFamily:"Arial, sans-serif"},alignTicks:!0,animation:!1,width:c.chart.width,height:c.chart.height,plotBorderWidth:1,plotBorderColor:"#a6a6a6",spacingBottom:10,spacingTop:10,spacingLeft:10,marginRight:32,events:{load:function(){c.hideWatermark||this.renderer.image(window.CDN_URL+"/charts/images/Investing_Watermark.png",10,223,181,42).add().toFront();var d=this,e=$("#"+b);e.unbind("mouseleave"),e.bind("mouseleave",function(){d.yAxis[0].removePlotLine("yline")});var g,i,j=d.xAxis[0].getExtremes(),k=31536e6,l=15768e6,m=63072e6,n=15768e7,o=typeof FPCharts.Utils.get_translation,p="function"===o?FPCharts.Utils.get_translation("Area Chart"):"Area Chart",q="function"===o?FPCharts.Utils.get_translation("Histogram Chart"):"Histogram Chart",r=("function"===o?FPCharts.Utils.get_translation("6 Months"):"6 Months","function"===o?FPCharts.Utils.get_translation("1 Year"):"1 Year"),s="function"===o?FPCharts.Utils.get_translation("2 Years"):"2 Years",t="function"===o?FPCharts.Utils.get_translation("5 Years"):"5 Years",u="function"===o?FPCharts.Utils.get_translation("Maximum"):"Maximum",v=e.data("perlim-define");e.prepend('<div data-anchor="chartBar" class="chartBarWrap">                            <ul class="float_lang_base_1 fchart-switches types round-items">                                <li class="selected">&nbsp;<a href="javascript:void(0);" title="'+q+'" class="columnChartIcon hideText" data-switch="column">'+q+'</a></li>                                <li>&nbsp;<a href="javascript:void(0);" class="diagramIcon hideText" data-switch="area" title="'+p+'">'+p+'</a></li>                            </ul>                            <ul class="float_lang_base_1 fchart-switches round-items">                                <li><a href="javascript:void(0);" data-switch="xaxis1y"title="'+r+'">1Y</a></li>                                <li><a href="javascript:void(0);" data-switch="xaxis2y" title="'+s+'">2Y</a></li>                                <li><a href="javascript:void(0);" data-switch="xaxis5y" title="'+t+'">5Y</a></li>                                <li class="maxChartBtn"><a href="javascript:void(0);" data-switch="xaxisMax" title="'+u+'">max</a></li>                            </ul>'+(h?'<ul class="float_lang_base_1 fchart-switches round-items js-perlim">                                <li class="selected js-prelim-li"><a href="javascript:void(0);" data-switch="perlim" title="'+v+'">P</a></li>                            </ul>':"")+'<div class="clear"></div>                        </div>'),e.css({height:"380px",border:"1px solid #adadad"}),e.find('div[data-anchor="chartBar"]').css({"border-top":"0px","border-left":"0px","border-right":"0px"}),e.find('a[data-switch="area"]').bind("click",function(){d.series[0].update({type:"area"}),$(this).parent().siblings().removeClass("selected"),$(this).parent().addClass("selected")}),e.find('a[data-switch="column"]').bind("click",function(){d.series[0].update({type:"column"}),$(this).parent().siblings().removeClass("selected"),$(this).parent().addClass("selected")}),e.find('a[data-switch="xaxisMax"]').bind("click",function(a){j=d.xAxis[0].getExtremes(),d.xAxis[0].setExtremes(j.dataMin,j.dataMax),$(this).parent().siblings().removeClass("selected"),$(this).parent().addClass("selected"),a.stopPropagation()}).trigger("click"),e.find('a[data-switch="xaxis6m"]').bind("click",function(){j=d.xAxis[0].getExtremes(),g=j.max-l,i=j.max,j.dataMin>j.max-l&&(g=j.min,i=j.min+l),d.xAxis[0].setExtremes(g,i),$(this).parent().siblings().removeClass("selected"),$(this).parent().addClass("selected")}),e.find('a[data-switch="xaxis1y"]').bind("click",function(){j=d.xAxis[0].getExtremes(),g=j.max-k,i=j.max,j.dataMin>j.max-k&&(g=j.min,i=j.min+k),d.xAxis[0].setExtremes(g,i),$(this).parent().siblings().removeClass("selected"),$(this).parent().addClass("selected")}),e.find('a[data-switch="xaxis2y"]').bind("click",function(){j=d.xAxis[0].getExtremes(),g=j.max-m,i=j.max,j.dataMin>j.max-m&&(g=j.min,i=j.min+m),d.xAxis[0].setExtremes(g,i),$(this).parent().siblings().removeClass("selected"),$(this).parent().addClass("selected")}),e.find('a[data-switch="xaxis5y"]').bind("click",function(a){j=d.xAxis[0].getExtremes(),g=j.max-n,i=j.max,j.dataMin>j.max-n&&(g=j.min,i=j.min+n),d.xAxis[0].setExtremes(g,i),$(this).parent().siblings().removeClass("selected"),$(this).parent().addClass("selected"),a.stopPropagation()}),e.find('a[data-switch="perlim"]').bind("click",function(){var a=e.find(".js-prelim-li").toggleClass("selected").hasClass("selected");d.series[0].setData(f(a),!0)});var w=!1;j.dataMax-j.dataMin<=n&&(e.find('a[data-switch="xaxis5y"]').unbind("click").parent().remove(),w=!0),j.dataMax-j.dataMin<=m&&e.find('a[data-switch="xaxis2y"]').unbind("click").parent().remove(),j.dataMax-j.dataMin<=k&&e.find('a[data-switch="xaxis1y"]').unbind("click").parent().remove(),j.dataMax-j.dataMin<=l&&e.find('a[data-switch="xaxis6m"]').unbind("click").parent().remove(),w?e.find('a[data-switch="xaxisMax"]').trigger("click"):e.find('a[data-switch="xaxis5y"]').trigger("click");for(var x=new Array,y=0,z=0,A=0,B=0;B<a.data.length;B++)x[B]=a.data[B][1];y=Math.min.apply(Math,x),seriesDataMax=Math.max.apply(Math,x),y<0?z=1.02*y:y>0&&(z=.98*y),seriesDataMax>0?A=1.02*seriesDataMax:seriesDataMax<0&&(A=.98*seriesDataMax),d.yAxis[0].update({floor:z,ceiling:A})}}},credits:{enabled:!1},navigator:{enabled:!0,series:{color:"#d2e6fd",fillOpacity:1,dataGrouping:{smoothed:!1},lineWidth:1,lineColor:"#0d5fa6",marker:{enabled:!1}},handles:{borderColor:"#b7b7b7",backgroundColor:"#ffffff"},maskFill:"rgba(255,255,255,0.8)",maskInside:!1,height:30,outlineColor:"#bababa",outlineWidth:1,xAxis:{dateTimeLabelFormats:{minute:"%d %b",hour:"%d %b",day:"%d %b",week:"%d %b"}}},scrollbar:{enabled:!1},rangeSelector:{enabled:!1},exporting:{enabled:!1},xAxis:{gridLineColor:"#f2f2f2",gridLineWidth:1,lineWidth:1,tickColor:"#bababa",tickLength:4,tickWidth:0,tickPosition:"outside",minRange:1314e7,labels:{overflow:!1,style:{color:"#333",fontSize:"11px",fontFamily:"Arial, sans-serif"},enabled:function(){return a.data.length>1}(),zIndex:1},dateTimeLabelFormats:{minute:"%d %b",hour:"%d %b",day:"%d %b",week:"%d %b"}},yAxis:{minPadding:.05,gridLineColor:"#ededed",gridLineWidth:1,tickColor:"#a6a6a6",tickLength:4,tickWidth:0,tickPosition:"outside",showLastLabel:!0,showFirstLabel:!0,opposite:!0,labels:{formatter:function(){return+(Math.round(this.value+"e+2")+"e-2")},align:"left",x:5,y:4,zIndex:1},plotLines:[{value:0,width:1,zIndex:1,color:"#adadad"}],tickPixelInterval:40},plotOptions:{area:{dataLabels:{enabled:!1,formatter:function(){if(this.y==this.series.dataMin||this.y==this.series.dataMax){var a=new Date(this.x);return this.y+"%, "+a.getDate()+"/"+(a.getMonth()+1)+"/"+a.getFullYear()}return null},backgroundColor:"#ebebeb",borderWidth:1,borderColor:"#AAA",borderRadius:3},lineWidth:2,lineColor:"#0d5fa6",color:"rgb(181, 217, 255)",fillOpacity:.5,marker:{enabled:!0,fillColor:"#0d5fa6",lineColor:"#72a2cc",radius:3,lineWidth:0,states:{hover:{radius:4,lineWidth:0}}},dataGrouping:{enabled:!1}},column:{dataGrouping:{enabled:!1},color:"#5d83af"},series:{enableMouseTracking:!0,stickyTracking:!0,animation:!1}},tooltip:{useHTML:!0,style:{fontSize:"11px",fontFamily:"Arial, sans-serif",padding:0},backgroundColor:"#f2f2f2",borderWidth:0,borderRadius:0,shadow:!0,crosshairs:[!1,!1],formatter:function(){var b={},d=this.x,e=this.y;for(var f in a.attr)if(a.attr.hasOwnProperty(f)&&a.attr[f].timestamp===this.x){b=a.attr[f];break}var f=(i.renderer,this.points?this.points[0].point:{});this.points?this.points[0].series.name:"";if(1===a.data.length)return!1;i.yAxis[0].removePlotLine("yline"),i.yAxis[0].addPlotLine({color:"#62b0f5",width:1,value:e,id:"yline",zIndex:2});var g,h=(Highcharts.numberFormat(b.timestamp,c.decimals),Highcharts.numberFormat(b.actual,c.decimals)),j=b.actual_formatted||h,k=(b.actual_state,b.forecast&&Highcharts.numberFormat(b.forecast,c.decimals)),l=b.forecast_formatted||k,m=b.revised&&Highcharts.numberFormat(b.revised,c.decimals),n=b.revised_formatted||m,o=typeof FPCharts.Utils.get_translation,p="function"===o?FPCharts.Utils.get_translation("Actual"):"Open",q="function"===o?FPCharts.Utils.get_translation("Forecast"):"High",r="function"===o?FPCharts.Utils.get_translation("Revised From"):"Low",s=Highcharts.dateFormat("%d/%m/%Y",d),t="";return"up"==b.actual_state&&(g="greenFont"),"down"==b.actual_state&&(g="redFont"),"neutral"==b.actual_state&&(g="blackFont"),t+='<div class="chartsTooltipGroupWrapper">',t+='<div class="chartsTooltipGroupTable">',t+='<div class="chartsTooltipGroupBody">',t+='<div class="chartsTooltipGroupRow">',t+='<span class="chartsTooltipCell name">'+s+"</span>",t+="</div>",t+='<div class="chartsTooltipGroupRow">',t+='<span class="chartsTooltipCell bold name">'+p+"</span>",t+='<span class="chartsTooltipCell bold dirLtr text_align_lang_base_2 value '+g+'">'+j+"</span>",t+="</div>",k&&(t+='<div class="chartsTooltipGroupRow">',t+='<span class="chartsTooltipCell name">'+q+"</span>",t+='<span class="chartsTooltipCell dirLtr text_align_lang_base_2 value">'+l+"</span>",t+="</div>"),m&&(t+='<div class="chartsTooltipGroupRow last">',t+='<span class="chartsTooltipCell name">'+r+"</span>",t+='<span class="chartsTooltipCell dirLtr text_align_lang_base_2 value">'+n+"</span>",t+="</div>"),t+="</div>",t+="</div>",t+="</div>"}},series:[{name:"Events",type:"column",data:a.data}]})};