---
layout: post
title: Look at this snake
---

I like Python.  I can't help it.  I shouldn't.  Everything is
interpreted, so you can't default to 'I did this horrible thing
because readability and compilers'.  It lacks
[non-stupid threads](https://wiki.python.org/moin/GlobalInterpreterLock)
and
[the alternative](https://docs.python.org/dev/library/multiprocessing.html)
is murder if you are memory-bound.  The scope is
[pretty](https://docs.python.org/2/reference/simple_stmts.html#the-global-statement)
[wack](https://docs.python.org/2/tutorial/classes.html#random-remarks).
It is just so *slow*.

But I can build things so *fast*.  I mean, just look at this:
{% highlight python %}
def comparer_maker(comp_fn, stat_names = default_stats):
    '''
    Make a comparer class which applies comp_fn to the result of the
    application of network statistics stat_names to generated and held-out data.

    '''
    class comparer:
        def __init__(self, learner):
            self.learner = learner
    
        def compare(self, path = "./"):
            testdata = self.learner.dataset.test()
            samples = self.learner.samples
            results = {}

            for name in stat_names:
                teststat = netstat.stat[name](testdata)
                samplestat = netstat.stat[name](samples)
                teststat.plot_ecdf(samplestat,
                                   path=path+"_%d_" % (self.learner.dataset.i,),
                                   legend = ['Test Data', 'Sample Data'])
                results[name] = comp_fn(teststat.result,
                                        samplestat.result)
            return results

    return comparer

ksComparer = comparer_maker(ks_distance)
kuiperComparer = comparer_maker(Kuiper())
meanAbsDiffComparer = comparer_maker(lambda res1, res2: np.abs(np.mean(res1) - np.mean(res2)))
{% endhighlight %}

comparer_maker builds classes whose instances perform cross-validated
comparisons between predicted and held-out values by closing over some
comparison statistic.  It returns a *class*, not an *object*.  It took
less than an hour to write and provides an entire experimental
infrastructure.  This is *nuts*.

This is probably a design pattern.  An Abstract Builder Delegator
Builder Factory Builder, or something.  I have no idea.  Design
patterns are the codified horror of a generation of programmers who
were sold Smalltalk and delivered Java / C++.  But, I digress.
[Look at this snake](images/snake.png).

