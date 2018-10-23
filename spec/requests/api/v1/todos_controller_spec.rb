require 'rails_helper'

RSpec.describe Api::V1::TodosController, type: :controller do


  let(:headers) do
    {
        'Content-Type' => 'application/json',
    }
  end
  let(:headers_auth) do
    {
        'Content-Type' => 'application/json',
        'Authorization' => "Token #{@token}"
    }
  end
  let(:options) { {body: {username: 'norbdus', password: '12345678'}.to_json, headers: headers } }
  # let(:url)

  it '#index responds a 401 response (not autorized)' do
    response = HTTParty.get('http://localhost:3000/api/v1/todos', headers: headers)
    expect(response.code).to eq(401)
  end

  it '#index without authentication' do
    response = HTTParty.get('http://localhost:3000/api/v1/todos', headers: headers)
    expect(response.code).to eq(401)
    expect(response.body).to include_json({'erros':[{'detail':'Access denied'}]})
  end

  describe 'as Valid Token' do
    before do
      @token = get_token(options)
    end

    it '#index include valid response' do
      # user = User.first
      response = HTTParty.get('http://localhost:3000/api/v1/todos', headers: headers_auth)
      expect(response.code).to eq(200)
      expect(response.body).to include_json([
                                                id: /\d/,
                                                description: (be_kind_of String),
                                                done: (be_in([true, false]))
      ])
    end

    it '#create if return valid token' do
      response = HTTParty.post('http://localhost:3000/api/v1/todos', { body: {description: "Task test"}.to_json, headers: headers_auth })
      expect(response.code).to eq(200)
      todo_response = JSON.parse(response.body)
      expect(todo_response['description']).to eq('Task test')
    end

    it '#destroy with authentication' do
      response = HTTParty.delete("http://localhost:3000/api/v1/todos/#{task_id}", headers: headers_auth)
      expect(response.code).to eq(200)
      todo_response = JSON.parse(response.body)
      expect(todo_response['message']).to eq('ok')
    end

    it '#update with authentication' do
      response = HTTParty.patch("http://localhost:3000/api/v1/todos/#{task_id}", { body: {description: "Task MODIFIED"}.to_json, headers: headers_auth })
      expect(response.code).to eq(200)
      todo_response = JSON.parse(response.body)
      expect(todo_response['description']).to eq('Task MODIFIED')
    end

    it '#done_task with authentication' do
      response = HTTParty.post("http://localhost:3000/api/v1/todos/#{task_id}/done_task", { headers: headers_auth })
      expect(response.code).to eq(200)
      todo_response = JSON.parse(response.body)
      expect(todo_response['done']).to be true
    end
  end

end
