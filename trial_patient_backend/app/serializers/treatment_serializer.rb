class TreatmentSerializer < ActiveModel::Serializer
  attributes :id, :name
  has_many :patients
end
