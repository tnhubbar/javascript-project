class PatientSerializer < ActiveModel::Serializer
  attributes :id, :name, :dob, :gender, :effects, :factors
  belongs_to :treatment
end
