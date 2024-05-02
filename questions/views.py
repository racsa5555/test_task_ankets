from django.shortcuts import render
from django.http import JsonResponse

from questions.models import BaseQuestion,Question,AnswerChoice



def index(request):
    return render(request,'questions/index.html')

def get_questions(request):
    type = request.GET.get('type', None)
    questions = Question.objects.filter(type=type)
    data = [{"text": question.text, "answers": [{"text": answer.answer_text} for answer in question.answers.all()]} for question in questions]
    return JsonResponse(data,safe = False)


def get_base_questions(request):
    questions = BaseQuestion.objects.all()
    data = [{"text": question.text, "answers": [{"text": answer.answer_text} for answer in question.answers.all()]} for question in questions]
    return JsonResponse(data,safe = False)

