class CreateTodos < ActiveRecord::Migration[5.2]
  def change
    create_table :todos do |t|
      t.string :description
      t.boolean :done, default: false

      t.timestamps
    end
  end
end
