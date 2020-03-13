Rails.application.routes.draw do
  resources :validations
  devise_for :users, controllers: { omniauth_callbacks: "users/omniauth_callbacks" }
  get 'sessions/index'
  get 'sessions/create'
  get 'sessions/delete'
  get 'homepage/index'
  root 'homepage#index'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
