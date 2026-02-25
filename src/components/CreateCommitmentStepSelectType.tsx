'use client';
import { Shield, TrendingUp, Flame, ArrowRight, ChevronLeft } from 'lucide-react';
import styles from './CreateCommitmentStepSelectType.module.css';

interface CommitmentType {
  id: 'safe' | 'balanced' | 'aggressive';
  title: string;
  icon: typeof Shield;
  duration: string;
  maxLoss: string;
  description: string;
  badge: string | null;
  badgeType: 'recommended' | 'risk' | null;
}

interface CreateCommitmentStepSelectTypeProps {
  selectedType: 'safe' | 'balanced' | 'aggressive' | null;
  onSelectType: (type: 'safe' | 'balanced' | 'aggressive') => void;
  onNext: (type: 'safe' | 'balanced' | 'aggressive') => void;
  onBack: () => void;
}

const commitmentTypes: CommitmentType[] = [
  {
    id: 'safe',
    title: 'Safe Commitment',
    icon: Shield,
    duration: '30 days',
    maxLoss: '2%',
    description: 'Lower risk stable yield with minimal risk exposure',
    badge: 'Recommended',
    badgeType: 'recommended',
  },
  {
    id: 'balanced',
    title: 'Balanced Commitment',
    icon: TrendingUp,
    duration: '60 days',
    maxLoss: '8%',
    description: 'Medium yield potential with controlled risk',
    badge: null,
    badgeType: null,
  },
  {
    id: 'aggressive',
    title: 'Aggressive Commitment',
    icon: Flame,
    duration: '90 days',
    maxLoss: 'No protection',
    description: 'Highest yield potential with no loss protection',
    badge: '⚠ High Risk',
    badgeType: 'risk',
  },
];

export default function CreateCommitmentStepSelectType({
  selectedType,
  onSelectType,
  onNext,
  onBack,
}: CreateCommitmentStepSelectTypeProps) {
  const handleContinue = () => {
    if (selectedType) {
      onNext(selectedType);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.contentWrapper}>
        {/* Back Button */}
        <button 
          onClick={onBack}
          className={styles.backButton}
        >
          <ChevronLeft size={16} />
          Back to Home
        </button>

        {/* Header */}
        <div className={styles.header}>
          <h1 className={styles.title}>Create Commitment</h1>
          <p className={styles.subtitle}>
            Define your liquidity commitment with explicit rules and guarantees
          </p>
        </div>

        {/* Step Indicator */}
        <div className={styles.stepIndicator}>
          <div className={styles.stepsContainer}>
            {/* Step 1 - Active */}
            <div className={styles.step}>
              <div className={`${styles.stepCircle} ${styles.stepCircleActive}`}>
                1
              </div>
              <span className={`${styles.stepLabel} ${styles.stepLabelActive}`}>Select Type</span>
            </div>

            {/* Line to Step 2 */}
            <div className={styles.line}></div>

            {/* Step 2 - Upcoming */}
            <div className={styles.step}>
              <div className={`${styles.stepCircle} ${styles.stepCircleInactive}`}>
                2
              </div>
              <span className={`${styles.stepLabel} ${styles.stepLabelInactive}`}>Configure</span>
            </div>

            {/* Line to Step 3 */}
            <div className={styles.line}></div>

            {/* Step 3 - Upcoming */}
            <div className={styles.step}>
              <div className={`${styles.stepCircle} ${styles.stepCircleInactive}`}>
                3
              </div>
              <span className={`${styles.stepLabel} ${styles.stepLabelInactive}`}>Review</span>
            </div>
          </div>
        </div>

        {/* Title */}
        <div className={styles.titleSection}>
          <h2 className={styles.sectionTitle}>Choose Your Commitment Type</h2>
          <p className={styles.sectionSubtitle}>
            Select the risk profile that matches your investment strategy
          </p>
        </div>

        {/* Commitment Cards */}
        <div className={styles.cardsContainer}>
          {commitmentTypes.map((type) => {
            const Icon = type.icon;
            const isSelected = selectedType === type.id;

            return (
              <div
                key={type.id}
                onClick={() => onSelectType(type.id)}
                role="radio"
                aria-checked={isSelected}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onSelectType(type.id);
                  }
                }}
                className={`${styles.card} ${
                  type.id === 'safe' 
                    ? styles.cardSafe 
                    : type.id === 'aggressive' 
                    ? styles.cardAggressive 
                    : styles.cardBalanced
                } ${isSelected ? styles.cardSelected : ''}`}
              >
                {/* Badge */}
                {type.badge && (
                  <div
                    className={`${styles.badge} ${
                      type.badgeType === 'recommended'
                        ? styles.badgeRecommended
                        : styles.badgeRisk
                    }`}
                  >
                    {type.badge}
                  </div>
                )}

                {/* Icon */}
                <div className={styles.iconContainer}>
                  <Icon
                    size={24}
                    className={
                      type.id === 'safe'
                        ? styles.iconEmerald
                        : type.id === 'balanced'
                        ? styles.iconBlue
                        : styles.iconOrange
                    }
                  />
                </div>

                {/* Title */}
                <h3 className={styles.cardTitle}>{type.title}</h3>

                {/* Details */}
                <div className={styles.statsContainer}>
                  <div className={styles.statRow}>
                    <span className={styles.statLabel}>Duration</span>
                    <span className={styles.statValue}>{type.duration}</span>
                  </div>
                  <div className={styles.statRow}>
                    <span className={styles.statLabel}>Max Loss</span>
                    <span
                      className={`${styles.statValue} ${
                        type.maxLoss === 'No protection' ? styles.statValueRisk : ''
                      }`}
                    >
                      {type.maxLoss}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className={styles.description}>{type.description}</p>
              </div>
            );
          })}
        </div>

        {/* Info Box */}
        <div className={styles.infoBox}>
          <p className={styles.infoText}>
            💡 <span className={styles.infoTextHighlight}>Tip:</span> Your commitment type
            determines the initial parameters. You can customize these in the
            next step.
          </p>
        </div>

        {/* Action Buttons */}
        <div className={styles.actionButtons}>
          <button onClick={onBack} className={styles.backBtn}>
            Back
          </button>
          <button
            onClick={handleContinue}
            disabled={!selectedType}
            className={`${styles.continueBtn} ${
              selectedType ? styles.continueBtnEnabled : styles.continueBtnDisabled
            }`}
          >
            Continue
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
