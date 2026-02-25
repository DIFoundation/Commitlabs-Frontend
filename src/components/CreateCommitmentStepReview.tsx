'use client';

import { useState } from 'react';
import { Shield, TrendingUp, Flame, AlertCircle, CheckCircle2, Check, ArrowLeft, Loader2 } from 'lucide-react';
import styles from './CreateCommitmentStepReview.module.css';

interface CreateCommitmentStepReviewProps {
  typeLabel: string;
  amount: string;
  asset: string;
  durationDays: number;
  maxLossPercent: number;
  earlyExitPenalty: string;
  estimatedFees: string;
  estimatedYield: string;
  commitmentStart: string;
  commitmentEnd: string;
  isSubmitting?: boolean;
  submitError?: string;
  onBack: () => void;
  onSubmit: () => void;
}

export default function CreateCommitmentStepReview({
  typeLabel,
  amount,
  asset,
  durationDays,
  maxLossPercent,
  earlyExitPenalty,
  estimatedFees,
  estimatedYield,
  commitmentStart,
  commitmentEnd,
  isSubmitting = false,
  submitError,
  onBack,
  onSubmit,
}: CreateCommitmentStepReviewProps) {
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [acknowledgedRisks, setAcknowledgedRisks] = useState(false);

  const canSubmit = acceptedTerms && acknowledgedRisks && !isSubmitting;

  // Determine icon based on label (naive matching, but effective for this context)
  const getIconAndStyle = () => {
    const labelLower = typeLabel.toLowerCase();
    if (labelLower.includes('safe')) return { Icon: Shield, styleClass: styles.iconSafe };
    if (labelLower.includes('aggressive')) return { Icon: Flame, styleClass: styles.iconAggressive };
    return { Icon: TrendingUp, styleClass: styles.iconBalanced };
  };

  const { Icon, styleClass } = getIconAndStyle();

  return (
    <div className={styles.container}>
      <div className={styles.contentWrapper}>
        {/* Back Button */}
        <button onClick={onBack} className={styles.backButton}>
          <ArrowLeft size={16} />
          Back
        </button>

        {/* Header */}
        <div className={styles.header}>
          <h1 className={styles.title}>Create Commitment</h1>
          <p className={styles.subtitle}>
            Define your liquidity commitment with explicit rules and guarantees
          </p>
        </div>
        <hr className="mb-6 lg:mb-8" />

        {/* Stepper */}
        <div className={styles.stepIndicator}>
          <div className={styles.stepsContainer}>
            {/* Step 1 - Completed */}
            <div className={styles.step}>
              <div className={`${styles.stepCircle} ${styles.stepCircleCompleted}`}>
                <Check size={16} />
              </div>
              <span className={`${styles.stepLabel} ${styles.stepLabelCompleted}`}>Select Type</span>
            </div>
            <div className={`${styles.line} ${styles.lineCompleted}`}></div>

            {/* Step 2 - Completed */}
            <div className={styles.step}>
              <div className={`${styles.stepCircle} ${styles.stepCircleCompleted}`}>
                <Check size={16} />
              </div>
              <span className={`${styles.stepLabel} ${styles.stepLabelCompleted}`}>Configure</span>
            </div>
            <div className={`${styles.line} ${styles.lineCompleted}`}></div>

            {/* Step 3 - Active */}
            <div className={styles.step}>
              <div className={`${styles.stepCircle} ${styles.stepCircleActive}`}>
                3
              </div>
              <span className={`${styles.stepLabel} ${styles.stepLabelActive}`}>Review</span>
            </div>
          </div>
        </div>

        {/* Review Headings */}
        <div className={styles.reviewHeading}>
          <h2 className={styles.reviewTitle}>Review & Confirm</h2>
          <p className={styles.reviewSubtitle}>
            Please review your commitment details before confirming
          </p>
        </div>

        {/* Summary Card */}
        <div className={styles.summaryCard}>
          <div className={styles.cardHeader}>
            <div className={`${styles.typeIconContainer}`}>
              <Icon size={28} className={styleClass} />
            </div>
            <div className={styles.typeInfo}>
              <h3>{typeLabel}</h3>
              <p>Your commitment summary</p>
            </div>
          </div>

          <div className={styles.dataGrid}>
            <div className={styles.dataItem}>
              <span className={styles.dataLabel}>Amount</span>
              <div className={styles.dataValue}>
                {amount} <span style={{ fontSize: '0.8em', color: '#6b7280' }}>{asset}</span>
              </div>
            </div>
            <div className={styles.dataItem}>
              <span className={styles.dataLabel}>Duration</span>
              <div className={styles.dataValue}>{durationDays} days</div>
            </div>
            <div className={styles.dataItem}>
              <span className={styles.dataLabel}>Max Loss</span>
              <div className={styles.dataValue}>{maxLossPercent !== undefined ? `${maxLossPercent}%` : 'N/A'}</div>
            </div>
            <div className={styles.dataItem}>
              <span className={styles.dataLabel}>Early Exit Penalty</span>
              <div className={styles.dataValue}>{earlyExitPenalty}</div>
            </div>
          </div>

          <div className={styles.secondaryDetails}>
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Estimated Transaction Fees</span>
              <span className={styles.detailValue}>{estimatedFees}</span>
            </div>
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Estimated Yield (APY)</span>
              <span className={`${styles.detailValue} ${styles.highlightValue}`}>{estimatedYield}</span>
            </div>
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Commitment Start</span>
              <span className={styles.detailValue}>{commitmentStart}</span>
            </div>
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Commitment End</span>
              <span className={styles.detailValue}>{commitmentEnd}</span>
            </div>
          </div>
        </div>

        {/* Checkboxes */}
        <div className={styles.checkboxSection}>
          <div className={styles.checkboxRow}
              onClick={() => setAcceptedTerms(!acceptedTerms)}>
            <CheckCircle2
              id='terms'
              className={`animate-in mt-1 text-[#0FF0FC] drop-shadow-[0_0_10px_rgba(15,240,252,0.5)] ${acceptedTerms ? 'fade-in opacity-100' : 'opacity-0'}`}
              aria-checked={acceptedTerms}
              size={16}
            />
            <div className={styles.checkboxContent}>
              <label htmlFor="terms">
                <h4>I agree to the terms and conditions</h4>
              </label>
              <p>
                I have read and understand the <a href="#" className={styles.link}>terms of service</a> and smart contract exit conditions.
              </p>
            </div>
          </div>

          <div className={styles.checkboxRow}
              onClick={() => setAcknowledgedRisks(!acknowledgedRisks)}>
            <CheckCircle2
              id='risks'
              className={`animate-in mt-1 text-[#0FF0FC] drop-shadow-[0_0_10px_rgba(15,240,252,0.5)] ${acknowledgedRisks ? 'fade-in opacity-100' : 'opacity-0'}`}
              aria-checked={acknowledgedRisks}
              size={16}
            />
            <div className={styles.checkboxContent}>
              <label htmlFor="risks">
                <h4>I acknowledge the risks</h4>
              </label>
              <p>
                I understand that DeFi protocols carry inherent risks including smart contract vulnerabilities, market volatility, and potential loss of funds. I accept these risks.
              </p>
            </div>
          </div>
        </div>

        {/* Important Notice */}
        <div className={styles.noticeBanner}>
          <AlertCircle size={20} className={styles.noticeIcon} />
          <div className={styles.noticeContent}>
            <h4>Important Notice</h4>
            <p>
              Once created, this commitment cannot be modified. Early exits will incur the penalty shown above. Make sure all details are correct before proceeding.
            </p>
          </div>
        </div>

        {/* Footer Actions */}
        <div className={styles.footer}>
          {submitError && (
            <p className="text-red-500 mb-4 text-sm">{submitError}</p>
          )}

          <button
            onClick={onSubmit}
            disabled={!canSubmit}
            className={styles.createButton}
          >
            {isSubmitting ? (
              <>
                <Loader2 size={20} className="animate-spin" />
                Processing Transaction...
              </>
            ) : (
              <>
                <CheckCircle2 size={20} />
                Create Commitment
              </>
            )}
          </button>

          <div className={styles.disclaimer}>
            <AlertCircle size={14} />
            <span>This will initiate a blockchain transaction</span>
          </div>
        </div>
      </div>
    </div>
  );
}
