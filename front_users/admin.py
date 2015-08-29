from django.contrib.sessions.models import Session
from django.contrib import admin

class SessionAdmin(admin.ModelAdmin):
    def _session_data(self, obj):
        return obj.get_decoded()

    readonly_fields = ['_session_data']
    list_display = ['session_key', '_session_data', 'expire_date']

admin.site.register(Session, SessionAdmin)