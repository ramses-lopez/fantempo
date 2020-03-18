Rails.application.routes.draw do
  resources :validations, only: [:index]

  devise_for :users, controllers: { omniauth_callbacks: "users/omniauth_callbacks" }

  get 'login', to: 'sessions#index'
  get 'phone-list', to: 'validations#phone_list'

  get 'homepage/index'
  root 'homepage#index'
end
