#!/bin/bash
srcImage="resource/iconSet/rhino_positiv_quadrat_1024x1024.png"

mkdir resource/iconSet/cameoNet.iconset
sips -z 16 16     $srcImage --out resource/iconSet/cameoNet.iconset/icon_16x16.png
sips -z 32 32     $srcImage --out resource/iconSet/cameoNet.iconset/icon_16x16@2x.png
sips -z 32 32     $srcImage --out resource/iconSet/cameoNet.iconset/icon_32x32.png
sips -z 64 64     $srcImage --out resource/iconSet/cameoNet.iconset/icon_32x32@2x.png
sips -z 128 128   $srcImage --out resource/iconSet/cameoNet.iconset/icon_128x128.png
sips -z 256 256   $srcImage --out resource/iconSet/cameoNet.iconset/icon_128x128@2x.png
sips -z 256 256   $srcImage --out resource/iconSet/cameoNet.iconset/icon_256x256.png
sips -z 512 512   $srcImage --out resource/iconSet/cameoNet.iconset/icon_256x256@2x.png
sips -z 512 512   $srcImage --out resource/iconSet/cameoNet.iconset/icon_512x512.png
cp $srcImage resource/iconSet/cameoNet.iconset/icon_512x512@2x.png
iconutil -c icns -o resource/iconSet/cameoNet.icns resource/iconSet/cameoNet.iconset
rm -R resource/iconSet/cameoNet.iconset