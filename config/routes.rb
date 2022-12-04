Rails.application.routes.draw do
  resources :rescuepets
  resources :users
  resources :rescues
  resources :userrescues
  resources :information do
    resources :questions
  end
  resources :userresults
  resources :rescuepets

  post "/signup", to: "users#create"
  get "/me", to: "users#show"
  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"
  post "/newrescue", to: "rescues#create"
  post "/myrescues", to: "userrescues#create"
  post "/allusers", to: "userrescues#showalluserstoadmin"
  
  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
end