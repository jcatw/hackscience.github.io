function cleanText(text) {
	var tmp = document.createElement("DIV");
  tmp.innerHTML = text;
  return tmp.textContent || tmp.innerText || "";
}

// twitter vars for later
var gotTwitter = false;
var twitterHappy = 0.;

var boards = ['a','b','c','d','e','f','g','gif','h','hr','k',
							'm','n','o','p','r','s','t','u','v','vg','vr','w',
							'wg','i','r9k','s4s','cm','hm','lgbt','y','3','adv',
							'an','asp','biz','cgl','ck','co','diy','fa','fit','gd',
							'hc','int','jp','lit','mlp','mu','n','out','po','pol',
							'sci','soc','sp','tg','toy','trv','tv','vp','wsg'];

// Plot feels.  If async is true, draw the chart using a
// callback-on-load; otherwise, assume that the chart API has loaded
// and just draw it.  The async stuff is necessary to work around the
// typical google charts usage pattern.
function plotFeels(divname, chanResults, twitterVal, async) {
	google.load('visualization', '1.0', {'packages':['corechart']});
	if(async) {
		google.setOnLoadCallback(drawChart);
	}
	function drawChart() {
		var data = new google.visualization.DataTable();
		data.addColumn('string', 'Board');
		data.addColumn('number', 'Happiness');
		data.addRows([['twitter', twitterVal]]);
		data.addRows(_.map(boards, function(board) { return [board, chanResults[board]] }));
		
		console.log(data);
		var options = {'title':'4chan Feels',
									 'width':720,
									 'height':720,
									 'legend': {position: 'none'}};
		var chart = new google.visualization.ColumnChart(document.getElementById(divname));
		
		chart.draw(data, options);
	}
	
	if (!async) {
		drawChart();
	}
}

// get hedometer's current twitter happiness level
$.jsonp({
	url: 'http://hedonometer.org/api/v1/timeseries/?format=json&offset=2187',
	success: function(data) { $(document).ready(function() {
		twitterHappy = Number(data.objects[data.objects.length - 1].happiness);
		console.log(twitterHappy);
		gotTwitter = true;
	})}
});

// get hedometer dictionary,
// convert to a word->happiness map,
// then fire board-happiness-calculators
$.jsonp({
	url: 'http://hedonometer.org/api/v1/words/?format=json',
	success: function(data) {
		// create a word->happiness dictionary
		var dict = {};
		_.each(data.objects, function(object) {
			if(object) {
				dict[object.word] = object.happs;
			}
		});
		
		// container for happiness-by-board results
		var results = {};
		var count = 0;
		var checkCount = 0;
		
		// fire board-happiness-calculators
		_.each(boards, function(board) {
			$.jsonp({
				url: 'http://a.4cdn.org/' + board + '/catalog.json',
				success: function(data) {
					// horrific pipe-mill to extract words from recent board replies
					var words = _.chain(data)
						.pluck('threads')
						.flatten()
						.pluck('last_replies')
						.flatten()  
						.reject(function(reply) { return _.isUndefined(reply); })
						.pluck('com') //now have list of comments
						.reject(function(reply) { return _.isUndefined(reply); })
						.map(function(str) { return str.split("<br>"); }) // <br> -> \n (split by newline)
						.flatten()
						.map(cleanText) // scrape out html
						.map(function(str) { return str.split(" "); }) //split words by spaces
						.flatten()
						.value();

					// translate from words to happiness and sum the results
					var raw_happiness = _.chain(words)
						.map(function(word) {
							if(dict[word]) {
								return dict[word];
							}
							return 0;
						})
						.reduce(function(memo, happ) { return memo + happ; }, 0)
						.value();
					
					// normalize by number of words
					var happiness = raw_happiness / words.length;
					results[board] = happiness;
					console.log(board + ': ' + happiness);
					count += 1;
				}
			});
		});
		
		// monitor the all of the asynchronous calls
		// when everything is in, plot it
		function check() {
			if ((count === boards.length && gotTwitter) || checkCount > 25) {
				console.log(JSON.stringify(results));
				plotFeels('currentFeel', results, twitterHappy, false);
			}
			else {
				console.log('checking...');
				setTimeout(check,1000);
			}
			checkCount += 1;
		}
		check();
	}
});

