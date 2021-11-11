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
    seen_item_names = []
    item_count = 0
    for item in all_items:
        if (
            search.upper() in item.name.upper()
            and search.upper() not in seen_item_names
            and not item.duplicate
            and item.tradeable
        ):
            items.append({
                'name': item.name,
                'id': item.id,
                'icon_url': f'https://osrsbox.com/osrsbox-db/items-icons/{item.id}.png',
                'duplicate': item.duplicate
            })
            item_count += 1
            if item_count >= 50:
                break
        seen_item_names.append(item.name.upper())
    
    return JsonResponse({'items': items})
