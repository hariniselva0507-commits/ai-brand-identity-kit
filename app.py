
from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/api/generate", methods=["POST"])
def generate_brand():
    data = request.get_json()
    brand = data.get("brand", "").strip()
    business_type = data.get("type", "Coffee Shop")
    style = data.get("style", "Modern")

    if not brand:
        return jsonify({"error": "Enter a brand name"}), 400

    palettes = {
        "Coffee Shop": ["#5C4033", "#D8B894", "#FFF4E5"],
        "Clothing": ["#222222", "#B7A7D8", "#F8F5F0"],
        "Technology": ["#14213D", "#4361EE", "#EAF0FF"],
        "Skincare": ["#52796F", "#CAD2C5", "#F6F4EF"]
    }

    taglines = {
        "Coffee Shop": "Your Daily Dose of Happiness",
        "Clothing": "Style That Speaks for You",
        "Technology": "Innovate. Create. Transform.",
        "Skincare": "Feel Good in Your Skin"
    }

    fonts = {
        "Modern": "Arial and Poppins",
        "Minimal": "Montserrat and Open Sans",
        "Luxury": "Playfair Display and Lato",
        "Playful": "Nunito and Poppins"
    }

    result = {
        "name": brand,
        "tagline": taglines.get(business_type, taglines["Coffee Shop"]),
        "description": f"{brand} is a {style.lower()} brand.",
        "colors": palettes.get(business_type, palettes["Coffee Shop"]),
        "fonts": fonts.get(style, fonts["Modern"])
    }

    return jsonify(result)

if __name__ == "__main__":
    app.run(debug=True)
