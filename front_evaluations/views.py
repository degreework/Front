# -*- encoding: utf-8 -*-

from django.shortcuts import render_to_response
from django.template.context import RequestContext

# Create your views here.
#---------------
# QESTIONS
#---------------
def questions(request):
    return render_to_response('listQuestions.html', {'title': 'questions | Name App'}, context_instance=RequestContext(request))


def createEssay(request):
    return render_to_response('essayCreate.html', {'title': 'create essay | Name App'}, context_instance=RequestContext(request))


def createMultichoice(request):
    return render_to_response('multichoiceCreate.html', {'title': 'create multichoice | Name App'}, context_instance=RequestContext(request))


def createTrueFalse(request):
    return render_to_response('truefalseCreate.html', {'title': 'create truefalse | Name App'}, context_instance=RequestContext(request))


#---------------
# CATEGORY
#---------------
def category(request):
    return render_to_response('listCategory.html', {'title': ' category | Name App'}, context_instance=RequestContext(request))


def createCategory(request):
    return render_to_response('categoryCreate.html', {'title': 'create category | Name App'}, context_instance=RequestContext(request))


def subcategory(request):
    return render_to_response('listSubcategory.html', {'title': 'subcategory | Name App'}, context_instance=RequestContext(request))


def createSubcategory(request):
    return render_to_response('subcategoryCreate.html', {'title': 'create subcategory | Name App'}, context_instance=RequestContext(request))


#---------------
# QUIZ
#---------------
def quiz(request):
    return render_to_response('listQuiz.html', {'title': 'quiz | Name App'}, context_instance=RequestContext(request))


def detailQuiz(request,id):
    return render_to_response('quizDetail.html', {'title': 'detail quiz | Name App'}, context_instance=RequestContext(request))


def take(request,id):
    return render_to_response('takeQuiz.html', {'title': 'quiz | Name App'}, context_instance=RequestContext(request))


def createQuiz(request):
    return render_to_response('quizCreate.html', {'title': 'Create quiz | Name App'}, context_instance=RequestContext(request))


def listQuizbyCategory(request):
    return render_to_response('listQuizbyCategory.html', {'title': 'quiz | Name App'}, context_instance=RequestContext(request))


def markingQuiz(request):
    return render_to_response('markingQuiz.html', {'title': 'quiz | Name App'}, context_instance=RequestContext(request))


def detailMarkingQuiz(request, id):
    return render_to_response('detailMarkingQuiz.html', {'title': 'quiz | Name App'}, context_instance=RequestContext(request))


def progressQuiz(request):
    return render_to_response('progressQuiz.html', {'title': 'quiz | Name App'}, context_instance=RequestContext(request))