---
layout: post
title: My Very First Heisenbug
src: https://github.com/hackscience/quicknet/tree/heisenbug
srcname: heisenbug
---

I just found my very first
[Heisenbug](http://en.wikipedia.org/wiki/Heisenbug) while hacking on
my network structure simulator
[quicknet](https://github.com/hackscience/quicknet).

So, I wrote a hash table that maps from network nodes to indexed info
and attached a table to each index.  Usually, the nodes are sampled by
some statistic; the underlying data structure doesn't provide
consistent direct access.  The hash tables do, so now the indices can
be queried for something like 'give me your metadata for this node',
which makes life a lot easier.

Except when it doesn't, which right now is 'any time outside of gdb'.
Seriously.  If the program is running within gdb, everything is just
fine.  If it is running outside, it segfaults about half the time.
wtf. How do you even begin to fix something like this?

Please have a look [here](https://github.com/hackscience/quicknet/tree/heisenbug).  I'm stumped.

### edit
I think I fixed it.  Here's the simple hash function I was using to assign pointer *x* to a bucket:

{% highlight c %}
((int) x) % N_BUCKETS
{% endhighlight %}

It just mods the value of the pointer.  That cast was what killed me; it should have been unsigned:

{% highlight c %}
((unsigned int) x) % N_BUCKETS
{% endhighlight %}

So, I was indexing into an array with negative values.  Maybe gdb is
smart enough to index backwards, or something, which is why it never
showed up in the debugger.  Spooky.
