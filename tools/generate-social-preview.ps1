Add-Type -AssemblyName System.Drawing

$projectRoot = Split-Path -Parent $PSScriptRoot
$wallpaperPath = Join-Path $projectRoot 'windows-wallpaper.jpg'
$outputPath = Join-Path $projectRoot 'public\social-preview.jpg'
$canvas = New-Object System.Drawing.Bitmap 1200, 630
$graphics = [System.Drawing.Graphics]::FromImage($canvas)
$graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$graphics.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit

$wallpaper = [System.Drawing.Image]::FromFile($wallpaperPath)
$scale = [Math]::Max(1200 / $wallpaper.Width, 630 / $wallpaper.Height)
$drawWidth = [int]($wallpaper.Width * $scale)
$drawHeight = [int]($wallpaper.Height * $scale)
$graphics.DrawImage($wallpaper, [int]((1200 - $drawWidth) / 2), [int]((630 - $drawHeight) / 2), $drawWidth, $drawHeight)
$graphics.FillRectangle((New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(80, 3, 19, 52))), 0, 0, 1200, 630)

$window = New-Object System.Drawing.Rectangle 78, 64, 1044, 502
$graphics.FillRectangle((New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(236, 233, 216))), $window)
$graphics.DrawRectangle((New-Object System.Drawing.Pen ([System.Drawing.Color]::FromArgb(0, 60, 157), 4)), $window)
$titleRectangle = New-Object System.Drawing.Rectangle 82, 68, 1036, 54
$titleGradient = [System.Drawing.Drawing2D.LinearGradientBrush]::new($titleRectangle, [System.Drawing.Color]::FromArgb(61, 149, 255), [System.Drawing.Color]::FromArgb(8, 70, 170), 90.0)
$graphics.FillRectangle($titleGradient, $titleRectangle)

$white = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::White)
$navy = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(7, 31, 74))
$gray = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(76, 81, 91))
$blue = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(12, 78, 177))
$titleFont = New-Object System.Drawing.Font 'Tahoma', 20, ([System.Drawing.FontStyle]::Bold)
$smallFont = New-Object System.Drawing.Font 'Tahoma', 15, ([System.Drawing.FontStyle]::Regular)
$labelFont = New-Object System.Drawing.Font 'Lucida Console', 16, ([System.Drawing.FontStyle]::Bold)
$nameFont = New-Object System.Drawing.Font 'Arial', 68, ([System.Drawing.FontStyle]::Bold)
$roleFont = New-Object System.Drawing.Font 'Lucida Console', 24, ([System.Drawing.FontStyle]::Bold)

$graphics.DrawString('RANIER.OS - PORTFOLIO', $titleFont, $white, 106, 82)
foreach ($offset in 0, 42, 84) {
  $buttonColor = if ($offset -eq 84) { [System.Drawing.Color]::FromArgb(211, 62, 39) } else { [System.Drawing.Color]::FromArgb(48, 119, 211) }
  $graphics.FillRectangle((New-Object System.Drawing.SolidBrush $buttonColor), 982 + $offset, 78, 32, 32)
  $graphics.DrawRectangle((New-Object System.Drawing.Pen ([System.Drawing.Color]::White, 1)), 982 + $offset, 78, 32, 32)
}

$graphics.FillRectangle((New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(214, 223, 247))), 82, 122, 248, 390)
$graphics.FillRectangle($navy, 82, 122, 248, 122)
$graphics.DrawString('RANIER', (New-Object System.Drawing.Font 'Arial', 30, ([System.Drawing.FontStyle]::Bold)), $white, 108, 146)
$graphics.DrawString('TERALDICO', (New-Object System.Drawing.Font 'Arial', 30, ([System.Drawing.FontStyle]::Bold)), $white, 108, 181)
$graphics.DrawString('[X] HOME', $labelFont, $navy, 108, 284)
$graphics.DrawString('[ ] PROJECTS', $labelFont, $gray, 108, 330)
$graphics.DrawString('[ ] SKILLS', $labelFont, $gray, 108, 376)
$graphics.DrawString('[ ] CONTACT', $labelFont, $gray, 108, 422)

$graphics.FillRectangle((New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(250, 250, 247))), 330, 122, 788, 390)
$graphics.DrawString('RANIER.OS / PORTFOLIO', $labelFont, $gray, 384, 168)
$graphics.DrawString('RANIER', $nameFont, $navy, 380, 208)
$graphics.DrawString('TERALDICO', $nameFont, $navy, 380, 282)
$graphics.DrawString('SOFTWARE ENGINEER_', $roleFont, $navy, 388, 382)
$taglineFont = New-Object System.Drawing.Font 'Tahoma', 14, ([System.Drawing.FontStyle]::Regular)
$graphics.DrawString('Practical software and web experiences, from idea to deployment.', $taglineFont, $gray, 388, 431)

$graphics.FillRectangle((New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(22, 100, 197))), 0, 590, 1200, 40)
$graphics.FillRectangle((New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(47, 142, 38))), 0, 590, 148, 40)
$graphics.DrawString('START', $titleFont, $white, 36, 596)
$graphics.DrawString('PORTFOLIO EDITION 2026', $smallFont, $white, 920, 600)

$jpegCodec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
$encoderParameters = New-Object System.Drawing.Imaging.EncoderParameters 1
$encoderParameters.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter ([System.Drawing.Imaging.Encoder]::Quality), 88L
$canvas.Save($outputPath, $jpegCodec, $encoderParameters)
$graphics.Dispose()
$wallpaper.Dispose()
$canvas.Dispose()
$encoderParameters.Dispose()
Write-Output $outputPath
