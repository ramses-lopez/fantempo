Rails.application.routes.draw do
  get 'sessions/index'
  get 'sessions/create'
  get 'sessions/delete'
  get 'homepage/index'
  root 'homepage#index'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
