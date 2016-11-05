import { Meteor } from 'meteor/meteor';

if(Meteor.isServer) {
   // When Meteor starts, create new collection in Mongo if not exists.
    Meteor.startup(function () {
        User = new Meteor.Collection('user');
    });

// GET /user - returns every message from MongoDB collection.
Router.route('/questions', {where: 'server'})
    .get(function() {
      var data = {"_id" : this.params.query._id};
      if(this.params.query._id !== undefined) {
        // var response = User.find(data).fetch().questions;
        // var doc = User.find({"questions" : {$elemMatch: data }}, {"questions.$": 1, _id: 0}).fetch();
        var doc = User.aggregate(
            {"$unwind": "$questions"},
            {"$match": {"questions._id" : this.params.query._id}},
            {"$project" : {"questions" : 1}}
        );
        var response = doc[0].questions;
        this.response.setHeader('Content-Type','application/json');
        this.response.end(JSON.stringify(response));
      } else {
        response = {
          "error" : true,
          "message" : "No existing questions"
        }
        this.response.setHeader('Content-Type','application/json');
        this.response.end(JSON.stringify(response));
      }
    })
    .post(function() {
      var response;
      var request = this.request.body;
      var isset = request.text !== undefined && request.options !== undefined && request.answer !== undefined;
      var validArray = request.options.length > 1 && request.options.includes(request.answer)
      if(!isset || !validArray) { //If post variables are not well-formed
        response = {
            "error" : true,
            "message" : "invalid data"
        };
      } else { //Input is ok. Post to db
        var data = {
          "_id" : new Mongo.ObjectID()["_str"],
          "text" : request.text,
          "options" : request.options,
          "answer" : request.answer,
          "new" : true
        }
        if(User.update({_id : request._id}, {$push : {questions: data} }) === 1) { //Push questions to the user
          response = {
              "error" : false,
              "message" : "question added"
          };
        } else {
          response = {
              "error" : true,
              "message" : "cannot insert"
          };
        }
      }
      this.response.setHeader('Content-Type','application/json');
      this.response.end(JSON.stringify(response));
    });
Router.route('/scores',{where: 'server'})
    .get(function(){
        var response = Score.find().fetch();
        this.response.setHeader('Content-Type','application/json');
        this.response.end(JSON.stringify(response));
    })
    .post(function(){
        var response;
        if(this.request.body.time === undefined || this.request.body.date === undefined || this.body.score === undefined) { //*TODO* Fill out wh
            response = {
                "error" : true,
                "message" : "invalid data"
            };
        } else {
            Score.insert({
                time : this.request.body.time,
                date : this.request.body.date,
                score: this.request.body.score
            });
            response = {
                "error" : false,
                "message" : "Score added."
            }
        }
        this.response.setHeader('Content-Type','application/json');
        this.response.end(JSON.stringify(response));
    });

Router.route('/users',{where: 'server'})
    .get(function(){
        var response = User.find().fetch();
        this.response.setHeader('Content-Type','application/json');
        this.response.end(JSON.stringify(response));
    })

  // POST /message - {message as post data}
  // Add new message in MongoDB collection.

    .post(function(){
        var response;
        if(this.request.body.username === undefined || this.request.body.password === undefined) {
            response = {
                "error" : true,
                "message" : "invalid data"
            };
        } else {
            User.insert({
                _id : ObjectId(),
                username : this.request.body.username,
                password : this.request.body.password,
                scores: [],
                questions: []
            });
            response = {
                "error" : false,
                "message" : "User added."
            }
        }
        this.response.setHeader('Content-Type','application/json');
        this.response.end(JSON.stringify(response));
    });

Router.route('/users/:id',{where: 'server'})

    // GET /message/:id - returns specific records

    .get(function(){
        var response;
        if(this.params.id !== undefined) {
            var data = User.find({_id : this.params.id}).fetch();
            if(data.length > 0) {
                response = data
            } else {
                response = {
                    "error" : true,
                    "message" : "User not found."
                }
            }
        }
        this.response.setHeader('Content-Type','application/json');
        this.response.end(JSON.stringify(response));
    })

    // PUT /message/:id {message as put data}- update specific records.

    .put(function(){
        var response;
        if(this.params.id !== undefined) {
            var data = User.find({_id : this.params.id}).fetch();
            if(data.length > 0) {
                if(User.update({_id : data[0]._id},{$set : {username : this.request.body.username,password : this.request.body.password, scores: this.request.body.scores, questions: this.request.body.questions}}) === 1) {
                    response = {
                        "error" : false,
                        "message" : "User information updated."
                    }
                } else {
                    response = {
                        "error" : true,
                        "message" : "User information not updated."
                    }
                }
            } else {
                response = {
                    "error" : true,
                    "message" : "User not found."
                }
            }
        }
        this.response.setHeader('Content-Type','application/json');
        this.response.end(JSON.stringify(response));
    })

    // DELETE /message/:id delete specific record.

    .delete(function(){
        var response;
        if(this.params.id !== undefined) {
            var data = User.find({_id : this.params.id}).fetch();
            if(data.length >  0) {
                if(User.remove(data[0]._id) === 1) {
                    response = {
                        "error" : false,
                        "message" : "User deleted."
                    }
                } else {
                    response = {
                        "error" : true,
                        "message" : "User not deleted."
                    }
                }
            } else {
                response = {
                    "error" : true,
                    "message" : "User not found."
                }
            }
        }
        this.response.setHeader('Content-Type','application/json');
        this.response.end(JSON.stringify(response));
    });
  }
