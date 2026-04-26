<?php

namespace Database\Seeders;

use App\Models\Branch;
use App\Models\Employee;
use App\Models\JobOpening;
use App\Models\MenuCategory;
use App\Models\MenuItem;
use App\Models\Review;
use App\Models\BlogPost;
use App\Models\GalleryImage;
use App\Models\NewsletterSubscription;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Carbon;

class CoffeeShopSeeder extends Seeder
{
    public function run(): void
    {
        // ─────────────────────────────────────────────
        // BRANCHES
        // ─────────────────────────────────────────────
        $manager = User::where('email', 'manager-cabang@bluedoor.com')->first();

        $branchAlkateri = Branch::create([
            'name'         => 'Bluedoor Coffee – Alkateri',
            'slug'         => 'alkateri',
            'code'         => 'BDO01',
            'address'      => 'Jl. Alkateri No.2, Braga',
            'city'         => 'Kota Bandung',
            'province'     => 'Jawa Barat',
            'postal_code'  => '40111',
            'phone'        => '(022) 1234-5678',
            'email'        => 'alkateri@bluedoor.id',
            'opening_time' => '07:00:00',
            'closing_time' => '22:00:00',
            'is_active'    => true,
            'manager_id'   => $manager?->id,
        ]);

        $branchKarangTineung = Branch::create([
            'name'         => 'Bluedoor Coffee – Karang Tineung',
            'slug'         => 'karang-tineung',
            'code'         => 'BDO02',
            'address'      => 'Jl. Karang Tineung No.9, Cipedes',
            'city'         => 'Kota Bandung',
            'province'     => 'Jawa Barat',
            'postal_code'  => '40162',
            'phone'        => '(022) 8765-4321',
            'email'        => 'karangtineung@bluedoor.id',
            'opening_time' => '08:00:00',
            'closing_time' => '23:00:00',
            'is_active'    => true,
            'manager_id'   => null,
        ]);

        $branchImamBonjol = Branch::create([
            'name'         => 'Bluedoor Coffee – Imam Bonjol',
            'slug'         => 'imam-bonjol',
            'code'         => 'SBY01',
            'address'      => 'Jl. Imam Bonjol No.21, Tegalsari',
            'city'         => 'Surabaya',
            'province'     => 'Jawa Timur',
            'postal_code'  => '60264',
            'phone'        => '(031) 2345-6789',
            'email'        => 'imambonjol@bluedoor.id',
            'opening_time' => '08:00:00',
            'closing_time' => '22:00:00',
            'is_active'    => true,
            'manager_id'   => null,
        ]);

        $branchMartadinata = Branch::create([
            'name'         => 'Bluedoor Coffee – Martadinata',
            'slug'         => 'martadinata',
            'code'         => 'SOC01',
            'address'      => 'Jl. RE. Martadinata No.15, Jebres',
            'city'         => 'Kota Surakarta',
            'province'     => 'Jawa Tengah',
            'postal_code'  => '57128',
            'phone'        => '(0271) 3456-7890',
            'email'        => 'martadinata@bluedoor.id',
            'opening_time' => '08:00:00',
            'closing_time' => '22:00:00',
            'is_active'    => true,
            'manager_id'   => null,
        ]);

        $branchDharmawangsa = Branch::create([
            'name'         => 'Bluedoor Coffee – Dharmawangsa',
            'slug'         => 'dharmawangsa',
            'code'         => 'JKT01',
            'address'      => 'Jl. Dharmawangsa Raya No.8a, Pulo',
            'city'         => 'Kota Jakarta Selatan',
            'province'     => 'DKI Jakarta',
            'postal_code'  => '12160',
            'phone'        => '(021) 4567-8901',
            'email'        => 'dharmawangsa@bluedoor.id',
            'opening_time' => '07:00:00',
            'closing_time' => '22:00:00',
            'is_active'    => true,
            'manager_id'   => null,
        ]);

        $branchMenteng = Branch::create([
            'name'         => 'Bluedoor Coffee – Menteng',
            'slug'         => 'menteng',
            'code'         => 'JKT02',
            'address'      => 'Jl. Cikini IV No.22, Menteng',
            'city'         => 'Kota Jakarta Pusat',
            'province'     => 'DKI Jakarta',
            'postal_code'  => '10330',
            'phone'        => '(021) 5678-9012',
            'email'        => 'menteng@bluedoor.id',
            'opening_time' => '07:00:00',
            'closing_time' => '22:00:00',
            'is_active'    => true,
            'manager_id'   => null,
        ]);

        $branchMelbourne = Branch::create([
            'name'         => 'Bluedoor Coffee – Melbourne',
            'slug'         => 'melbourne',
            'code'         => 'MEL01',
            'address'      => '19 Somerset Pl',
            'city'         => 'Melbourne',
            'province'     => 'VIC',
            'postal_code'  => '3000',
            'phone'        => '+61 3 1234 5678',
            'email'        => 'melbourne@bluedoor.id',
            'opening_time' => '07:00:00',
            'closing_time' => '17:00:00',
            'is_active'    => true,
            'manager_id'   => null,
        ]);

        $branchKotaLama = Branch::create([
            'name'         => 'Bluedoor Coffee – Kota Lama',
            'slug'         => 'kota-lama',
            'code'         => 'SRG01',
            'address'      => 'Opening Soon',
            'city'         => 'Semarang',
            'province'     => 'Jawa Tengah',
            'postal_code'  => '50174',
            'phone'        => '-',
            'email'        => 'kotalama@bluedoor.id',
            'opening_time' => '08:00:00',
            'closing_time' => '22:00:00',
            'is_active'    => false, // Opening Soon
            'manager_id'   => null,
        ]);

        // ─────────────────────────────────────────────
        // MENU CATEGORIES
        // ─────────────────────────────────────────────
        $espresso = MenuCategory::create([
            'branch_id'   => null, // Berlaku untuk semua cabang
            'name'        => 'Kopi Espresso',
            'slug'        => 'kopi-espresso',
            'description' => 'Minuman kopi berbasis espresso pilihan barista kami',
            'is_active'   => true,
        ]);

        $manual = MenuCategory::create([
            'branch_id'   => null,
            'name'        => 'Manual Brew',
            'slug'        => 'manual-brew',
            'description' => 'Kopi seduh manual dengan biji pilihan dari petani lokal Indonesia',
            'is_active'   => true,
        ]);

        $nonKopi = MenuCategory::create([
            'branch_id'   => null,
            'name'        => 'Non-Kopi',
            'slug'        => 'non-kopi',
            'description' => 'Pilihan minuman tanpa kopi untuk menemani waktu santaimu',
            'is_active'   => true,
        ]);

        $makanan = MenuCategory::create([
            'branch_id'   => null,
            'name'        => 'Makanan & Camilan',
            'slug'        => 'makanan-camilan',
            'description' => 'Hidangan ringan dan camilan pelengkap kopi favorit Anda',
            'is_active'   => true,
        ]);

        // ─────────────────────────────────────────────
        // MENU ITEMS – Kopi Espresso
        // ─────────────────────────────────────────────
        MenuItem::create([
            'branch_id'        => null,
            'menu_category_id' => $espresso->id,
            'name'             => 'Cappuccino',
            'slug'             => 'cappuccino',
            'description'      => 'Espresso dengan susu steam dan busa susu lembut yang sempurna',
            'price'            => 35000,
            'is_available'     => true,
            'is_featured'      => true,
        ]);

        MenuItem::create([
            'branch_id'        => null,
            'menu_category_id' => $espresso->id,
            'name'             => 'Caffe Latte',
            'slug'             => 'caffe-latte',
            'description'      => 'Espresso dengan banyak susu steam dan sedikit busa, creamy dan halus',
            'price'            => 38000,
            'is_available'     => true,
            'is_featured'      => true,
        ]);

        MenuItem::create([
            'branch_id'        => null,
            'menu_category_id' => $espresso->id,
            'name'             => 'Americano',
            'slug'             => 'americano',
            'description'      => 'Espresso double shot yang diseduh dengan air panas, bold dan clean',
            'price'            => 30000,
            'is_available'     => true,
        ]);

        MenuItem::create([
            'branch_id'        => null,
            'menu_category_id' => $espresso->id,
            'name'             => 'Kopi Susu Aren',
            'slug'             => 'kopi-susu-aren',
            'description'      => 'Espresso dengan susu segar dan gula aren asli Jawa, manis alami khas Indonesia',
            'price'            => 32000,
            'is_available'     => true,
            'is_featured'      => true,
        ]);

        MenuItem::create([
            'branch_id'        => null,
            'menu_category_id' => $espresso->id,
            'name'             => 'Flat White',
            'slug'             => 'flat-white',
            'description'      => 'Ristretto shot dengan micro-foam susu yang silky, ukuran lebih kecil dan lebih pekat',
            'price'            => 40000,
            'is_available'     => true,
        ]);

        // ─────────────────────────────────────────────
        // MENU ITEMS – Manual Brew
        // ─────────────────────────────────────────────
        MenuItem::create([
            'branch_id'        => null,
            'menu_category_id' => $manual->id,
            'name'             => 'Pour Over Flores Bajawa',
            'slug'             => 'pour-over-flores-bajawa',
            'description'      => 'Single origin dari dataran tinggi Bajawa, Flores – fruity, sweet, dengan aftertaste cokelat',
            'price'            => 45000,
            'is_available'     => true,
            'is_featured'      => true,
        ]);

        MenuItem::create([
            'branch_id'        => null,
            'menu_category_id' => $manual->id,
            'name'             => 'V60 Toraja Sapan',
            'slug'             => 'v60-toraja-sapan',
            'description'      => 'Biji Arabika Toraja Sapan proses natural, body full dengan note rempah yang khas',
            'price'            => 48000,
            'is_available'     => true,
            'is_featured'      => true,
        ]);

        MenuItem::create([
            'branch_id'        => null,
            'menu_category_id' => $manual->id,
            'name'             => 'Cold Brew Gayo',
            'slug'             => 'cold-brew-gayo',
            'description'      => 'Kopi Arabika Gayo diseduh dingin selama 18 jam, smooth dan rendah asam, cocok untuk hari panas',
            'price'            => 42000,
            'is_available'     => true,
            'is_featured'      => true,
        ]);

        MenuItem::create([
            'branch_id'        => null,
            'menu_category_id' => $manual->id,
            'name'             => 'Aeropress Mandailing',
            'slug'             => 'aeropress-mandailing',
            'description'      => 'Robusta-Arabika blend dari Mandailing Natal diseduh dengan Aeropress, body tebal dengan sentuhan earthy',
            'price'            => 40000,
            'is_available'     => true,
        ]);

        // ─────────────────────────────────────────────
        // MENU ITEMS – Non-Kopi
        // ─────────────────────────────────────────────
        MenuItem::create([
            'branch_id'        => null,
            'menu_category_id' => $nonKopi->id,
            'name'             => 'Matcha Latte',
            'slug'             => 'matcha-latte',
            'description'      => 'Matcha premium Jepang dengan susu oat lokal, creamy dan sedikit pahit yang menyegarkan',
            'price'            => 38000,
            'is_available'     => true,
            'is_featured'      => true,
        ]);

        MenuItem::create([
            'branch_id'        => null,
            'menu_category_id' => $nonKopi->id,
            'name'             => 'Cokelat Panas',
            'slug'             => 'cokelat-panas',
            'description'      => 'Minuman cokelat panas dari biji kakao asli Sulawesi, kaya dan hangat',
            'price'            => 35000,
            'is_available'     => true,
        ]);

        MenuItem::create([
            'branch_id'        => null,
            'menu_category_id' => $nonKopi->id,
            'name'             => 'Es Teh Tarik',
            'slug'             => 'es-teh-tarik',
            'description'      => 'Teh susu khas Melayu yang ditarik agar terbentuk busa alami, segar dan creamy',
            'price'            => 28000,
            'is_available'     => true,
        ]);

        // ─────────────────────────────────────────────
        // MENU ITEMS – Makanan & Camilan
        // ─────────────────────────────────────────────
        MenuItem::create([
            'branch_id'        => null,
            'menu_category_id' => $makanan->id,
            'name'             => 'Roti Bakar Selai Kacang',
            'slug'             => 'roti-bakar-selai-kacang',
            'description'      => 'Roti sourdough tebal panggang dengan selai kacang homemade dan madu hutan',
            'price'            => 32000,
            'allergens'        => ['gluten', 'kacang'],
            'is_available'     => true,
            'is_featured'      => true,
        ]);

        MenuItem::create([
            'branch_id'        => null,
            'menu_category_id' => $makanan->id,
            'name'             => 'Pisang Goreng Krispi',
            'slug'             => 'pisang-goreng-krispi',
            'description'      => 'Pisang kepok pilihan, digoreng garing dengan balutan tepung renyah, disajikan dengan saus karamel aren',
            'price'            => 25000,
            'allergens'        => ['gluten'],
            'is_available'     => true,
            'is_featured'      => true,
        ]);

        MenuItem::create([
            'branch_id'        => null,
            'menu_category_id' => $makanan->id,
            'name'             => 'Cheesecake Pandan',
            'slug'             => 'cheesecake-pandan',
            'description'      => 'Cheesecake lembut dengan aroma pandan asli, perpaduan cita rasa nusantara dan Western dessert',
            'price'            => 35000,
            'allergens'        => ['gluten', 'susu', 'telur'],
            'is_available'     => true,
            'is_featured'      => true,
        ]);

        MenuItem::create([
            'branch_id'        => null,
            'menu_category_id' => $makanan->id,
            'name'             => 'Sandwich Ayam Geprek',
            'slug'             => 'sandwich-ayam-geprek',
            'description'      => 'Ayam geprek crispy dengan saus sambal matah, selada, dan tomat segar dalam roti ciabatta',
            'price'            => 45000,
            'allergens'        => ['gluten'],
            'is_available'     => true,
        ]);

        // ─────────────────────────────────────────────
        // EMPLOYEES
        // ─────────────────────────────────────────────
        Employee::create([
            'branch_id' => $branchMenteng->id,
            'name'      => 'Dewi Rahayu',
            'position'  => 'Pendiri & Head Barista',
            'bio'       => 'Dewi mendirikan Bluedoor Coffee pada 2020 dengan visi menciptakan ruang komunitas yang hangat melalui secangkir kopi berkualitas tinggi dari biji pilihan petani lokal Indonesia.',
            'is_active' => true,
        ]);

        Employee::create([
            'branch_id' => $branchMenteng->id,
            'name'      => 'Raka Firmansyah',
            'position'  => 'Lead Barista & Coffee Trainer',
            'bio'       => 'Raka memiliki pengalaman 7 tahun di industri kopi spesialti Indonesia. Juara 2 Indonesian Barista Championship 2022, ia gemar mengeksplorasi karakter unik biji kopi Nusantara.',
            'is_active' => true,
        ]);

        Employee::create([
            'branch_id' => $branchMenteng->id,
            'name'      => 'Siti Nurhaliza Wibowo',
            'position'  => 'Chef Pastry',
            'bio'       => 'Siti adalah lulusan terbaik Sekolah Tinggi Pariwisata NHI Bandung yang berspesialisasi dalam fusion pastry: memadukan teknik Prancis dengan bahan-bahan lokal seperti pandan, gula aren, dan kelapa.',
            'is_active' => true,
        ]);

        Employee::create([
            'branch_id' => $branchDharmawangsa->id,
            'name'      => 'Bagas Prasetyo',
            'position'  => 'Barista',
            'bio'       => 'Bagas bergabung sejak 2022 dan dikenal karena latte art-nya yang presisi. Ia sangat aktif mengedukasi pelanggan soal perbedaan karakter kopi dari berbagai daerah di Indonesia.',
            'is_active' => true,
        ]);

        Employee::create([
            'branch_id' => $branchAlkateri->id,
            'name'      => 'Anisa Kusuma Dewi',
            'position'  => 'Barista & Shift Supervisor',
            'bio'       => 'Anisa memimpin tim di cabang Alkateri Bandung dengan semangat pelayanan prima. Latar belakangnya di bidang hospitality membuatnya selalu mengutamakan pengalaman terbaik untuk setiap tamu.',
            'is_active' => true,
        ]);

        Employee::create([
            'branch_id' => $branchDharmawangsa->id,
            'name'      => 'Tari Anggraini',
            'position'  => 'Asisten Chef Pastry',
            'bio'       => 'Tari memiliki kecintaan mendalam pada kue tradisional Indonesia. Ia berkolaborasi dengan Head Chef untuk menciptakan kreasi pastry perpaduan lokal dan barat yang memanjakan lidah pelanggan di Kemang.',
            'is_active' => true,
        ]);

        Employee::create([
            'branch_id' => $branchDharmawangsa->id,
            'name'      => 'Budi Santoso',
            'position'  => 'Barista Senior',
            'bio'       => 'Dengan 5 tahun pengalaman di skena kopi Jakarta Selatan, Budi adalah andalan saat jam sibuk. Ia selalu memastikan setiap cangkir kopi keluar dengan standar kualitas yang presisi.',
            'is_active' => true,
        ]);

        Employee::create([
            'branch_id' => $branchAlkateri->id,
            'name'      => 'Reza Pahlawan',
            'position'  => 'Head Roaster',
            'bio'       => 'Berbasis di fasilitas roasting kami di Dago, Reza bertanggung jawab atas profil sangrai seluruh biji kopi Bluedoors. Ia selalu memastikan setiap batch mengeluarkan potensi rasa maksimalnya.',
            'is_active' => true,
        ]);

        Employee::create([
            'branch_id' => $branchAlkateri->id,
            'name'      => 'Dina Mariana',
            'position'  => 'Barista',
            'bio'       => 'Dina memiliki energi yang menular. Senyumnya selalu menyapa setiap pengunjung di cabang Alkateri. Ia ahli merekomendasikan beans yang pas sesuai suasana hati pelanggan.',
            'is_active' => true,
        ]);

        // ─────────────────────────────────────────────
        // JOB OPENINGS
        // ─────────────────────────────────────────────

        // ── Bandung – Alkateri ────────────────────────
        JobOpening::create([
            'branch_id'        => $branchAlkateri->id,
            'title'            => 'Barista',
            'slug'             => 'barista-alkateri-bandung',
            'description'      => '<p>Bluedoor Coffee cabang Alkateri Bandung membuka lowongan barista baru!</p><p>Kami mengundang kamu yang cinta kopi dan ingin berkembang dalam industri kopi spesialti untuk bergabung bersama kami di jantung kawasan Braga, Bandung.</p>',
            'type'             => 'full-time',
            'location'         => 'Bandung',
            'requirements'     => '<ul><li>Domisili Bandung atau sekitarnya</li><li>Pengalaman barista diutamakan, namun fresh graduate dengan passion kopi dipersilakan mendaftar</li><li>Antusias belajar tentang kopi Nusantara</li><li>Siap bekerja dalam tim yang dinamis termasuk akhir pekan</li></ul>',
            'responsibilities' => '<ul><li>Menyeduh kopi espresso dan manual brew sesuai standar kualitas Bluedoor</li><li>Melayani pelanggan dengan penuh keramahan dan profesionalisme</li><li>Menjaga kebersihan dan kerapian area bar</li><li>Aktif mengikuti training barista internal</li></ul>',
            'salary_min'       => 3500000,
            'salary_max'       => 4500000,
            'is_active'        => true,
            'closes_at'        => Carbon::now()->addMonths(2)->toDateString(),
        ]);

        JobOpening::create([
            'branch_id'        => $branchAlkateri->id,
            'title'            => 'Shift Supervisor',
            'slug'             => 'shift-supervisor-alkateri-bandung',
            'description'      => '<p>Kami mencari Shift Supervisor yang berpengalaman untuk memimpin operasional harian di cabang Alkateri, Bandung.</p><p>Posisi ini adalah kesempatan luar biasa bagi kamu yang ingin naik level dari barista senior menjadi pemimpin tim.</p>',
            'type'             => 'full-time',
            'location'         => 'Bandung',
            'requirements'     => '<ul><li>Pengalaman minimal 1 tahun sebagai barista senior atau supervisor di industri F&B</li><li>Kemampuan komunikasi dan kepemimpinan yang baik</li><li>Bersedia bekerja dengan jadwal rotasi termasuk malam dan akhir pekan</li><li>Mampu mengelola laporan kas harian</li></ul>',
            'responsibilities' => '<ul><li>Mengawasi operasional shift dan memastikan standar layanan terpenuhi</li><li>Membimbing dan mengevaluasi kinerja barista junior</li><li>Menangani keluhan pelanggan dengan sigap dan profesional</li><li>Membuat laporan harian dan melaporkan ke Branch Manager</li></ul>',
            'salary_min'       => 4500000,
            'salary_max'       => 6000000,
            'is_active'        => true,
            'closes_at'        => Carbon::now()->addMonths(2)->toDateString(),
        ]);

        // ── Bandung – Karang Tineung ──────────────────
        JobOpening::create([
            'branch_id'        => $branchKarangTineung->id,
            'title'            => 'Barista',
            'slug'             => 'barista-karang-tineung-bandung',
            'description'      => '<p>Cabang Karang Tineung Bandung kami yang terus berkembang membuka kesempatan bagi barista berbakat untuk bergabung!</p><p>Berlokasi di kawasan Cipedes yang ramai, kamu akan menjadi wajah Bluedoor Coffee bagi pelanggan setia kami setiap harinya.</p>',
            'type'             => 'full-time',
            'location'         => 'Bandung',
            'requirements'     => '<ul><li>Domisili Bandung atau sekitarnya</li><li>Pengalaman barista minimal 6 bulan (diutamakan)</li><li>Bersemangat dalam memberikan pelayanan terbaik</li><li>Mampu bekerja dalam tekanan di jam sibuk</li></ul>',
            'responsibilities' => '<ul><li>Menyeduh minuman kopi dan non-kopi sesuai standar resep Bluedoor</li><li>Menjaga konsistensi kualitas rasa setiap minuman</li><li>Membantu pengelolaan stok bahan baku bar</li><li>Menjaga kebersihan dan sanitasi area kerja</li></ul>',
            'salary_min'       => 3500000,
            'salary_max'       => 4500000,
            'is_active'        => true,
            'closes_at'        => Carbon::now()->addMonths(2)->toDateString(),
        ]);

        JobOpening::create([
            'branch_id'        => $branchKarangTineung->id,
            'title'            => 'Kasir',
            'slug'             => 'kasir-karang-tineung-bandung',
            'description'      => '<p>Bluedoor Coffee Karang Tineung membuka posisi Kasir untuk melengkapi tim kami yang solid!</p><p>Kamu akan menjadi titik pertama interaksi pelanggan kami — pastikan setiap orang yang datang merasa disambut dengan hangat.</p>',
            'type'             => 'full-time',
            'location'         => 'Bandung',
            'requirements'     => '<ul><li>Pendidikan minimal SMA/SMK sederajat</li><li>Jujur, teliti, dan cekatan dalam bekerja</li><li>Mampu mengoperasikan mesin kasir dan aplikasi POS</li><li>Ramah dan komunikatif kepada pelanggan</li></ul>',
            'responsibilities' => '<ul><li>Melayani transaksi pembayaran pelanggan dengan akurat</li><li>Memastikan kesesuaian pesanan dengan tagihan</li><li>Menjaga ketertiban dan keamanan area kasir</li><li>Membantu membuat laporan transaksi harian</li></ul>',
            'salary_min'       => 3000000,
            'salary_max'       => 3800000,
            'is_active'        => true,
            'closes_at'        => Carbon::now()->addMonths(1)->toDateString(),
        ]);

        // ── Surabaya – Imam Bonjol ────────────────────
        JobOpening::create([
            'branch_id'        => $branchImamBonjol->id,
            'title'            => 'Barista',
            'slug'             => 'barista-imam-bonjol-surabaya',
            'description'      => '<p>Bluedoor Coffee hadir di Surabaya dan kami sedang mencari barista terbaik untuk memperkuat tim kami di cabang Imam Bonjol!</p><p>Jadilah bagian dari misi kami memperkenalkan kopi spesialti Indonesia kepada warga Kota Pahlawan.</p>',
            'type'             => 'full-time',
            'location'         => 'Surabaya',
            'requirements'     => '<ul><li>Domisili Surabaya atau sekitarnya</li><li>Pengalaman sebagai barista minimal 6 bulan diutamakan</li><li>Bersedia ditraining selama 2 minggu sebelum penempatan</li><li>Energetik, ramah, dan berorientasi pelanggan</li></ul>',
            'responsibilities' => '<ul><li>Menyeduh espresso drinks dan manual brew sesuai standar Bluedoor</li><li>Membantu mengedukasi pelanggan mengenai menu kopi spesialti kami</li><li>Menjaga kualitas dan konsistensi setiap sajian</li><li>Berkoordinasi dengan tim dapur untuk kelancaran operasional</li></ul>',
            'salary_min'       => 3800000,
            'salary_max'       => 4800000,
            'is_active'        => true,
            'closes_at'        => Carbon::now()->addMonths(2)->toDateString(),
        ]);

        JobOpening::create([
            'branch_id'        => $branchImamBonjol->id,
            'title'            => 'Asisten Chef Pastry',
            'slug'             => 'asisten-chef-pastry-imam-bonjol-surabaya',
            'description'      => '<p>Kami membuka posisi Asisten Chef Pastry di cabang Surabaya untuk memperkuat lini makanan dan camilan kami!</p><p>Kamu akan berkolaborasi langsung dengan tim dapur pusat dalam menghadirkan produk pastry fusion lokal terbaik.</p>',
            'type'             => 'full-time',
            'location'         => 'Surabaya',
            'requirements'     => '<ul><li>Pengalaman di bidang baking atau pastry minimal 1 tahun</li><li>Memahami teknik dasar pastry dan baking</li><li>Bersedia bekerja mulai pukul 05.00 WIB</li><li>Memiliki atau bersedia mengurus sertifikat food handler</li></ul>',
            'responsibilities' => '<ul><li>Membantu produksi bakery dan pastry harian</li><li>Menjaga standar kualitas dan konsistensi produk</li><li>Memastikan kebersihan dapur dan kepatuhan terhadap standar keamanan pangan</li><li>Membantu pengembangan menu baru berbahan lokal Nusantara</li></ul>',
            'salary_min'       => 3000000,
            'salary_max'       => 4000000,
            'is_active'        => true,
            'closes_at'        => Carbon::now()->addMonths(2)->toDateString(),
        ]);

        // ── Solo – Martadinata ────────────────────────
        JobOpening::create([
            'branch_id'        => $branchMartadinata->id,
            'title'            => 'Barista',
            'slug'             => 'barista-martadinata-solo',
            'description'      => '<p>Bluedoor Coffee cabang Solo – Martadinata membuka kesempatan bagi pecinta kopi berbakat untuk bergabung!</p><p>Kami percaya bahwa Solo dengan budaya nongkrong-nya yang kuat adalah ladang subur bagi kopi spesialti berkualitas.</p>',
            'type'             => 'full-time',
            'location'         => 'Kota Surakarta',
            'requirements'     => '<ul><li>Domisili Solo/Surakarta atau sekitarnya</li><li>Pengalaman barista diutamakan, fresh graduate dengan passion kopi dipersilakan mendaftar</li><li>Mampu bekerja sama dalam tim yang solid</li><li>Bersedia bekerja di akhir pekan dan hari libur nasional</li></ul>',
            'responsibilities' => '<ul><li>Menyeduh kopi espresso dan manual brew sesuai standar resep</li><li>Memberikan pelayanan pelanggan yang hangat dan berkesan</li><li>Menjaga kebersihan, kerapian, dan kesiapan area bar setiap saat</li><li>Mengikuti program pelatihan barista berkala dari tim pusat</li></ul>',
            'salary_min'       => 3200000,
            'salary_max'       => 4200000,
            'is_active'        => true,
            'closes_at'        => Carbon::now()->addMonths(3)->toDateString(),
        ]);

        JobOpening::create([
            'branch_id'        => $branchMartadinata->id,
            'title'            => 'Branch Manager',
            'slug'             => 'branch-manager-martadinata-solo',
            'description'      => '<p>Kami mencari Branch Manager berpengalaman untuk memimpin dan mengembangkan cabang Bluedoor Coffee di Solo!</p><p>Posisi strategis ini cocok bagi profesional F&B yang ingin membawa dampak nyata bagi bisnis dan komunitas lokal.</p>',
            'type'             => 'full-time',
            'location'         => 'Kota Surakarta',
            'requirements'     => '<ul><li>Pengalaman minimal 3 tahun sebagai Branch Manager atau posisi setara di industri F&B atau ritel</li><li>Kemampuan manajemen tim, operasional, dan keuangan yang kuat</li><li>Memiliki jiwa kepemimpinan dan orientasi pada target bisnis</li><li>Berdomisili atau bersedia pindah ke Solo</li><li>Mampu berkomunikasi secara efektif dengan tim pusat</li></ul>',
            'responsibilities' => '<ul><li>Memimpin seluruh operasional harian cabang Solo</li><li>Mengelola, melatih, dan mengembangkan SDM cabang</li><li>Memastikan target penjualan, kualitas layanan, dan standar Bluedoor terpenuhi</li><li>Membuat laporan kinerja cabang secara berkala kepada manajemen pusat</li><li>Menjalin hubungan baik dengan komunitas dan pelanggan lokal</li></ul>',
            'salary_min'       => 7000000,
            'salary_max'       => 10000000,
            'is_active'        => true,
            'closes_at'        => Carbon::now()->addMonths(1)->toDateString(),
        ]);

        // ── Jakarta Selatan – Dharmawangsa ────────────
        JobOpening::create([
            'branch_id'        => $branchDharmawangsa->id,
            'title'            => 'Supervisor Shift',
            'slug'             => 'supervisor-shift-dharmawangsa',
            'description'      => '<p>Kami mencari Supervisor Shift berpengalaman untuk memimpin operasional di cabang Dharmawangsa!</p><p>Posisi ini bertanggung jawab mengawasi jalannya operasional harian, mengelola tim, dan memastikan standar layanan Bluedoor Coffee terpenuhi.</p>',
            'type'             => 'full-time',
            'location'         => 'Jakarta Selatan',
            'requirements'     => '<ul><li>Pengalaman minimal 2 tahun sebagai supervisor di industri F&B</li><li>Kemampuan leadership dan komunikasi yang kuat</li><li>Terbiasa menangani transaksi dan laporan keuangan harian</li><li>Jadwal fleksibel termasuk malam dan akhir pekan</li></ul>',
            'responsibilities' => '<ul><li>Mengawasi operasional shift dan jadwal tim</li><li>Melatih dan mengembangkan anggota tim</li><li>Menangani keluhan dan masukan pelanggan</li><li>Mengawasi kas dan laporan harian</li><li>Memastikan standar kualitas dan keamanan pangan</li></ul>',
            'salary_min'       => 5500000,
            'salary_max'       => 7500000,
            'is_active'        => true,
            'closes_at'        => Carbon::now()->addMonths(3)->toDateString(),
        ]);

        JobOpening::create([
            'branch_id'        => $branchDharmawangsa->id,
            'title'            => 'Barista',
            'slug'             => 'barista-dharmawangsa-jakarta',
            'description'      => '<p>Cabang Dharmawangsa kami di Jakarta Selatan terus berkembang dan kami membutuhkan barista berbakat untuk memperkuat tim!</p><p>Kamu akan bekerja di salah satu cabang paling ramai Bluedoor, melayani pelanggan dengan standar kualitas tertinggi.</p>',
            'type'             => 'full-time',
            'location'         => 'Jakarta Selatan',
            'requirements'     => '<ul><li>Pengalaman barista minimal 1 tahun</li><li>Memiliki kemampuan latte art menjadi nilai tambah</li><li>Bersedia bekerja dengan jadwal rotasi shift</li><li>Berpenampilan rapi dan komunikatif</li></ul>',
            'responsibilities' => '<ul><li>Menyeduh espresso drinks dan manual brew dengan konsistensi tinggi</li><li>Memberikan pelayanan prima kepada pelanggan</li><li>Membantu menjaga stok dan kelengkapan bahan baku</li><li>Berpartisipasi aktif dalam briefing tim harian</li></ul>',
            'salary_min'       => 4500000,
            'salary_max'       => 5500000,
            'is_active'        => true,
            'closes_at'        => Carbon::now()->addMonths(2)->toDateString(),
        ]);

        // ── Jakarta Pusat – Menteng ───────────────────
        JobOpening::create([
            'branch_id'        => $branchMenteng->id,
            'title'            => 'Barista',
            'slug'             => 'barista-menteng',
            'description'      => '<p>Kami sedang mencari barista yang bersemangat untuk bergabung di tim Bluedoor Coffee cabang Menteng!</p><p>Sebagai barista di Bluedoor Coffee, kamu akan menyeduh kopi terbaik, menciptakan pengalaman tak terlupakan bagi pelanggan, dan menjadi bagian dari tim yang suportif dan penuh passion.</p>',
            'type'             => 'full-time',
            'location'         => 'Jakarta Pusat',
            'requirements'     => '<ul><li>Pengalaman sebagai barista atau di bidang F&B minimal 6 bulan (diutamakan)</li><li>Passion terhadap kopi spesialti Indonesia</li><li>Bisa bekerja dengan jadwal fleksibel termasuk akhir pekan</li><li>Komunikatif dan ramah kepada pelanggan</li></ul>',
            'responsibilities' => '<ul><li>Menyeduh espresso drinks dan manual brew sesuai standar</li><li>Memberikan pelayanan pelanggan yang hangat dan profesional</li><li>Menjaga kebersihan area bar dan peralatan</li><li>Mempelajari dan menerapkan teknik latte art</li></ul>',
            'salary_min'       => 4000000,
            'salary_max'       => 5500000,
            'is_active'        => true,
            'closes_at'        => Carbon::now()->addMonths(2)->toDateString(),
        ]);

        JobOpening::create([
            'branch_id'        => $branchMenteng->id,
            'title'            => 'Asisten Chef Pastry',
            'slug'             => 'asisten-chef-pastry-menteng',
            'description'      => '<p>Bergabunglah dengan tim dapur kami sebagai Asisten Chef Pastry!</p><p>Kamu akan bekerja bersama Chef Pastry kami untuk membuat produk bakery dan dessert harian dengan sentuhan bahan-bahan lokal Nusantara yang unik.</p>',
            'type'             => 'part-time',
            'location'         => 'Jakarta Pusat',
            'requirements'     => '<ul><li>Pengalaman di bidang baking atau kuliner minimal 1 tahun</li><li>Memahami dasar-dasar teknik pastry</li><li>Bersedia masuk pagi (mulai pukul 05.00 WIB)</li><li>Memiliki sertifikat food handler atau bersedia mengikuti pelatihan</li></ul>',
            'responsibilities' => '<ul><li>Membantu produksi bakery harian</li><li>Menyiapkan pastry, kue, dan camilan lainnya</li><li>Menjaga kebersihan dapur dan standar keamanan pangan</li><li>Membantu pengembangan resep baru berbasis bahan lokal</li></ul>',
            'salary_min'       => 2500000,
            'salary_max'       => 3500000,
            'is_active'        => true,
            'closes_at'        => Carbon::now()->addMonths(1)->toDateString(),
        ]);

        JobOpening::create([
            'branch_id'        => $branchMenteng->id,
            'title'            => 'Social Media & Content Creator',
            'slug'             => 'social-media-content-creator-menteng',
            'description'      => '<p>Bluedoor Coffee membuka posisi Social Media & Content Creator berbasis di kantor pusat Menteng!</p><p>Kami mencari kreator konten yang bisa menerjemahkan semangat dan estetika Bluedoor ke dalam konten digital yang menarik dan autentik.</p>',
            'type'             => 'full-time',
            'location'         => 'Jakarta Pusat',
            'requirements'     => '<ul><li>Pengalaman minimal 1 tahun di bidang konten media sosial atau digital marketing</li><li>Menguasai fotografi dan videografi dasar (IG Reels, TikTok)</li><li>Familiar dengan tools editing seperti Adobe Lightroom, CapCut, atau sejenisnya</li><li>Memiliki sense of aesthetic yang kuat dan paham tren media sosial terkini</li><li>Passion terhadap dunia kopi dan F&B menjadi nilai tambah</li></ul>',
            'responsibilities' => '<ul><li>Membuat dan mengelola konten harian untuk Instagram, TikTok, dan platform lainnya</li><li>Merencanakan konten kalender bulanan bersama tim marketing</li><li>Melakukan pemotretan produk dan dokumentasi kegiatan cabang</li><li>Menganalisis performa konten dan memberikan laporan berkala</li><li>Berkolaborasi dengan tim untuk campaign promosi dan peluncuran menu baru</li></ul>',
            'salary_min'       => 4000000,
            'salary_max'       => 6000000,
            'is_active'        => true,
            'closes_at'        => Carbon::now()->addMonths(1)->toDateString(),
        ]);

        // ── Melbourne ─────────────────────────────────
        JobOpening::create([
            'branch_id'        => $branchMelbourne->id,
            'title'            => 'Barista',
            'slug'             => 'barista-melbourne',
            'description'      => '<p>Bluedoor Coffee is looking for a passionate barista to join our team at our Melbourne store on Somerset Pl!</p><p>Be part of our mission to bring the finest Indonesian specialty coffee culture to Melbourne\'s vibrant coffee scene.</p>',
            'type'             => 'part-time',
            'location'         => 'Melbourne, VIC',
            'requirements'     => '<ul><li>Previous barista experience of at least 1 year in a specialty coffee environment</li><li>Knowledge of espresso technique and manual brew methods</li><li>Current working rights in Australia</li><li>Excellent communication skills and a genuine passion for hospitality</li><li>Interest in Indonesian coffee origins is a strong plus</li></ul>',
            'responsibilities' => '<ul><li>Prepare and serve espresso-based drinks and manual brews to the highest standard</li><li>Educate customers about our Indonesian single-origin offerings</li><li>Maintain cleanliness and organisation of the bar area</li><li>Collaborate with the team to ensure a warm and welcoming atmosphere</li></ul>',
            'salary_min'       => 0,
            'salary_max'       => 0,
            'is_active'        => true,
            'closes_at'        => Carbon::now()->addMonths(2)->toDateString(),
        ]);

        JobOpening::create([
            'branch_id'        => $branchMelbourne->id,
            'title'            => 'Store Manager',
            'slug'             => 'store-manager-melbourne',
            'description'      => '<p>We are seeking an experienced Store Manager to lead operations at Bluedoor Coffee Melbourne!</p><p>This is a unique opportunity to bring Bluedoor\'s Indonesian coffee culture to life in Melbourne and help shape our presence in the Australian market.</p>',
            'type'             => 'full-time',
            'location'         => 'Melbourne, VIC',
            'requirements'     => '<ul><li>Minimum 3 years of experience in a café or restaurant management role</li><li>Strong knowledge of specialty coffee and café operations</li><li>Proven ability to lead, motivate, and develop a team</li><li>Current working rights in Australia</li><li>Experience with POS systems and financial reporting</li><li>Understanding of Indonesian coffee culture is an advantage</li></ul>',
            'responsibilities' => '<ul><li>Oversee all day-to-day operations of the Melbourne store</li><li>Recruit, train, and manage store staff</li><li>Ensure quality standards, customer satisfaction, and brand consistency</li><li>Manage inventory, ordering, and supplier relationships locally</li><li>Prepare weekly operational and financial reports for the head office</li></ul>',
            'salary_min'       => 0,
            'salary_max'       => 0,
            'is_active'        => true,
            'closes_at'        => Carbon::now()->addMonths(2)->toDateString(),
        ]);

        // ─────────────────────────────────────────────
        // REVIEWS
        // ─────────────────────────────────────────────
        $superAdmin = User::where('email', 'admin@bluedoor.com')->first();

        Review::create([
            'customer_name'  => 'Andi Pratama',
            'customer_email' => 'andi.pratama@gmail.com',
            'rating'         => 5,
            'comment'        => 'Kopi susu arennya enak banget! Manis alami gula arennya terasa tanpa berlebihan. Tempatnya juga nyaman buat WFH seharian. Pasti balik lagi!',
            'is_approved'    => true,
            'is_featured'    => true,
            'approved_at'    => Carbon::now()->subDays(10),
            'approved_by'    => $superAdmin?->id,
        ]);

        Review::create([
            'customer_name'  => 'Bunga Citra Lestari',
            'customer_email' => 'bungacl@yahoo.com',
            'rating'         => 5,
            'comment'        => 'Pour Over Flores Bajawa-nya luar biasa! Saya tidak menyangka single origin lokal bisa sepuitis ini. Raka sang barista juga sangat informatif menjelaskan profil rasa kopinya.',
            'is_approved'    => true,
            'is_featured'    => true,
            'approved_at'    => Carbon::now()->subDays(7),
            'approved_by'    => $superAdmin?->id,
        ]);

        Review::create([
            'customer_name'  => 'Rizki Maulana',
            'customer_email' => 'rizkimaulana@hotmail.com',
            'rating'         => 4,
            'comment'        => 'Cheesecake pandan-nya worth it banget. Tekstur lembut, aroma pandan kuat tapi tidak artifisial. Cappucino-nya juga konsisten enak setiap kali saya datang.',
            'is_approved'    => true,
            'is_featured'    => false,
            'approved_at'    => Carbon::now()->subDays(5),
            'approved_by'    => $superAdmin?->id,
        ]);

        Review::create([
            'customer_name'  => 'Mega Putri Wulandari',
            'customer_email' => 'mega.putri@gmail.com',
            'rating'         => 5,
            'comment'        => 'Pisang goreng krispinya nagih! Dipaduin sama cold brew Gayo, mantap sekali. Interiornya estetik dan pencahayaannya bagus buat foto. Recommended banget untuk hang out!',
            'is_approved'    => true,
            'is_featured'    => true,
            'approved_at'    => Carbon::now()->subDays(3),
            'approved_by'    => $superAdmin?->id,
        ]);

        Review::create([
            'customer_name'  => 'Hendra Gunawan',
            'customer_email' => null,
            'rating'         => 4,
            'comment'        => 'Cabang Kemang selalu ramai, tapi pelayanannya tetap cepat dan ramah. V60 Toraja Sapan-nya jadi favorit saya. Body-nya full, ada sedikit hint rempah yang unik.',
            'is_approved'    => true,
            'is_featured'    => false,
            'approved_at'    => Carbon::now()->subDays(1),
            'approved_by'    => $superAdmin?->id,
        ]);

        Review::create([
            'customer_name'  => 'Larasati Nugroho',
            'customer_email' => 'larasati.n@gmail.com',
            'rating'         => 3,
            'comment'        => 'Tempatnya bagus dan kopinya enak, tapi agak susah cari tempat duduk di jam makan siang. Semoga bisa tambah kapasitas atau buka jam lebih pagi.',
            'is_approved'    => false,
            'is_featured'    => false,
            'approved_at'    => null,
            'approved_by'    => null,
        ]);

        // ─────────────────────────────────────────────
        // BLOG POSTS
        // ─────────────────────────────────────────────
        $author = User::where('email', 'workflow-admin@bluedoor.com')->first() ?? $superAdmin;

        BlogPost::create([
            'title'          => 'Mengenal Kopi Arabika Gayo: Permata dari Tanah Aceh',
            'slug'           => 'mengenal-kopi-arabika-gayo-permata-dari-tanah-aceh',
            'excerpt'        => 'Kopi Gayo dari dataran tinggi Aceh adalah salah satu kopi terbaik di dunia. Yuk kenali karakteristik uniknya dan kenapa para pencinta kopi dunia sangat menggemarinya.',
            'content'        => '<p>Kopi Arabika Gayo berasal dari dataran tinggi Gayo di Provinsi Aceh, tumbuh pada ketinggian 1.200–1.700 meter di atas permukaan laut. Kondisi alam yang ideal—curah hujan yang cukup, tanah vulkanik yang subur, dan suhu yang sejuk—menjadikan Gayo sebagai salah satu penghasil kopi terbaik di dunia.</p><h2>Profil Rasa</h2><p>Kopi Gayo dikenal dengan body yang full dan kekentalan yang khas. Aroma rempah yang ringan, sedikit nuansa tanah (earthy), dan keasaman yang rendah hingga sedang menjadi ciri khasnya. Beberapa batch terbaik bahkan memiliki note cokelat hitam dan karamel yang kompleks.</p><h2>Proses Pengolahan</h2><p>Sebagian besar kopi Gayo diproses dengan metode wet-hulled atau "Giling Basah"—sebuah teknik yang lazim di Indonesia. Metode ini menghasilkan kandungan air yang lebih tinggi saat proses penggilingan, memberikan karakter body yang lebih berat dan rasa earthy yang khas.</p><h2>Mengapa Kami Mencintai Gayo</h2><p>Di Bluedoor Coffee, kami mendapatkan biji kopi Gayo langsung dari petani koperasi binaan di Bener Meriah, Aceh. Dengan kemitraan langsung ini, kami memastikan petani mendapatkan harga yang adil sekaligus menjaga kualitas biji kopi dari ladang hingga ke cangkir Anda.</p>',
            'category'       => 'tips',
            'tags'           => ['kopi gayo', 'single origin', 'aceh', 'arabika', 'kopi indonesia'],
            'status'         => 'published',
            'published_at'   => Carbon::now()->subDays(14),
            'author_id'      => $author->id,
            'views'          => 342,
        ]);

        BlogPost::create([
            'title'          => 'Resep: Kopi Susu Aren Ala Bluedoor di Rumah',
            'slug'           => 'resep-kopi-susu-aren-ala-blue-door-di-rumah',
            'excerpt'        => 'Kopi susu aren adalah minuman favorit pelanggan kami. Kini kami berbagi resep aslinya agar kamu bisa membuatnya sendiri di rumah!',
            'content'        => '<p>Kopi Susu Aren adalah menu best seller Bluedoor Coffee yang menggabungkan cita rasa espresso bold dengan manisnya gula aren asli dan kelembutan susu segar. Berikut adalah resep yang bisa kamu coba di rumah.</p><h2>Bahan-bahan</h2><ul><li>2 shot espresso (atau 40ml kopi seduh pekat)</li><li>150ml susu full cream, dingin</li><li>3 sdm gula aren cair (bisa dibeli di pasar atau supermarket)</li><li>Es batu secukupnya</li></ul><h2>Cara Membuat</h2><ol><li>Seduh 2 shot espresso dan biarkan dingin sebentar.</li><li>Siapkan gelas saji, isi dengan es batu hingga ¾ penuh.</li><li>Tuang gula aren cair ke dasar gelas.</li><li>Tambahkan susu dingin perlahan.</li><li>Tuang espresso di atas susu. Jangan diaduk agar terbentuk gradasi yang cantik!</li><li>Sajikan segera dan nikmati.</li></ol><p><strong>Tips:</strong> Gunakan gula aren asli dari Jawa atau Flores untuk mendapatkan rasa yang paling autentik. Hindari menggunakan palm sugar sintetis karena profil rasanya berbeda secara signifikan.</p>',
            'category'       => 'recipes',
            'tags'           => ['resep', 'kopi susu aren', 'gula aren', 'minuman kopi', 'diy kopi'],
            'status'         => 'published',
            'published_at'   => Carbon::now()->subDays(7),
            'author_id'      => $author->id,
            'views'          => 215,
        ]);

        BlogPost::create([
            'title'          => 'Grand Opening Bluedoor Coffee Cabang Dago, Bandung!',
            'slug'           => 'grand-opening-blue-door-coffee-dago-bandung',
            'excerpt'        => 'Kami dengan bangga mengumumkan pembukaan cabang ketiga Bluedoor Coffee di Dago, Bandung! Hadir dengan konsep baru yang lebih segar dan menu eksklusif.',
            'content'        => '<p>Bluedoor Coffee terus berkembang! Dengan penuh kegembiraan, kami mengumumkan grand opening cabang ketiga kami di Jl. Ir. H. Juanda No. 88, Dago, Bandung – tepat di jantung kawasan wisata dan kuliner Kota Kembang.</p><h2>Konsep Baru yang Lebih Segar</h2><p>Cabang Dago hadir dengan konsep "Garden Coffee Bar" – memadukan nuansa alam Bandung yang sejuk dengan interior modern yang hangat. Nikmati kopi favoritmu sambil dikelilingi tanaman hijau dan udara sejuk khas Bandung.</p><h2>Menu Eksklusif Cabang Bandung</h2><p>Untuk merayakan pembukaan ini, kami menghadirkan beberapa menu eksklusif yang terinspirasi dari kekayaan kuliner Jawa Barat, seperti <em>Bandrek Latte</em> dan <em>Klepon Cake</em>. Menu ini hanya tersedia di cabang Alkateri!</p><h2>Promo Pembukaan</h2><p>Dapatkan diskon 30% untuk semua minuman kopi selama 3 hari pertama pembukaan. Tunjukkan posting Instagram kamu di Bluedoor Coffee Dago dan dapatkan free upgrade size!</p>',
            'category'       => 'events',
            'tags'           => ['grand opening', 'bandung', 'dago', 'cabang baru', 'promo'],
            'status'         => 'published',
            'published_at'   => Carbon::now()->subDays(2),
            'author_id'      => $author->id,
            'views'          => 489,
        ]);

        BlogPost::create([
            'title'          => '5 Alasan Kenapa Kamu Harus Coba Manual Brew',
            'slug'           => '5-alasan-kenapa-harus-coba-manual-brew',
            'excerpt'        => 'Manual brew bukan sekadar tren. Di balik prosesnya yang penuh perhatian, ada secangkir kopi yang jauh lebih kaya rasa dan karakter dibanding kopi instan biasa.',
            'content'        => '<p>Bagi banyak orang, manual brew terdengar rumit dan eksklusif. Padahal, menyeduh kopi dengan tangan sendiri adalah salah satu pengalaman paling memuaskan yang bisa kamu rasakan sebagai pecinta kopi. Berikut 5 alasan mengapa kamu harus mencobanya:</p><ol><li><strong>Kontrol Penuh atas Rasa</strong> – Dengan manual brew, kamu bisa mengatur semua variabel: suhu air, kecepatan tuang, hingga rasio kopi dan air. Hasilnya? Rasa yang bisa kamu sesuaikan dengan seleramu sendiri.</li><li><strong>Menghargai Kerja Petani Kopi</strong> – Kopi single origin yang digunakan dalam manual brew memiliki jejak asal usul yang jelas. Kamu ikut mendukung petani kopi lokal Indonesia secara langsung.</li><li><strong>Pengalaman Meditasi</strong> – Proses menyeduh kopi secara manual mengharuskan kehadiran penuh dan kesabaran. Banyak yang menggambarkannya seperti meditasi pagi yang menenangkan.</li><li><strong>Profil Rasa yang Lebih Kompleks</strong> – Dibanding espresso yang terekstraksi dengan tekanan tinggi, manual brew cenderung mengungkap nuansa rasa yang lebih halus dan kompleks dari biji kopi.</li><li><strong>Lebih Hemat dalam Jangka Panjang</strong> – Investasi awal alat manual brew (V60, Aeropress, French Press) terjangkau dan tahan lama. Dalam jangka panjang, jauh lebih hemat dibanding membeli kopi setiap hari.</li></ol><p>Tertarik belajar manual brew? Bluedoor Coffee rutin mengadakan <em>Coffee Workshop</em> setiap bulan. Pantau terus media sosial kami untuk info jadwal selanjutnya!</p>',
            'category'       => 'tips',
            'tags'           => ['manual brew', 'v60', 'pour over', 'kopi spesialti', 'tips kopi'],
            'status'         => 'draft',
            'published_at'   => null,
            'author_id'      => $author->id,
            'views'          => 0,
        ]);

        // ─────────────────────────────────────────────
        // GALLERY IMAGES
        // ─────────────────────────────────────────────
        $galleryData = [
            ['title' => 'Latte Art Rosetta', 'description' => 'Latte art klasik rosetta buatan barista kami', 'category' => 'coffee'],
            ['title' => 'Pour Over V60 Toraja', 'description' => 'Proses seduh V60 dengan biji kopi Toraja Sapan', 'category' => 'coffee'],
            ['title' => 'Kopi Susu Aren', 'description' => 'Menu best seller kami: kopi susu aren dengan gula aren asli', 'category' => 'coffee'],
            ['title' => 'Pisang Goreng Krispi', 'description' => 'Camilan favorit pelanggan: pisang goreng krispi dengan saus karamel aren', 'category' => 'food'],
            ['title' => 'Cheesecake Pandan', 'description' => 'Cheesecake dengan cita rasa pandan asli Nusantara', 'category' => 'food'],
            ['title' => 'Interior Cabang Sudirman', 'description' => 'Suasana hangat dan nyaman cabang Menteng Jakarta', 'category' => 'ambiance'],
            ['title' => 'Garden Bar Cabang Dago', 'description' => 'Konsep garden coffee bar yang asri di cabang Alkateri Bandung', 'category' => 'ambiance'],
            ['title' => 'Coffee Workshop Bulanan', 'description' => 'Peserta antusias mengikuti workshop manual brew bersama Head Barista kami', 'category' => 'events'],
            ['title' => 'Grand Opening Dago', 'description' => 'Momen pembukaan perdana Bluedoor Coffee cabang Alkateri, Bandung', 'category' => 'events'],
        ];

        foreach ($galleryData as $gallery) {
            GalleryImage::create([
                'title'       => $gallery['title'],
                'description' => $gallery['description'],
                'image_path'  => 'gallery/placeholder.jpg', // akan diisi gambar nyata via admin
                'category'    => $gallery['category'],
                'is_active'   => true,
            ]);
        }

        // ─────────────────────────────────────────────
        // NEWSLETTER SUBSCRIPTIONS
        // ─────────────────────────────────────────────
        $subscribers = [
            ['name' => 'Andi Pratama',          'email' => 'andi.pratama@gmail.com',    'status' => 'subscribed'],
            ['name' => 'Bunga Citra Lestari',   'email' => 'bungacl@yahoo.com',         'status' => 'subscribed'],
            ['name' => 'Rizki Maulana',         'email' => 'rizkimaulana@hotmail.com',  'status' => 'subscribed'],
            ['name' => 'Mega Putri Wulandari',  'email' => 'mega.putri@gmail.com',      'status' => 'subscribed'],
            ['name' => 'Hendra Gunawan',        'email' => 'hendra.g@gmail.com',        'status' => 'subscribed'],
            ['name' => 'Larasati Nugroho',      'email' => 'larasati.n@gmail.com',      'status' => 'pending_verification'],
            ['name' => 'Dimas Arya Saputra',    'email' => 'dimas.arya@gmail.com',      'status' => 'pending_verification'],
            ['name' => 'Putri Handayani',       'email' => 'putri.handa@outlook.com',   'status' => 'unsubscribed'],
        ];

        foreach ($subscribers as $sub) {
            NewsletterSubscription::create([
                'email'           => $sub['email'],
                'name'            => $sub['name'],
                'status'          => $sub['status'],
                'is_subscribed'   => $sub['status'] === 'subscribed',
                'verified_at'     => $sub['status'] === 'subscribed' ? Carbon::now()->subDays(rand(5, 30)) : null,
                'unsubscribed_at' => $sub['status'] === 'unsubscribed' ? Carbon::now()->subDays(rand(1, 10)) : null,
            ]);
        }

        $this->command->info('Data dummy berbasis Indonesia berhasil dibuat!');
    }
}