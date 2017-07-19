# Converts Jupyter snippets that are included in jekyll pages to HTML snippets
# Only includes the notebook content, does NOT include any Jupyter styles or scripts, o
# Based on:
# https://github.com/red-data-tools/jekyll-jupyter-notebook

require "tmpdir"
require "nokogiri"

module JupyterMarkdown
  class Tag < Liquid::Tag
    Liquid::Template.register_tag("jupyter_notebook", self)

    def initialize(tag_name, markup, tokens)
      super
      @notebook_path = markup.strip
    end

    def syntax_example
      "{% #{@tag_name} filename.ipynb %}"
    end

    def render(context)
      if context["site"]["jupyter"]["enable"]
        convert_notebook(context)
      end
    end

    def convert_notebook(context)
      nb_source = context["site"]["source"]
      nb_path = File.dirname(context["page"]["path"])
      notebook_path = File.join(nb_source, nb_path, @notebook_path)
      Dir.mktmpdir do |output|
        system("jupyter",
               "nbconvert",
               "--to", "html",
               "--output-dir", output,
               notebook_path)
        html_path = Dir.glob("#{output}/*.html").first
        html = File.read(html_path)

        # We could use the full jupyter notebook here, but we choose to only
        # use the input and output areas, without prompt and other elements
        # like wrappers or containers
        document = Nokogiri::HTML(html)
        result = ""
        cells = document.css(".cell")
        cells.each do |cell|
          result << cell.css(".input_area").to_html
          result << cell.css(".output_subarea").to_html
        end

        <<-HTML
<div class="jupyter-notebook">#{result}</div>
        HTML
      end
    end

  end
end
