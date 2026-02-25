import styles from './BenefitCard.module.css';

interface BenefitCardProps {
  icon: React.ReactNode;
  title: string;
  gradient?: string;
  benefits: string[];
}

export default function BenefitCard({ icon, title, benefits, gradient }: BenefitCardProps) {
  return (
    <div className={styles.card} style={gradient ? { background: gradient } : {}}>
      <div className={styles.iconWrapper}>{icon}</div>
      <h3 className={styles.title}>{title}</h3>
      <ul className={styles.benefitList}>
        {benefits.map((benefit, index) => (
          <li key={index} className={styles.benefitItem}>
            {benefit}
          </li>
        ))}
      </ul>
    </div>
  );
}
