<?php
// app/Notifications/VerifyEmailNotification.php

namespace App\Notifications;

use Illuminate\Auth\Notifications\VerifyEmail as BaseVerifyEmail;
use Illuminate\Notifications\Messages\MailMessage;

class VerifyEmailNotification extends BaseVerifyEmail
{
    protected function buildMailMessage($url): MailMessage
    {
        return (new MailMessage)
            ->subject('Verify Your Email Address')
            ->greeting('Welcome!')
            ->line('Please click the button below to verify your email address.')
            ->action('Verify Email Address', $url)
            ->line('This link will expire in 60 minutes.')
            ->line('If you did not create an account, no action is needed.');
    }
}