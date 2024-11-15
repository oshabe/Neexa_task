<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class FollowUpMissedNotification extends Notification
{
    use Queueable;

    protected $followUp;

    /**
     * Create a new notification instance.
     */
    public function __construct($followUp)
    {
        $this->followUp = $followUp;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
        ->subject('Follow-Up Marked as Missed')
        ->greeting('Hello ' . $notifiable->name . ',')
        ->line('A follow-up has been marked as missed.')
        ->line('Follow-Up ID: ' . $this->followUp->id)
        ->line('Lead Name: ' . $this->followUp->lead->name)
        ->line('Scheduled Date: ' . $this->followUp->scheduled_at)
        ->action('View Follow-Up', url('/followups/' . $this->followUp->id))
        ->line('Thank you for using our application!');
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            //
        ];
    }
}
