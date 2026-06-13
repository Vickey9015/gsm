import './GrowthVisual.css'

export default function GrowthVisual() {
  return (
    <div className="growth-visual" role="img" aria-label="Growth chart showing upward business trajectory">
      <div className="growth-visual__header">
        <span className="growth-visual__title">Growth trajectory</span>
        <span className="growth-visual__badge">+127%</span>
      </div>
      <svg
        className="growth-visual__chart"
        viewBox="0 0 400 260"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="barGrad" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor="#3d8b8b" />
            <stop offset="100%" stopColor="#c9a962" />
          </linearGradient>
          <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(201, 169, 98, 0.35)" />
            <stop offset="100%" stopColor="rgba(201, 169, 98, 0)" />
          </linearGradient>
        </defs>

        {/* Grid */}
        {[50, 100, 150, 200].map((y) => (
          <line
            key={y}
            x1="48"
            y1={y}
            x2="380"
            y2={y}
            stroke="rgba(255,255,255,0.06)"
            strokeWidth="1"
          />
        ))}

        {/* Bars */}
        <rect className="growth-visual__bar growth-visual__bar--1" x="72" y="160" width="36" height="60" rx="4" fill="url(#barGrad)" />
        <rect className="growth-visual__bar growth-visual__bar--2" x="128" y="130" width="36" height="90" rx="4" fill="url(#barGrad)" />
        <rect className="growth-visual__bar growth-visual__bar--3" x="184" y="100" width="36" height="120" rx="4" fill="url(#barGrad)" />
        <rect className="growth-visual__bar growth-visual__bar--4" x="240" y="70" width="36" height="150" rx="4" fill="url(#barGrad)" />
        <rect className="growth-visual__bar growth-visual__bar--5" x="296" y="45" width="36" height="175" rx="4" fill="url(#barGrad)" />

        {/* Area under line */}
        <path
          className="growth-visual__area"
          d="M 56 200 L 120 175 L 180 140 L 240 105 L 300 72 L 360 48 L 360 220 L 56 220 Z"
          fill="url(#areaGrad)"
        />

        {/* Growth line */}
        <path
          className="growth-visual__line"
          d="M 56 200 L 120 175 L 180 140 L 240 105 L 300 72 L 360 48"
          stroke="#c9a962"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Points */}
        {[
          [56, 200],
          [120, 175],
          [180, 140],
          [240, 105],
          [300, 72],
          [360, 48],
        ].map(([cx, cy], i) => (
          <circle
            key={i}
            className={`growth-visual__dot growth-visual__dot--${i + 1}`}
            cx={cx}
            cy={cy}
            r="5"
            fill="#0a0d10"
            stroke="#c9a962"
            strokeWidth="2"
          />
        ))}

        {/* Axis labels */}
        <text x="72" y="238" fill="#9aa3ad" fontSize="11" fontFamily="DM Sans, sans-serif">
          Q1
        </text>
        <text x="128" y="238" fill="#9aa3ad" fontSize="11" fontFamily="DM Sans, sans-serif">
          Q2
        </text>
        <text x="184" y="238" fill="#9aa3ad" fontSize="11" fontFamily="DM Sans, sans-serif">
          Q3
        </text>
        <text x="240" y="238" fill="#9aa3ad" fontSize="11" fontFamily="DM Sans, sans-serif">
          Q4
        </text>
        <text x="296" y="238" fill="#9aa3ad" fontSize="11" fontFamily="DM Sans, sans-serif">
          Q5
        </text>
      </svg>
      <ul className="growth-visual__legend">
        <li>
          <span className="growth-visual__swatch growth-visual__swatch--gold" />
          Revenue growth
        </li>
        <li>
          <span className="growth-visual__swatch growth-visual__swatch--teal" />
          Market position
        </li>
      </ul>
    </div>
  )
}
