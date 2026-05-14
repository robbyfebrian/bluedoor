<?php

namespace App\Services\Recruitment;

use App\Enums\JobApplicationStatus;
use App\Models\Employee;
use App\Models\JobApplication;
use Illuminate\Support\Facades\DB;

class HireCandidateService
{
    public function hire(JobApplication $application, int $reviewerId): Employee
    {
        return DB::transaction(function () use ($application, $reviewerId): Employee {
            $application->loadMissing('jobOpening');
            $application->transitionTo(JobApplicationStatus::Hired, $reviewerId);

            $payload = [
                'name' => $application->name,
                'email' => $application->email,
                'position' => $application->jobOpening?->title ?? 'Staff',
                'branch_id' => $application->jobOpening?->branch_id,
                'is_active' => true,
            ];

            $employee = Employee::query()
                ->where('email', $application->email)
                ->first();

            if ($employee) {
                $employee->fill($payload);
                $employee->save();

                return $employee;
            }

            return Employee::create($payload);
        });
    }
}
