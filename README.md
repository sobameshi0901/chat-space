# README


Datebase creation


## usersテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null: false|add_index|
|mail|string|null: false||

### Association
- has_many :members
- has_many :messages
- has_many :groups, through: :members

## groupテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null: false|

### Association
- has_many :members
- has_many :messages
- has_many :users, through: :members

## membersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true, add_index|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user

## messageテーブル
|Column|Type|Options|
|------|----|-------|
|content|string||
|image|text||
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|


### Association
- belongs_to :group
- belongs_to :user







