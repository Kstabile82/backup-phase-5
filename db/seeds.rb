# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)
Rescue.create({ name: "Love Rabbits Rescue", location: "Queens, NY" })
Rescue.create({ name: "Ruff Love Rescue", location: "Long Island, NY" })
Rescue.create({ name: "Hunny Bunny Rescue", location: "Long Island, NY" })
Rescue.create({ name: "Fancy Furball Rescue", location: "Long Beach, NY" })
Rescue.create({ name: "Kitty Cove", location: "Queens, NY" })

User.create({ name: "Karina", location: "Long Beach, NY", password: "dolly"})
User.create({ name: "Dolly", location: "Long Beach, NY", password: "bunny"})
User.create({ name: "Linda", location: "Queens, NY", password: "test"})
User.create({ name: "Jim", location: "NY, NY", password: "test"})

Userrescue.create({user_id: User.first.id, rescue_id: Rescue.first.id, status: "Admin"})
Userrescue.create({user_id: User.first.id, rescue_id: Rescue.second.id, status: "Admin"})
Userrescue.create({user_id: User.second.id, rescue_id: Rescue.second.id, status: "Guest"})
Userrescue.create({user_id: User.second.id, rescue_id: Rescue.third.id, status: "Guest"})
Userrescue.create({user_id: User.third.id, rescue_id: Rescue.last.id, status: "Admin"})
Userrescue.create({user_id: User.last.id, rescue_id: Rescue.last.id, status: "Guest"})

Information.create({rescue_id: Rescue.first.id, title: "Bunny Diet", text: "Rabbits are grazers, meaning they eat all day! That doesn't mean giving them abundance of the wrong foods, though. The most important part of a rabbit's diet is hay -- it comprises roughly 80% of what they eat in a day. Timothy hay is the most popular, followed by Orchard. Alfalfa hay is richer and should be reserved for very young bunnies. Rabbits should also get some daily leafy greens such as romaine, dandelion, parsley, cilantro and kale. They should NOT be fed iceburg lettuce as it is tough on their digestive system. They can get very small amounts of fruit as treats. They should not be given anything fatty or starchy like avocado or potato, that is off-limits. For a full list of the veggies and fruits that are save vs. non-safe please refer to your vet. Rabbits also eat pellets, and only those that are natural and Timothy-hay based. Pellets sold in some stores that include dried fruit and seeds are really not good for rabbits and can lead to digestive and health issues, so should be avoided."})
Information.create({rescue_id: Rescue.first.id, title: "Bunny Bonding Basics", text: "Want to get a second rabbit?"})
Question.create({information_id: Information.first.id, text: "How many times a day do bunnies eat?"})
Question.create({information_id: Information.first.id, text: "What's the best type of lettuce for rabbits?"})
Question.create({information_id: Information.second.id, text: "What's the best way to introduce rabbits?"})
Question.create({information_id: Information.second.id, text: "What are the easiest pairs to bond?"})
Option.create({question_id: Question.first.id, text: "Twice a day", correct: false})
Option.create({question_id: Question.first.id, text: "Once a day", correct: false})
Option.create({question_id: Question.first.id, text: "All day", correct: true})
Option.create({question_id: Question.second.id, text: "Romaine", correct: true})
Option.create({question_id: Question.second.id, text: "Iceberg", correct: false})
Option.create({question_id: Question.third.id, text: "Gradually in neutral territory", correct: true})
Option.create({question_id: Question.third.id, text: "In the more assertive rabbit's cage", correct: false})
Option.create({question_id: Question.third.id, text: "Place them together permanently and let them adjust", correct: false})
Option.create({question_id: Question.fourth.id, text: "Male/Female", correct: true})
Option.create({question_id: Question.fourth.id, text: "Male/male", correct: false})
Option.create({question_id: Question.fourth.id, text: "Female/female", correct: false})