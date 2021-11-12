from django.shortcuts import render
from osrsbox import items_api
import json
from django.http import JsonResponse, HttpResponse
from .models import Want, Have, Transaction
from django.contrib.auth.models import User
# Create your views here.

all_items = items_api.load()


def render_suburl(request):
    return render(request, "new_app.html")


def add(request, type):
    j = json.loads(request.body)
    if type == 'want':
        model = Want
    else:
        model = Have
    
    user = User.objects.get(id=1)

    m = model(
        user=user,
        item_id=j['item_id'],
        name=j['name'],
        icon_url=j['icon_url'],
        quantity=j['quantity'], 
        complete=False,
    )
    m.save()

    return HttpResponse(status=200)


def update(request, type):
    j = json.loads(request.body)
    if type == 'want':
        model = Want
    else:
        model = Have
    
    user = User.objects.get(id=1)

    m = model.objects.get(user=user, item_id=j['item_id'], quantity=j['old_quantity'])

    m.quantity = j['new_quantity']

    m.save()

    return HttpResponse(status=200)


def remove(request, type):
    j = json.loads(request.body)
    if type == 'want':
        model = Want
    else:
        model = Have
    
    user = User.objects.get(id=1)

    m = model.objects.get(user=user, item_id=j['item_id'], quantity=j['quantity'])

    m.delete()

    return HttpResponse(status=200)


def get(request):
    user = User.objects.get(id=1)

    wants = Want.objects.filter(user=user).values()
    haves = Have.objects.filter(user=user).values()

    return JsonResponse({'wants': list(wants), 'haves': list(haves)})


def item_lookup(request):
    j = json.loads(request.body)
    search = j['search']
    items = []
    seen_item_names = []
    item_count = 0
    for item in all_items:
        if (
            search.lower() in item.name.lower()
            and not item.duplicate
            and item.tradeable
        ):
            items.append({
                'name': item.name,
                'id': item.id,
                'icon_url': f'https://osrsbox.com/osrsbox-db/items-icons/{item.id}.png'
            })
            item_count += 1
            if item_count >= 50:
                break
    
    return JsonResponse({'items': items})
