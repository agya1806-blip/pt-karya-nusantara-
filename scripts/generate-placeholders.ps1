Add-Type -AssemblyName System.Drawing

$base = "D:\Aghisna\PT KARYA NUSANTARA REALTY\public"

function New-Placeholder {
  param($path, $w, $h, $r, $g, $b, $text)
  $dir = Split-Path "$base\$path" -Parent
  if (!(Test-Path $dir)) { New-Item -ItemType Directory -Path $dir -Force | Out-Null }
  $ext = [System.IO.Path]::GetExtension($path)
  $bm = New-Object System.Drawing.Bitmap($w, $h)
  $gfx = [System.Drawing.Graphics]::FromImage($bm)
  $gfx.SmoothingMode = "HighQuality"
  $brush = New-Object System.Drawing.Drawing2D.LinearGradientBrush(
    (New-Object System.Drawing.Point(0,0)),
    (New-Object System.Drawing.Point($w,$h)),
    [System.Drawing.Color]::FromArgb($r,$g,$b),
    [System.Drawing.Color]::FromArgb([Math]::Max(0,$r-40),[Math]::Max(0,$g-40),[Math]::Max(0,$b-40))
  )
  $gfx.FillRectangle($brush, 0, 0, $w, $h)
  $font = New-Object System.Drawing.Font("Segoe UI", 24, [System.Drawing.FontStyle]::Light)
  $fmt = New-Object System.Drawing.StringFormat
  $fmt.Alignment = "Center"
  $fmt.LineAlignment = "Center"
  $gfx.DrawString($text, $font, [System.Drawing.Brushes]::White, ($w/2), ($h/2), $fmt)
  $gfx.Dispose()
  if ($ext -eq ".png") { $bm.Save("$base\$path", [System.Drawing.Imaging.ImageFormat]::Png) }
  else { $bm.Save("$base\$path", [System.Drawing.Imaging.ImageFormat]::Jpeg) }
  $bm.Dispose()
  Write-Output "  Created: $path"
}

Write-Output "Generating placeholder images..."

# Hero
New-Placeholder "images/hero/home-hero.jpg" 1920 1080 139 120 105 "Luxury Architecture"

# Portfolio thumbnails
New-Placeholder "images/portfolio/villa-sky.jpg" 800 600 158 140 120 "The Sky Villa"
New-Placeholder "images/portfolio/sudirman-tower.jpg" 800 600 100 110 130 "Sudirman Tower"
New-Placeholder "images/portfolio/nusantara-resort.jpg" 800 600 120 150 140 "Nusantara Resort"
New-Placeholder "images/portfolio/green-valley.jpg" 800 600 130 160 120 "Green Valley"
New-Placeholder "images/portfolio/sanctuary.jpg" 800 600 110 130 150 "The Sanctuary"
New-Placeholder "images/portfolio/marina-club.jpg" 800 600 140 130 110 "Marina Club"

# Portfolio detail images
$detailNames = @("villa", "tower", "resort", "green-valley", "sanctuary", "marina")
$detailColors = @((158,140,120), (100,110,130), (120,150,140), (130,160,120), (110,130,150), (140,130,110))
for ($j = 0; $j -lt $detailNames.Length; $j++) {
  for ($i = 1; $i -le 4; $i++) {
    New-Placeholder "images/portfolio/$($detailNames[$j])-0$i.jpg" 800 600 $detailColors[$j][0] $detailColors[$j][1] $detailColors[$j][2] "Portfolio $($detailNames[$j]) $i"
  }
}

# Services
$serviceNames = @("residential", "commercial", "hospitality", "master-planning", "interior", "sustainable")
$serviceColors = @((180,160,140), (100,130,160), (160,140,120), (140,170,150), (170,150,180), (130,180,140))
for ($j = 0; $j -lt $serviceNames.Length; $j++) {
  New-Placeholder "images/services/$($serviceNames[$j]).jpg" 800 600 $serviceColors[$j][0] $serviceColors[$j][1] $serviceColors[$j][2] "Service: $($serviceNames[$j])"
  New-Placeholder "images/services/$($serviceNames[$j])-detail.jpg" 1200 800 $serviceColors[$j][0] $serviceColors[$j][1] $serviceColors[$j][2] "$($serviceNames[$j]) Detail"
}

# Testimonials (square for circular crop)
New-Placeholder "images/testimonials/james.jpg" 200 200 180 160 140 "James"
New-Placeholder "images/testimonials/miyako.jpg" 200 200 160 150 170 "Miyako"
New-Placeholder "images/testimonials/david.jpg" 200 200 150 170 160 "David"

# Team
$teamNames = @("ardi","sari","budi","rina","dimas","maya","alex","dewi","rizky","nadia","hendra","lisa","fajar","ani")
$teamColors = @((180,160,140),(170,150,180),(160,170,150),(180,140,160),(150,160,170),(170,180,150),(160,140,180),(140,170,160),(180,150,170),(150,180,160),(170,160,140),(160,180,170),(140,160,180),(180,170,150))
for ($j = 0; $j -lt $teamNames.Length; $j++) {
  New-Placeholder "images/team/$($teamNames[$j]).jpg" 400 500 $teamColors[$j][0] $teamColors[$j][1] $teamColors[$j][2] $teamNames[$j]
}

# Gallery
for ($i = 1; $i -le 12; $i++) {
  $hue = 130 + ($i * 25) % 80
  $tag = if ($i -lt 10) { "0$i" } else { "$i" }
  New-Placeholder "images/gallery/gallery-$tag.jpg" 800 600 $hue 140 130 "Gallery $i"
}

# Blog
$blogNames = @("sustainable-luxury","tropical-living","biophilic","smart-home","sustainable-materials","small-spaces","landscape-trends","heritage","future-workspace","permits","local-stone","lighting","color-trends")
$blogColors = @((180,160,140),(160,180,140),(150,170,160),(130,150,180),(170,160,140),(160,140,170),(140,180,150),(180,140,160),(150,160,180),(170,180,140),(140,170,160),(180,150,140),(160,180,170))
for ($j = 0; $j -lt $blogNames.Length; $j++) {
  New-Placeholder "images/blog/$($blogNames[$j]).jpg" 800 600 $blogColors[$j][0] $blogColors[$j][1] $blogColors[$j][2] $blogNames[$j]
}

# About & Career & OG
New-Placeholder "images/about/overview.jpg" 1200 800 150 160 170 "About Overview"
New-Placeholder "images/career/hero.jpg" 1920 1080 130 140 160 "Career"
New-Placeholder "images/og-default.jpg" 1200 630 139 120 105 "Karya Nusantara"

# Logo SVG
$logoPath = "$base\images\logo.svg"
if (!(Test-Path $logoPath)) {
  Set-Content -Path $logoPath -Value '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 60"><rect width="200" height="60" fill="#1c1917" rx="4"/><text x="16" y="38" font-family="Georgia,serif" font-size="20" fill="white" font-weight="bold">KNR</text><text x="100" y="38" font-family="Arial,sans-serif" font-size="10" fill="#a09f9c">KARYA NUSANTARA</text></svg>'
  Write-Output "  Created: images/logo.svg"
}

# App icons (PNG)
New-Placeholder "icons/icon-192x192.png" 192 192 28 25 23 "KNR"
New-Placeholder "icons/icon-512x512.png" 512 512 28 25 23 "KNR"

Write-Output "Done! All placeholder images created."
