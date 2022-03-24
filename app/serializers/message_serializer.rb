class MessageSerializer < ActiveModel::Serializer
  attributes :id, :content, :user_id, :conversation_id
  has_one :user
  has_one :conversation 
end
