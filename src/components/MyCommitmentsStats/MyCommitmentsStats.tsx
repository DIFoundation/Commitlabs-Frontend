'use client';

import React from 'react';
import { TrendingUp, DollarSign, Award, Coins } from 'lucide-react';
import styles from './MyCommitmentsStats.module.css';
import { clsx } from 'clsx';

interface MetricCardProps {
    icon: React.ReactNode;
    value: string | number;
    label: string;
    variant: 'teal' | 'green' | 'blue' | 'purple';
}

const MetricCard: React.FC<MetricCardProps> = ({ icon, value, label, variant }) => {
    return (
        <div className={clsx(styles.card, styles[variant])}>
            <div className={styles.iconWrapper}>
                {icon}
            </div>
            <div className={styles.content}>
                <div className={styles.value}>{value}</div>
                <div className={styles.label}>{label}</div>
            </div>
        </div>
    );
};

interface MyCommitmentsStatsProps {
    totalActive: number;
    totalCommittedValue: string;
    averageComplianceScore: string;
    totalFeesGenerated: string;
}

const MyCommitmentsStats: React.FC<MyCommitmentsStatsProps> = ({
    totalActive,
    totalCommittedValue,
    averageComplianceScore,
    totalFeesGenerated,
}) => {
    return (
        <div className={styles.statsGrid}>
            <MetricCard
                variant="teal"
                icon={<TrendingUp size={20} />}
                value={totalActive}
                label="Total Active Commitments"
            />
            <MetricCard
                variant="green"
                icon={<DollarSign size={20} />}
                value={totalCommittedValue}
                label="Total Committed Value"
            />
            <MetricCard
                variant="blue"
                icon={<Award size={20} />}
                value={averageComplianceScore}
                label="Average Compliance Score"
            />
            <MetricCard
                variant="purple"
                icon={<Coins size={20} />}
                value={totalFeesGenerated}
                label="Total Fees Generated"
            />
        </div>
    );
};

export default MyCommitmentsStats;
