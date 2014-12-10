---
layout: post
title: CRF Autoencoders
---

CRF autoencoders (just now presented at NIPS) seem pretty neat.  The
central idea is to add an autoencoding layer to the typical
latent-variable chain-structured conditional random field.  This
imposes the constraint that the model be able to accurately reproduce
the input features given the latent labels, which translates to a
slightly different objective when learning.  It seems like a nice
trick, to insist that the latent labels actually be able to generate
the features.

However, that said, it does seem like a step back towards markov
random fields.  CRFs work so well because they are discriminitive
rather than generative - no effort is wasted modeling the uncertainty
over the entire problem space, and only the conditional distribution
of the labels is important.  CRF autoencoders seem to move more
towards a generative approach, because the ability of the labels to
generate the features is a factor in the objective.  If a CRF
autoencoder performs well on a task, how well would a markov random
field work?

edit: I just spoke with author / presenter Waleed Ammar (nice guy).
He pointed out that learning the corresponding MRF would be *very
slow*, which makes sense.

Paper: [Conditional Random Field Autoencoders for Unsupervised Structured Prediction](http://arxiv.org/abs/1411.1147)
