<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>{{ $subject }}</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }
        .header {
            background-color: #78350f;
            color: white;
            padding: 20px;
            text-center;
            border-radius: 8px 8px 0 0;
        }
        .content {
            background-color: #fef3c7;
            padding: 30px;
            border-radius: 0 0 8px 8px;
        }
        .footer {
            text-align: center;
            margin-top: 20px;
            padding: 20px;
            font-size: 12px;
            color: #666;
        }
        h1 {
            margin: 0;
            font-size: 24px;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>Blue Door Coffee</h1>
    </div>
    <div class="content">
        <h2>{{ $subject }}</h2>
        {!! $content !!}
    </div>
    <div class="footer">
        <p>&copy; 2026 Blue Door Coffee. All rights reserved.</p>
        <p>123 Coffee Street, Brewtown | (555) 123-4567</p>
    </div>
</body>
</html>
