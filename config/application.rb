require_relative 'boot'

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module TodoList
  class Application < Rails::Application
    config.middleware.insert_before 0, Rack::Cors do

      allow do
     
        origins '*'
     
        resource '*',
     
          headers: :any,
     
          methods: %i(get post put patch delete options head)
     
      end
     
     end
     config.middleware.use Rack::Attack
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 5.2
    # config/application.rb
    config.assets.initialize_on_precompile = false

    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration can go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded after loading
    # the framework and any gems in your application.
    config.generators.system_tests = nil

    config.generators do |g|
      g.test_framework :rspec,
      fixture: false,
      view_specs: false,
      helper_specs: false,
      routing_specs: false
    end 

  end
end


