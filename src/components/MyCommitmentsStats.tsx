'use client';

import React from 'react';
import { CommitmentStats } from '@/types/commitment';
import { ActivityIcon, DollarIcon, TargetIcon, FeesIcon } from './icons/StatsIcons';

interface MyCommitmentsStatsProps {
  stats: CommitmentStats;
}

const MyCommitmentsStats: React.FC<MyCommitmentsStatsProps> = ({ stats }) => {
  const statItems = [
    {
      label: 'Total Active Commitments',
      value: stats.totalActive,
      icon: ActivityIcon,
      colorClass: 'statTeal',
    },
    {
      label: 'Total Committed Value',
      value: stats.totalCommittedValue,
      icon: DollarIcon,
      colorClass: 'statGreen',
    },
    {
      label: 'Average Compliance Score',
      value: `${stats.avgComplianceScore}%`,
      icon: TargetIcon,
      colorClass: 'statBlue',
    },
    {
      label: 'Total Fees Generated',
      value: stats.totalFeesGenerated,
      icon: FeesIcon,
      colorClass: 'statPurple',
    },
  ];

  return (
    <div className="grid grid-cols-4 gap-5 mb-8 max-[1024px]:grid-cols-2 max-[640px]:grid-cols-1">
      {statItems.map((item, index) => {
        const Icon = item.icon;
        const colorClass =
          item.colorClass === 'statTeal'
            ? 'text-[#0FF0FC]'
            : item.colorClass === 'statGreen'
            ? 'text-[#10B981]'
            : item.colorClass === 'statBlue'
            ? 'text-[#3B82F6]'
            : 'text-[#A855F7]';

        return (
          <div
            key={index}
            className="relative flex flex-col gap-4 rounded-[16px] border border-white/10 bg-white/5 p-6 backdrop-blur-[10px]"
          >
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-[14px] border border-white/10 border-t-[0.56px] border-t-[#FFFFFF33] bg-[linear-gradient(180deg,rgba(255,255,255,0.1)_0%,rgba(0,0,0,0)_100%)]">
              <Icon size={32} />
            </div>
            <div className={`text-[30px] font-bold ${colorClass}`}>
              {item.value}
            </div>
            <div className="text-[14px] font-medium text-[#94A3B8]">
              {item.label}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MyCommitmentsStats;
