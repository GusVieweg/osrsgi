from django.shortcuts import render

# Create your views here.


def render_suburl(request):
    return render(request, "new_app.html")
