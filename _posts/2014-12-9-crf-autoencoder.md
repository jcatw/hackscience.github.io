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
random fields.  CRFs are suppose to work so well because they are
discriminitive rather than generative - that is, no effort is wasted
modeling the uncertainty over the entire problem space, and only the
conditional distribution of the labels is important.  CRF autoencoders
seem to move more towards a generative approach, because the ability
of the labels to generate the features is a factor in the objective.
If a CRF autoencoder works well, how well would a markov random field
do on the same task?
