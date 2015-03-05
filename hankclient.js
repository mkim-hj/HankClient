if (Meteor.isClient) {
  // counter starts at 0

  Session.set("hide", true);

  Template.body.helpers({
    getDigits: function() {
      return Session.get("digits");
    },
    getHits: function() {
      return Session.get("hits");
    },
    getMisses: function() {
      return Session.get("misses");
    },
    getIslands: function() {
      return Session.get("islands");
    },
    hide: function() {
      return Session.get("hide");
    }
  });

  Template.body.events({
    'submit #cal-card-info': function(event) {
      event.preventDefault();
      var digits = $('input.digits').val();
      console.log(digits);

      var CardObject = Parse.Object.extend("CardObject");
      var query = new Parse.Query(CardObject);
      query.equalTo("digits", digits);

      query.find({
        success: function(results) {
          console.log("Successfully retrieved " + results.length + " scores.");
          // Do something with the returned Parse.Object values
          if (results.length == 1) {
            var user = results[0];

            Session.set("digits", user.attributes.digits);
            Session.set("hits", user.attributes.hits);
            Session.set("misses", user.attributes.misses);
            Session.set("islands", user.attributes.islands);
            Session.set("hide", false);
          } else {
            alert("More than 2 results");
          }
        },
        error: function(error) {
          alert("Error: " + error.code + " " + error.message);
        }
      });
    }
  })
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
