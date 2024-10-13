window.addEventListener('load', () => {
    const intro = document.getElementById('intro');
    const catalog = document.getElementById('catalog');

    intro.classList.add('visible');

    setTimeout(() => {
        intro.classList.remove('visible');
        intro.classList.add('hidden');

        setTimeout(() => {
            intro.style.display = 'none'
            catalog.classList.add('visible');
        }, 1000);
    }, 3000);
});


const quizData = {
    1: {
        title: 'goida',
        questions: [
            { question: 'goida?', options: ['da', 'svo', 'chechenzi'], correct: 1 },
            { question: 'chei krim?', options: ['moi', 'svo', 'chechenzi', 'nash'], correct: 1 },
        ]
    },
    2: {
        title: 'ny pravda',
        questions: [
            { question: 'goida?', options: ['da', 'svo', 'chechenzi'], correct: 1 },
            { question: 'chei krim?', options: ['moi', 'svo', 'chechenzi', 'nash'], correct: 1 },
        ]
    },
    3: {
        title: 'goida',
        questions: [
            { question: 'goida?', options: ['da', 'svo', 'chechenzi'], correct: 1 },
            { question: 'chei krim?', options: ['moi', 'svo', 'chechenzi', 'nash'], correct: 1 },
        ]
    }
};



function startQuiz(quizId) {
    const quizSection = document.getElementById('quiz-section');
    const quizTitle = document.getElementById('quiz-title');
    const quizQuestionsContainer = document.getElementById('quiz-questions');
    const submitButton = document.getElementById('submit-quiz');

 
    quizQuestionsContainer.innerHTML = '';
    
    const quiz = quizData[quizId];

    



    if (quiz) {
        quizTitle.textContent = quiz.title;


        quiz.questions.forEach((questionData, index) => {
            const questionDiv = document.createElement('div');
            questionDiv.classList.add('quiz-question');
            
            const questionTitle = document.createElement('h3');
            questionTitle.textContent = questionData.question;
            questionDiv.appendChild(questionTitle);
            
            // Генерируем варианты ответа
            questionData.options.forEach((option, optionIndex) => {
                const label = document.createElement('label');
                const input = document.createElement('input');
                input.type = 'radio';
                input.name = `question_${index}`; // Уникальное имя для каждой группы вопросов
                input.value = optionIndex;
                
                label.appendChild(input);
                label.appendChild(document.createTextNode(option));
                questionDiv.appendChild(label);
                questionDiv.appendChild(document.createElement('br'));
            });

            quizQuestionsContainer.appendChild(questionDiv);
        });

        // Показываем раздел с викториной и кнопку завершения
        quizSection.style.display = 'block';
        submitButton.style.display = 'inline-block';

        // Скрываем каталог викторин
        document.getElementById('catalog').style.display = 'none';
    }
}

// // Функция для завершения викторины и подсчета результата
 function submitQuiz() {
    const quizQuestionsContainer = document.getElementById('quiz-questions');
    let correctAnswers = 0;
     let totalQuestions = quizQuestionsContainer.querySelectorAll('.quiz-question').length;

     // Проходим по всем вопросам
     quizQuestionsContainer.querySelectorAll('.quiz-question').forEach((questionDiv, index) => {
        const selectedOption = questionDiv.querySelector(`input[name="question_${index}"]:checked`);
        
        if (selectedOption) {
             const userAnswer = parseInt(selectedOption.value);
             if (quizData[1].questions[index].correct === userAnswer) {
                 correctAnswers++;
             }
         }
     });

     alert(`Вы ответили правильно на ${correctAnswers} из ${totalQuestions} вопросов.`);
 }
