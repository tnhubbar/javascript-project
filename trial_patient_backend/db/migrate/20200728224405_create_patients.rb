class CreatePatients < ActiveRecord::Migration[6.0]
  def change
    create_table :patients do |t|
      t.string :name
      t.string :dob
      t.string :gender
      t.text :factors
      t.text :effects
      t.belongs_to :treatment

      t.timestamps
    end
  end
end
