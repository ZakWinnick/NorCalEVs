source "https://rubygems.org"

# Jekyll version - using older version for Ruby 2.6 compatibility
gem "jekyll", "~> 3.9.0"

# Kramdown parser for GitHub Flavored Markdown
gem "kramdown-parser-gfm"

# Additional plugins
group :jekyll_plugins do
  gem "jekyll-feed"
  gem "jekyll-seo-tag"
  gem "jekyll-sitemap"
end

# Windows and JRuby compatibility
platforms :mingw, :x64_mingw, :mswin, :jruby do
  gem "tzinfo", ">= 1", "< 3"
  gem "tzinfo-data"
end

# Performance booster for watching directories on Windows
gem "wdm", "~> 0.1", :platforms => [:mingw, :x64_mingw, :mswin]

# Lock `http_parser.rb` gem to `v0.6.x` on JRuby builds
gem "http_parser.rb", "~> 0.6.0", :platforms => [:jruby]

# Webrick for Ruby 3.0+
gem "webrick", "~> 1.8"
