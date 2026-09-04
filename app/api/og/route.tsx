import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const contentType = 'image/png';
export const size = { width: 1200, height: 630 };

const themeColors: Record<string, { primary: string; secondary: string; accent: string }> = {
  'born-since': { primary: '#34d399', secondary: '#4dd9ff', accent: '#f5c542' },
  'co2-since': { primary: '#f87171', secondary: '#fbbf24', accent: '#f59e0b' },
  'earth-distance': { primary: '#4dd9ff', secondary: '#a78bfa', accent: '#34d399' },
  'sea-level-rise': { primary: '#60a5fa', secondary: '#22d3ee', accent: '#3b82f6' },
};

export function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const theme = searchParams.get('theme') || 'default';
  const colors = themeColors[theme] || themeColors['earth-distance'];

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: 'linear-gradient(135deg, #06080d 0%, #0a1628 50%, #0d0a1a 100%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Subtle glow */}
        <div
          style={{
            position: 'absolute',
            width: 600,
            height: 600,
            borderRadius: '50%',
            background: `radial-gradient(circle, ${colors.primary}15 0%, transparent 70%)`,
            top: '20%',
            left: '50%',
            transform: 'translateX(-50%)',
          }}
        />

        {/* Stars dots */}
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              width: Math.random() * 2 + 1,
              height: Math.random() * 2 + 1,
              borderRadius: '50%',
              background: 'rgba(200,220,255,0.4)',
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
          />
        ))}

        {/* Main content */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '0 60px' }}>
          <div
            style={{
              fontSize: 20,
              color: 'rgba(238,242,255,0.4)',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              marginBottom: 16,
              fontFamily: 'system-ui, sans-serif',
            }}
          >
            Real-Time Global Data
          </div>

          <h1
            style={{
              fontSize: 72,
              fontWeight: 700,
              margin: '0 0 16px 0',
              background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 50%, ${colors.accent} 100%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              fontFamily: 'system-ui, sans-serif',
              lineHeight: 1.1,
            }}
          >
            UniversePulse
          </h1>

          <p
            style={{
              fontSize: 24,
              color: 'rgba(238,242,255,0.6)',
              margin: '0 0 40px 0',
              fontFamily: 'system-ui, sans-serif',
              lineHeight: 1.5,
              textAlign: 'center',
            }}
          >
            {theme === 'born-since' && 'Watch global population growth in real-time.'}
            {theme === 'co2-since' && 'Track carbon emissions as they happen.'}
            {theme === 'earth-distance' && 'See how far Earth travels through space.'}
            {theme === 'sea-level-rise' && 'Monitor rising seas and climate impact.'}
            {theme !== 'born-since' && theme !== 'co2-since' && theme !== 'earth-distance' && theme !== 'sea-level-rise' && 'Watch the world change in real-time.'}
            <br />
            Global population, resources &amp; climate — every second.
          </p>

          {/* Key stats */}
          <div
            style={{
              display: 'flex',
              gap: 48,
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}
          >
            {[
              { label: 'Population', value: '8.35B', color: colors.primary },
              { label: 'CO₂/sec', value: '~1,187t', color: colors.secondary },
              { label: 'Sea Level', value: '+3.6mm/yr', color: colors.accent },
            ].map((stat) => (
              <div key={stat.label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div
                  style={{
                    fontSize: 36,
                    fontWeight: 700,
                    color: stat.color,
                    fontFamily: 'monospace',
                    letterSpacing: '-0.02em',
                  }}
                >
                  {stat.value}
                </div>
                <div
                  style={{
                    fontSize: 12,
                    color: 'rgba(238,242,255,0.4)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.15em',
                    marginTop: 4,
                  }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 3,
            background: `linear-gradient(90deg, ${colors.primary}, ${colors.secondary}, ${colors.accent})`,
          }}
        />
      </div>
    ),
    { ...size }
  );
}
