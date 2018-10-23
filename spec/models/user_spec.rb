require 'rails_helper'

RSpec.describe User, type: :model do
  
  it 'has a valid user' do
    expect(create(:user)).to be_valid
  end

  context 'Validations' do
    it { is_expected.to validate_presence_of :email }
    it { is_expected.to validate_presence_of :username }
    it { is_expected.to validate_uniqueness_of :email }
  end

  context 'Associations' do
    it { is_expected.to have_many(:todos) }
  end

  context 'Methods' do 
    it '#invalidate_token' do
      user = create(:user)
      user.invalidate_token
      expect(user.auth_token).to be_nil
    end

    it '.validate_login' do
      user = create(:user)
      expect(User.validate_login(user.username, user.password)).to eq(user)
    end
  end



end
