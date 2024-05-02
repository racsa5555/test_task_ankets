from django.db import models


class BaseQuestion(models.Model):
    text = models.CharField(max_length = 155)

    def __str__(self):
        return f'{self.text}'


class BaseAnswerChoice(models.Model):
    answer_text = models.CharField(max_length = 155)
    question = models.ForeignKey(BaseQuestion,on_delete=models.CASCADE,related_name='answers')

    def __str__(self):
        return f'{self.answer_text} - {self.question}'



class Question(models.Model):
    TYPE_B = (
        ('Общепит','Общепит'),
        ('Ритейл','Ритейл'),
        ('Услуги по записи','Услуги по записи'),
    )
    type = models.CharField(choices = TYPE_B)
    text = models.CharField(max_length = 155)

    def __str__(self):
        return f'{self.text}'


class AnswerChoice(models.Model):
    answer_text = models.CharField(max_length = 155)
    question = models.ForeignKey(Question,on_delete=models.CASCADE,related_name='answers')

    def __str__(self):
        return f'{self.answer_text} - {self.question}'

