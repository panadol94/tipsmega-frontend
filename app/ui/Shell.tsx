import MegaLogo from "./MegaLogo";
import MatrixRain from "./MatrixRain";
import ChatRoom from "./ChatRoom";

export default function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="app-bg">
      <MatrixRain />
      {/* Top Brand Header */}
      <div className="top-brand">
        <div className="top-brand-inner">
          <div className="brand-left">
            <div className="brand-logo">
              <MegaLogo />
            </div>

            <div className="brand-text">
              <div className="brand-title">MEGA888 AI</div>
              <div className="brand-sub">Tips • RTP • VIP Scanner</div>
            </div>
          </div>

          <div className="brand-chip">Premium</div>
        </div>
      </div>

      {/* Content */}
      <div className="app-wrap">
        <div className="app-shell">{children}</div>
      </div>

      {/* GLOBAL CHATROOM */}
      <ChatRoom />
    </div>
  );
}