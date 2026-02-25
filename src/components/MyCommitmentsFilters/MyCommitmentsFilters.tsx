'use client';

import React from 'react';
import { Search, ChevronDown } from 'lucide-react';
import styles from './MyCommitmentsFilters.module.css';
import { clsx } from 'clsx';

interface MyCommitmentsFiltersProps {
    searchQuery: string;
    onSearchChange: (value: string) => void;
    status: string;
    type: string;
    sortBy?: string;
    onStatusChange: (value: string) => void;
    onTypeChange: (value: string) => void;
    onSortByChange?: (value: string) => void;
}

const MyCommitmentsFilters: React.FC<MyCommitmentsFiltersProps> = ({
    searchQuery,
    onSearchChange,
    status,
    type,
    sortBy,
    onStatusChange,
    onTypeChange,
    onSortByChange,
}) => {
    return (
        <div className={styles.filtersWrapper}>
            <div className={styles.searchContainer}>
                <Search className={styles.searchIcon} size={18} />
                <input
                    type="text"
                    className={styles.searchInput}
                    placeholder="Search by commitment ID..."
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                />
            </div>

            <div className={styles.filtersRow}>
                <div className={styles.selectWrapper}>
                    <select
                        className={clsx(styles.select, status !== 'All' && styles.selectActive)}
                        value={status}
                        onChange={(e) => onStatusChange(e.target.value)}
                    >
                        <option value="All">Status: All</option>
                        <option value="Active">Active</option>
                        <option value="Settled">Settled</option>
                        <option value="Violated">Violated</option>
                        <option value="Early Exit">Early Exit</option>
                    </select>
                    <ChevronDown className={styles.chevronIcon} size={16} />
                </div>

                <div className={styles.selectWrapper}>
                    <select
                        className={clsx(styles.select, type !== 'All' && styles.selectActive)}
                        value={type}
                        onChange={(e) => onTypeChange(e.target.value)}
                    >
                        <option value="All">Type: All</option>
                        <option value="Safe">Safe</option>
                        <option value="Balanced">Balanced</option>
                        <option value="Aggressive">Aggressive</option>
                    </select>
                    <ChevronDown className={styles.chevronIcon} size={16} />
                </div>

                {onSortByChange && (
                    <div className={styles.selectWrapper}>
                        <select
                            className={clsx(styles.select, sortBy && styles.selectActive)}
                            value={sortBy}
                            onChange={(e) => onSortByChange(e.target.value)}
                        >
                            <option value="Newest">Sort: Newest</option>
                            <option value="Oldest">Oldest</option>
                            <option value="ValueHighLow">Value: High to Low</option>
                            <option value="ValueLowHigh">Value: Low to High</option>
                        </select>
                        <ChevronDown className={styles.chevronIcon} size={16} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyCommitmentsFilters;
