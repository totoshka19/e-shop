import styles from '../../styles/admin/icons.module.scss';

type IconProps = {
  size?: number;
  color?: string;
};

function CheckIcon({ size = 24, color }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke={color || 'currentColor'}
      strokeWidth="2"
      className={styles['icon']}
      style={{ width: `${size}px`, height: `${size}px` }}
    >
      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
    </svg>
  );
}

function CrossIcon({ size = 24, color }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke={color || 'currentColor'}
      strokeWidth="4"
      className={styles['icon']}
      style={{ width: `${size}px`, height: `${size}px` }}
    >
      <path d="M18 6L6 18M6 6l12 12" />
    </svg>
  );
}

export { CheckIcon, CrossIcon };
