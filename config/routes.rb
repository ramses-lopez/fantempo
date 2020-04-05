# frozen_string_literal: true

Rails.application.routes.draw do
  devise_for :users, controllers: { omniauth_callbacks: 'users/omniauth_callbacks' }

  resources :artists, only: [:index]
  resources :locator, only: [:index]
  resources :homepage, only: [:index]
  resources :validations, only: %i[index create]
  # allow a PUT request w/o an id
  put 'validations', to: 'validations#update'
  get 'login', to: 'sessions#index'

  root 'homepage#index'
end
