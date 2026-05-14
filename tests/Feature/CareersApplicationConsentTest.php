<?php

use App\Enums\NewsletterSubscriptionStatus;
use App\Models\Branch;
use App\Models\JobOpening;
use App\Models\NewsletterSubscription;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;

function createJobForCareersTest(): JobOpening
{
    $branch = Branch::create([
        'name' => 'Cabang Test',
        'slug' => 'cabang-test',
        'code' => 'TST01',
        'address' => 'Jl. Test No.1',
        'city' => 'Bandung',
        'province' => 'Jawa Barat',
        'postal_code' => '40111',
        'phone' => '081234567890',
        'email' => 'test@branch.id',
    ]);

    return JobOpening::create([
        'branch_id' => $branch->id,
        'title' => 'Barista Test',
        'slug' => 'barista-test',
        'description' => 'Desc',
        'type' => 'full-time',
        'location' => 'Bandung',
        'is_active' => true,
    ]);
}

it('rejects application when newsletter consent is missing', function () {
    Storage::fake('public');
    Mail::fake();

    $job = createJobForCareersTest();

    $response = $this->post(route('careers.apply'), [
        'job_opening_id' => $job->id,
        'name' => 'Pelamar A',
        'email' => 'pelamar-a@example.com',
        'phone' => '081111111111',
        'cover_letter' => 'Saya siap',
        'cv' => UploadedFile::fake()->create('cv.pdf', 100, 'application/pdf'),
    ]);

    $response->assertSessionHasErrors('newsletter_consent');
});

it('creates pending verification subscription when apply with consent', function () {
    Storage::fake('public');
    Mail::fake();

    $job = createJobForCareersTest();

    $response = $this->post(route('careers.apply'), [
        'job_opening_id' => $job->id,
        'name' => 'Pelamar B',
        'email' => 'pelamar-b@example.com',
        'phone' => '082222222222',
        'cover_letter' => 'Saya siap',
        'newsletter_consent' => true,
        'cv' => UploadedFile::fake()->create('cv.pdf', 100, 'application/pdf'),
    ]);

    $response->assertSessionHas('success');

    $subscription = NewsletterSubscription::where('email', 'pelamar-b@example.com')->first();

    expect($subscription)->not()->toBeNull();
    expect($subscription->status)->toBe(NewsletterSubscriptionStatus::PendingVerification);
    expect($subscription->is_subscribed)->toBeFalse();
    expect($subscription->verification_token)->not()->toBeNull();
});

it('keeps subscribed status when applicant already subscribed', function () {
    Storage::fake('public');
    Mail::fake();

    $job = createJobForCareersTest();

    $subscription = NewsletterSubscription::create([
        'email' => 'pelamar-c@example.com',
        'name' => 'Pelamar C',
        'status' => NewsletterSubscriptionStatus::Subscribed,
        'is_subscribed' => true,
        'verified_at' => now(),
    ]);

    $response = $this->post(route('careers.apply'), [
        'job_opening_id' => $job->id,
        'name' => 'Pelamar C',
        'email' => 'pelamar-c@example.com',
        'phone' => '083333333333',
        'cover_letter' => 'Saya siap',
        'newsletter_consent' => true,
        'cv' => UploadedFile::fake()->create('cv.pdf', 100, 'application/pdf'),
    ]);

    $response->assertSessionHas('success');

    $subscription->refresh();

    expect($subscription->status)->toBe(NewsletterSubscriptionStatus::Subscribed);
    expect($subscription->is_subscribed)->toBeTrue();
    expect($subscription->verification_token)->toBeNull();
});
