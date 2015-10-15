# -*- encoding: utf-8 -*-

from django.shortcuts import render_to_response
from django.template.context import RequestContext

# Create your views here.
#---------------
# QESTIONS
#---------------
def questions(request, mod_slug):
    return render_to_response('listQuestions.html', {'title': 'questions | Name App', 'mod_slug':mod_slug }, context_instance=RequestContext(request))


def createEssay(request, mod_slug):
    return render_to_response('essayCreate.html', {'title': 'create essay | Name App', 'mod_slug':mod_slug }, context_instance=RequestContext(request))


def createMultichoice(request, mod_slug):
    return render_to_response('multichoiceCreate.html', {'title': 'create multichoice | Name App', 'mod_slug':mod_slug }, context_instance=RequestContext(request))


def createTrueFalse(request, mod_slug):
    return render_to_response('truefalseCreate.html', {'title': 'create truefalse | Name App', 'mod_slug':mod_slug }, context_instance=RequestContext(request))


#---------------
# CATEGORY
#---------------
def category(request, mod_slug):
    return render_to_response('listCategory.html', {'title': ' category | Name App', 'mod_slug':mod_slug }, context_instance=RequestContext(request))


def createCategory(request, mod_slug):
    return render_to_response('categoryCreate.html', {'title': 'create category | Name App', 'mod_slug':mod_slug }, context_instance=RequestContext(request))


def subcategory(request, mod_slug):
    return render_to_response('listSubcategory.html', {'title': 'subcategory | Name App', 'mod_slug':mod_slug }, context_instance=RequestContext(request))


def createSubcategory(request, mod_slug):
    return render_to_response('subcategoryCreate.html', {'title': 'create subcategory | Name App', 'mod_slug':mod_slug }, context_instance=RequestContext(request))


#---------------
# QUIZ
#---------------

def quiz(request, mod_slug):
    return render_to_response('quiz.html', {'title': 'quiz | Name App', 'mod_slug':mod_slug }, context_instance=RequestContext(request))


def quizAdmin(request, mod_slug):
    return render_to_response('listQuiz.html', {'title': 'quizAdmin | Name App', 'mod_slug':mod_slug }, context_instance=RequestContext(request))


def detailQuiz(request, mod_slug,id):
    return render_to_response('quizDetail.html', {'title': 'detail quiz | Name App', 'mod_slug':mod_slug }, context_instance=RequestContext(request))


def take(request, mod_slug,id):
    return render_to_response('takeQuiz.html', {'title': 'quiz | Name App', 'mod_slug':mod_slug }, context_instance=RequestContext(request))


def createQuiz(request, mod_slug):
    return render_to_response('quizCreate.html', {'title': 'Create quiz | Name App', 'mod_slug':mod_slug }, context_instance=RequestContext(request))


def listQuizbyCategory(request, mod_slug):
    return render_to_response('listQuizbyCategory.html', {'title': 'quiz | Name App', 'mod_slug':mod_slug }, context_instance=RequestContext(request))


def markingQuiz(request, mod_slug):
    return render_to_response('markingQuiz.html', {'title': 'quiz | Name App', 'mod_slug':mod_slug }, context_instance=RequestContext(request))


def detailMarkingQuiz(request, mod_slug, id):
    return render_to_response('detailMarkingQuiz.html', {'title': 'quiz | Name App', 'mod_slug':mod_slug }, context_instance=RequestContext(request))


def progressQuiz(request, mod_slug):
    return render_to_response('progressQuiz.html', {'title': 'quiz | Name App', 'mod_slug':mod_slug }, context_instance=RequestContext(request))