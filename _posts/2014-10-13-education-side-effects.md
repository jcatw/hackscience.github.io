---
layout: post
title: Education Side Effects
---

So, working on a PhD in Computer Science is a pretty strange thing,
generally.  Sometimes it is specifically strange.

For instance, if you inspect the source for
[Delivery Express](https://www.deliveryexpress.com/mall/amherstlobby.htm),
amherst's source for all things lazy and food, you'll see some shady javascript
at the bottom:

{% highlight javascript %}
if(document.getElementById('bestpage') != null){document.getElementById('bestpage').style.visibility = 'hidden'; document.getElementById('bestpage').style.width = '0px'; document.getElementById('bestpage').style.height = '0px';}
{% endhighlight %}

They are sweeping a 'bestpage' div under the rug.  What might be on there?

{% highlight html %}
<div id='bestpage'>The <a href="http://www.viagraonlinefly.com">viagra online</a>  merchandise are made in such a way that it works as much as the necessity of the shopper and fulfill their necessities on the similar time. Finest offers and presents are provided by <a href="http://www.cialisonlinelow.com">cialis online</a>  products which also do promise a lot. Card video games are additionally well-known in <a href="http://www.casinoonlinebit.com">casino online</a> games.</div>
{% endhighlight %}

Looks like our local delivery service has a penchant for erectile dysfunction drugs and gambling.  To see for yourself, pop open a console, and run:

{% highlight javascript %}
document.getElementById('bestpage').style.visibility = 'visible'
{% endhighlight %}

I have no idea *why* it is there, but it definitely is.
