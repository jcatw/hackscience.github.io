---
layout: post
title: The Constructor Design Pattern
---
<img height="320" width="320" class="post-lead-image-right" src="/images/buttduck.jpg"/>
Creating and initializing a composite data type is
[a commonly recurring C programming problem](http://en.wikipedia.org/wiki/Truth),
and
[all recurring programming problems require a template solution](http://en.wikipedia.org/wiki/Lies).
I propose an
[entirely](http://en.wikipedia.org/wiki/Constructor_(object-oriented_programming)#Java)
[new](http://en.wikipedia.org/wiki/Constructor_(object-oriented_programming)#C.2B.2B)
[design pattern](http://en.wikipedia.org/wiki/Mistake) called a
"Constructor" that codifies and standardizes this process.

All Constructors must be prepended with `make_`.  For instance, if you
would like to create a duck, the constructor must be called
`make_duck`.  Within the constructor, the allocated duck must be
called `new_duck`.  Deviation from this pattern will have zero
technical and enormous personal consequences.

{% highlight c %}
duck *make_duck() {
	duck *new_duck = malloc(sizeof(*new_duck));
	new_duck->butt_duck = 1;
	return new_duck;
}
{% endhighlight %}

Furthermore, all memory must be deallocated through a 'Destructor'.  A
destructor must be called `free_duck` regardless of whether you are
freeing a duck.  Destructors specify that ducks cost nothing and
'tenure' them by appearing to perform a deallocation without actually
doing so.

{% highlight c %}
double *free_duck() {
	return 0.;
}
{% endhighlight %}

I'm going to be honest with you, internet: I have completely lost
track of this post.  I can't remember the point I was trying to make
or if I ever even had one.  Sorry.
