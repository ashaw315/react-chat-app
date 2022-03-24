Rails.application.routes.draw do
  
  resources :messages
  resources :conversations
  resources :users

  post "/signup", to: "users#create"
  get "/me", to: "users#me"

  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"

  post "conversation-invite", to: "conversations#invite"

  mount ActionCable.server => "/cable"

  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
