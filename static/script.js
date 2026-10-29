
function generateBrand() {
  const brand = document.getElementById("brand").value.trim();
  const type = document.getElementById("type").value;
  const style = document.getElementById("style").value;

  if (brand === "") {
    alert("Please enter your business name!");
    return;
  }

  const palettes = {
    "Coffee Shop": ["#5C4033", "#D8B894", "#FFF4E5"],
    "Clothing": ["#222222", "#B7A7D8", "#F8F5F0"],
    "Technology": ["#14213D", "#4361EE", "#EAF0FF"],
    "Skincare": ["#52796F", "#CAD2C5", "#F6F4EF"]
  };

  const taglines = {
    "Coffee Shop": "Your Daily Dose of Happiness",
    "Clothing": "Style That Speaks for You",
    "Technology": "Innovate. Create. Transform.",
    "Skincare": "Feel Good in Your Skin"
  };

  const fonts = {
    "Modern": "Arial and Poppins",
    "Minimal": "Montserrat and Open Sans",
    "Luxury": "Playfair Display and Lato",
    "Playful": "Nunito and Poppins"
  };

  document.getElementById("name").textContent = brand;
  document.getElementById("logoBrandName").textContent = brand;
  document.getElementById("tagline").textContent =
    taglines[type];

  document.getElementById("description").textContent =
    `${brand} is a ${style.toLowerCase()} ${type.toLowerCase()} brand designed for customers who value quality and style.`;

  document.getElementById("fonts").textContent =
    "Suggested fonts: " + fonts[style];

  const colors = document.getElementById("colors");
  colors.innerHTML = "";

  palettes[type].forEach(color => {
    const swatch = document.createElement("div");
    swatch.className = "swatch";
    swatch.style.backgroundColor = color;
    swatch.style.color =
      (color === "#FFF4E5" ||
       color === "#F8F5F0" ||
       color === "#EAF0FF" ||
       color === "#CAD2C5" ||
       color === "#F6F4EF" ||
       color === "#D8B894" ||
       color === "#B7A7D8") ? "#222" : "#fff";

    swatch.textContent = color;
    colors.appendChild(swatch);
  });
}
async function copyBrandDetails() {
    const details = [
        "Brand Name: " + document.getElementById("name").textContent,
        "Tagline: " + document.getElementById("tagline").textContent,
        "Description: " + document.getElementById("description").textContent,
        "Fonts: " + document.getElementById("fonts").textContent,
        "Colours: " + Array.from(
            document.querySelectorAll("#colors span")
        ).map(el => el.textContent).join(", ")
    ].join("\n");

    try {
        await navigator.clipboard.writeText(details);
        alert("Brand details copied successfully!");
    } catch (error) {
        alert("Copy failed. Please try again.");
    }
}

function downloadBrandProfile() {
    const name = document.getElementById("name").textContent;
    const tagline = document.getElementById("tagline").textContent;
    const description = document.getElementById("description").textContent;
    const fonts = document.getElementById("fonts").textContent;

    const colors = Array.from(
        document.querySelectorAll("#colors span")
    ).map(el => el.textContent).join(", ");

    const profile = `AI BRAND IDENTITY PROFILE

Brand Name: ${name}
Tagline: ${tagline}
Description: ${description}
Brand Colours: ${colors}
Suggested Fonts: ${fonts}
`;

    const file = new Blob([profile], { type: "text/plain" });
    const url = URL.createObjectURL(file);
    const link = document.createElement("a");

    link.href = url;
    link.download = "brand-profile.txt";
    link.click();

    URL.revokeObjectURL(url);
}

function generateLogo() {
    const brandName =
        document.getElementById("name").textContent.trim();

    const logoName =
        document.getElementById("logoBrandName");

    const symbol =
        document.querySelector(".logo-symbol");

    const brand = document.getElementById("brand").value.trim();

    if (!brand) {
        alert("First enter a brand name and generate your brand identity.");
        return;
    }

    logoName.textContent = brand;

    const icons = ["✦", "◆", "◈", "✧", "❖"];
    const index = brand.length % icons.length;
    symbol.textContent = icons[index];

    document.getElementById("logoPreview").style.border =
        "3px solid #6844cc";
}

function downloadLogo() {
    const brand = document.getElementById("brand").value.trim();

    if (!brand) {
        alert("Please generate a brand first.");
        return;
    }

    const symbol = document.querySelector(".logo-symbol").textContent;
    const safeName = brand.replace(/[^a-z0-9]/gi, "_");

    const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="500" height="300">
      <rect width="100%" height="100%" rx="20" fill="#f5f0ff"/>
      <text x="250" y="115" text-anchor="middle"
        font-size="65" fill="#6844cc">${symbol}</text>
      <text x="250" y="185" text-anchor="middle"
        font-family="Arial" font-size="30" font-weight="bold"
        fill="#2d2450">${brand.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")}</text>
      <text x="250" y="225" text-anchor="middle"
        font-family="Arial" font-size="16" fill="#555">
        MINIMAL • PROFESSIONAL
      </text>
    </svg>`;

    const blob = new Blob([svg], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = safeName + "_logo.svg";
    link.click();

    URL.revokeObjectURL(url);
}

function downloadLogoPNG() {
    const preview = document.getElementById("logoPreview");

    if (!document.getElementById("brand").value.trim()) {
        alert("First generate your brand identity!");
        return;
    }

    const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="600" height="350">
      <rect width="100%" height="100%" rx="25" fill="#f5f0ff"/>
      <text x="300" y="125" text-anchor="middle"
        font-size="75" fill="#6844cc">
        ${preview.querySelector(".logo-symbol").textContent}
      </text>
      <text x="300" y="205" text-anchor="middle"
        font-family="Arial" font-size="36" font-weight="bold"
        fill="#2d2450">
        ${preview.querySelector("#logoBrandName").textContent
          .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")}
      </text>
      <text x="300" y="250" text-anchor="middle"
        font-family="Arial" font-size="20" fill="#555">
        MINIMAL • PROFESSIONAL
      </text>
    </svg>`;

    const blob = new Blob([svg], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const img = new Image();

    img.onload = function () {
        const canvas = document.createElement("canvas");
        canvas.width = 1200;
        canvas.height = 700;

        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, 1200, 700);

        canvas.toBlob(function (pngBlob) {
            const pngUrl = URL.createObjectURL(pngBlob);
            const link = document.createElement("a");
            link.href = pngUrl;
            link.download = "brand-logo.png";
            link.click();

            URL.revokeObjectURL(pngUrl);
            URL.revokeObjectURL(url);
        }, "image/png");
    };

    img.onerror = function () {
        URL.revokeObjectURL(url);
        alert("Logo export failed. Please try again.");
    };

    img.src = url;
}
