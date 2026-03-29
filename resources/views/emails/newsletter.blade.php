<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }
        .header {
            background-color: #78350f;
            color: white;
            padding: 30px;
            text-align: center;
            border-radius: 8px 8px 0 0;
        }
        .content {
            background-color: #fef3c7;
            padding: 30px;
        }
        .footer {
            background-color: #451a03;
            color: #fef3c7;
            padding: 20px;
            text-align: center;
            border-radius: 0 0 8px 8px;
        }
        h1 {
            margin: 0;
            font-size: 28px;
        }
        .unsubscribe {
            margin-top: 20px;
            font-size: 12px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Blue Door Coffee</h1>
        </div>
        <div class="content">
            <h2>{{ $subject }}</h2>
            {!! $content !!}
        </div>
        <div class="footer">
            <p><strong>Blue Door Coffee</strong></p>
            <p>123 Coffee Street, Brewtown | (555) 123-4567</p>
            <p class="unsubscribe">
                You're receiving this because you subscribed to our newsletter.
                <a href="{{ url('/newsletter/unsubscribe?email=' . urlencode($subscriber->email)) }}" style="color: #fcd34d; text-decoration: underline;">Unsubscribe</a>
            </p>
        </div>
    </div>
</body>
</html>
