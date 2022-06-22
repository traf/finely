import { css, keyframes } from '@root/stitches.config';

const rotateKeyframe = keyframes({
  '100%': { transform: 'rotate(360deg)' }
});

const dashKeyframe = keyframes({
  '0%': {
    strokeDashoffset: 0,
    strokeDasharray: '1, 150'
  },
  '50%': {
    strokeDashoffset: '-35',
    strokeDasharray: '90, 150'
  },
  '100%': {
    strokeDashoffset: '-124',
    strokeDasharray: '90, 150'
  }
});

const spinner = css({
  animation: `${rotateKeyframe} 2s linear infinite`
});

const path = css({
  strokeLinecap: 'round',
  animation: `${dashKeyframe} 1.5s ease-in-out infinite`
});

export function Loader({
  color = '#fff',
  size = '24px'
}: {
  color?: string;
  size?: string | number;
}) {
  return (
    <svg className={spinner({ css: { width: size, height: size } })} viewBox="0 0 50 50">
      <circle
        className={path({ css: { stroke: color } })}
        cx="25"
        cy="25"
        r="20"
        fill="none"
        strokeWidth="5"></circle>
    </svg>
  );
}
