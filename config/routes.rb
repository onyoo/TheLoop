Rails.application.routes.draw do
  devise_for :users

  namespace :api, defaults:{format: :json} do
    namespace :v1 do
      resources :users do 
        resources :events
      end
    end
  end

  root to: 'application#home'

end
