class Todo < ActiveRecord::Migration[5.2]
  def change
    add_column :todos, :deleted_at, :datetime
    add_index :todos, :deleted_at
  end
end
