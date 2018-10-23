module UserRemote
    def get_token(options)
        response = HTTParty.post('http://localhost:3000/login', options)
        if ( response.code == 200 )
            out = JSON.parse response.body
            out['token']
        end
    end

    def task_id
      response_create = HTTParty.post('http://localhost:3000/api/v1/todos', { body: {description: "Task test"}.to_json, headers: headers_auth })
      todo_response_create = JSON.parse(response_create.body)
      todo_response_create['id']
    end
end