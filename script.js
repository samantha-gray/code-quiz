console.log("Start Programs");

var question_list = [
    {
        title: "Commonly used data types DO NOT include",
        duration: 20,
        answer_num: 1,
        answer_list: [
            "strings",
            "booleans",
            "shorts",
            "numbers"
        ]
    },
    {
        title: "The condition in an if / else statement is enclosed within ____",
        duration: 15,
        answer_num: 1,
        answer_list: [
            "quotes",
            "brackets",
            "parenthesis",
            "square parenthesis"
        ]
    },
    {
        title: "Arrays in Javascript can be used to store _____",
        duration: 30,
        answer_num: 1,
        answer_list: [
            "numbers and strings",
            "other array",
            "boleans",
            "all of the above"
        ]
    }
];


var high_score_list = [];
var high_score = 0;

var current_time = 0;

function resetQuiz() {
    // show start screen
    var start_div = document.getElementById("start-screen");
    start_div.style.display = "block";

    // hide question
    var question_div = document.getElementById("question-container");
    question_div.style.display = "none";

    // hide all done page
    var all_done_div = document.getElementById("all-done");
    all_done_div.style.display = "none";

    // hide high score page
    var high_score_div = document.getElementById("high-score");
    high_score_div.style.display = "none";

    // set time to 0
    var time_ele = document.getElementById("time");
    time_ele.innerText = "Time: 0";
}

resetQuiz();

var timer = undefined;
var total_duration = 0;
var current_question_num = 0;

function starQuiz() {
    // show start screen
    var start_div = document.getElementById("start-screen");
    start_div.style.display = "none";

    // hide question
    var question_div = document.getElementById("question-container");
    question_div.style.display = "block";

    // calculate total time
    var time_ele = document.getElementById("time");
    

    total_duration = 0;
    question_list.forEach(function(item, index, array) {
        total_duration += item.duration;
    });

    time_ele.innerText = "Time: " + total_duration;    

    if( timer )
        clearInterval(timer);

    timer = setInterval(function(){
        if( total_duration < 0 )
            total_duration = 0;

        time_ele.innerText = "Time: " + total_duration;
        total_duration--;
        if( total_duration < 0 )
            gameOver();
    }, 1000);

    current_question_num = 0;
    displayQuestion(current_question_num);
}


function gameOver() {
    console.log("gameOver");
    if( timer )
        clearInterval(timer);
    timer = undefined;

    // hide question
    var question_div = document.getElementById("question-container");
    question_div.style.display = "none";

    // show all done page
    var all_done_div = document.getElementById("all-done");
    all_done_div.style.display = "block";

    var score = total_duration;
    if( score < 0 )
        score = 0;
    var score_p = document.getElementById("score");
    score_p.innerText = "Your final score is " + score;

    var player = document.getElementById("player");
    player.value = "";
}

function displayQuestion(num) {
    if( num >= question_list.length ) //  all question are answered
    {
        gameOver();
        return;
    }

    // display title
    var question = question_list[num];
    var title_div = document.getElementById("question_title");
    title_div.innerText = question.title;

    // display answers
    var answer_div = document.getElementById("answer_list");
    var answer_html = "<ol>";
    question.answer_list.forEach(function(item, index, array) {
        answer_html += '<li onclick="selectAsnwer(' + index + ')">' + item + "</li>";
    });
    answer_html += "</ol>";

    answer_div.innerHTML = answer_html;

    // hide result
    var result_div = document.getElementById("result-div");
    result_div.style.display = "none";
}

function selectAsnwer(index) {
    console.log(current_question_num, index);
    var question = question_list[current_question_num];

    var result_msg = "";
    total_duration++;
    if( question.answer_num == index )  // Correct
    {
        result_msg = "Correct!";
    }
    else    // Incorrect
    {
        result_msg = "Wrong!";
        // decrease current duration
        total_duration -= question.duration;
    }

    var result_div = document.getElementById("result-div");
    result_div.style.display = "block";
    
    var result_p = document.getElementById("result");
    result_p.innerText = result_msg;

    setTimeout(function() {
        console.log("Next Problem");
        current_question_num++;
        displayQuestion(current_question_num);
    }, 1000);

}

function onInputPlayer() {
    var player = document.getElementById("player");
    var player_name = player.value;

    if( !player_name )
    {
        alert("Please input player name");
        return;
    }

    var score = total_duration;
    if( score < 0 )
        score = 0;

    console.log("Player Name", player_name, "Score", score);

    high_score_list.push( {name: player_name, score: score});
    displayHighScore();
}

function goBack() {
    resetQuiz();
}

function clearHighscores() {
    high_score_list = [];    
    displayHighScore();
}

function displayHighScore() {
    // hide all done page
    var all_done_div = document.getElementById("all-done");
    all_done_div.style.display = "none";

    // hide high score page
    var high_score_div = document.getElementById("high-score");
    high_score_div.style.display = "block";

    // sort score
    high_score_list.sort(function(a, b) {
        return a.score > b.score ? -1 : 1;
    });

    var score_list_html = "<ol>";
    high_score_list.forEach(function(item, index, array) {
        score_list_html += "<li>" + item.name + " - " + item.score + "</li>";
    });

    score_list_html += "</ol>";;

    var player_list_div = document.getElementById("player-list");
    player_list_div.innerHTML = score_list_html;
}