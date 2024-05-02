import json

from django.db import models


class Anket(models.Model):
    name = models.CharField(max_length = 100)
    city = models.CharField(max_length = 100)
    type_business = models.CharField(max_length = 100)
    address = models.CharField(max_length = 155)
    answers = models.JSONField(null = False)

    def set_answers(self, answers):
        self.answers = json.dumps(answers)

    def get_answers(self):
        return json.loads(self.answers)

    def __str__(self):
        return self.name