FROM python:3.6.3

# Install jupyter
RUN pip install jupyter

# Download and install pandoc
RUN URL='https://github.com/jgm/pandoc/releases/download/1.19.2.1/pandoc-1.19.2.1-1-amd64.deb'; FILE=`mktemp`; wget "$URL" -qO $FILE && dpkg -i $FILE; rm $FILE

# Install ruby bundler, zlib (needed by Nokogiri), git (needed by Jekyll)
RUN apt-get update
RUN apt-get install -y bundler

# Change dir to the one defined by docker python
WORKDIR /usr/src/app

# Install bundle
COPY Gemfile .
COPY Gemfile.lock .
RUN bundle install

# Notify events (used by jekyll --watch) do not work with bind mounts on, macOS High Sierra (WHY?),
# but we can use polling to make it work using jekyll --force_polling
# See: https://hub.docker.com/r/jekyll/builder/

# Use
ENTRYPOINT ["bundle", "exec", "jekyll"]
