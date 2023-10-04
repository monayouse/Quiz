import { Quiz } from "./quize.js";

export class Setting {

    constructor() {
        // console.log('log');

        this.categoryInput = document.getElementById('category')
        this.difficultyInput = document.getElementsByName('difficulty');
        this.numberOfQuestionsInput = document.getElementById('numberOfQuestions');
        // document.getElementById('startBtn').addEventListener('click', this.startQuize)
        document.getElementById('startBtn').addEventListener('click', () => {
            this.startQuize();
        });
        this.numberOfQuestionsInput = document.getElementById('numberOfQuestions');
    }
    async startQuize() {
        
        let category = this.categoryInput.value;
  
        let difficulty = Array.from(this.difficultyInput).find(value => value.checked).value;
        let numberOfQuestions = this.numberOfQuestionsInput.value;
  
        let url = `https://opentdb.com/api.php?amount=${numberOfQuestions}&category=${category}&difficulty=${difficulty}`;
        let response = await this.fetchData(url);
        if (response.length > 0) {
            $('#setting').fadeOut(500);
            $('#quiz').fadeIn(500);
            let newQuiz= new Quiz(response);
        }

    }
    async fetchData(url) {
        let response = await fetch(url)
        response = await response.json();
        console.log(response);
        return response.results;
    }

}






