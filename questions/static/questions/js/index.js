async function getQuestions(typeB){
    const response = await fetch(`http://127.0.0.1:8000/get_questions/?type=${typeB}`);
    const data = await response.json();
    return data
}

async function getBaseQuestions(){
    const response = await fetch(`http://127.0.0.1:8000/get_base_questions/`);
    const data = await response.json();
    return data
}

async function sendAnket(data){
    const response = await fetch(`http://127.0.0.1:8000/api/business/`,{
        method:'POST',
        headers: {
        'Content-Type': 'application/json',
        'X-Csrftoken':'QLFi5NmOAjOxCTwEjHxDpvFYIFxfopzt',
        },
    body: JSON.stringify(data)});
    return response
}

async function nextState() {
    let typeB = document.getElementById("typeB");

    const questions = await getQuestions(typeB.value);

    createContainer(questions,state2);

}

async function state2(){
    baseQuestions = await getBaseQuestions();
    createContainer(baseQuestions,state3);
}

async function state3(){
    let nameCompanyInput = document.getElementById("name_company");
    let cityInput = document.getElementById("city");
    let typeB = document.getElementById("typeB");
    let addressInput = document.getElementById("address");

    const checkboxes = document.querySelectorAll('.check');
    
    let selectedAnswers = [];
    
    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            const answerText = checkbox.nextElementSibling.textContent;
            const questionText = checkbox.closest('li').parentElement.closest('li').querySelector('p').textContent;
            selectedAnswers.push({question: questionText, answer: answerText});
        }
    });

    const data = {
        name: nameCompanyInput.value,
        city: cityInput.value,
        type_business: typeB.value,
        address: addressInput.value,
        answers: selectedAnswers
    };
    console.log(data)
    response = await sendAnket(data)

        
}



async function createContainer(questions,func) {
    
    const newMainContainer = document.createElement('div');
    newMainContainer.className = 'main_container';
    const heading = document.createElement('h1');
    heading.textContent = 'Следующий этап';
    newMainContainer.appendChild(heading);

    const questionsList = document.createElement('ul');
    questionsList.className = 'questions';

    questions.forEach(question => {
        const questionItem = document.createElement('li');
        const questionText = document.createElement('p');
        questionText.textContent = question.text;
        questionItem.appendChild(questionText);

        question.answers.forEach(answer => {
            const answerItem = document.createElement('li');
            answerItem.className = 'answerText'
            const answerCheckbox = document.createElement('input');
            answerCheckbox.className = 'check'
            answerCheckbox.type = 'checkbox';
            const answerText = document.createElement('span');
            answerText.textContent = answer.text;
            answerItem.appendChild(answerCheckbox);
            answerItem.appendChild(answerText);
            questionItem.appendChild(answerItem);
        });

        questionsList.appendChild(questionItem);
    });
    
    newMainContainer.appendChild(questionsList);
    document.body.appendChild(newMainContainer); 
    const currentButton = document.getElementById('next')
    currentButton.remove();
    const nextButton = document.createElement('button');
    nextButton.textContent = 'Далее';
    nextButton.id = 'next';
    nextButton.onclick = func;   
    newMainContainer.appendChild(nextButton);
}


