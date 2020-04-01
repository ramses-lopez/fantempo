# frozen_string_literal: true

Rails.application.routes.draw do
  devise_for :users, controllers: { omniauth_callbacks: 'users/omniauth_callbacks' }

  resources :artists, only: [:index]
  resources :locator, only: [:index]
  resources :validations, only: %i[index create update]
  resources :homepage, only: [:index]
  # put 'validations', to: 'validations#update'

  get 'login', to: 'sessions#index'

  # get 'homepage/index'
  root 'homepage#index'
end
