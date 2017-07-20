---
layout: article
title:  "A modern blog"
author: David Muhr
tags:
- Meta
---

{% include article/abstract.html content=
"A blog is the perfect medium to share ideas with the world. It's a place to test your own knowledge by explaining it to others. This article should save you some time when you decide to create or extend your own blog."
%}

It's interesting how the blogging landscape has changed in recent years. Most blogs a couple of years ago used Wordpress or similar tools, which seem pretty complex for something that should be simple. [The rise of static site generators](https://www.smashingmagazine.com/2015/11/modern-static-website-generators-next-big-thing/) is a movement away from database-driven sites to simple static web pages. Things you essentially get for free with static websites are performance, reliability, security, and easy version control. They are a natural fit for blogs.

It has never been easier and cheaper to host you own private blog. [StaticGen](https://www.staticgen.com/) lists the top open-source static site generators and [Github Pages](https://pages.github.com/) allows you to host your static website for free!

### Curious Observer
This is not my first blog (and likely not my last) but it's the first time that I have managed to create a blog that feels like it does not limit my creativity and productivity. The following should not be seen as a how to, it should just serve as an inspiration for your own blog ideas.

The requirements I set for this blog were demanding and included:

* Code snippets with syntax highlighting
* Embed the results of computations like plots
* Mathematical figures
* Bibliographic citations
* Footnotes

Above all: ease of use should come first. It's not that all of the above is not possible with your typical blog, but it involves a lot of work for every single post.

### Technology

I did not do much research about different static site generators before building this blog and that was a mistake. I choose [Jekyll](https://jekyllrb.com/) because of it's (supposedly) good integration with Github and it's wide adoption in the community I'm following.

During development I realised that Jekyll alone will not be able to satisfy my requirements without additional plugins. The automatic build that Github Pages provides for Jekyll-powered sites only works for sites with a limited number of [allowed plugins](https://pages.github.com/versions/).

> Don't rely on the Jekyll integration that Github pages provides

Don't get my wrong, Jekyll is awesome and I am still use Jekyll to generate this site. However, due to my limited knowledge of Ruby I would likely choose a different static site generator, like the Haskell based [Hakyll](https://jaspervdj.be/hakyll/), in the future. A personal blog in a sense reflects your preferences as a developer.

#### Code snippets

Keep in mind that syntax highlighting generally depends on the Markdown processor you use. By default, Jekyll uses [kramdown](https://kramdown.gettalong.org/) and has built-in support for code snippets with syntax highlighting. The only thing you have to do is to [find or create the right syntax highlighting theme](https://github.com/richleland/pygments-css). Additionally, Jekyll also offers tags to provide syntax highlighting independent from your Markdown processor.

```python
print("Hello syntax highlighting.")
```

#### Embedded computations

Embedding the output of computations in a beautiful and simple to create way is a bit harder. Fortunately there already exists a tool that can be used for this job, it's called [Jupyter](http://jupyter.org/). The mission was the combine Jekyll and Jupyter somehow. I actually had to write a small plugin to make it work. First contact with Ruby, yay 👍

{% jupyter_notebook sample.ipynb %}

Unfortunately there are some differences in the way Jupyter highlights syntax with [Pygments](http://pygments.org/) and how Jekyll highlights syntax with [Rouge](https://github.com/jneen/rouge). Jekyll offers tags to highlight your syntax with {% raw %}`{% highlight %}`{% endraw %}, that transform your syntax before the Markdown processor kicks in. In principle you could also use Pygments with Jekyll because Jekyll supports [pygments.rb](https://github.com/tmm1/pygments.rb), but it did not work for me and would likely require different versions of Python for Jupyter and pygments.rb.

Eventually, I decided to not use Jekyll's syntax highlighting and let my Markdown processor do the work. This meant that I had to align the styles of both highlighters and it turned to work O.K.

#### Figures, Citations, Footnotes

There is actually a Markdown processor that does all those things and much, much more. [Pandoc](https://pandoc.org/) is a Haskell based *universal document converter* and it's truly universal. With it you can translate from and to numerous different file formats. You could easily create a beautifully typeset PDF version of every post for example.

Pandoc is not officially supported by Jekyll, which meant that I had to write a small plugin again. The plugin basically just forwards Jekyll's site options to the Pandoc CLI and uses it to transform Markdown files to HTML.

Pandoc basically allows you to write a research article with all formalities and transform it to plain old HTML. I would love to see blogs that publish well-researched articles in the future. [Distill](https://distill.pub/) and [NextJournal](https://nextjournal.com/) show that even scientific publishing will be web-based in the future.

#### Development workflow

Once you free yourself from the limited Jekyll build that Github pages provides, you are free to use whatever tool you want.

I decided to improve my development workflow by using [Webpack](https://webpack.github.io/) to bundle all style and script assets. Webpack enables you to use it's [development server](https://github.com/webpack/webpack-dev-server) to hot-reload all Webpack resources. Webpack can also automatically reload your page once files generated from Jekyll change.

Finally, with continuous integration tools like [Travis](https://travis-ci.org/) you can remotely build your blog, run tests and deploy to Github pages. It's free if your blog is open-source!

You can find the full source code for this blog on [Github](https://github.com/davnn/curious.observer).
