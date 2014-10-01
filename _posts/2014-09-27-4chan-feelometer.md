---
layout: post
title: 4chan Feelometer
---
<!--<script src="/bower_components/Chart.js/Chart.min.js"></script>-->

<script type="text/javascript" src="https://www.google.com/jsapi"></script>
<script type="text/javascript" src="/js/posts/feelometer.js"></script>
	
<script type="text/javascript">
//google.load('visualization', '1.0', {'packages':['corechart']});
//google.setOnLoadCallback(drawChart);
//function drawChart() {
//	var boards = ['a','b','c','d','e','f','g','gif','h','hr','k',
//							'm','n','o','p','r','s','t','u','v','vg','vr','w',
//							'wg','i','r9k','s4s','cm','hm','lgbt','y','3','adv',
//							'an','asp','biz','cgl','ck','co','diy','fa','fit','gd',
//							'hc','int','jp','lit','mlp','mu','n','out','po','pol',
//							'sci','soc','sp','tg','toy','trv','tv','vp','wsg'];
// results as of writing 
var initialResults = {"3":3.717772598635,"e":3.4072206005003847,"b":3.4714007421150272,"d":3.521765356945243,"c":3.10407075471697,"a":3.2774188693444084,"f":3.2876995305164334,"gif":3.304019228201367,"hr":3.2965088757396477,"h":3.4773313751088106,"g":3.2568326863609895,"k":3.4474679127726593,"m":3.265167722574244,"r":3.1763204868154062,"s":3.2989234972677366,"n":3.6079084853499057,"p":3.1702995670996406,"o":3.502911120652695,"t":3.167628294036049,"u":3.386790540540594,"v":3.433940753345251,"vg":3.408419144307482,"vr":3.505503872216925,"w":3.133600188368235,"wg":3.406062839410372,"i":3.4442729932578744,"s4s":2.769884897797167,"r9k":3.67447636063777,"hm":3.548354668232552,"cm":3.0612879322512216,"lgbt":3.6474513142958074,"y":3.348266489890607,"adv":3.878784396601137,"an":3.7611166178245927,"asp":3.651778796333264,"biz":3.8119904098852904,"cgl":3.6216065525238776,"ck":3.4965143243091896,"co":3.2599369131456033,"diy":3.6677878810465243,"fa":3.6185966951756745,"gd":3.5176594876815854,"fit":3.5341059602649723,"jp":3.4700622296426062,"int":2.6450604572076393,"lit":3.574416589111315,"hc":3.4090370660913756,"mlp":3.4792861691657797,"mu":3.2883805074654484,"out":3.5575527260214455,"po":3.412908346562018,"pol":3.498193144628907,"sp":3.359657084758297,"soc":3.3805976726572347,"sci":3.50800346054032,"tg":3.4398325242719108,"toy":3.468334810547409,"tv":2.8673373403456286,"vp":3.184443232357164,"trv":3.7700437158470517,"wsg":3.191446551160498};

plotFeels('chart-div', initialResults, 6.012, true);
</script>

4chan just isn't a very happy place, I'm afraid.

I ran [the hedometer](http://hedonometer.org/) ([previously]({% post_url 2014-09-19-hedometer %})) against recent 4chan comments to
get a board-by-board index of happiness.  It doesn't look good.

<!--<canvas style="padding-left: 0;padding-right: 0;margin-left: auto;margin-right: auto;display: block;" id="initialFeel" width="720" height="720"></canvas>-->
<div id="chart-div" style="width: 720px; height: 720px;"></div>

The leftmost bar gives a baseline happiness level from twitter; everything else is a particular 4chan board.  The chans are pretty miserable places.  In other news, water is wet.

I actually wrote this entirely in client-side javascript a) for giggles and b) because this blog is just static pages.  Static pages doesn't imply static content, folks, although it does imply insane and slow javascript ([see for yourself](/js/posts/feelometer.js)).  Anyway, if you dwell on this post long enough (and none of the underlying APIs barf) the up-to-the-moment results will appear below.

edit: A handful of the board requests are consistently 502-ing.  Can't tell if the [cors-workaround json proxy service](https://github.com/afeld/jsonp) is failing, or if 4chan is unhappy with the rate of requests.  It works for me, sometimes.  YMMV.

<div id="currentFeel"></div>


