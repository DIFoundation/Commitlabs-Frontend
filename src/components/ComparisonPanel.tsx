import styles from './ComparisonPanel.module.css';

interface ComparisonPanelProps {
  title: string;
  items: string[];
  variant: 'negative' | 'positive' | 'result';
}

export default function ComparisonPanel({ title, items, variant }: ComparisonPanelProps) {
  const getIcon = () => {
    switch (variant) {
      case 'negative':
        return '✕';
      case 'positive':
        return '✓';
      case 'result':
        return '→';
    }
  };

  return (
    <div className={`${styles.panel} ${styles[variant]}`}>
      <h3 className={styles.title}>{title}</h3>
      <ul className={styles.itemList}>
        {items.map((item, index) => (
          <li key={index} className={styles.item}>
            <span className={styles.icon}>{getIcon()}</span>
            <span className={styles.text}>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
