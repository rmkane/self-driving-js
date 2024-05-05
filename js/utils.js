function lerp(A, B, t) {
  return A + (B - A) * t;
}

function getIntersection(A, B, C, D) {
  const tTop = (D.x - C.x) * (A.y - C.y) - (D.y - C.y) * (A.x - C.x);
  const uTop = (C.y - A.y) * (A.x - B.x) - (C.x - A.x) * (A.y - B.y);
  const bottom = (D.y - C.y) * (B.x - A.x) - (D.x - C.x) * (B.y - A.y);

  if (bottom === 0) {
    return null;
  }
  const t = tTop / bottom;
  const u = uTop / bottom;

  if (t < 0 || t > 1 || u < 0 || u > 1) {
    return null;
  }

  return {
    x: lerp(A.x, B.x, t),
    y: lerp(A.y, B.y, t),
    offset: t,
  };
}

function polysIntersect(poly1, poly2) {
  for (let i = 0; i < poly1.length; i++) {
    for (let j = 0; j < poly2.length; j++) {
      const touch = getIntersection(
        poly1[i],
        poly1[(i + 1) % poly1.length],
        poly2[j],
        poly2[(j + 1) % poly2.length]
      );
      if (touch) return true;
    }
  }
  return false;
}

function getRGBA(value) {
  const red = value > 0 ? 255 : 0;
  const green = red;
  const blue = value < 0 ? 255 : 0;
  const alpha = Math.abs(value);
  return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function getRandomColor() {
  return `hsl(${randomInt(290, 550)}, 100%, 50%)`;
}
