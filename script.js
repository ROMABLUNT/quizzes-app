window.addEventListener('load', () => {
    const intro = document.getElementById('intro');
    const main = document.getElementById('main');

    intro.classList.add('visible');

    setTimeout(() => {
        intro.classList.remove('visible');
        intro.classList.add('hidden');

        setTimeout(() => {
            intro.style.display = 'none'
            main.classList.add('visible');
        }, 1000);
    }, 3000);
});
// Предзаданные викторины
const predefinedQuizzes = [
    {
        title: 'Викторина о планетах',
        questions: [
            { question: 'Сколько планет в солнечной системе?', options: ['7', '8', '9'], correct: 1 },  
            { question: 'Какая планета ближе к Солнцу?', options: ['Земля', 'Меркурий', 'Венера'], correct: 1 }
        ]
    },
    {
        title: 'Викторина по истории',
        questions: [
            { question: 'Когда началась Вторая мировая война?', options: ['1914', '1939', '1945'], correct: 1 },
            { question: 'Кто был первым президентом США?', options: ['Джон Адамс', 'Томас Джефферсон', 'Джордж Вашингтон'], correct: 2 }
        ]
    }
];

let currentQuiz = null; // Переменная для хранения текущей викторины
let currentQuizIndex = null; // Индекс текущей викторины
let questions = []; // Массив для хранения вопросов при создании новой викторины

// Функции для работы с localStorage
function getUserQuizzes() {
    const quizzes = localStorage.getItem('userQuizzes');
    return quizzes ? JSON.parse(quizzes) : [];
}

function saveUserQuizzes(quizzes) {
    localStorage.setItem('userQuizzes', JSON.stringify(quizzes));
}

// Получение всех викторин
function getAllQuizzes() {
    const userQuizzes = getUserQuizzes();
    return [...predefinedQuizzes, ...userQuizzes];
}

// Отображение каталога викторин
function displayQuizCatalog() {
    const allQuizzes = getAllQuizzes();
    const quizCatalogContainer = document.getElementById('quiz-catalog');

    quizCatalogContainer.innerHTML = ''; // Очищаем контейнер

    allQuizzes.forEach((quiz, index) => {
        const quizItem = document.createElement('div');
        quizItem.classList.add('quiz-item');
        quizItem.innerHTML = `
            <h3>${quiz.title}</h3>
            <button onclick="startQuiz(${index})">Начать</button>
        `;
        quizCatalogContainer.appendChild(quizItem);
    });
}

// Инициализация при загрузке страницы
window.onload = function() {
    displayQuizCatalog();

    // Добавляем обработчик для кнопки создания викторины
    document.getElementById('create-quiz-btn').addEventListener('click', () => {
        document.getElementById('main-content').style.display = 'none';
        document.getElementById('create-quiz-container').style.display = 'block';
    });

    // Обработчик для кнопки отмены создания викторины
    document.getElementById('cancel-create-quiz-btn').addEventListener('click', () => {
        document.getElementById('create-quiz-container').style.display = 'none';
        document.getElementById('main-content').style.display = 'block';
        clearQuizForm();
    });

    // Обработчик для кнопки добавления вопроса
    document.getElementById('add-question-btn').addEventListener('click', () => {
        addQuestion();
    });

    // Обработчик для кнопки создания викторины
    document.getElementById('submit-quiz-btn').addEventListener('click', () => {
        submitQuiz();
    });

    // Обработчик для кнопки завершения викторины
    document.getElementById('submit-quiz-answers-btn').addEventListener('click', () => {
        submitQuizAnswers();
    });
};

// Функция для начала викторины
function startQuiz(quizIndex) {
    const allQuizzes = getAllQuizzes();
    currentQuiz = allQuizzes[quizIndex];
    currentQuizIndex = quizIndex;

    // Скрываем каталог
    document.getElementById('main-content').style.display = 'none';

    // Отображаем секцию викторины
    document.getElementById('quiz-section').style.display = 'block';
    document.getElementById('quiz-title-display').textContent = currentQuiz.title;

    // Отображаем вопросы
    const quizQuestionsContainer = document.getElementById('quiz-questions');
    quizQuestionsContainer.innerHTML = '';

    currentQuiz.questions.forEach((questionData, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.classList.add('quiz-question');

        const questionTitle = document.createElement('h3');
        questionTitle.textContent = questionData.question;
        questionDiv.appendChild(questionTitle);

        questionData.options.forEach((option, optionIndex) => {
            const label = document.createElement('label');
            const input = document.createElement('input');
            input.type = 'radio';
            input.name = `question_${index}`;
            input.value = optionIndex;

            label.appendChild(input);
            label.appendChild(document.createTextNode(option));
            questionDiv.appendChild(label);
            questionDiv.appendChild(document.createElement('br'));
        });

        quizQuestionsContainer.appendChild(questionDiv);
    });
}

