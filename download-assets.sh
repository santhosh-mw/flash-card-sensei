#!/bin/bash

# Create necessary directories
mkdir -p public/fonts public/images

# Download Star Wars font
curl -L "https://www.dafont.com/download/starjedi.zip" -o starjedi.zip
unzip starjedi.zip -d temp_fonts
mv temp_fonts/Starjedi.ttf public/fonts/
rm -rf temp_fonts starjedi.zip

# Download background images
curl -L "https://raw.githubusercontent.com/yourusername/star-wars-assets/main/stars-bg.jpg" -o public/images/stars-bg.jpg
curl -L "https://raw.githubusercontent.com/yourusername/star-wars-assets/main/death-star-bg.jpg" -o public/images/death-star-bg.jpg

echo "Assets downloaded successfully!" 