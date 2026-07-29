#!/bin/bash
mkdir -p products

# Modular Kitchens
URLS=(
  "https://kitser.in/wp-content/uploads/2023/09/modular-kitchen-top-banner.jpg|products|modular-kitchen-banner.jpg"
  "https://kitser.in/wp-content/uploads/2023/09/Canvas-01.jpg|products|kitchen-canvas-01.jpg"
  "https://kitser.in/wp-content/uploads/2023/09/Canvas-02.jpg|products|kitchen-canvas-02.jpg"
  "https://kitser.in/wp-content/uploads/2023/09/Canvas-03.jpg|products|kitchen-canvas-03.jpg"
  "https://kitser.in/wp-content/uploads/2023/09/Optimizing.jpg|products|kitchen-optimizing.jpg"
  "https://kitser.in/wp-content/uploads/2023/09/modular-kitchen-banner-footer.jpg|products|kitchen-footer.jpg"
  # Countertops
  "https://kitser.in/wp-content/uploads/2023/08/Countertops.jpg|products|countertops.jpg"
  "https://kitser.in/wp-content/uploads/2023/08/surfaces-1.jpg|products|surface-01.jpg"
  "https://kitser.in/wp-content/uploads/2023/08/surfaces02-1.jpg|products|surface-02.jpg"
  "https://kitser.in/wp-content/uploads/2023/08/surfaces03-1.jpg|products|surface-03.jpg"
  "https://kitser.in/wp-content/uploads/2023/08/Finishes.jpg|products|finishes.jpg"
  "https://kitser.in/wp-content/uploads/2023/08/counter-tops-2.jpg|products|countertops-02.jpg"
  # Hardware
  "https://kitser.in/wp-content/uploads/2023/09/Kitser-Hardware-and-accessories.jpg|products|hardware-banner.jpg"
  "https://kitser.in/wp-content/uploads/2023/09/Intuitive-01.jpg|products|hardware-01.jpg"
  "https://kitser.in/wp-content/uploads/2023/09/Intuitive-02.jpg|products|hardware-02.jpg"
  "https://kitser.in/wp-content/uploads/2023/09/Intuitive-03.jpg|products|hardware-03.jpg"
  "https://kitser.in/wp-content/uploads/2023/09/Details.jpg|products|hardware-details.jpg"
  "https://kitser.in/wp-content/uploads/2023/09/hardware-and-accessories-banner-footer.jpg|products|hardware-footer.jpg"
  # Sinks
  "https://kitser.in/wp-content/uploads/2023/08/sinks-faucet-banner.jpg|products|sinks-banner.jpg"
  "https://kitser.in/wp-content/uploads/2023/08/sinks-01-1.jpg|products|sinks-01.jpg"
  "https://kitser.in/wp-content/uploads/2023/08/sinks-02-1.jpg|products|sinks-02.jpg"
  "https://kitser.in/wp-content/uploads/2023/08/sinks-03-1.jpg|products|sinks-03.jpg"
  "https://kitser.in/wp-content/uploads/2023/08/sinks-04.jpg|products|sinks-04.jpg"
  "https://kitser.in/wp-content/uploads/2023/08/banner-04.jpg|products|sinks-footer.jpg"
  # Built-in Appliances
  "https://kitser.in/wp-content/uploads/2023/08/Built-in-Appliances-1.jpg|products|builtin-banner.jpg"
  "https://kitser.in/wp-content/uploads/2023/08/Optimize01-1.jpg|products|builtin-01.jpg"
  "https://kitser.in/wp-content/uploads/2023/08/Optimize02-1.jpg|products|builtin-02.jpg"
  "https://kitser.in/wp-content/uploads/2023/08/Optimize03-1.jpg|products|builtin-03.jpg"
  "https://kitser.in/wp-content/uploads/2023/08/Design.jpg|products|builtin-design.jpg"
  "https://kitser.in/wp-content/uploads/2023/08/Built-in-Appliances-2.jpg|products|builtin-footer.jpg"
  # Cooking Tools
  "https://kitser.in/wp-content/uploads/2023/08/Cooking-Tools-1.jpg|products|cooking-tools-banner.jpg"
  "https://kitser.in/wp-content/uploads/2023/08/Kitchen-01-1.jpg|products|cooking-01.jpg"
  "https://kitser.in/wp-content/uploads/2023/08/Kitchen-02-1.jpg|products|cooking-02.jpg"
  "https://kitser.in/wp-content/uploads/2023/08/Kitchen-03-1.jpg|products|cooking-03.jpg"
  "https://kitser.in/wp-content/uploads/2023/08/Seamless.jpg|products|cooking-seamless.jpg"
  "https://kitser.in/wp-content/uploads/2023/09/flat-lay-wooden-kitchen-tools.jpg|products|cooking-flatlay.jpg"
  # Kitchen Appliances
  "https://kitser.in/wp-content/uploads/2023/08/Kitchen-Appliances.jpg|products|appliances-banner.jpg"
  "https://kitser.in/wp-content/uploads/2023/08/cooking01-1.jpg|products|appliance-01.jpg"
  "https://kitser.in/wp-content/uploads/2023/08/cooking02-1.jpg|products|appliance-02.jpg"
  "https://kitser.in/wp-content/uploads/2023/08/cooking03-1.jpg|products|appliance-03.jpg"
  "https://kitser.in/wp-content/uploads/2023/08/Precision.jpg|products|appliance-precision.jpg"
  "https://kitser.in/wp-content/uploads/2023/08/banner12.jpg|products|appliance-footer.jpg"
  # Cook & Bakeware
  "https://kitser.in/wp-content/uploads/2023/08/Cook-and-Bakeware-1.jpg|products|bakeware-banner.jpg"
  "https://kitser.in/wp-content/uploads/2023/08/stove-1.jpg|products|bakeware-01.jpg"
  "https://kitser.in/wp-content/uploads/2023/08/stove02-1.jpg|products|bakeware-02.jpg"
  "https://kitser.in/wp-content/uploads/2023/08/stove03-1.jpg|products|bakeware-03.jpg"
  "https://kitser.in/wp-content/uploads/2023/08/Expertly.jpg|products|bakeware-expertly.jpg"
  "https://kitser.in/wp-content/uploads/2023/08/Cook-and-Bakeware-2.jpg|products|bakeware-footer.jpg"
  # Serveware
  "https://kitser.in/wp-content/uploads/2023/08/banner-header.jpg|products|serveware-banner.jpg"
  "https://kitser.in/wp-content/uploads/2023/08/Tablescapes01-1.jpg|products|serveware-01.jpg"
  "https://kitser.in/wp-content/uploads/2023/08/Tablescapes02-2.jpg|products|serveware-02.jpg"
  "https://kitser.in/wp-content/uploads/2023/08/Tablescapes03-1.jpg|products|serveware-03.jpg"
  "https://kitser.in/wp-content/uploads/2023/08/Explore.jpg|products|serveware-explore.jpg"
  "https://kitser.in/wp-content/uploads/2023/08/banner-footer.jpg|products|serveware-footer.jpg"
  # Storage
  "https://kitser.in/wp-content/uploads/2023/08/Storage.jpg|products|storage-banner.jpg"
  "https://kitser.in/wp-content/uploads/2023/08/Transforming-01-1.jpg|products|storage-01.jpg"
  "https://kitser.in/wp-content/uploads/2023/08/Transforming-02-1.jpg|products|storage-02.jpg"
  "https://kitser.in/wp-content/uploads/2023/08/Transforming-03-1.jpg|products|storage-03.jpg"
  "https://kitser.in/wp-content/uploads/2023/08/Clutter-free.jpg|products|storage-clutterfree.jpg"
  "https://kitser.in/wp-content/uploads/2023/08/storage-2.jpg|products|storage-footer.jpg"
  # Barware
  "https://kitser.in/wp-content/uploads/2023/08/Barware.jpg|products|barware-banner.jpg"
  "https://kitser.in/wp-content/uploads/2023/08/Style01-2.jpg|products|barware-01.jpg"
  "https://kitser.in/wp-content/uploads/2023/08/Style02-2.jpg|products|barware-02.jpg"
  "https://kitser.in/wp-content/uploads/2023/08/Style03-2.jpg|products|barware-03.jpg"
  "https://kitser.in/wp-content/uploads/2023/08/Cocktails.jpg|products|barware-cocktails.jpg"
  "https://kitser.in/wp-content/uploads/2023/08/Barware-2.jpg|products|barware-footer.jpg"
)

count=0
for item in "${URLS[@]}"; do
  IFS='|' read -r url folder fname <<< "$item"
  curl -sL "$url" -o "$folder/$fname" 2>/dev/null &
  count=$((count + 1))
  if (( count % 20 == 0 )); then
    wait
    echo "Downloaded $count images..."
  fi
done
wait
echo "Total products: $(ls products/ | wc -l)"
