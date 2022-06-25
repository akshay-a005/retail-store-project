import csv
from django.shortcuts import render
from rest_framework.views import APIView
from .models import *
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from .serializer import *
from rest_framework import status
from django.http import Http404


# Create your views here.

class StoreView(APIView):
    """
    List all stores, or create a new snippet.
    """
    parser_classes = (FormParser, MultiPartParser)
    serializer_class = StoreSerializer

    def get(self, request, format=None):
        stores = Store.objects.all()
        serializer = StoreSerializer(stores, many=True)
        return Response(serializer.data)

    # def get(self, request):
    #     store = [{"id":store.id, "sku": store.sku, "productName": store.productName, "price": store.price,
    #               "date": store.updated_at}
    #              for store in Store.objects.all()]
    #     return Response(store)

    def post(self, request):

        try:
            file = request.FILES['file']
            decoded_file = file.read().decode('utf-8').splitlines()
            reader = csv.DictReader(decoded_file)
            objects = []
            i = 1
            for row in reader:
                print(row)
                if i == 1:
                    dict_keys = list(row.keys())
                    print(dict_keys)
                    objects.append(Store(
                        sku=dict_keys[1],
                        productName=dict_keys[2],
                        price=dict_keys[3]
                    ))
                dict_values = list(row.values())
                objects.append(Store(
                    sku=dict_values[1],
                    productName=dict_values[2],
                    price=dict_values[3]
                ))
                i += 1
            Store.objects.bulk_create(objects)
            return Response({"success": "success"}, status=status.HTTP_201_CREATED)
        except:
            return Response({'error': "error"}, status=status.HTTP_400_BAD_REQUEST)


class StoreDetail(APIView):
    """
    Retrieve, update or delete a snippet instance.
    """

    def get_object(self, pk):
        try:
            return Store.objects.get(pk=pk)
        except Store.DoesNotExist:
            raise Http404

    def put(self, request, pk, format=None):
        store = self.get_object(pk)
        serializer = StoreSerializer(store, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        store = self.get_object(pk)
        store.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
