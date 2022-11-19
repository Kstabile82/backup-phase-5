Rails.application.routes.draw do
  resources :users
  resources :rescues
  resources :userrescues
  resources :informations
  resources :questions
  resources :options

  post "/signup", to: "users#create"
  get "/me", to: "users#show"
  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"
  # patch "/user/:id", to: "users#update"
  # delete "/user/:id", to: "users#destroy"
  post "/newrescue", to: "rescues#create"
  post "/myrescues", to: "userrescues#create"
  # patch "/userrescues", to: "userrescues#update"
  post "/allusers", to: "userrescues#showalluserstoadmin"
  # delete "/userrescue/:id", to: "userrescues#destroy"
  # post "/information/:id", to: "informations#show"
  post "/newinformation", to: "informations#create"
  patch "/information/:id", to: "informations#update"
  delete "/information/:id", to: "informations#destroy"
  post "/infoquestions", to: "questions#show"
  post "/newquestion", to: "questions#create"
  # patch "/questions/:id", to: "questions#update"
  # delete "/questions/:id", to: "questions#destroy"
  # post "/options", to: "options#show"
  # post "/newoption", to: "options#create"
  # patch "/options/:id", to: "options#update"
  # delete "/options/:id", to: "options#destroy"



  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
end