import Image from "next/image"

export default function ResepLoading() {
  return (
    <div className="resep-loading-overlay">
      <div className="resep-loading-logo">
        <Image
          src="/logo.png"
          alt="Beecook Logo"
          width={186}
          height={47}
          className="object-contain"
          priority
        />
      </div>

      <style>{`
        .resep-loading-overlay {
          position: fixed;
          inset: 0;
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255, 255, 255, 0.6);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
        }

        .resep-loading-logo {
          animation: resepPulse 1.6s cubic-bezier(0.4, 0, 0.6, 1) infinite,
                     resepFloat 2.4s ease-in-out infinite;
        }

        @keyframes resepPulse {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.45;
            transform: scale(0.92);
          }
        }

        @keyframes resepFloat {
          0%, 100% {
            translate: 0 0;
          }
          50% {
            translate: 0 -8px;
          }
        }
      `}</style>
    </div>
  )
}
