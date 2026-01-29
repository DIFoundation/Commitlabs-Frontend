'use client'

import { useEffect, useRef, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { AlertTriangle, X } from 'lucide-react'
import styles from './CommitmentEarlyExitModal.module.css'

export interface CommitmentEarlyExitModalProps {
  isOpen: boolean
  commitmentId: string
  originalAmount: string
  penaltyPercent: string
  penaltyAmount: string
  netReceiveAmount: string
  hasAcknowledged: boolean
  onChangeAcknowledged: (value: boolean) => void
  onCancel: () => void
  onConfirm: () => void
  onClose?: () => void
}

const FOCUSABLE_SELECTOR =
  'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'

function getFocusableElements(container: HTMLElement): HTMLElement[] {
  return Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR))
}

function trapFocus(container: HTMLElement, e: KeyboardEvent) {
  if (e.key !== 'Tab') return
  const focusable = getFocusableElements(container)
  if (focusable.length === 0) return
  const first = focusable[0]
  const last = focusable[focusable.length - 1]
  if (e.shiftKey) {
    if (document.activeElement === first) {
      e.preventDefault()
      last.focus()
    }
  } else {
    if (document.activeElement === last) {
      e.preventDefault()
      first.focus()
    }
  }
}

export default function CommitmentEarlyExitModal({
  isOpen,
  commitmentId,
  originalAmount,
  penaltyPercent,
  penaltyAmount,
  netReceiveAmount,
  hasAcknowledged,
  onChangeAcknowledged,
  onCancel,
  onConfirm,
  onClose,
}: CommitmentEarlyExitModalProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const previousActiveElement = useRef<HTMLElement | null>(null)

  const handleClose = useCallback(() => {
    ;(onClose ?? onCancel)()
  }, [onClose, onCancel])

  useEffect(() => {
    if (!isOpen) return
    previousActiveElement.current = document.activeElement as HTMLElement | null
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return
    const container = cardRef.current?.closest('[role="dialog"]') as HTMLElement
    if (!container) return
    const focusable = getFocusableElements(container)
    const first = focusable[0]
    if (first) first.focus()
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose()
        return
      }
      trapFocus(container, e)
    }
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      if (previousActiveElement.current?.focus) {
        previousActiveElement.current.focus()
      }
    }
  }, [isOpen, handleClose])

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) handleClose()
  }

  if (!isOpen) return null

  const modalContent = (
    <div
      className={styles.overlay}
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="early-exit-modal-title"
      aria-describedby="early-exit-modal-desc"
    >
      <div ref={cardRef} className={styles.card} onClick={(e) => e.stopPropagation()}>
        <div className={styles.headerRow}>
          <div className={styles.warningIconWrap} aria-hidden>
            <AlertTriangle size={24} strokeWidth={2.5} />
          </div>
          <div className={styles.headerText}>
            <h2 id="early-exit-modal-title" className={styles.title}>
              Early Exit Warning
            </h2>
            <p id="early-exit-modal-desc" className={styles.subtitle}>
              You are about to exit your commitment early. This will incur penalties.
            </p>
          </div>
          <button
            type="button"
            className={styles.closeButton}
            onClick={handleClose}
            aria-label="Close modal"
          >
            <X size={20} strokeWidth={2} />
          </button>
        </div>

        <table className={styles.summaryTable}>
          <tbody>
            <tr>
              <th scope="row">Commitment ID</th>
              <td>{commitmentId}</td>
            </tr>
            <tr>
              <th scope="row">Original Amount</th>
              <td>{originalAmount}</td>
            </tr>
            <tr>
              <th scope="row">Early Exit Penalty</th>
              <td>{penaltyPercent} ({penaltyAmount})</td>
            </tr>
            <tr>
              <th scope="row">You&apos;ll Receive</th>
              <td className={styles.netReceive}>{netReceiveAmount}</td>
            </tr>
          </tbody>
        </table>

        <div className={styles.noticeBlock}>
          <div className={styles.noticeTitle}>
            <AlertTriangle size={18} strokeWidth={2.5} aria-hidden />
            Important
          </div>
          <ul className={styles.noticeList}>
            <li>Loss of a percentage of your committed amount.</li>
            <li>On-chain recording as an early exit.</li>
            <li>Compliance score impact.</li>
            <li>Loss of full yield potential.</li>
          </ul>
        </div>

        <div className={styles.checkboxRow}>
          <input
            id="early-exit-ack"
            type="checkbox"
            className={styles.checkbox}
            checked={hasAcknowledged}
            onChange={(e) => onChangeAcknowledged(e.target.checked)}
            aria-describedby="early-exit-ack-desc"
          />
          <label id="early-exit-ack-desc" htmlFor="early-exit-ack" className={styles.checkboxLabel}>
            I understand the consequences and want to proceed with early exit.
          </label>
        </div>

        <div className={styles.footer}>
          <button type="button" className={styles.cancelButton} onClick={onCancel}>
            Cancel
          </button>
          <button
            type="button"
            className={styles.confirmButton}
            disabled={!hasAcknowledged}
            onClick={onConfirm}
            aria-disabled={!hasAcknowledged}
          >
            Confirm Early Exit
          </button>
        </div>
      </div>
    </div>
  )

  if (typeof document !== 'undefined') {
    return createPortal(modalContent, document.body)
  }
  return modalContent
}
