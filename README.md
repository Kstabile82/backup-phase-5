Pawsitive Pets
React front end and Ruby back end app for animal rescues and users. Rescues can register and log their pets and information, and create a quiz for users to test their readiness for pet adoption. Users can view and filter rescues by animal types and locations. 

How to use:
bundle install 
npm install --prefix client
rails db:migrate
db:seed

Usage
A user logs in (or signs up as a new user) and sees navigation options. They can go to the All Rescues page and view all rescues in the database, filter them based on animal type and location, and save rescues of interest to their own My Rescues page. The user's My Rescues page lists all the rescues they've saved or are admins for. A user can create a new rescue, which they'll be made an automatic admin for. Rescue admins can view all of that rescue's users and change guests to admins, or remove admins and set them back as guests. Rescue admins can update the rescue's stored information as well as the test questions and options. They can edit, add, or delete pets from the database and can also view users' tests results and delete the rescue. An admin can't delete the rescue from their saved rescues. This is to prevent an issue of having no admins. They would need to have another admin set them as a guest, and then they could remove the rescue from their list. Guests are non-admins who can remove rescues from their lists. They can see the rescue's pets and filter them by animal type. They can also see the rescue's information and click "Test Your Knowledge" to take the test. Upon successfully completing the test questions that are based on provided information content, the user will see their score and an email form will populate enabling the user to email the service's head admin and be considered as a potential adopter. 

For support, please email karina.stabile@gmail.com

I am open to contributions, please email me to inquire.

Requirements
Ruby 2.7.4
Rails 7.0.4
NodeJS (v16), and npm
Postgresql

You can use the following commands to run the application:
rails s: run the backend on http://localhost:3000
npm start --prefix client: run the frontend on http://localhost:4000