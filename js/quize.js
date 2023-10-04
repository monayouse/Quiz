import { Setting } from "./setting.js";

export class Quiz {
    constructor(response) {
        
        this.qusetions = response;
        this.currentQuestion = 0;
      
        this.totalNumOfQuestions = this.qusetions.length;
        this.showQuestion()
        document.getElementById('next').addEventListener('click', this.nextQuestion.bind(this));
        this.score = 0;
        document.getElementById('tryBtn').addEventListener('click',()=>{
            this.tryAgain()
        })
        
    }

    shuffle(array) {
        let currentIndex = array.length, randomIndex; //3

        // While there remain elements to shuffle.
        while (currentIndex != 0) {

            // Pick a remaining element.
            randomIndex = Math.floor(Math.random() * currentIndex); // 0=>0.9999999 * 3 =2.999999 
            currentIndex--; //1

            // And swap it with the current element.
            [array[currentIndex], array[randomIndex]] = [
                array[randomIndex], array[currentIndex]];
        }

    }

    showQuestion() {
        document.getElementById('currentQuestion').innerHTML = this.currentQuestion + 1;
        document.getElementById('totalNumberOfQuestions').innerHTML = this.totalNumOfQuestions;
        document.getElementById('question').innerHTML = this.qusetions[this.currentQuestion].question;
        let correct = this.qusetions[0].correct_answer;
        let all = [correct, ...this.qusetions[this.currentQuestion].incorrect_answers]
       
        this.shuffle(all)
        console.log(all);
        let cartona = ``;
        for (let i = 0; i < all.length; i++) {
            cartona += ` <div class="form-check">
                                <label class="form-check-label">
                                    <input type="radio" class="form-check-input" name="answer" id="" value="${all[i]}" >
                                    ${all[i]}
                                </label>
                             </div>`
        }
      
        document.querySelector('.allAnswer').innerHTML = cartona;

    }

    nextQuestion() {


        let correctAnswer = this.qusetions[0].correct_answer;
        let answerInputs = document.getElementsByName('answer');
        let userAnswerElement = Array.from(answerInputs).find(value => value.checked);

        if (userAnswerElement != undefined) {
            
            $('#alert').fadeOut(500);
            let userAnswer = userAnswerElement.value;
            this.checkCorrectAnswer(userAnswer, correctAnswer)
          
            this.currentQuestion++;
            if (this.currentQuestion < this.totalNumOfQuestions) {

                this.showQuestion()
            }
            else {
                $('#quiz').fadeOut(500);
                $('#finish').fadeIn(500);
                document.getElementById('score').innerHTML = this.score;
            }

        }
        else {

            $('#alert').fadeIn(500);
        }




    }
    checkCorrectAnswer(userAnswer, correctAnswer) {
        if (userAnswer === correctAnswer) {
            this.score++;
            $('#Correct').fadeIn(500).fadeOut(500);
            
        }
        else {

            $('#inCorrect').fadeIn(500).fadeOut(500);
        }
    }


    tryAgain()
    {
        $('#finish').fadeOut(500);
   
      
        $('#setting').fadeIn(500);
      
    }
}