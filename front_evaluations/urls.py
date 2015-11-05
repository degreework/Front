from django.conf.urls import patterns, url


urlpatterns = patterns('',

	#Questions
	url(r'^(?P<mod_slug>.+)/evaluations/questions/essay$', 'front_evaluations.views.questionsE', name='questionsE'),
        url(r'^(?P<mod_slug>.+)/evaluations/questions/multichoice$', 'front_evaluations.views.questionsM', name='questionsM'),
        url(r'^(?P<mod_slug>.+)/evaluations/questions/truefalse$', 'front_evaluations.views.questionsTF', name='questionsTF'),

        url(r'^(?P<mod_slug>.+)/evaluations/questions/essay/create$', 'front_evaluations.views.createEssay', name='createEssay'),
        url(r'^(?P<mod_slug>.+)/evaluations/questions/multichoice/create$', 'front_evaluations.views.createMultichoice', name='createMultichoice'),
        url(r'^(?P<mod_slug>.+)/evaluations/questions/truefalse/create$', 'front_evaluations.views.createTrueFalse', name='createTrueFalse'),

	#Category
	#url(r'^(?P<mod_slug>.+)/evaluations/category/$', 'front_evaluations.views.category', name='category'),
        #url(r'^evaluations/category/detail/$', 'front_evaluations.views.detailCategory', name='detailCategory'),
        #url(r'^(?P<mod_slug>.+)/evaluations/category/create$', 'front_evaluations.views.createCategory', name='createCategory'),

        #Subcategory
        #url(r'^(?P<mod_slug>.+)/evaluations/subcategory/$', 'front_evaluations.views.subcategory', name='subcategory'),
        #url(r'^evaluations/category/detail/$', 'front_evaluations.views.detailSubcategory', name='detailCategory'),
        #url(r'^(?P<mod_slug>.+)/evaluations/subcategory/create$', 'front_evaluations.views.createSubcategory', name='createsubCategory'),

        #Quiz
        url(r'^(?P<mod_slug>.+)/evaluations/$', 'front_evaluations.views.quiz', name='quiz'),
        url(r'^(?P<mod_slug>.+)/evaluations/list/$', 'front_evaluations.views.quizAdmin', name='quizAdmin'),
        url(r'^(?P<mod_slug>.+)/evaluations/detail/(?P<id>\d+)$', 'front_evaluations.views.detailQuiz', name='detailQuiz'),
        url(r'^(?P<mod_slug>.+)/evaluations/take/(?P<id>\d+)$', 'front_evaluations.views.take', name='take'),
        url(r'^(?P<mod_slug>.+)/evaluations/create/$', 'front_evaluations.views.createQuiz', name='createQuiz'),
        url(r'^(?P<mod_slug>.+)/listQuizbyCategory/(?P<category_name>[\w.-]+)$', 'front_evaluations.views.listQuizbyCategory' , name='listQuizbyCategory'),
        url(r'^(?P<mod_slug>.+)/evaluations/marking$', 'front_evaluations.views.markingQuiz', name='markingQuiz'),
	url(r'^(?P<mod_slug>.+)/evaluations/marking/detail/(?P<id>[0-9]+)$', 'front_evaluations.views.detailMarkingQuiz', name='detailMarkingQuiz'),
	url(r'^(?P<mod_slug>.+)/evaluations/progress$', 'front_evaluations.views.progressQuiz' , name='progressQuiz'),
)