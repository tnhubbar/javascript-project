# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

t.string "name"
t.string "dob"
t.string "gender"
t.text "factors"
t.text "effects"
t.integer "treatment_id"
t.datetime "created_at", precision: 6, null: false
t.datetime "updated_at", precision: 6, null: false

Patient.new(name: 'Taryn', dob: '09-19-1990', gender: 'female', factors: 'none', effects: 'none', treatment_id: 1 )

Treatment.create(name: "Treatment B", description: "Investigational Product")
Treatment.create(name: "Treatment A", description: "Placebo") 