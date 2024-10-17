

class MyMiddlware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        # Действия, выполняемые перед выполнением view
        response = self.get_response(request)
        # Действия, выполняемые после выполнения view
        return response
