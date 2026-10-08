import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/mapa")({
  component: MapaPage,
});

const territorios = [
  {
    "id": 1,
    "top": "15.0%",
    "left": "82.2%"
  },
  {
    "id": 2,
    "top": "28.7%",
    "left": "86.5%"
  },
  {
    "id": 3,
    "top": "25.0%",
    "left": "80.8%"
  },
  {
    "id": 4,
    "top": "34.8%",
    "left": "81.8%"
  },
  {
    "id": 5,
    "top": "45.3%",
    "left": "82.6%"
  },
  {
    "id": 6,
    "top": "15.8%",
    "left": "72.8%"
  },
  {
    "id": 7,
    "top": "25.5%",
    "left": "73.0%"
  },
  {
    "id": 8,
    "top": "36.1%",
    "left": "74.0%"
  },
  {
    "id": 9,
    "top": "46.4%",
    "left": "75.0%"
  },
  {
    "id": 10,
    "top": "16.4%",
    "left": "65.5%"
  },
  {
    "id": 11,
    "top": "27.0%",
    "left": "66.3%"
  },
  {
    "id": 12,
    "top": "37.8%",
    "left": "67.1%"
  },
  {
    "id": 13,
    "top": "48.0%",
    "left": "67.8%"
  },
  {
    "id": 14,
    "top": "35.1%",
    "left": "49.8%"
  },
  {
    "id": 15,
    "top": "49.5%",
    "left": "53.7%"
  },
  {
    "id": 16,
    "top": "30.1%",
    "left": "39.7%"
  },
  {
    "id": 17,
    "top": "39.7%",
    "left": "41.7%"
  },
  {
    "id": 18,
    "top": "47.7%",
    "left": "37.2%"
  },
  {
    "id": 19,
    "top": "49.0%",
    "left": "44.8%"
  },
  {
    "id": 20,
    "top": "65.7%",
    "left": "64.1%"
  },
  {
    "id": 21,
    "top": "75.7%",
    "left": "64.0%"
  },
  {
    "id": 22,
    "top": "58.8%",
    "left": "52.3%"
  },
  {
    "id": 23,
    "top": "66.1%",
    "left": "56.1%"
  },
  {
    "id": 24,
    "top": "75.8%",
    "left": "56.2%"
  },
  {
    "id": 25,
    "top": "66.1%",
    "left": "48.5%"
  },
  {
    "id": 26,
    "top": "75.8%",
    "left": "48.8%"
  },
  {
    "id": 27,
    "top": "58.8%",
    "left": "37.2%"
  },
  {
    "id": 28,
    "top": "66.1%",
    "left": "41.2%"
  },
  {
    "id": 29,
    "top": "75.8%",
    "left": "41.3%"
  },
  {
    "id": 30,
    "top": "66.1%",
    "left": "33.5%"
  },
  {
    "id": 31,
    "top": "75.8%",
    "left": "33.6%"
  },
  {
    "id": 32,
    "top": "58.8%",
    "left": "22.3%"
  },
  {
    "id": 33,
    "top": "66.1%",
    "left": "26.0%"
  },
  {
    "id": 34,
    "top": "75.8%",
    "left": "26.1%"
  },
  {
    "id": 35,
    "top": "66.1%",
    "left": "18.1%"
  },
  {
    "id": 36,
    "top": "75.8%",
    "left": "18.2%"
  }
];

function MapaPage() {
  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "1200px",
        margin: "0 auto",
      }}
    >
      <h1
        style={{
          fontSize: "28px",
          marginBottom: "20px",
        }}
      >
        Mapa de Territorios
      </h1>

      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <img
          src="/mapa-territorios.jpeg"
          alt="Mapa de Territorios"
          style={{
            width: "100%",
            height: "auto",
            display: "block",
          }}
        />

        {territorios.map((territorio) => (
          <button
            key={territorio.id}
            type="button"
            aria-label={`Abrir territorio ${territorio.id}`}
            title={`Abrir territorio ${territorio.id}`}
            onClick={() => {
              window.location.href = `/territorio/${territorio.id}`;
            }}
            style={{
              position: "absolute",
              top: territorio.top,
              left: territorio.left,
              width: "30px",
              height: "30px",
              padding: 0,
              borderRadius: "50%",
              border: "3px solid white",
              backgroundColor: "#111827",
              color: "white",
              fontSize: "15px",
              fontWeight: 700,
              lineHeight: "26px",
              textAlign: "center",
              cursor: "pointer",
              transform: "translate(-50%, -50%)",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.45)",
              zIndex: 2,
            }}
          >
            {territorio.id}
          </button>
        ))}
      </div>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "12px",
          marginTop: "16px",
          fontSize: "14px",
        }}
      >
        <span>Verde: al día</span>
        <span>Amarillo: pendiente</span>
        <span>Rojo: vencido</span>
      </div>
    </div>
  );
}
