from django.shortcuts import render
from osrsbox import items_api
import json
from django.http import JsonResponse, HttpResponse
from .models import Want, Have, Transaction
from django.contrib.auth.models import User
from django.core import serializers
# Create your views here.

all_items = items_api.load()


def render_suburl(request):
    return render(request, "new_app.html")


def add(request, type):
    j = json.loads(request.body)
    if type == 'wants':
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
    if type == 'wants':
        model = Want
    else:
        model = Have
    
    user = User.objects.get(username=j['member'])

    m = model.objects.get(user=user, item_id=j['item_id'])
    m.quantity = j['quantity']
    m.save()

    return HttpResponse(status=200)


def remove(request, type):
    j = json.loads(request.body)
    if type == 'wants':
        model = Want
    else:
        model = Have
    
    user = User.objects.get(id=1)

    m = model.objects.get(user=user, item_id=j['item_id'])

    m.delete()

    return HttpResponse(status=200)


def get(request, username):
    current_user = User.objects.get(username=username)
    
    group = current_user.groups.values_list('name', flat=True)
    group_name = list(group)[0]

    users = User.objects.filter(groups__name=group_name)
    members = list(users.values_list('username', flat=True))

    wants = Want.objects.filter(user__in=users, quantity__gt=0).values()

    for want in wants:
        want['username'] = User.objects.filter(id=want['user_id']).values_list('username', flat=True)[0]

    haves = Have.objects.filter(user__in=users, quantity__gt=0).values()

    for have in haves:
        have['username'] = User.objects.filter(id=have['user_id']).values_list('username', flat=True)[0]



    return JsonResponse({'members': members, 'wants': list(wants), 'haves': list(haves)})


def transact(request, type):
    j = json.loads(request.body)
    teammate = User.objects.filter(username=j['member'])[0]
    if type == 'wants':
        w = Want.objects.filter(user=teammate, item_id=j['item_id']).first()
        try:
            h = Have.objects.get(user=request.user, item_id=j['item_id'], quantity__gt=0)
        except:
            h = Have(
                user=request.user,
                item_id=j['item_id'],
                name=j['name'],
                icon_url=j['icon_url'],
                quantity=0, 
                complete=False,
            )
        
        if w.quantity > j['quantity']:
            w.quantity = w.quantity - j['quantity']
            h.quantity = 0
        else:
            h.quantity = j['quantity'] - w.quantity
            w.quantity = 0

        h.save()
        w.save()

        t = Transaction(
            want=w,
            have=h,
            quantity=j['quantity'],
            confirmed=False
        )

        t.save()
    
    return JsonResponse({
        'wants': list(Want.objects.filter(id=w.id).values()),
        'haves': list(Have.objects.filter(id=h.id).values()),
    })


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
