require 'rails_helper'

describe Message do
  describe '#create' do
    context 'can save' do
      it "is valid with content" do
        message = build(:message, image: nil)
        expect(message).to  be_valid
      end

      it "is valid with a image" do
        message = build(:message, content: nil)
        expect(message).to be_valid
      end

      it "is valid with content and image" do
        message = build(:message)
        expect(message).to be_valid
      end
    end

    context "can't save" do
      it "is invalid without content and image" do
        message = build(:message, content: nil, image: nil)
        message.valid?
        expect(message.errors[:content_or_image][0]).to include('入力してください')
      end

      it "is invalid without user_id" do
        message = build(:message, user_id: nil)
        message.valid?
        expect(message.errors[:user][0]).to include("入力してください")
      end

      it "is invalid without group_id" do
        message = build(:message, group_id: "")
        message.valid?
        expect(message.errors[:group][0]).to include("入力してください")
      end
    end
  end
end