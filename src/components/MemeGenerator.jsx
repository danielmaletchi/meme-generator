import React, { useRef, useState, useEffect } from "react";

export default function MemeGenerator() {
  const canvasRef = useRef(null);
  const [image, setImage] = useState(null);
  const [topText, setTopText] = useState("");
  const [bottomText, setBottomText] = useState("");
  const [gallery, setGallery] = useState([]);

  // Test Charger galerie depuis l'ordi
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("memes") || "[]");
    setGallery(saved);
  }, []);

  // Test de sauvegarde d'image dans mon ordi
  const saveToGallery = (dataUrl) => {
    const newGallery = [dataUrl, ...gallery];
    setGallery(newGallery);
    localStorage.setItem("memes", JSON.stringify(newGallery));
  };

  // Test Téléversement d'image
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const img = new Image();
    img.src = URL.createObjectURL(file);
    img.onload = () => setImage(img);
  };

  // Test Dessiner le mème
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!image) {
      canvas.width = 800;
      canvas.height = 450;
      ctx.fillStyle = "#333";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#fff";
      ctx.font = "20px Arial";
      ctx.fillText("Téléverser une image pour commencer", 20, 40);
      return;
    }
    // Adapter taille
    const maxW = 1000, maxH = 1000;
    const ratio = Math.min(maxW / image.width, maxH / image.height, 1);
    canvas.width = image.width * ratio;
    canvas.height = image.height * ratio;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

    // Le Texte
    ctx.fillStyle = "#fff";
    ctx.strokeStyle = "#000";
    ctx.lineWidth = 3;
    ctx.textAlign = "center";
    ctx.font = "bold 40px Impact";
    ctx.textBaseline = "top";
    if (topText) {
      ctx.strokeText(topText.toUpperCase(), canvas.width / 2, 10);
      ctx.fillText(topText.toUpperCase(), canvas.width / 2, 10);
    }
    if (bottomText) {
      ctx.textBaseline = "bottom";
      ctx.strokeText(bottomText.toUpperCase(), canvas.width / 2, canvas.height - 10);
      ctx.fillText(bottomText.toUpperCase(), canvas.width / 2, canvas.height - 10);
    }
  }, [image, topText, bottomText]);

  // Téléchargeons
  const downloadMeme = () => {
    const canvas = canvasRef.current;
    const dataUrl = canvas.toDataURL("image/png");

    // Sauvegardons dans la galerie
    saveToGallery(dataUrl);

    // Téléchargement
    const link = document.createElement("a");
    link.download = "meme.png";
    link.href = dataUrl;
    link.click();
  };

  // Test Partage sur les RS
  const shareMeme = (platform) => {
    const canvas = canvasRef.current;
    const dataUrl = canvas.toDataURL("image/png");

    if (platform === "whatsapp") {
      alert("Ceci n'est qu'un test mais tu peux télécharge le mème puis le publier dans ton appli Whatsapp.");
    } else if (platform === "facebook") {
      alert("Ceci n'est qu'un test mais tu peux télécharge le mème puis le publier dans ton appli Facebook.");
    } else if (platform === "instagram") {
      alert("Ceci n'est qu'un test mais tu peux télécharge le mème puis le publier dans ton appli Instagram.");
    }
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4"> Générateur de mèmes</h1>

      <input type="file" accept="image/*" onChange={handleImageUpload} className="mb-2"/>
      <input
        type="text"
        placeholder="Texte du haut"
        value={topText}
        onChange={(e) => setTopText(e.target.value)}
        className="border p-1 w-full mb-2"
      />
      <input
        type="text"
        placeholder="Texte du bas"
        value={bottomText}
        onChange={(e) => setBottomText(e.target.value)}
        className="border p-1 w-full mb-2"
      />

      <div className="flex gap-2 mb-4">
        <button onClick={downloadMeme} className="bg-blue-600 text-white px-3 py-1 rounded">
          Télécharger & Sauvegarder
        </button>
        <button onClick={() => shareMeme("whatsapp")} className="bg-green-500 text-white px-3 py-1 rounded">
          Partager WhatsApp
        </button>
        <button onClick={() => shareMeme("facebook")} className="bg-blue-700 text-white px-3 py-1 rounded">
          Partager Facebook
        </button>
        <button onClick={() => shareMeme("instagram")} className="bg-pink-600 text-white px-3 py-1 rounded">
          Partager Instagram
        </button>
      </div>

      <canvas ref={canvasRef} className="border w-full mb-6"></canvas>

      <h2 className="text-xl font-semibold mb-2"> Galerie locale</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
        {gallery.map((m, i) => (
          <img key={i} src={m} alt={`meme-${i}`} className="border rounded"/>
        ))}
      </div>
    </div>
  );
}
