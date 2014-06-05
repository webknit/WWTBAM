/* - BASE HTML TEMPLATE
------------------------------------------------- 
	Description: JS Scripts
	Author:Shane Prendergast
	Author URL:http://www.webknit.co.uk
	Template URL:http://base.webknit.co.uk/
*/

// JS EXAMPLE

var WWTBAM = WWTBAM || {};

WWTBAM.Game = function()
{	
	// Here's our array of questions in the following format :
	// [question, potential answers, answer, money]
	questions = [
	 ['Complete this phrase. As sick as a...',['Penguin','Parrot','Puffin','Partridge'] ,'Parrot', 0],
	 ["Which legal document states a person's wishes regarding the disposal of their property after death?",['Will','Shall','Would','Should'] ,'Will', 100],
	 ['Complete the title of the James Bond film The Man With The Golden...',['Gun','Tooth','Delicious','Eagle'] ,'Gun', 200],
	 ['Which of these fruits shares its name with something superior or desirable?',['Apricot','Mango','Grapefruit','Plum'] ,'Plum', 300],
	 ['In which sport do two teams pull at the opposite ends of a rope?',['Ice hockey','Basketball','Tug of war','Polo'] ,'Tug of war', 500],
	 ['Where would a cowboy wear his chaps?',['On his hands','On his arms','On his legs','On his head'] ,'On his legs', 1000],
	 ['Which of these zodiac signs is not represented by an animal that grows horns?',['Taurus','Capricorn','Aquarius','Aries'] ,'Aquarius', 2000],
	 ['Sherpas and Gurkhas are native to which country?',['Russia','Ecuador','Nepal','Morocco'] ,'Nepal', 4000],
	 ['Prime Minister Tony Blair was born in which country?',['England','Northern Ireland','Scotland','Wales'] ,'Scotland', 8000],
	 ['Whose autobiography has the title, "A Long Walk to Freedom"?',['Ranulph Fiennes','Mother Teresa','Nelson Mandela','Mikhail Gorbachev'] ,'Nelson Mandela', 16000],
	 ['Duffel coats are named after a town in which country?',['Belgium','Holland','Germany','Austria'] ,'Belgium', 32000],
	 ["Complete this stage instruction in Shakespeare's 'The Winter's Tale', 'Exit, pursued by a...'?",['Tiger','Clown','Bear','Dog'] ,'Bear', 64000],
	 ["The young of which creature is known as a 'squab'?",['Salmon','Horse','Pigeon','Octopus'] ,'Pigeon', 125000],
	 ['Who is the patron saint of Spain?',['Saint James','Saint John','Saint Benedict','Saint Peter'] ,'Saint John', 150000],
	 ['Which king was married to Eleanor of Aquitaine?',['Henry I','Henry II','Richard I','Henry V'] ,'Henry II', 1000000]
	];
	
	// Here are out variables
	// This will store the correct answer each time a question is asked
	var correctAnswer;
	// This is to output the question in the HTML
	var questionBox = $('.question');
	// Output the question number in here
	var questionNumber = $('.question-number');
	// This is the answers box, so we can output them inside
	var answers = $('.answers');
	// Restart button for if they go bust
	var restart = $('.restart');
	// This will show the amount of funds a player has
	var bank = $('.bank');
	
	// This is our question counter so we can go through each
	Qnum = -1;
	
	// These are the functions we call initially
	function init()
	{
		// We start off by calling the nextQuestion() function to start the quiz	
		nextQuestion();
		
		// If the restart button is clicked then we call the reStart() function
		restart.click(reStart);

	}
	
	// Here's our starting point, it's also the place we will come back to when we want to ask the next question
	function nextQuestion() {
	
		// Starting the question number off at 0, as arrays start at 0
		// If we're coming here for a second time it's going to add one onto the previous number 
		// so the 2nd time this function is called the Qnum would be 1 therefore asking the 2nd question from the array
		Qnum = Qnum + 1;
		
		// Find out the total length of the questions, we need to know when to stop
		var total = questions.length;
		
		// If the question number is lower than the total then we can ask that question
		if(Qnum < total) {
		
			// Ask the question and pass the question number onto the function
			askQuestion(Qnum);
			
		}
		
		// If they've answered every question then lucky them - they're a millionaire
		else {
			
			// Change balance to a million
			bank.html("Balance : £1m");
			// We don't want to see a question so outputting a message instead
			questionBox.html("You're a millionaire");
			// We don't want to see any answers here
			answers.hide();
			// We don't want to see a reset button here
			restart.show();
			// We don't want to see the question number here
			questionNumber.hide();
			
		}
				
	}
	
	// This outputs the question so the user can answer notice the counterNum which gives us the correct question from the array
	function askQuestion(counterNum) {
		
		// Take the question from the array and output it into $('.question')
		// Notice the [][], I'm accessing the [1st element in the questions array] and [first thing inside that 1st element] 
		questionBox.html(questions[counterNum][0]);
		
		questionNumber.html('Question number ' + (counterNum + 1));
		
		// Clear the answers box
		$('.answers').empty();
		
		// Output the answers also incuding a data attribute which contains the answer
		// Remove any whitesapce from the answers
		answers.append('<li data-answer=' + questions[counterNum][1][0].replace(/ /g,'') + '>' + questions[counterNum][1][0] + '</li>');
		answers.append('<li data-answer=' + questions[counterNum][1][1].replace(/ /g,'') + '>' + questions[counterNum][1][1] + '</li>');
		answers.append('<li data-answer=' + questions[counterNum][1][2].replace(/ /g,'') + '>' + questions[counterNum][1][2] + '</li>');
		answers.append('<li data-answer=' + questions[counterNum][1][3].replace(/ /g,'') + '>' + questions[counterNum][1][3] + '</li>');
		
		// Taking the 4th element from the array(money) and outputting it
		bank.html("Balance : £" + questions[counterNum][3]);
		
		// Taking the answer from the array and storing it in global variable
		correctAnswer = questions[counterNum][2];
		
		console.log("Answer is " + correctAnswer);
		
		// Remove spaces and change to lowercase
		correctAnswer = correctAnswer.replace(/ /g,'').toLowerCase();
		
		// Once they click an answer we call the answerQuestion function 
		$('.answers li').on('click', answerQuestion);
		
	}
	
	// This function detects if they answered correctly
	function answerQuestion() {
	
		// Unbind the answer button
		$('.answers li').off();
		
		// Take the data attribute form the answer the user clicked and remove spaces and change to lowercase
		var UserAnswer = $(this).data('answer').replace(/ /g,'').toLowerCase();
		
		// Does the answer match the correct answer we stored in the variable?
		if (UserAnswer == correctAnswer) {
		
			// If it does then ask the next question
			nextQuestion();
			
		}
		
		// If it doesn't then they have lost and we need to reset the game
		else {
		
			// Tell them they've lost
			questionBox.html("Sorry you've lost your money");
			// Reset the bank balance
			bank.html("Balance : £0");
			// We don't want to see any answers here
			answers.hide();
			// We do want to see a reset button here
			restart.show();
			// We don't want to see the question number here
			questionNumber.hide();
		}
				
	}
	
	// If they player fails the game they need to restart with this function
	function reStart() {
		
		// Reset the Qnum back to the beginning
		Qnum = -1;
		// Start the quiz off just as we did at the start calling the nextQuestion() function
		nextQuestion();
		// We need to see the answers again
		answers.show();
		// We don't want to see a reset button here 
		restart.hide();
		// We do want to see the question number here
		questionNumber.show();
		
	}

	init();
};


// ON DOC READY
$(function()
{	
	new WWTBAM.Game();
	
});

