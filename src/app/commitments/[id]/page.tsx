import Link from 'next/link'
import { notFound } from 'next/navigation'
import { CommitmentDetailParameters } from '@/components/CommitmentDetailParameters/CommitmentDetailParameters'
import styles from './page.module.css'

// TODO: Replace with actual data from contracts; keep in sync with list page mock data
const MOCK_COMMITMENTS: Record<
  string,
  { id: string; type: string; duration: number; maxLoss: number; earlyExitPenaltyPercent?: number }
> = {
  '1': { id: '1', type: 'Balanced', duration: 60, maxLoss: 8, earlyExitPenaltyPercent: 3 },
  '2': { id: '2', type: 'Safe', duration: 30, maxLoss: 2, earlyExitPenaltyPercent: 3 },
}

function getCommitmentById(id: string) {
  return MOCK_COMMITMENTS[id] ?? null
}

export default function CommitmentDetailPage({
  params,
}: {
  params: { id: string }
}) {
  const commitment = getCommitmentById(params.id)
  if (!commitment) notFound()

  const durationLabel = `${commitment.duration} days`
  const maxLossLabel = `${commitment.maxLoss}%`
  const commitmentTypeLabel = commitment.type
  const earlyExitPenaltyLabel = `${commitment.earlyExitPenaltyPercent ?? 3}%`

  return (
    <main id="main-content" className={styles.container}>
      <header className={styles.header}>
        <Link href="/commitments" className={styles.backLink} aria-label="Back to My Commitments">
          ← Back to My Commitments
        </Link>
        <h1>{commitment.type} Commitment #{commitment.id}</h1>
        <p>Commitment details and parameters</p>
      </header>

      <CommitmentDetailParameters
        durationLabel={durationLabel}
        maxLossLabel={maxLossLabel}
        commitmentTypeLabel={commitmentTypeLabel}
        earlyExitPenaltyLabel={earlyExitPenaltyLabel}
      />

      <div className={styles.placeholder} aria-hidden="true">
        Other commitment detail sections (e.g. attestations, timeline) will go here.
      </div>
    </main>
  )
}