// Функция для завершения викторины и подсчета результата
function submitQuizAnswers() {
    const quizQuestionsContainer = document.getElementById('quiz-questions');
    let correctAnswers = 0;
    let totalQuestions = currentQuiz.questions.length;

    quizQuestionsContainer.querySelectorAll('.quiz-question').forEach((questionDiv, index) => {
        const selectedOption = questionDiv.querySelector(`input[name="question_${index}"]:checked`);

        if (selectedOption) {
            const userAnswer = parseInt(selectedOption.value);
            if (currentQuiz.questions[index].correct === userAnswer) {
                correctAnswers++;
            }
        }
    });

    alert(`Вы ответили правильно на ${correctAnswers} из ${totalQuestions} вопросов.`);

    document.getElementById('quiz-section').style.display = 'none';
    document.getElementById('main-content').style.display = 'block';
}

// Функция для добавления нового вопроса
function addQuestion() {
    const questionsContainer = document.getElementById('questions-container');

    const questionIndex = questions.length; // Индекс нового вопроса

    const questionDiv = document.createElement('div');
    questionDiv.classList.add('question-block');
    questionDiv.innerHTML = `
        <label for="question_${questionIndex}">Вопрос ${questionIndex + 1}:</label>
        <input type="text" id="question_${questionIndex}" placeholder="Введите вопрос">
        
        <label for="option_${questionIndex}_0">Вариант 1:</label>
        <input type="text" id="option_${questionIndex}_0" placeholder="Введите вариант 1">
        
        <label for="option_${questionIndex}_1">Вариант 2:</label>
        <input type="text" id="option_${questionIndex}_1" placeholder="Введите вариант 2">
        
        <label for="option_${questionIndex}_2">Вариант 3:</label>
        <input type="text" id="option_${questionIndex}_2" placeholder="Введите вариант 3">
        
        <label>Правильный ответ:</label>
        <select id="correct_${questionIndex}">
            <option value="0">Вариант 1</option>
            <option value="1">Вариант 2</option>
            <option value="2">Вариант 3</option>
        </select>
    `;

    questionsContainer.appendChild(questionDiv);

    // Добавляем пустой вопрос в массив вопросов
    questions.push({
        question: '',
        options: ['', '', ''],
        correct: 0
    });
}

// Функция для сохранения новой викторины
function submitQuiz() {
    const quizTitle = document.getElementById('quiz-title').value;

    // Проверка на заполнение названия викторины
    if (!quizTitle) {
        alert('Пожалуйста, введите название викторины.');
        return;
    }

    // Проверка наличия хотя бы одного вопроса
    if (questions.length === 0) {
        alert('Добавьте хотя бы один вопрос.');
        return;
    }

    let isValid = true; 

    questions.forEach((q, index) => {
        const questionText = document.getElementById(`question_${index}`).value;
        const option1 = document.getElementById(`option_${index}_0`).value;
        const option2 = document.getElementById(`option_${index}_1`).value;
        const option3 = document.getElementById(`option_${index}_2`).value;
        const correctOption = document.getElementById(`correct_${index}`).value;

        if (!questionText || !option1 || !option2 || !option3) {
            alert(`Пожалуйста, заполните все поля для вопроса ${index + 1}.`);
            isValid = false;
            return;
        }

        // Сохраняем данные в массив
        q.question = questionText;
        q.options = [option1, option2, option3];
        q.correct = parseInt(correctOption);
    });

    if (!isValid) return;

    const newQuiz = {
        title: quizTitle,
        questions: questions
    };

    const userQuizzes = getUserQuizzes();

    userQuizzes.push(newQuiz);
    saveUserQuizzes(userQuizzes);

    // Обновляем каталог викторин
    displayQuizCatalog();

    // Очищаем форму и возвращаемся к каталогу
    clearQuizForm();
    document.getElementById('create-quiz-container').style.display = 'none';
    document.getElementById('main-content').style.display = 'block';
}

// Функция для очистки формы создания викторины
function clearQuizForm() {
    document.getElementById('quiz-title').value = '';
    document.getElementById('questions-container').innerHTML = '';
    questions = []; 
}
