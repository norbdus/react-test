module Api
  module V1
    class TodosController < ApiController
      before_action :require_login

      def index
        render json: current_user.todos
      end

      def create
        todo = Todo.new(todo_params)
        todo.user = current_user
        todo.save
        render json: todo
      end

      def destroy
        begin
        if Todo.destroy(params[:id])
          render json: {
              "message": 'ok'
          }
        end
        rescue Exception => e
          render json: {
              "message": 'error',
              "error": e.message
          }
        end
      end

      def update
        todo = Todo.find(params[:id])
        todo.update_attributes(todo_params)
        render json: todo
      end

      def done_task
        todo = Todo.find(params[:todo_id])
        todo.done_toggle
        render json: todo
      end

      private

      def todo_params
        params.require(:todo).permit(:id, :description, :done)
      end

    end
  end
end

