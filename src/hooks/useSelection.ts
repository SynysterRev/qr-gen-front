import { QrResponse } from '@/lib/types/qr';
import { useState, useEffect } from 'react';

export function useSelection(items: QrResponse[]) {
    const [selectedItems, setSelectedItems] = useState(new Set());
    const [selectAll, setSelectAll] = useState(false);

    const toggleItem = (id: string) => {
        const newSelectedItems = new Set(selectedItems);
        if (newSelectedItems.has(id)) {
            newSelectedItems.delete(id);
        } else {
            newSelectedItems.add(id);
        }
        setSelectedItems(newSelectedItems);
    };

    const toggleSelectAll = () => {
        const newSelectAll = !selectAll;
        setSelectAll(newSelectAll);
        
        if (newSelectAll) {
            setSelectedItems(new Set(items.map(item => item.id)));
        } else {
            setSelectedItems(new Set());
        }
    };

    useEffect(() => {
        const allSelected = items.length > 0 && selectedItems.size === items.length;
        const someSelected = selectedItems.size > 0 && selectedItems.size < items.length;
        
        setSelectAll(allSelected);
    }, [selectedItems, items.length]);

    const isSelected = (id: string) => selectedItems.has(id);
    const getSelectedItems = () => items.filter(item => selectedItems.has(item.id));
    const selectedCount = selectedItems.size;
    const clearSelection = () => {
        setSelectedItems(new Set());
        setSelectAll(false);
    };

    return {
        selectedItems,
        selectAll,
        selectedCount,
        
        toggleItem,
        toggleSelectAll,
        clearSelection,
        
        isSelected,
        getSelectedItems,
    };
}