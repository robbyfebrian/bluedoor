<?php

use App\Enums\JobApplicationStatus;
use App\Models\Branch;
use App\Models\Employee;
use App\Models\JobApplication;
use App\Models\JobOpening;
use App\Models\User;
use App\Services\Recruitment\HireCandidateService;

function createBranchForHiring(): Branch
{
    return Branch::create([
        'name' => 'Cabang Hiring',
        'slug' => 'cabang-hiring',
        'code' => 'HIR01',
        'address' => 'Jl. Hiring No.1',
        'city' => 'Bandung',
        'province' => 'Jawa Barat',
        'postal_code' => '40111',
        'phone' => '081234567891',
        'email' => 'hiring@branch.id',
    ]);
}

function createJobOpeningForHiring(Branch $branch): JobOpening
{
    return JobOpening::create([
        'branch_id' => $branch->id,
        'title' => 'Head Barista',
        'slug' => 'head-barista-hiring',
        'description' => 'Desc',
        'type' => 'full-time',
        'location' => 'Bandung',
        'is_active' => true,
    ]);
}

it('creates employee when candidate is hired', function () {
    $reviewer = User::factory()->create();
    $branch = createBranchForHiring();
    $opening = createJobOpeningForHiring($branch);

    $application = JobApplication::create([
        'job_opening_id' => $opening->id,
        'name' => 'Kandidat Baru',
        'email' => 'kandidat-baru@example.com',
        'phone' => '081000000001',
        'cv_path' => 'cvs/test.pdf',
        'status' => JobApplicationStatus::Shortlisted,
    ]);

    $employee = app(HireCandidateService::class)->hire($application, $reviewer->id);

    $application->refresh();

    expect($application->status)->toBe(JobApplicationStatus::Hired);
    expect($application->reviewed_by)->toBe($reviewer->id);
    expect($employee->email)->toBe('kandidat-baru@example.com');
    expect($employee->position)->toBe('Head Barista');
    expect($employee->branch_id)->toBe($branch->id);
    expect($employee->is_active)->toBeTrue();
});

it('updates existing employee instead of creating duplicate on hire', function () {
    $reviewer = User::factory()->create();
    $branch = createBranchForHiring();
    $opening = createJobOpeningForHiring($branch);

    Employee::create([
        'name' => 'Nama Lama',
        'email' => 'kandidat-lama@example.com',
        'position' => 'Cashier',
        'branch_id' => null,
        'is_active' => false,
    ]);

    $application = JobApplication::create([
        'job_opening_id' => $opening->id,
        'name' => 'Nama Baru',
        'email' => 'kandidat-lama@example.com',
        'phone' => '081000000002',
        'cv_path' => 'cvs/test-2.pdf',
        'status' => JobApplicationStatus::Shortlisted,
    ]);

    app(HireCandidateService::class)->hire($application, $reviewer->id);

    $employees = Employee::where('email', 'kandidat-lama@example.com')->get();

    expect($employees)->toHaveCount(1);
    expect($employees->first()->name)->toBe('Nama Baru');
    expect($employees->first()->position)->toBe('Head Barista');
    expect($employees->first()->branch_id)->toBe($branch->id);
    expect($employees->first()->is_active)->toBeTrue();
});
