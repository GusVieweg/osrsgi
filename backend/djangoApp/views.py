from django.shortcuts import render
from osrsbox import items_api
import json
from django.http import JsonResponse
# Create your views here.

all_items = items_api.load()


def render_suburl(request):
    return render(request, "new_app.html")


def item_lookup(request):
    j = json.loads(request.body)
    search = j['search']
    items = []
    item_count = 0
    for item in all_items:
        if search.upper() in item.name.upper() and not item.duplicate:
            items.append({
                'name': item.name,
                'id': item.id,
                'icon_url': f'https://osrsbox.com/osrsbox-db/items-icons/{item.id}.png'
            })
            item_count += 1
            if item_count >= 50:
                break
    
    print(all_items[0])
    return JsonResponse({'items': items})
