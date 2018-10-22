Rails.application.routes.draw do
  # devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  root to: 'home#index'

  namespace :api do
    namespace :v1 do
      resources :todos, only: [ :index, :create, :destroy, :update] do
        post 'done_task'
      end
      resources :sessions, only: [ :create, :destroy ]
    end
  end
end
