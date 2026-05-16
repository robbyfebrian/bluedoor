<?php

// Ensure upload temp dir is writable on Vercel serverless
ini_set('upload_tmp_dir', '/tmp');
ini_set('sys_temp_dir', '/tmp');

require __DIR__ . "/../public/index.php";
