source 'https://rubygems.org'

gem 'ngannotate-rails'

gem 'geokit-rails'
# Bundle edge Rails instead: gem 'rails', github: 'rails/rails'
gem 'rails', '4.2.5.1'
# Use postgresql as the database for Active Record
gem 'pg', '~> 0.15'
# Use SCSS for stylesheets
gem 'sass-rails', '~> 5.0'
# Use Uglifier as compressor for JavaScript assets
gem 'uglifier', '>= 1.3.0'
# Build JSON APIs with ease. Read more: https://github.com/rails/jbuilder
gem 'jbuilder', '~> 2.0'
# bundle exec rake doc:rails generates the API under doc/api.
gem 'sdoc', '~> 0.4.0', group: :doc
gem 'angular-rails-templates'
gem 'angular_rails_csrf'
gem 'devise'
gem 'bootstrap-sass', '~> 3.3.6'
gem 'jquery-rails'

gem 'rspec-core'
gem 'rspec-rails'
gem 'spring'
gem 'capybara'


source "https://rails-assets.org" do
  gem "rails-assets-angular-devise"
end
gem 'pry'

# Use ActiveModel has_secure_password
# gem 'bcrypt', '~> 3.1.7'

# Use Unicorn as the app server
# gem 'unicorn'

# Use Capistrano for deployment
# gem 'capistrano-rails', group: :development

group :development, :test do
  # Call 'byebug' anywhere in the code to stop execution and get a debugger console
  gem 'pry-byebug'
end

gem "foreman"

group :production, :staging do
  gem "rails_12factor"
  gem "rails_stdout_logging"
  gem "rails_serve_static_assets"
end

group :development do
  # Access an IRB console on exception pages or by using <%= console %> in views
  gem 'web-console', '~> 2.0'

  # Spring speeds up development by keeping your application running in the background. Read more: https://github.com/rails/spring
  gem 'spring'
end
