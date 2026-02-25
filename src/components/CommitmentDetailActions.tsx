import React from 'react';
import { FiLogOut, FiFileText, FiDownload, FiAlertCircle } from 'react-icons/fi';

interface CommitmentDetailActionsProps {
  canEarlyExit: boolean;
  onEarlyExit: () => void;
  onViewAttestations: () => void;
  onExportData: () => void;
  onReportIssue: () => void;
}

export function CommitmentDetailActions ({
  canEarlyExit,
  onEarlyExit,
  onViewAttestations,
  onExportData,
  onReportIssue,

}: CommitmentDetailActionsProps) {
  return (
    <div className="w-full ">
      {/* Section Heading */}
      <h2 className="text-white text-3xl font-bold mb-8">Actions</h2>

      {/* Primary Actions */}
      <div className="mb-8">
        <h3 className="text-white text-base font-semibold mb-4">Primary Actions</h3>
        
        {/* Early Exit Button */}
        <button
          onClick={canEarlyExit ? onEarlyExit : undefined}
          disabled={!canEarlyExit}
          className={`
            w-full rounded-3xl px-8 py-6
            border-2 transition-all duration-300
            flex items-center gap-6 justify-center
            ${canEarlyExit 
              ? 'bg-[#0A0A0A] border-[#F97316] shadow-[0_4px_24px_rgba(249,115,22,0.2),inset_0_1px_0_rgba(249,115,22,0.1)] hover:shadow-[0_8px_32px_rgba(249,115,22,0.3),inset_0_1px_0_rgba(249,115,22,0.2)] cursor-pointer hover:bg-[#161616]' 
              : 'bg-[#161616] border-[#F97316]/30 opacity-50 cursor-not-allowed'
            }
          `}
          aria-label="Early Exit - Exit before expiry (penalty applies)"
        >
          {/* Icon */}
          <FiLogOut className="text-[#F97316]" size={28}/>
          
          {/* Text Content */}
          <div className=" text-left">
            <div className="text-[#F97316] text-xl font-semibold mb-1">Early Exit</div>
            <div className="text-white/50 text-sm">Exit before expiry (penalty applies)</div>
          </div>
        </button>
      </div>

      {/* Additional Actions */}
      <div className="mb-8">
        <h3 className="text-white text-base font-semibold mb-4">Additional Actions</h3>
        
        <div className="space-y-3">
          {/* View Full Attestation History */}
          <button
            onClick={onViewAttestations}
            className="
              w-full rounded-2xl px-6 py-4
              bg-[#0a2122] border border-[#0b5d61]
              hover:bg-[#0d1d1e] hover:border-[#0f2324]
              transition-all duration-200
              flex items-center gap-4
              cursor-pointer
            "
            aria-label="View Full Attestation History"
          >
            {/* Icon */}
            <FiFileText className="text-white/70" size={22}/>
            
            {/* Text */}
            <span className="text-white text-base flex-1 text-left font-medium">
              View Full Attestation History
            </span>
          </button>

          {/* Export Commitment Data */}
          <button
            onClick={onExportData}
            className="
              w-full rounded-2xl px-6 py-4
              bg-[#161616] border border-[#232323]
              hover:bg-[#1a1a1a] hover:border-[#1f1f1f]
              transition-all duration-200
              flex items-center gap-4
              cursor-pointer
            "
            aria-label="Export Commitment Data"
          >
            {/* Icon */}
            <FiDownload className="text-white/70" size={22}/>
            
            {/* Text */}
            <span className="text-white text-base flex-1 text-left font-medium">
              Export Commitment Data
            </span>
          </button>

          {/* Report an Issue */}
          <button
            onClick={onReportIssue}
            className="
              w-full rounded-2xl px-6 py-4
              bg-[#161616] border border-[#232323]
              hover:bg-[#1a1a1a] hover:border-[#1f1f1f]
              transition-all duration-200
              flex items-center gap-4
              cursor-pointer
            "
            aria-label="Report an Issue"
          >
            {/* Icon */}
            <FiAlertCircle className="text-white/70" size={22}/>
            
            {/* Text */}
            <span className="text-white text-base flex-1 text-left font-medium">
              Report an Issue
            </span>
          </button>
        </div>
      </div>

      {/* Helper Note */}
      <div className="
        rounded-3xl px-6 py-5
        bg-[#0a1516] border border-[#0a282a]
        flex items-start gap-4 
      ">
       
        
        {/* Helper Text */}
        <p className="text-white/50 text-sm leading-relaxed ">
           All actions are recorded on-chain and can be verified through attestations. Contact support if you encounter any issues.
        </p>
      </div>
    </div>
  );
};

