# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)
Rescue.create({ name: "AARR", location: "Queens, NY" })
Rescue.create({ name: "Ruff House Rescue", location: "Long Island, NY" })
Rescue.create({ name: "LIRRG", location: "Long Island, NY" })
Rescue.create({ name: "Posh Pets", location: "Long Beach, NY" })
Rescue.create({ name: "Kitty Cove", location: "Queens, NY" })

User.create({ name: "Karina", location: "Long Beach, NY", password: "dolly"})
User.create({ name: "Dolly", location: "Long Beach, NY", password_digest: "bunny"})
User.create({ name: "Linda", location: "Queens, NY", password_digest: "test"})
User.create({ name: "Jim", location: "NY, NY", password_digest: "test"})

Userrescue.create({user_id: User.first.id, rescue_id: Rescue.first.id, status: "Admin"})
Userrescue.create({user_id: User.first.id, rescue_id: Rescue.second.id, status: "Admin"})
Userrescue.create({user_id: User.second.id, rescue_id: Rescue.second.id, status: "Guest"})
Userrescue.create({user_id: User.second.id, rescue_id: Rescue.third.id, status: "Guest"})
Userrescue.create({user_id: User.third.id, rescue_id: Rescue.last.id, status: "Admin"})
Userrescue.create({user_id: User.last.id, rescue_id: Rescue.last.id, status: "Guest"})