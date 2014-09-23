---
layout: post
title: The Hedometer
---
<a href="http://hedonometer.org/"><img class="post-lead-image-right" src="/images/hedonometer.jpeg"/></a>

<script type="text/javascript">
$.jsonp({
	url: 'http://hedonometer.org/api/v1/timeseries/?format=json&offset=2187',
	success: function(data) { $(document).ready(function() {
		var happiness = data.objects[data.objects.length - 1].happiness;
		console.log(happiness);
		$('#happy').text(happiness);
		})}
	});
</script>


[Peter Dodds](http://www.uvm.edu/~pdodds/index.html) gave a talk on [the hedometer](http://hedonometer.org/) at UMass today.  It is neat.  The central idea is to strap a quick sentiment analyzer to a twitter stream sample (10% of the whole firehose, I think).  The underlying model is pretty darn simple:

* Create a dictionary of common words from a handful of corpora.
* Ask people (via mechanical turk) to rate the happiness level of individual words.
* Predict the happiness of a held-out document by taking the dot product of normalized word frequencies and word happiness levels.

That's it! Easy-peasy.  It needs to be, too; inference that is more complicated than a dot product is probably out if you are processing things on a reasonable-sample-of-the-twitter-firehose scale and want a real-time response.

The qualitative evaluations are pretty convincing - Saturdays are happier than Mondays, the Boston Marathon bombing was terrible, Christmas is great.  There wasn't much in the way of quantitative evaluations, but I'm not sure how you would even really go about that.

There's also [an actual-factual API](http://hedonometer.org/api.html)!  According to the hedometer, the current happiness level is <span id="happy" class="text-success">0.00</span> out of 9.0.

The simplicity + niceness of it really made me want to release the privacy-compromising-facebook-post chrome extension that I built over the summer.  People like well-visualized bag-of-words models.  Maybe I can liberate it from Technicolor.

	
