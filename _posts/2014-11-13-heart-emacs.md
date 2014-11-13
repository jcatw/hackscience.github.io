---
layout: post
title: Why I Heart Emacs
ads: true
---
I spend a decent chunk of each day using emacs.  It is a pretty strange habit, to be sure, and one that I sometimes try to break.  I always come back, though.

Take today.  I was working on a static blog generator to replace this one, and I needed to literally escape a whole bunch of html.  This looked like it was going to be a huge pain in one cheek (doing it manually or with sed or something) or another (writing a jinja2 extension).  Thankfully, I found [this blog post](http://shallowsky.com/blog/linux/editors/emacs-escape-html.html) from Akkana Peck describing how to escape a region of html in-place in an emacs buffer.  Hallelujah.

Here's the elisp:
{% highlight common-lisp %}
(defun unhtml (start end)
	(interactive "r")
	(save-excursion
		(save-restriction
			(narrow-to-region start end)
			(goto-char (point-min))
			(replace-string "&" "&amp;")
			(goto-char (point-min))
			(replace-string "<" "&lt;")
			(goto-char (point-min))
			(replace-string ">" "&gt;")
			)))
{% endhighlight %}

You know, a glorified text editor / actually-really-a-lisp-environment
is going to have real trouble competing with something like, say,
IntelliJ IDEA, when, say, you are working on some
[monsterous enterprise java thing](https://github.com/EnterpriseQualityCoding/FizzBuzzEnterpriseEdition)
with hundreds of other people.  Emacs promotes the wrong sort of
behavior for that kind of environment.  What it really works for is
reinforcing your own feedback loop, where you notice your own particular commonly
recurring tasks, and it doesn't really matter if anyone else can make
heads or tails of how you are automating them.

For example, I like to spin up a shell for each project.  I want to do
that without really thinking about it, so I wrote this:

{% highlight common-lisp %}
;; use these to guess the project's root, ala ag.el
(autoload 'vc-git-root "vc-git")
(autoload 'vc-svn-root "vc-svn")
(autoload 'vc-hg-root "vc-hg")
(defun shell-project-root (path)
  (or (vc-git-root path)
	  (vc-svn-root path)
	  (vc-hg-root path)
	path))
(defun shell-switcher (arg)
  (interactive "p")
  (cond ((= arg 4) (let* ((project-root-dir (shell-project-root (buffer-file-name)))
		       (new-shell-name (format
					"*%s-shell*"
					(car (last (butlast (split-string
							(shell-project-root (buffer-file-name))
							"/")))))))
		   (shell (get-buffer-create new-shell-name))
		   ;(comint-kill-whole-line) ;; kill initial prompt
		   (comint-send-string (current-buffer) (format "cd %s\n" project-root-dir))))
    ((= arg 16) (let ((new-shell-name (format "*%s-shell*" (buffer-name)))
		       (current-buf-dir (file-name-directory (buffer-file-name))))
		   (shell (get-buffer-create new-shell-name))
		   ;(comint-kill-whole-line) ;; kill initial prompt
		   ;; this seems to mess up a shell buffer's sense of where it is
		   (comint-send-string (current-buffer) (format "cd %s\n" current-buf-dir))))
    ((= arg 64) (let ((current-buf-dir (file-name-directory (buffer-file-name))))
		  (shell)
		  ;(comint-kill-whole-line) ;; kill initial prompt
		  ;; this seems to mess up a shell buffer's sense of where it is
		  (comint-send-string (current-buffer) (format "cd %s\n" current-buf-dir))))
    (t (shell))))
(global-set-key (kbd "C-c s") 'shell-switcher)
(global-set-key (kbd "C-c C-s") 'shell-switcher)
(global-set-key (kbd "C-c m s") 'shell-switcher))
{% endhighlight %}

This binds 'hey figure out where the project root is by looking for
version control junk and either spin up a shell there or switch to one that exists kthanx'
to C-u C-c m s, which is now so baked into my brain that I can't live
without it.

The hole gets deeper.  I wrote a [dependency management system](https://github.com/hackscience/include.el) ([previously]({% post_url 2013-06-02-include.el %})) because my
config file was getting pretty unmanageable (1422 lines as of this
writing).  It adds a control structure that lets you a) defer
evaluation of elisp chunks and b) perform the evaluation with respect
to some dependency graph.  That gives nice things like

{% highlight common-lisp %}
;(include 'zenburn :depends 'theme-hacks)
(include 'leuven :depends 'theme-hacks)
(include 'theme-hacks)
{% endhighlight %}

at the beginning of the config file, and

{% highlight common-lisp %}
(if-included 'theme-hacks
	     (if (>= major-version-number 24)
		 (add-to-list 'custom-theme-load-path
			      "~/.emacs.d/themes/")))
				  
(if-included 'zenburn
	     (load-theme 'zenburn))
(if-included 'leuven
	     (load-theme 'leuven))
{% endhighlight %}

interspersed throughout.

Is any of this actually productive?  I don't know.  Probably? Maybe.
My hands never really leave the keyboard and I can zip around like
all-get-out.  The key here is to realize that hacking on your text
editor is going to be fun and soothing and easily rationalizable in
terms of time-down-the-line saved and to avoid spending your whole day
doing it or blogging about it.
