require 'rails_helper'

RSpec.describe Todo, type: :model do

  context 'Validades' do
    it { is_expected.to validate_presence_of(:description) }
    it '#done_toggle' do
      task = create(:task)
      status_anterior = task.done
      task.done_toggle
      expect(task.done).to eq(!status_anterior)
    end
  end

end
