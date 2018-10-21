require 'rails_helper'

RSpec.describe Api::V1::TodosController, type: :controller do

    it '#index responds a 302 response (not autorized)' do
        get :index
        expect(response).to have_http_status(302)
    end

    describe 'as Logged Member' do
        before do
            @user = create(:user)
            sign_in @user
        end
        it '#index authentication devise' do
            get :index
            expect(response).to have_http_status(200)
        end
    
        it '#create with authentication' do
            task_attributes = attributes_for(:task)
            expect {
            post :create, params: { todo: task_attributes }
            }.to change(Todo, :count).by(1)
        end
    
        it '#destroy with authentication' do
            task = create(:task)
            expect {
                delete :destroy, params: { id: task.id }
            }.to change(Todo, :count).by(-1)
        end

        it '#update with authentication' do
            
        end
    end
    
end
