# Thesis Use Case Compliance Matrix

| Modul | Use Case | Endpoint/Resource | Policy/Permission | Test | Status |
|---|---|---|---|---|---|
| Konten Publik | Lihat konten publik | `/`, `/menu`, `/team`, `/locations`, `/gallery`, `/blog` | Public route | `tests/Feature/ExampleTest.php` | Compliant |
| Data Karyawan | CRUD karyawan | `EmployeeResource` | `EmployeePolicy` + Shield perms | (to be expanded) | Partial |
| Newsletter | Subscribe + verify (double opt-in) | `POST /newsletter/subscribe`, `GET /newsletter/verify/{token}` | `NewsletterSubscriptionPolicy::broadcast`, subscription status transitions | `tests/Feature/NewsletterDoubleOptInTest.php` | Compliant |
| E-Recruitment | Submit lamaran + status workflow | `POST /careers/apply`, `JobApplicationResource` actions | `JobApplicationPolicy::{review,shortlist,hire,reject}` + custom perms | `tests/Feature/AuthorizationMatrixTest.php` | Compliant |
| RBAC | Role-based access internal | Shield roles (`super_admin`, `manager_cabang`, `peninjau`, `user`) | Seeder sync ke permission Shield naming | `tests/Feature/AuthorizationMatrixTest.php` | Compliant |

## Notes

- Security scope aligns with thesis scope (functional authorization baseline), not full penetration testing.
- Additional hardening recommended for CV uploads (malware scanning and signed-access strategy).
