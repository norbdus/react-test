class Todo < ApplicationRecord
 acts_as_paranoid
 belongs_to :user
 validates :description, presence: true

    def done_toggle
        self.done = !self.done unless self.done.nil?
        self.save!
    end

end
