<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background-color: #305aa0; color: white; padding: 24px; text-align: center; border-radius: 8px 8px 0 0; }
        .content { background-color: #f5f9ff; padding: 24px; }
        .button { display: inline-block; padding: 12px 18px; background: #305aa0; color: #fff !important; text-decoration: none; border-radius: 6px; font-weight: 700; }
        .footer { background-color: #e8f0ff; padding: 16px 24px; border-radius: 0 0 8px 8px; font-size: 12px; color: #4b5563; }
    </style>
</head>
<body>
<div class="container">
    <div class="header">
        <h2>Blue Door Coffee Newsletter</h2>
    </div>
    <div class="content">
        <p>Hi {{ $subscription->name ?? 'there' }},</p>
        <p>Thanks for subscribing. Please confirm your email to activate your newsletter subscription.</p>
        <p>
            <a href="{{ $verificationUrl }}" class="button">Confirm Subscription</a>
        </p>
        <p>If you did not request this, you can ignore this email.</p>
    </div>
    <div class="footer">
        Blue Door Coffee
    </div>
</div>
</body>
</html>
