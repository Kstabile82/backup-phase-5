# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2022_12_18_033636) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "information", force: :cascade do |t|
    t.integer "rescue_id"
    t.string "title"
    t.string "text"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "options", force: :cascade do |t|
    t.integer "question_id"
    t.boolean "correct"
    t.string "text"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "questions", force: :cascade do |t|
    t.integer "information_id"
    t.integer "idx"
    t.string "text"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "rescuepets", force: :cascade do |t|
    t.integer "rescue_id"
    t.string "animal"
    t.string "breed"
    t.string "size"
    t.string "age"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "name"
  end

  create_table "rescues", force: :cascade do |t|
    t.string "name"
    t.string "location"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "userrescues", force: :cascade do |t|
    t.integer "rescue_id"
    t.integer "user_id"
    t.string "status"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "userresults", force: :cascade do |t|
    t.integer "information_id"
    t.integer "userrescue_id"
    t.integer "score"
    t.integer "maxscore"
  end

  create_table "users", force: :cascade do |t|
    t.string "name"
    t.string "location"
    t.string "password_digest"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

end
