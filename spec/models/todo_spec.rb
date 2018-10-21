require 'rails_helper'

RSpec.describe Todo, type: :model do

  context 'Validades' do
    it { is_expected.to validate_presence_of(:description) }
    # it { is_expected.to validate_presence_of(:done) }
  end

end
