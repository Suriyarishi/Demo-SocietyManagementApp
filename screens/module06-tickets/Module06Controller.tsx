import React, { useState } from 'react';
import { HelpdeskHubScreen, SAMPLE_TICKETS, MaintenanceTicket } from './HelpdeskHubScreen';
import { CreateTicketScreen, TicketFormData } from './CreateTicketScreen';
import { TicketDetailSlaScreen } from './TicketDetailSlaScreen';
import { ExpressServicesScreen, EXPRESS_CATALOG, ExpressServiceItem } from './ExpressServicesScreen';
import { BookServiceScreen } from './BookServiceScreen';
import { TicketSignoffScreen } from './TicketSignoffScreen';

export const MODULE06_SCREENS = [
  { id: 'SCR_TICK_01', name: 'Helpdesk Hub', step: 1 },
  { id: 'SCR_TICK_02', name: 'Create Ticket', step: 2 },
  { id: 'SCR_TICK_03', name: 'Ticket SLA Detail', step: 3 },
  { id: 'SCR_TICK_04', name: 'Express Services', step: 4 },
  { id: 'SCR_TICK_05', name: 'Book Service', step: 5 },
  { id: 'SCR_TICK_06', name: 'Signoff & Review', step: 6 },
];

interface Module06ControllerProps {
  currentScreenId: string;
  onScreenChange: (screenId: string) => void;
  onNavigateHome?: () => void;
}

export const Module06Controller: React.FC<Module06ControllerProps> = ({
  currentScreenId,
  onScreenChange,
  onNavigateHome,
}) => {
  const [selectedTicket, setSelectedTicket] = useState<MaintenanceTicket>(SAMPLE_TICKETS[0]);
  const [selectedService, setSelectedService] = useState<ExpressServiceItem>(EXPRESS_CATALOG[0]);
  const [toastMessage, setToastMessage] = useState<string>('');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleSelectTicket = (t: MaintenanceTicket) => {
    setSelectedTicket(t);
    onScreenChange('SCR_TICK_03');
  };

  const handleSelectService = (s: ExpressServiceItem) => {
    setSelectedService(s);
    onScreenChange('SCR_TICK_05');
  };

  const handleTicketSubmitted = (data: TicketFormData) => {
    showToast(`Ticket submitted: #${selectedTicket.id} registered with 24h SLA`);
    onScreenChange('SCR_TICK_03');
  };

  const handleBookingConfirmed = (bookingData: any) => {
    showToast(`Service booked: Technician dispatched for ${bookingData.slot}`);
    onScreenChange('SCR_TICK_01');
  };

  const handleFinishSignoff = (reviewData: any) => {
    showToast(`Ticket #${reviewData.ticketId} closed successfully. Thank you for rating!`);
    onScreenChange('SCR_TICK_01');
  };

  return (
    <div className="w-full min-h-full relative">
      {/* Toast Notification (Anchored inside phone frame) */}
      {toastMessage && (
        <div className="absolute top-14 left-3 right-3 z-50 p-3 rounded-2xl bg-slate-900/95 text-white border border-slate-700 text-xs font-semibold shadow-2xl flex items-center gap-2 animate-in slide-in-from-top duration-200">
          <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
          <span className="text-[11px] leading-tight">{toastMessage}</span>
        </div>
      )}

      {currentScreenId === 'SCR_TICK_01' && (
        <HelpdeskHubScreen
          onRaiseTicket={() => onScreenChange('SCR_TICK_02')}
          onSelectTicket={handleSelectTicket}
          onOpenExpressServices={() => onScreenChange('SCR_TICK_04')}
        />
      )}

      {currentScreenId === 'SCR_TICK_02' && (
        <CreateTicketScreen
          onBack={() => onScreenChange('SCR_TICK_01')}
          onSubmitTicket={handleTicketSubmitted}
        />
      )}

      {currentScreenId === 'SCR_TICK_03' && (
        <TicketDetailSlaScreen
          ticket={selectedTicket}
          onBack={() => onScreenChange('SCR_TICK_01')}
          onProceedToSignoff={() => onScreenChange('SCR_TICK_06')}
          onEscalate={() => showToast('Escalated to Association Secretary & President')}
        />
      )}

      {currentScreenId === 'SCR_TICK_04' && (
        <ExpressServicesScreen
          onBack={() => onScreenChange('SCR_TICK_01')}
          onSelectService={handleSelectService}
        />
      )}

      {currentScreenId === 'SCR_TICK_05' && (
        <BookServiceScreen
          service={selectedService}
          onBack={() => onScreenChange('SCR_TICK_04')}
          onBookingConfirmed={handleBookingConfirmed}
        />
      )}

      {currentScreenId === 'SCR_TICK_06' && (
        <TicketSignoffScreen
          ticket={selectedTicket}
          onFinishSignoff={handleFinishSignoff}
          onReopenTicket={() => {
            showToast('Ticket marked as unresolved: Re-opened with priority SLA');
            onScreenChange('SCR_TICK_03');
          }}
        />
      )}
    </div>
  );
};