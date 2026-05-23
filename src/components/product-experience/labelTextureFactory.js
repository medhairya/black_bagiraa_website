import * as THREE from "three";

const drawBubblePattern = (ctx, width, height, color) => {
  ctx.save();
  ctx.strokeStyle = color;
  ctx.lineWidth = 2;
  ctx.globalAlpha = 0.24;

  for (let x = 24; x < width; x += 86) {
    for (let y = 16; y < height; y += 76) {
      const radius = 5 + ((x + y) % 15);
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.stroke();
    }
  }

  ctx.restore();
};

const drawGlowRing = (ctx, x, y, accent, accentSoft) => {
  const ring = ctx.createRadialGradient(x, y, 12, x, y, 126);
  ring.addColorStop(0, "rgba(255,255,255,0)");
  ring.addColorStop(0.3, `${accentSoft}aa`);
  ring.addColorStop(0.72, `${accent}88`);
  ring.addColorStop(1, "rgba(255,255,255,0)");

  ctx.save();
  ctx.fillStyle = ring;
  ctx.beginPath();
  ctx.arc(x, y, 138, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
};

const drawSideInformation = (ctx, flavor) => {
  ctx.save();
  ctx.fillStyle = flavor.label.textPrimary;
  ctx.font = '700 34px "Arial", sans-serif';
  ctx.fillText("BLACK BAGIRAA", 82, 128);
  ctx.font = '500 28px "Arial", sans-serif';
  ctx.fillStyle = flavor.label.textSecondary;
  ctx.fillText("PREMIUM ENERGY SOFT DRINK", 82, 174);

  ctx.fillStyle = flavor.label.textPrimary;
  ctx.font = '700 30px "Arial", sans-serif';
  ctx.fillText("FORMULA NOTES", 82, 286);

  ctx.font = '500 24px "Arial", sans-serif';
  flavor.benefits.forEach((benefit, index) => {
    ctx.fillText(`${index + 1}. ${benefit}`, 82, 338 + index * 46);
  });

  ctx.font = '700 28px "Arial", sans-serif';
  ctx.fillText("SERVE COLD", 82, 538);

  ctx.font = '500 22px "Arial", sans-serif';
  ctx.fillText("Crafted for sharp focus, smooth lift and", 82, 586);
  ctx.fillText("premium all-day energy. 200 ML.", 82, 618);

  ctx.strokeStyle = `${flavor.label.detail}cc`;
  ctx.lineWidth = 4;
  ctx.strokeRect(82, 676, 474, 190);

  ctx.fillStyle = flavor.label.textPrimary;
  ctx.font = '700 24px "Arial", sans-serif';
  ctx.fillText("DRINK PROFILE", 112, 728);

  ctx.font = '500 22px "Arial", sans-serif';
  flavor.notes.forEach((note, index) => {
    ctx.fillText(note.toUpperCase(), 112, 774 + index * 38);
  });
  ctx.restore();
};

const drawFrontPanel = (ctx, flavor, logoImage, x) => {
  const width = 650;
  const centerX = x + width * 0.5;
  const nameParts = flavor.name.toUpperCase().split(" ");

  drawGlowRing(ctx, centerX, 474, flavor.accent, flavor.accentSoft);

  ctx.save();
  ctx.drawImage(logoImage, x + 168, 78, 314, 314);
  ctx.restore();

  ctx.save();
  ctx.textAlign = "center";
  ctx.fillStyle = flavor.label.textPrimary;
  ctx.font = '800 76px "Arial Black", "Arial", sans-serif';
  if (nameParts.length > 1) {
    ctx.fillText(nameParts[0], centerX, 626);
    ctx.fillText(nameParts.slice(1).join(" "), centerX, 700);
  } else {
    ctx.fillText(nameParts[0], centerX, 666);
  }
  ctx.font = '700 38px "Arial", sans-serif';
  ctx.fillStyle = flavor.label.textSecondary;
  ctx.fillText(flavor.eyebrow.toUpperCase(), centerX, 770);

  ctx.font = '700 28px "Arial", sans-serif';
  ctx.fillStyle = flavor.label.textPrimary;
  ctx.fillText("200 ML", centerX, 836);

  ctx.font = '500 22px "Arial", sans-serif';
  ctx.fillStyle = flavor.label.detail;
  ctx.fillText("SPARKLING ENERGY INFUSION", centerX, 892);
  ctx.restore();
};

export const createFlavorLabelTexture = (flavor, logoImage) => {
  const canvas = document.createElement("canvas");
  canvas.width = 2048;
  canvas.height = 1024;

  const ctx = canvas.getContext("2d");

  const baseGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
  baseGradient.addColorStop(0, flavor.label.backgroundTop);
  baseGradient.addColorStop(0.62, flavor.label.backgroundTop);
  baseGradient.addColorStop(1, flavor.label.backgroundBottom);
  ctx.fillStyle = baseGradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  drawBubblePattern(ctx, canvas.width, canvas.height, flavor.label.detail);

  const bandGradient = ctx.createLinearGradient(0, 760, canvas.width, 1024);
  bandGradient.addColorStop(0, `${flavor.accent}cc`);
  bandGradient.addColorStop(0.45, `${flavor.accentSoft}cc`);
  bandGradient.addColorStop(1, `${flavor.accent}aa`);
  ctx.fillStyle = bandGradient;
  ctx.globalAlpha = 0.38;
  ctx.fillRect(0, 748, canvas.width, 276);
  ctx.globalAlpha = 1;

  drawSideInformation(ctx, flavor);
  drawFrontPanel(ctx, flavor, logoImage, 680);
  drawFrontPanel(ctx, flavor, logoImage, 1340);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.flipY = false;
  texture.anisotropy = 8;
  texture.needsUpdate = true;

  return texture;
};
