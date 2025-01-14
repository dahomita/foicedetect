from django.http import HttpResponse
from django.template import Context, Template

def welcome_view(request):
    html = """
    <!DOCTYPE html>
    <html>
    <head>
        <title>Congratulations!</title>
        <style>
            body { font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; }
            h1 { color: #333; }
            p { line-height: 1.6; }
        </style>
    </head>
    <body>
        <h1>Congratulations!</h1>
        <p>Your Django project is up and running. This is a custom welcome page for your Foice Detect application.</p>
        <h2>Next Steps:</h2>
        <ul>
            <li>Explore your audio detection app</li>
            <li>Configure your database</li>
            <li>Add more features to your project</li>
        </ul>
    </body>
    </html>
    """
    return HttpResponse(html)
