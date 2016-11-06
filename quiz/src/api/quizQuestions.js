const request = require('request');
// var quizQuestions = [
//   {
//       question: "What franchise would you rather play a game from?",
//       answers: [
//           {
//             points: "1",
//               type: "null",
//               content: "Halo"
//           },
//           {
//               points: "0",
//               type: "null",
//               content: "Pokemon"
//           },
//           {
//               points: "0",
//               type: "null",
//               content: "Uncharted"
//           }
//       ]
//   },
//   {
//       question: "Which console would you prefer to play with friends?",
//       answers: [
//           {
//               points: "0",
//               type: "Microsoft",
//               content: "X-Box"
//           },
//           {
//               points: "0",
//               type: "Nintendo",
//               content: "Nintendo 64"
//           },
//           {
//               points: "0",
//               type: "Sony",
//               content: "Playstation 1"
//           }
//       ]
//   },
//   {
//       question: "Which of these racing franchises would you prefer to play a game from?",
//       answers: [
//           {
//               points: "0",
//               type: "Microsoft",
//               content: "Forza"
//           },
//           {
//               points: "0",
//               type: "Nintendo",
//               content: "Mario Kart"
//           },
//           {
//               points: "0",
//               type: "Sony",
//               content: "Gran Turismo"
//           }
//       ]
//   },
//   {
//       question: "Which of these games do you think is best?",
//       answers: [
//           {
//               points: "0",
//               type: "Microsoft",
//               content: "BioShock"
//           },
//           {
//               points: "0",
//               type: "Nintendo",
//               content: "The Legend of Zelda: Ocarina of Time"
//           },
//           {
//               points: "0",
//               type: "Sony",
//               content: "Final Fantasy VII"
//           }
//       ]
//   },
//   {
//       question: "What console would you prefer to own?",
//       answers: [
//           {
//               points: "0",
//               type: "Microsoft",
//               content: "X-Box One"
//           },
//           {
//               points: "0",
//               type: "Nintendo",
//               content: "Wii U"
//           },
//           {
//               points: "0",
//               type: "Sony",
//               content: "Playstation 4"
//           }
//       ]
//   }
// ];
var quizQuestions = function (userId, callback){
  // var xmlHttp = new XMLHttpRequest();
  var url = "http://localhost:9000/questions?_id=" + userId;

  request(url, {withCredentials: false}, function(error, response, body) {
    if (!error && response.statusCode == 200){
      console.log(body);
    }
  })

  // xmlHttp.open("GET", "http://localhost:9000/questions?_id=" + userId, true);
  // xmlHttp.addEventListener("load", callback, false);
  // xmlHttp.send(null);
}

export default quizQuestions;
