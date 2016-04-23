Rails.application.routes.draw do
  devise_for :users

  namespace :api, defaults:{format: :json} do
    namespace :v1 do
      resources :users
      resources :events
      resources :categories, only: [:index]
    end
  end

  root to: 'application#home'
  put '/api/v1/users', to: 'api/v1/users#remove'

  get 'api/v1/events/:api_id/check', to: 'api/v1/events#check'
end
