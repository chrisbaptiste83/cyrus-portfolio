# frozen_string_literal: true

require 'rails_helper'

RSpec.describe AdminUser, type: :model do
  describe 'Devise modules' do
    it 'includes database_authenticatable' do
      expect(AdminUser.devise_modules).to include(:database_authenticatable)
    end

    it 'includes recoverable' do
      expect(AdminUser.devise_modules).to include(:recoverable)
    end

    it 'includes rememberable' do
      expect(AdminUser.devise_modules).to include(:rememberable)
    end

    it 'includes validatable' do
      expect(AdminUser.devise_modules).to include(:validatable)
    end
  end

  describe 'validations' do
    it { should validate_presence_of(:email) }
    it { should validate_presence_of(:password) }
  end

  describe 'factory' do
    it 'creates a valid admin user' do
      admin = build(:admin_user)
      expect(admin).to be_valid
    end

    it 'creates admin user with unique email' do
      admin1 = create(:admin_user)
      admin2 = build(:admin_user, email: admin1.email)
      expect(admin2).not_to be_valid
    end
  end

  describe '.ransackable_attributes' do
    it 'returns searchable attributes' do
      expected = %w[created_at email id updated_at]
      expect(AdminUser.ransackable_attributes).to match_array(expected)
    end
  end
end
