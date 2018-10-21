describe 'HTTParty' do
    it 'HTTParty' do
        response = HTTParty.get('http://localhost:3000/api/v1/todos')
        content_type = response.headers['content-type']
        expect(content_type).to match(/application\/json/)
    end
end