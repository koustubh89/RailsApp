require 'rails_helper'
describe Api::CalculatorController do
  # let (:user){
  #   @user = User.create({:email => "test@usr.com", :encrypted_password => "12345678"})
  #   sign_in :user, user
  # }

  it "response to be 200 on post call" do
    user = User.create({:email => "test@usr.com", :encrypted_password => "12345678"})
    sign_in :user, user
    allow(controller).to receive(:current_user) {user}
  	post :create
  	expect(response.status).to eq(201)
  end

  it "response to be 201 on put on update" do 
    user = User.create({:email => "test@usr.com", :encrypted_password => "12345678"})
    sign_in :user, user
    allow(controller).to receive(:current_user) {user}
 	  Calculator.create(state: 0)
  	put :update ,:command => "add 5"
  	expect(response.status).to eq(200)
  	expect(response.body).to eq({ :state => 5.0}.to_json)
  end

   it "response to be 404 on put on update if no calculator exixts" do 
    user = User.create({:email => "test@usr.com", :encrypted_password => "12345678"})
    sign_in :user, user
    allow(controller).to receive(:current_user) {user}
    calcultor=Calculator.create(:state=>0,:user_id=>user)
    allow(user).to receive(:calcultor) {calcultor}
  	put :update ,:command => "add 5"
  	expect(response.status).to eq(404)
  end

  it "should check if the calcultor is created" do
    user = User.create({:email => "test@usr.com", :encrypted_password => "12345678"})
    sign_in :user, user
    allow(controller).to receive(:current_user) {user}
    post :create
    expect(response.status).to eq(201)
    expect(Calculator.count).to eq(1)
  end

  it "should check if the calcultor is not created" do
    user = User.create({:email => "test@usr.com", :encrypted_password => "12345678"})
    sign_in :user, user
    allow(controller).to receive(:current_user) {user}
    # not creating a calculator and making the call to update
    put :update ,:command => "add 5"
    expect(response.status).to eq(404)
  end

end