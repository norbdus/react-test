FactoryBot.define do
    factory :todo, aliases: [:task] do
        description { Faker::Beer.name }
        done { Faker::Boolean.boolean }
        user
    end
end