from django.conf.urls import patterns, url


urlpatterns = patterns('',

	#Questions
	url(r'^evaluations/questions/$', 'front_evaluations.views.questions', name='questions'),

        url(r'^evaluations/questions/essay/create$', 'front_evaluations.views.createEssay', name='createEssay'),
        url(r'^evaluations/questions/multichoice/create$', 'front_evaluations.views.createMultichoice', name='createMultichoice'),
        url(r'^evaluations/questions/truefalse/create$', 'front_evaluations.views.createTrueFalse', name='createTrueFalse'),

	#Category
	url(r'^evaluations/category/$', 'front_evaluations.views.category', name='category'),
        #url(r'^evaluations/category/detail/$', 'front_evaluations.views.detailCategory', name='detailCategory'),
        url(r'^evaluations/category/create$', 'front_evaluations.views.createCategory', name='createCategory'),

        #Subcategory
        url(r'^evaluations/subcategory/$', 'front_evaluations.views.subcategory', name='subcategory'),
        #url(r'^evaluations/category/detail/$', 'front_evaluations.views.detailSubcategory', name='detailCategory'),
        url(r'^evaluations/subcategory/create$', 'front_evaluations.views.createSubcategory', name='createCategory'),

        #Quiz
        url(r'^evaluations/$', 'front_evaluations.views.quiz', name='quiz'),
        url(r'^evaluations/detail/(?P<id>\d+)$', 'front_evaluations.views.detailQuiz', name='detailQuiz'),
        url(r'^evaluations/take/(?P<id>\d+)$', 'front_evaluations.views.take', name='take'),
        url(r'^evaluations/create/$', 'front_evaluations.views.createQuiz', name='createQuiz'),
        url(r'^listQuizbyCategory/(?P<category_name>[\w.-]+)$', 'front_evaluations.views.listQuizbyCategory' , name='listQuizbyCategory'),
        url(r'^evaluations/marking$', 'front_evaluations.views.markingQuiz', name='markingQuiz'),
	url(r'^evaluations/marking/detail/(?P<id>[0-9]+)$', 'front_evaluations.views.detailMarkingQuiz', name='detailMarkingQuiz'),
	url(r'^evaluations/progress$', 'front_evaluations.views.progressQuiz' , name='progressQuiz'),
)