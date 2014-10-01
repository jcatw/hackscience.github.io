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
var initialResults = {"cm": 5.425002730748199,"p":5.3771905379133145,"wg":5.377719780219743,"sci":5.3657118130680885,"out": 5.358284754965136,"gd": 5.398906723963673,"hc":5.414092299847019,"asp":5.343885333681684,"3":5.3921607773852696,"f":5.344677804295937,"a":5.328854510690094,"e":5.4044412788856775,"c":5.429960396039591,"b":5.364065866420407,"d":5.3895824324325075,"g":5.362766502884105,"gif":5.366887554837231,"m":5.326213533049008,"h":5.3696168940385425,"hr":5.365917948717926,"o":5.374439489785443,"r":5.414914163090115,"k":5.283040382110436,"n":5.364673010601787,"s":5.447247899159623,"t":5.346255479023144,"u":5.394473576959723,"v":5.349644426688015,"vg":5.332187185508259,"vr": 5.365004443008436,"w":5.4159522949041925,"lgbt":5.37267376768785,"i":5.419061936259809,"vr":5.3621776013698685,"s4s":5.497040977147323,"r9k":5.3561711165049894,"hm":5.391073661735585,"y":5.310855803048044,"an":5.355603152152074,"adv":5.394964324917811,"cgl":5.39294078361544,"biz":5.388990000000132,"ck":5.402807496040958,"hc":5.413757004584819,"fa":5.387211601845794,"fit":5.342231616420136,"co":5.338502776833372,"diy":5.351330265411066,"mu":5.440378502375923,"jp":5.385352446081076,"int":5.326632710809351,"lit":5.355958134648181,"mlp":5.369290409321895,"soc":5.438110469652116,"po":5.359250461538572,"pol":5.32022851420262,"sp":5.341457023060841,"tv":5.331320220299023,"toy":5.3558653026429335,"tg":5.34994242803518,"trv":5.412777054586635,"wsg":5.334604552921857,"vp":5.345711371749172};

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

double edit: Things began to work again immediately after the previous edit.  It seems related to [a known intermittent issue with the proxy](https://github.com/afeld/jsonp/issues/18).  It now just plots whatever has come in after 30 seconds or so.

<div id="currentFeel"></div>


