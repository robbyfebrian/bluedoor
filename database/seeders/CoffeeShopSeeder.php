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

        $branchSudirman = Branch::create([
            'name'         => 'Blue Door Coffee – Sudirman',
            'slug'         => 'sudirman',
            'code'         => 'BDJ01',
            'address'      => 'Jl. Jenderal Sudirman No. 45, Karet Tengsin',
            'city'         => 'Jakarta Pusat',
            'province'     => 'DKI Jakarta',
            'postal_code'  => '10220',
            'phone'        => '(021) 5785-1234',
            'email'        => 'sudirman@bluedoor.id',
            'opening_time' => '07:00:00',
            'closing_time' => '22:00:00',
            'is_active'    => true,
            'manager_id'   => $manager?->id,
        ]);

        $branchKemang = Branch::create([
            'name'         => 'Blue Door Coffee – Kemang',
            'slug'         => 'kemang',
            'code'         => 'BDJ02',
            'address'      => 'Jl. Kemang Raya No. 12, Bangka',
            'city'         => 'Jakarta Selatan',
            'province'     => 'DKI Jakarta',
            'postal_code'  => '12730',
            'phone'        => '(021) 7179-5678',
            'email'        => 'kemang@bluedoor.id',
            'opening_time' => '08:00:00',
            'closing_time' => '23:00:00',
            'is_active'    => true,
            'manager_id'   => null,
        ]);

        $branchBandung = Branch::create([
            'name'         => 'Blue Door Coffee – Dago',
            'slug'         => 'dago',
            'code'         => 'BDG01',
            'address'      => 'Jl. Ir. H. Juanda No. 88, Lebak Siliwangi',
            'city'         => 'Bandung',
            'province'     => 'Jawa Barat',
            'postal_code'  => '40132',
            'phone'        => '(022) 2503-9988',
            'email'        => 'dago@bluedoor.id',
            'opening_time' => '08:00:00',
            'closing_time' => '22:00:00',
            'is_active'    => true,
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
            'order'       => 1,
            'is_active'   => true,
        ]);

        $manual = MenuCategory::create([
            'branch_id'   => null,
            'name'        => 'Manual Brew',
            'slug'        => 'manual-brew',
            'description' => 'Kopi seduh manual dengan biji pilihan dari petani lokal Indonesia',
            'order'       => 2,
            'is_active'   => true,
        ]);

        $nonKopi = MenuCategory::create([
            'branch_id'   => null,
            'name'        => 'Non-Kopi',
            'slug'        => 'non-kopi',
            'description' => 'Pilihan minuman tanpa kopi untuk menemani waktu santaimu',
            'order'       => 3,
            'is_active'   => true,
        ]);

        $makanan = MenuCategory::create([
            'branch_id'   => null,
            'name'        => 'Makanan & Camilan',
            'slug'        => 'makanan-camilan',
            'description' => 'Hidangan ringan dan camilan pelengkap kopi favorit Anda',
            'order'       => 4,
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
            'order'            => 1,
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
            'order'            => 2,
        ]);

        MenuItem::create([
            'branch_id'        => null,
            'menu_category_id' => $espresso->id,
            'name'             => 'Americano',
            'slug'             => 'americano',
            'description'      => 'Espresso double shot yang diseduh dengan air panas, bold dan clean',
            'price'            => 30000,
            'is_available'     => true,
            'order'            => 3,
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
            'order'            => 4,
        ]);

        MenuItem::create([
            'branch_id'        => null,
            'menu_category_id' => $espresso->id,
            'name'             => 'Flat White',
            'slug'             => 'flat-white',
            'description'      => 'Ristretto shot dengan micro-foam susu yang silky, ukuran lebih kecil dan lebih pekat',
            'price'            => 40000,
            'is_available'     => true,
            'order'            => 5,
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
            'order'            => 1,
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
            'order'            => 2,
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
            'order'            => 3,
        ]);

        MenuItem::create([
            'branch_id'        => null,
            'menu_category_id' => $manual->id,
            'name'             => 'Aeropress Mandailing',
            'slug'             => 'aeropress-mandailing',
            'description'      => 'Robusta-Arabika blend dari Mandailing Natal diseduh dengan Aeropress, body tebal dengan sentuhan earthy',
            'price'            => 40000,
            'is_available'     => true,
            'order'            => 4,
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
            'order'            => 1,
        ]);

        MenuItem::create([
            'branch_id'        => null,
            'menu_category_id' => $nonKopi->id,
            'name'             => 'Cokelat Panas',
            'slug'             => 'cokelat-panas',
            'description'      => 'Minuman cokelat panas dari biji kakao asli Sulawesi, kaya dan hangat',
            'price'            => 35000,
            'is_available'     => true,
            'order'            => 2,
        ]);

        MenuItem::create([
            'branch_id'        => null,
            'menu_category_id' => $nonKopi->id,
            'name'             => 'Es Teh Tarik',
            'slug'             => 'es-teh-tarik',
            'description'      => 'Teh susu khas Melayu yang ditarik agar terbentuk busa alami, segar dan creamy',
            'price'            => 28000,
            'is_available'     => true,
            'order'            => 3,
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
            'order'            => 1,
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
            'order'            => 2,
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
            'order'            => 3,
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
            'order'            => 4,
        ]);

        // ─────────────────────────────────────────────
        // EMPLOYEES
        // ─────────────────────────────────────────────
        Employee::create([
            'branch_id' => $branchSudirman->id,
            'name'      => 'Dewi Rahayu',
            'position'  => 'Pendiri & Head Barista',
            'bio'       => 'Dewi mendirikan Blue Door Coffee pada 2020 dengan visi menciptakan ruang komunitas yang hangat melalui secangkir kopi berkualitas tinggi dari biji pilihan petani lokal Indonesia.',
            'order'     => 1,
            'is_active' => true,
        ]);

        Employee::create([
            'branch_id' => $branchSudirman->id,
            'name'      => 'Raka Firmansyah',
            'position'  => 'Lead Barista & Coffee Trainer',
            'bio'       => 'Raka memiliki pengalaman 7 tahun di industri kopi spesialti Indonesia. Juara 2 Indonesian Barista Championship 2022, ia gemar mengeksplorasi karakter unik biji kopi Nusantara.',
            'order'     => 2,
            'is_active' => true,
        ]);

        Employee::create([
            'branch_id' => $branchSudirman->id,
            'name'      => 'Siti Nurhaliza Wibowo',
            'position'  => 'Chef Pastry',
            'bio'       => 'Siti adalah lulusan terbaik Sekolah Tinggi Pariwisata NHI Bandung yang berspesialisasi dalam fusion pastry: memadukan teknik Prancis dengan bahan-bahan lokal seperti pandan, gula aren, dan kelapa.',
            'order'     => 3,
            'is_active' => true,
        ]);

        Employee::create([
            'branch_id' => $branchKemang->id,
            'name'      => 'Bagas Prasetyo',
            'position'  => 'Barista',
            'bio'       => 'Bagas bergabung sejak 2022 dan dikenal karena latte art-nya yang presisi. Ia sangat aktif mengedukasi pelanggan soal perbedaan karakter kopi dari berbagai daerah di Indonesia.',
            'order'     => 4,
            'is_active' => true,
        ]);

        Employee::create([
            'branch_id' => $branchBandung->id,
            'name'      => 'Anisa Kusuma Dewi',
            'position'  => 'Barista & Shift Supervisor',
            'bio'       => 'Anisa memimpin tim di cabang Dago Bandung dengan semangat pelayanan prima. Latar belakangnya di bidang hospitality membuatnya selalu mengutamakan pengalaman terbaik untuk setiap tamu.',
            'order'     => 5,
            'is_active' => true,
        ]);

        // ─────────────────────────────────────────────
        // JOB OPENINGS
        // ─────────────────────────────────────────────
        JobOpening::create([
            'branch_id'        => $branchSudirman->id,
            'title'            => 'Barista',
            'slug'             => 'barista-sudirman',
            'description'      => '<p>Kami sedang mencari barista yang bersemangat untuk bergabung di tim Blue Door Coffee cabang Sudirman!</p><p>Sebagai barista di Blue Door Coffee, kamu akan menyeduh kopi terbaik, menciptakan pengalaman tak terlupakan bagi pelanggan, dan menjadi bagian dari tim yang suportif dan penuh passion.</p>',
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
            'branch_id'        => $branchSudirman->id,
            'title'            => 'Asisten Chef Pastry',
            'slug'             => 'asisten-chef-pastry-sudirman',
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
            'branch_id'        => $branchKemang->id,
            'title'            => 'Supervisor Shift',
            'slug'             => 'supervisor-shift-kemang',
            'description'      => '<p>Kami mencari Supervisor Shift berpengalaman untuk memimpin operasional di cabang Kemang!</p><p>Posisi ini bertanggung jawab mengawasi jalannya operasional harian, mengelola tim, dan memastikan standar layanan Blue Door Coffee terpenuhi.',
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
            'branch_id'        => $branchBandung->id,
            'title'            => 'Barista (Cabang Bandung)',
            'slug'             => 'barista-dago-bandung',
            'description'      => '<p>Blue Door Coffee cabang Dago Bandung membuka lowongan barista baru!</p><p>Kami mengundang kamu yang cinta kopi dan ingin berkembang dalam industri kopi spesialti untuk bergabung bersama kami.</p>',
            'type'             => 'full-time',
            'location'         => 'Bandung',
            'requirements'     => '<ul><li>Domisili Bandung atau sekitarnya</li><li>Pengalaman barista diutamakan, namun fresh graduate welcome</li><li>Antusias belajar tentang kopi Nusantara</li><li>Siap bekerja dalam tim yang dinamis</li></ul>',
            'responsibilities' => '<ul><li>Menyeduh kopi dengan standar kualitas Blue Door</li><li>Melayani pelanggan dengan penuh keramahan</li><li>Menjaga kebersihan dan kerapian area kerja</li><li>Aktif mengikuti training barista internal</li></ul>',
            'salary_min'       => 3500000,
            'salary_max'       => 4500000,
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
            'content'        => '<p>Kopi Arabika Gayo berasal dari dataran tinggi Gayo di Provinsi Aceh, tumbuh pada ketinggian 1.200–1.700 meter di atas permukaan laut. Kondisi alam yang ideal—curah hujan yang cukup, tanah vulkanik yang subur, dan suhu yang sejuk—menjadikan Gayo sebagai salah satu penghasil kopi terbaik di dunia.</p><h2>Profil Rasa</h2><p>Kopi Gayo dikenal dengan body yang full dan kekentalan yang khas. Aroma rempah yang ringan, sedikit nuansa tanah (earthy), dan keasaman yang rendah hingga sedang menjadi ciri khasnya. Beberapa batch terbaik bahkan memiliki note cokelat hitam dan karamel yang kompleks.</p><h2>Proses Pengolahan</h2><p>Sebagian besar kopi Gayo diproses dengan metode wet-hulled atau "Giling Basah"—sebuah teknik yang lazim di Indonesia. Metode ini menghasilkan kandungan air yang lebih tinggi saat proses penggilingan, memberikan karakter body yang lebih berat dan rasa earthy yang khas.</p><h2>Mengapa Kami Mencintai Gayo</h2><p>Di Blue Door Coffee, kami mendapatkan biji kopi Gayo langsung dari petani koperasi binaan di Bener Meriah, Aceh. Dengan kemitraan langsung ini, kami memastikan petani mendapatkan harga yang adil sekaligus menjaga kualitas biji kopi dari ladang hingga ke cangkir Anda.</p>',
            'category'       => 'tips',
            'tags'           => ['kopi gayo', 'single origin', 'aceh', 'arabika', 'kopi indonesia'],
            'status'         => 'published',
            'published_at'   => Carbon::now()->subDays(14),
            'author_id'      => $author->id,
            'views'          => 342,
        ]);

        BlogPost::create([
            'title'          => 'Resep: Kopi Susu Aren Ala Blue Door di Rumah',
            'slug'           => 'resep-kopi-susu-aren-ala-blue-door-di-rumah',
            'excerpt'        => 'Kopi susu aren adalah minuman favorit pelanggan kami. Kini kami berbagi resep aslinya agar kamu bisa membuatnya sendiri di rumah!',
            'content'        => '<p>Kopi Susu Aren adalah menu best seller Blue Door Coffee yang menggabungkan cita rasa espresso bold dengan manisnya gula aren asli dan kelembutan susu segar. Berikut adalah resep yang bisa kamu coba di rumah.</p><h2>Bahan-bahan</h2><ul><li>2 shot espresso (atau 40ml kopi seduh pekat)</li><li>150ml susu full cream, dingin</li><li>3 sdm gula aren cair (bisa dibeli di pasar atau supermarket)</li><li>Es batu secukupnya</li></ul><h2>Cara Membuat</h2><ol><li>Seduh 2 shot espresso dan biarkan dingin sebentar.</li><li>Siapkan gelas saji, isi dengan es batu hingga ¾ penuh.</li><li>Tuang gula aren cair ke dasar gelas.</li><li>Tambahkan susu dingin perlahan.</li><li>Tuang espresso di atas susu. Jangan diaduk agar terbentuk gradasi yang cantik!</li><li>Sajikan segera dan nikmati.</li></ol><p><strong>Tips:</strong> Gunakan gula aren asli dari Jawa atau Flores untuk mendapatkan rasa yang paling autentik. Hindari menggunakan palm sugar sintetis karena profil rasanya berbeda secara signifikan.</p>',
            'category'       => 'recipes',
            'tags'           => ['resep', 'kopi susu aren', 'gula aren', 'minuman kopi', 'diy kopi'],
            'status'         => 'published',
            'published_at'   => Carbon::now()->subDays(7),
            'author_id'      => $author->id,
            'views'          => 215,
        ]);

        BlogPost::create([
            'title'          => 'Grand Opening Blue Door Coffee Cabang Dago, Bandung!',
            'slug'           => 'grand-opening-blue-door-coffee-dago-bandung',
            'excerpt'        => 'Kami dengan bangga mengumumkan pembukaan cabang ketiga Blue Door Coffee di Dago, Bandung! Hadir dengan konsep baru yang lebih segar dan menu eksklusif.',
            'content'        => '<p>Blue Door Coffee terus berkembang! Dengan penuh kegembiraan, kami mengumumkan grand opening cabang ketiga kami di Jl. Ir. H. Juanda No. 88, Dago, Bandung – tepat di jantung kawasan wisata dan kuliner Kota Kembang.</p><h2>Konsep Baru yang Lebih Segar</h2><p>Cabang Dago hadir dengan konsep "Garden Coffee Bar" – memadukan nuansa alam Bandung yang sejuk dengan interior modern yang hangat. Nikmati kopi favoritmu sambil dikelilingi tanaman hijau dan udara sejuk khas Bandung.</p><h2>Menu Eksklusif Cabang Bandung</h2><p>Untuk merayakan pembukaan ini, kami menghadirkan beberapa menu eksklusif yang terinspirasi dari kekayaan kuliner Jawa Barat, seperti <em>Bandrek Latte</em> dan <em>Klepon Cake</em>. Menu ini hanya tersedia di cabang Dago!</p><h2>Promo Pembukaan</h2><p>Dapatkan diskon 30% untuk semua minuman kopi selama 3 hari pertama pembukaan. Tunjukkan posting Instagram kamu di Blue Door Coffee Dago dan dapatkan free upgrade size!</p>',
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
            'content'        => '<p>Bagi banyak orang, manual brew terdengar rumit dan eksklusif. Padahal, menyeduh kopi dengan tangan sendiri adalah salah satu pengalaman paling memuaskan yang bisa kamu rasakan sebagai pecinta kopi. Berikut 5 alasan mengapa kamu harus mencobanya:</p><ol><li><strong>Kontrol Penuh atas Rasa</strong> – Dengan manual brew, kamu bisa mengatur semua variabel: suhu air, kecepatan tuang, hingga rasio kopi dan air. Hasilnya? Rasa yang bisa kamu sesuaikan dengan seleramu sendiri.</li><li><strong>Menghargai Kerja Petani Kopi</strong> – Kopi single origin yang digunakan dalam manual brew memiliki jejak asal usul yang jelas. Kamu ikut mendukung petani kopi lokal Indonesia secara langsung.</li><li><strong>Pengalaman Meditasi</strong> – Proses menyeduh kopi secara manual mengharuskan kehadiran penuh dan kesabaran. Banyak yang menggambarkannya seperti meditasi pagi yang menenangkan.</li><li><strong>Profil Rasa yang Lebih Kompleks</strong> – Dibanding espresso yang terekstraksi dengan tekanan tinggi, manual brew cenderung mengungkap nuansa rasa yang lebih halus dan kompleks dari biji kopi.</li><li><strong>Lebih Hemat dalam Jangka Panjang</strong> – Investasi awal alat manual brew (V60, Aeropress, French Press) terjangkau dan tahan lama. Dalam jangka panjang, jauh lebih hemat dibanding membeli kopi setiap hari.</li></ol><p>Tertarik belajar manual brew? Blue Door Coffee rutin mengadakan <em>Coffee Workshop</em> setiap bulan. Pantau terus media sosial kami untuk info jadwal selanjutnya!</p>',
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
            ['title' => 'Latte Art Rosetta', 'description' => 'Latte art klasik rosetta buatan barista kami', 'category' => 'coffee', 'order' => 1],
            ['title' => 'Pour Over V60 Toraja', 'description' => 'Proses seduh V60 dengan biji kopi Toraja Sapan', 'category' => 'coffee', 'order' => 2],
            ['title' => 'Kopi Susu Aren', 'description' => 'Menu best seller kami: kopi susu aren dengan gula aren asli', 'category' => 'coffee', 'order' => 3],
            ['title' => 'Pisang Goreng Krispi', 'description' => 'Camilan favorit pelanggan: pisang goreng krispi dengan saus karamel aren', 'category' => 'food', 'order' => 1],
            ['title' => 'Cheesecake Pandan', 'description' => 'Cheesecake dengan cita rasa pandan asli Nusantara', 'category' => 'food', 'order' => 2],
            ['title' => 'Interior Cabang Sudirman', 'description' => 'Suasana hangat dan nyaman cabang Sudirman Jakarta', 'category' => 'ambiance', 'order' => 1],
            ['title' => 'Garden Bar Cabang Dago', 'description' => 'Konsep garden coffee bar yang asri di cabang Dago Bandung', 'category' => 'ambiance', 'order' => 2],
            ['title' => 'Coffee Workshop Bulanan', 'description' => 'Peserta antusias mengikuti workshop manual brew bersama Head Barista kami', 'category' => 'events', 'order' => 1],
            ['title' => 'Grand Opening Dago', 'description' => 'Momen pembukaan perdana Blue Door Coffee cabang Dago, Bandung', 'category' => 'events', 'order' => 2],
        ];

        foreach ($galleryData as $gallery) {
            GalleryImage::create([
                'title'       => $gallery['title'],
                'description' => $gallery['description'],
                'image_path'  => 'gallery/placeholder.jpg', // akan diisi gambar nyata via admin
                'category'    => $gallery['category'],
                'order'       => $gallery['order'],
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
