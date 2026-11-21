import React, { useState } from 'react';
import { StaffDashboardScreen, DomesticStaffMember, SAMPLE_HOUSEHOLD_STAFF } from './StaffDashboardScreen';
import { StaffProfileAttendanceScreen } from './StaffProfileAttendanceScreen';
import { CommunityStaffDirectoryScreen } from './CommunityStaffDirectoryScreen';
import { AddStaffScreen } from './AddStaffScreen';
import { StaffSalaryLedgerScreen } from './StaffSalaryLedgerScreen';
import { StaffPaymentScreen, StaffTransaction } from './StaffPaymentScreen';
import { StaffAttendanceScreen } from './StaffAttendanceScreen';
import { StaffTransactionsScreen } from './StaffTransactionsScreen';

export const MODULE04_SCREENS = [
  { id: 'SCR_STAFF_01', name: 'Daily Help Hub', step: 1 },
  { id: 'SCR_STAFF_02', name: 'Staff Profile & Details', step: 2 },
  { id: 'SCR_STAFF_03', name: 'Find Daily Help Directory', step: 3 },
  { id: 'SCR_STAFF_04', name: 'Add / Link Daily Help', step: 4 },
  { id: 'SCR_STAFF_05', name: 'Salary & Leave Ledger', step: 5 },
  { id: 'SCR_STAFF_06', name: 'Staff Payment Gateway', step: 6 },
  { id: 'SCR_STAFF_07', name: 'Monthly Attendance Calendar', step: 7 },
  { id: 'SCR_STAFF_08', name: 'Payment Transactions History', step: 8 },
];

interface Module04ControllerProps {
  currentScreenId: string;
  onScreenChange: (screenId: string) => void;
  onNavigateHome?: () => void;
}

export const Module04Controller: React.FC<Module04ControllerProps> = ({
  currentScreenId,
  onScreenChange,
  onNavigateHome,
}) => {
  const [selectedStaff, setSelectedStaff] = useState<DomesticStaffMember>(SAMPLE_HOUSEHOLD_STAFF[0]);
  const [transactions, setTransactions] = useState<StaffTransaction[]>([]);
  const [toastMessage, setToastMessage] = useState<string>('');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleSelectStaff = (staff: DomesticStaffMember) => {
    setSelectedStaff(staff);
    onScreenChange('SCR_STAFF_02');
  };

  const handleViewAttendance = (staff: DomesticStaffMember) => {
    setSelectedStaff(staff);
    onScreenChange('SCR_STAFF_07');
  };

  const handleMakePayment = (staff: DomesticStaffMember) => {
    setSelectedStaff(staff);
    onScreenChange('SCR_STAFF_06');
  };

  const handleViewTransactions = (staff: DomesticStaffMember) => {
    setSelectedStaff(staff);
    onScreenChange('SCR_STAFF_08');
  };

  const handleAddStaffToFlat = (staff: DomesticStaffMember) => {
    showToast(`✓ Linked ${staff.name} (${staff.role}) to Flat 1204. Turnstile alerts active.`);
    onScreenChange('SCR_STAFF_01');
  };

  const handleStaffAdded = (staffData: any) => {
    showToast(`✓ Staff member ${staffData.name} (${staffData.role}) added to Flat 1204.`);
    onScreenChange('SCR_STAFF_01');
  };

  return (
    <div className="w-full h-full relative">
      {/* Toast Notification (Anchored inside phone frame) */}
      {toastMessage && (
        <div className="absolute top-14 left-3 right-3 z-50 p-3 rounded-2xl bg-slate-900/95 text-white border border-slate-700 text-xs font-semibold shadow-2xl flex items-center gap-2 animate-in slide-in-from-top duration-200">
          <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
          <span className="text-[11px] leading-tight">{toastMessage}</span>
        </div>
      )}

      {/* Screen 1: Daily Help Dashboard */}
      {currentScreenId === 'SCR_STAFF_01' && (
        <StaffDashboardScreen
          onSelectStaff={handleSelectStaff}
          onBrowseDirectory={() => onScreenChange('SCR_STAFF_03')}
          onAddNewStaff={() => onScreenChange('SCR_STAFF_04')}
          onOpenLedger={() => onScreenChange('SCR_STAFF_05')}
          onViewAttendance={handleViewAttendance}
        />
      )}

      {/* Screen 2: Profile & Details */}
      {currentScreenId === 'SCR_STAFF_02' && (
        <StaffProfileAttendanceScreen
          staff={selectedStaff}
          onBack={() => onScreenChange('SCR_STAFF_01')}
          onOpenLedger={() => onScreenChange('SCR_STAFF_05')}
          onMakePayment={handleMakePayment}
          onViewTransactions={handleViewTransactions}
          onViewAttendance={handleViewAttendance}
          onRemoveStaff={(id) => {
            showToast(`✓ Removed staff member from flat`);
            onScreenChange('SCR_STAFF_01');
          }}
        />
      )}

      {/* Screen 3: Find Daily Help Directory */}
      {currentScreenId === 'SCR_STAFF_03' && (
        <CommunityStaffDirectoryScreen
          onBack={() => onScreenChange('SCR_STAFF_01')}
          onSelectStaff={handleSelectStaff}
          onAddStaffToFlat={handleAddStaffToFlat}
          onAddNewStaff={() => onScreenChange('SCR_STAFF_04')}
        />
      )}

      {/* Screen 4: Add / Link Staff */}
      {currentScreenId === 'SCR_STAFF_04' && (
        <AddStaffScreen
          onBack={() => onScreenChange('SCR_STAFF_01')}
          onStaffAdded={handleStaffAdded}
        />
      )}

      {/* Screen 5: Salary & Leave Ledger */}
      {currentScreenId === 'SCR_STAFF_05' && (
        <StaffSalaryLedgerScreen
          onBack={() => onScreenChange('SCR_STAFF_01')}
        />
      )}

      {/* Screen 6: Staff Payment Screen */}
      {currentScreenId === 'SCR_STAFF_06' && (
        <StaffPaymentScreen
          staff={selectedStaff}
          onBack={() => onScreenChange('SCR_STAFF_02')}
          onViewTransactions={() => onScreenChange('SCR_STAFF_08')}
          onPaymentSuccess={(newTx) => {
            setTransactions((prev) => [newTx, ...prev]);
            showToast(`✓ Payment of ₹${newTx.amount} recorded for ${newTx.staffName}`);
          }}
        />
      )}

      {/* Screen 7: Attendance Calendar Screen */}
      {currentScreenId === 'SCR_STAFF_07' && (
        <StaffAttendanceScreen
          staff={selectedStaff}
          onBack={() => onScreenChange('SCR_STAFF_02')}
        />
      )}

      {/* Screen 8: Transaction History Screen */}
      {currentScreenId === 'SCR_STAFF_08' && (
        <StaffTransactionsScreen
          staff={selectedStaff}
          transactions={transactions.filter((tx) => tx.staffId === selectedStaff.id)}
          onBack={() => onScreenChange('SCR_STAFF_02')}
          onMakePayment={() => onScreenChange('SCR_STAFF_06')}
        />
      )}
    </div>
  );
};
