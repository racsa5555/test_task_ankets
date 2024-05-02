from django.contrib import admin

from .models import BaseAnswerChoice,BaseQuestion,Question,AnswerChoice

admin.site.register(BaseQuestion)
admin.site.register(Question)
admin.site.register(AnswerChoice)
admin.site.register(BaseAnswerChoice)