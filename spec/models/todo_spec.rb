require 'rails_helper'

RSpec.describe Todo, type: :model do

  context 'Validades' do
    it { is_expected.to validate_presence_of(:description) }
    it { is_expected.to validate_presence_of(:user_id) }
    it { is_expected.to act_as_paranoid }
  end

  context 'Associations' do
    it { is_expected.to belong_to(:user) }
  end

  context 'Methods' do 
    it '#done_toggle' do
      task = create(:task)
      status_anterior = task.done
      task.done_toggle
      expect(task.done).to eq(!status_anterior)
    end
  end

end
