# Simple interface to pandoc through:
# http://www.rubydoc.info/gems/pandoc-ruby/1.0.0
#
# See jekyll-pandoc for othe example implementation
# https://github.com/mfenner/jekyll-pandoc
#
# See available pandoc options:
# http://pandoc.org/MANUAL.html

module Jekyll::Converters
  class Markdown::Pandoc
    DEFAULT_OPTIONS = [:from => :markdown, :to => :html5]
    DEFAULT_EXTENSIONS = []

    # Here we have access to post metadata and path to the post
    Jekyll::Hooks.register :posts, :pre_render do |post|
      # Note that .data is a method of the Jekyll::Document
      # we cannot access it with [:data]
      # See: https://github.com/jekyll/jekyll/blob/master/lib/jekyll/document.rb
      @@post_data = post.data
      @@post_path = post.path
    end

    # Here we get passed the site configuration
    def initialize(config)
      Jekyll::External.require_with_graceful_fail "pandoc-ruby"
      @config = config
    end

    # This is the method called by jekyll to convert the file
    def convert(content)
      configuration = @config["pandoc"]
      bibliography = @@post_data["bibliography"]
      csl = @@post_data["csl"]
      toc = @@post_data["toc"]
      path_to_post = File.dirname(@@post_path)

      options = configuration["options"]
      flags = configuration["flags"]

      # Add the bibliography option if it is present in the YAML front matter
      if bibliography
        options.merge!({ :bibliography => "#{path_to_post}/#{bibliography}" })
      end

      # Add the csl option if it is present in the YAML front matter
      if csl
        options.merge!({ :csl => "#{path_to_post}/#{bibliography}" })
      end

      if toc
        flags << :toc
      end

      content = PandocRuby.convert(content, *options, *flags)
      raise Erros::FatalException, "Conversion returned empty string" unless content.length > 0
      content
    end
  end
end
