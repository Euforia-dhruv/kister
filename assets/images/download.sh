#!/bin/bash
mkdir -p products brands lifestyle categories materials

# Brand logos
LOGOS=(
  "https://kitser.in/wp-content/uploads/2023/08/Kitser-Logo_268x125.png"
  "https://kitser.in/wp-content/uploads/2023/08/Scavolini-Logo-268x125-1.png"
  "https://kitser.in/wp-content/uploads/2023/08/Le_Creuset_Logo-268x125-1.png"
  "https://kitser.in/wp-content/uploads/2023/08/Bosch-logo-268x152-1.png"
  "https://kitser.in/wp-content/uploads/2023/08/Bosch-logo-268x152.png"
  "https://kitser.in/wp-content/uploads/2023/08/2560px-Dyson-268x125-1.png"
  "https://kitser.in/wp-content/uploads/2023/08/Miele_Logo-256x125-1.png"
  "https://kitser.in/wp-content/uploads/2023/08/Siemens-logo-256x125-1.png"
  "https://kitser.in/wp-content/uploads/2023/08/Smeg-Logo-268x125-1.png"
  "https://kitser.in/wp-content/uploads/2023/08/Electrolux_268x152.png"
  "https://kitser.in/wp-content/uploads/2023/08/asko-appliances-logo-vector-268x152-1.png"
  "https://kitser.in/wp-content/uploads/2023/08/1280px-Gaggenau_Hausgerate_logo-268x152-1.png"
  "https://kitser.in/wp-content/uploads/2023/09/liebherr.png"
  "https://kitser.in/wp-content/uploads/2023/08/BLANCO-268x125-1.png"
  "https://kitser.in/wp-content/uploads/2023/08/Carysil-GE-268x125-1.png"
  "https://kitser.in/wp-content/uploads/2023/08/Franke_logo-268x125-1.png"
  "https://kitser.in/wp-content/uploads/2023/08/Futura-268x125-1.png"
  "https://kitser.in/wp-content/uploads/2023/08/Reginox-268x125-1.png"
  "https://kitser.in/wp-content/uploads/2023/09/blum.png"
  "https://kitser.in/wp-content/uploads/2023/09/hafel.png"
  "https://kitser.in/wp-content/uploads/2023/09/hettich.png"
  "https://kitser.in/wp-content/uploads/2023/09/kessebohmer-1.png"
  "https://kitser.in/wp-content/uploads/2023/09/salice-1.png"
  "https://kitser.in/wp-content/uploads/2023/08/Porceko-268x125-1.png"
  "https://kitser.in/wp-content/uploads/2023/08/Quantra-286x125-1.png"
  "https://kitser.in/wp-content/uploads/2023/08/Nachtmann_Logo-268x152-1.png"
  "https://kitser.in/wp-content/uploads/2023/08/BergnerLogo-268x125-1.png"
  "https://kitser.in/wp-content/uploads/2023/08/Meyerlogo-268x125-1.png"
  "https://kitser.in/wp-content/uploads/2023/09/onnni.png"
  "https://kitser.in/wp-content/uploads/2023/08/Rena-268x125-1.png"
  "https://kitser.in/wp-content/uploads/2023/08/DeLonghi-268x125-1.png"
  "https://kitser.in/wp-content/uploads/2023/08/lg-268x125-1.png"
  "https://kitser.in/wp-content/uploads/2023/08/Panasonic-logo-268x125-1.png"
  "https://kitser.in/wp-content/uploads/2023/08/Samsung_Logo-268x125-1.png"
  "https://kitser.in/wp-content/uploads/2023/08/Whirlpool-268x125-1.png"
  "https://kitser.in/wp-content/uploads/2023/08/Logo_Black_on_Orange-268x125-1.png"
  "https://kitser.in/wp-content/uploads/2023/08/Meyerlogo-268x125-2.png"
  "https://kitser.in/wp-content/uploads/2023/08/Borosil-Logo-268x125-1.png"
  "https://kitser.in/wp-content/uploads/2023/08/Borosil-Logo-268x125-2.png"
  "https://kitser.in/wp-content/uploads/2023/08/logo-268x125-1.png"
  "https://kitser.in/wp-content/uploads/2023/08/og-image-268x125-1.png"
  "https://kitser.in/wp-content/uploads/2023/08/Rena-268x125-2.png"
  "https://kitser.in/wp-content/uploads/2023/08/Dubblin-268x125-1.png"
  "https://kitser.in/wp-content/uploads/2023/08/Fawn-268x125-1.png"
  "https://kitser.in/wp-content/uploads/2023/08/BergnerLogo-268x125-2.png"
)

# Hero/lifestyle images
HEROS=(
  "https://kitser.in/wp-content/uploads/2023/09/All-Things-Kitchen.jpg|lifestyle|hero-main.jpg"
  "https://kitser.in/wp-content/uploads/2023/08/We-Do.jpg|lifestyle|our-story.jpg"
  "https://kitser.in/wp-content/uploads/2023/08/contact-page.jpg|lifestyle|contact.jpg"
  "https://kitser.in/wp-content/uploads/2023/08/icon-01.png|icons|icon-01.png"
  "https://kitser.in/wp-content/uploads/2023/08/icon-02.png|icons|icon-02.png"
  "https://kitser.in/wp-content/uploads/2023/08/icon-03.png|icons|icon-03.png"
)

# Category images
CATS=(
  "https://kitser.in/wp-content/uploads/2021/05/Modular-Kitchens.jpg|categories|modular-kitchens.jpg"
  "https://kitser.in/wp-content/uploads/2021/05/Cookware-Bakeware.jpg|categories|cookware-bakeware.jpg"
  "https://kitser.in/wp-content/uploads/2021/05/Barware.jpg|categories|barware.jpg"
  "https://kitser.in/wp-content/uploads/2021/05/Kitchen-Tools.jpg|categories|kitchen-tools.jpg"
)

echo "Downloading logos..."
for url in "${LOGOS[@]}"; do
  filename=$(basename "$url")
  curl -sL "$url" -o "brands/$filename" 2>/dev/null &
done
wait

echo "Downloading heroes..."
for item in "${HEROS[@]}"; do
  IFS='|' read -r url folder fname <<< "$item"
  curl -sL "$url" -o "$folder/$fname" 2>/dev/null &
done
wait

echo "Downloading categories..."
for item in "${CATS[@]}"; do
  IFS='|' read -r url folder fname <<< "$item"
  curl -sL "$url" -o "$folder/$fname" 2>/dev/null &
done
wait

echo "Done! Downloaded $(ls brands/ | wc -l) logos, $(ls lifestyle/ | wc -l) lifestyle, $(ls categories/ | wc -l) categories"
