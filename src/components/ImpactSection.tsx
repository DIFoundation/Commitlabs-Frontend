import BenefitCard from './BenefitCard';
import ComparisonPanel from './ComparisonPanel';
import UsersIcon from './icons/UsersIcon';
import ProtocolsIcon from './icons/ProtocolsIcon';
import EcosystemsIcon from './icons/EcosystemsIcon';
import styles from './ImpactSection.module.css';

export default function ImpactSection() {
  const benefitsData = [
    {
      icon: <UsersIcon />,
      title: 'For Users',
      gradient: 'linear-gradient(180deg, rgba(173, 70, 255, 0.1) 0%, rgba(0, 0, 0, 0) 100%)',
      benefits: [
        'Predictable risk exposure',
        'Composable liquidity positions',
        'Better capital efficiency',
        'Verifiable commitment history',
      ],
    },
    {
      icon: <ProtocolsIcon />,
      title: 'For Protocols',
      gradient: 'linear-gradient(180deg, rgba(43, 127, 255, 0.1) 0%, rgba(0, 0, 0, 0) 100%)',
      benefits: [
        'Reliable, sticky liquidity',
        'Lower bootstrapping costs',
        'Reduced volatility risk',
        'No emission dependency',
      ],
    },
    {
      icon: <EcosystemsIcon />,
      title: 'For Ecosystems',
      gradient: 'linear-gradient(180deg, rgba(0, 184, 219, 0.1) 0%, rgba(0, 0, 0, 0) 100%)',
      benefits: [
        'Sticky, long-term capital',
        'Sustainable growth model',
        'Infrastructure-grade liquidity',
        'Reduced systemic risk',
      ],
    },
  ];

  const comparisonData = [
    {
      title: 'Traditional DeFi',
      variant: 'negative' as const,
      items: [
        'Deposits without guarantees',
        'LP tokens without reliability',
        'Emissions-driven liquidity',
        'Unpredictable exits',
      ],
    },
    {
      title: 'CommitLabs',
      variant: 'positive' as const,
      items: [
        'Time-bound liquidity logic',
        'Enforceable behavior',
        'Measurable reliability',
        'Reusable infrastructure',
      ],
    },
    {
      title: 'The Result',
      variant: 'result' as const,
      items: [
        'Sustainable protocols',
        'Predictable markets',
        'Reduced systemic risk',
        'True DeFi infrastructure',
      ],
    },
  ];

  return (
    <section className={styles.impactSection}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <span className={styles.tag}>IMPACT</span>
          <h2 className={styles.mainHeading}>Why This Matters</h2>
          <p className={styles.subtitle}>
            A paradigm shift from incentive-driven to commitment-driven liquidity
          </p>
        </div>

        {/* Benefit Cards */}
        <div className={styles.benefitsGrid}>
          {benefitsData.map((benefit, index) => (
            <BenefitCard
              key={index}
              icon={benefit.icon}
              title={benefit.title}
              benefits={benefit.benefits}
              gradient={benefit.gradient}
            />
          ))}
        </div>

        {/* Comparison Panels */}
        <div className={styles.comparisonGrid}>
          {comparisonData.map((comparison, index) => (
            <ComparisonPanel
              key={index}
              title={comparison.title}
              items={comparison.items}
              variant={comparison.variant}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
