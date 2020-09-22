const user = {
  user: 'graphql_user',
  pwd: 'graphql_user',
  roles: [{
    role: 'readWrite',
    db: 'chat_app'
  }]
};

db.createUser(user);

db.chat.insert({ user: 'funawo1', body: "test1", postedAt: "2020-09-01"})
db.chat.insert({ user: 'funawo2', body: "test2", postedAt: "2020-09-02"})
db.chat.insert({ user: 'funawo3', body: "test3", postedAt: "2020-09-03"})
db.chat.insert({ user: 'funawo4', body: "test4", postedAt: "2020-09-04"})
db.chat.insert({ user: 'funawo5', body: "test5", postedAt: "2020-09-05"})
db.chat.insert({ user: 'funawo6', body: "test6", postedAt: "2020-09-06"})
db.chat.insert({ user: 'funawo7', body: "test7", postedAt: "2020-09-07"})
db.chat.insert({ user: 'funawo8', body: "test8", postedAt: "2020-09-010"})
db.chat.insert({ user: 'funawo9', body: "test9", postedAt: "2020-09-011"})
