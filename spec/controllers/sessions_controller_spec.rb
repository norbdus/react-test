require 'rails_helper'

RSpec.describe SessionsController, type: :controller do


    let(:options) { {body: {username: "norbdus", password: "12345678"}.to_json,
                     headers: {'Content-Type' => 'application/json'} } }


    it '#login' do
        response = HTTParty.post('http://localhost:3000/login', options)
        expect(response.code).to eq(200)
        out = JSON.parse response.body
        expect(response.body).to include_json(
            {
                token: (be_kind_of String)
            }
        )
    end

end
