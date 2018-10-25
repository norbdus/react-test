module UserRemote
    def get_token(options)
        response = HTTParty.post("#{url_remote}/login", options)
        if ( response.code == 200 )
            out = JSON.parse response.body
            out['token']
        end
    end

    def task_id
      response_create = HTTParty.post("#{url_remote}/api/v1/todos", { body: {description: "Task test"}.to_json, headers: headers_auth })
      todo_response_create = JSON.parse(response_create.body)
      todo_response_create['id']
    end

    def url_remote
        sleep(5)
        'https://tasks-manager-vitorio.herokuapp.com'
    end
end