import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { MAINTENANCE_MODE } from '../lib/maintenanceConfig';
import { MaintenanceAnnouncement } from './submit/MaintenanceAnnouncement';
import { SubmissionForm } from './submit/SubmissionForm';
import { SubmissionGuidelines } from '../components/sidebar/SubmissionGuidelines';
import { JournalMetrics } from '../components/sidebar/JournalMetrics';
import { COPEMember } from '../components/sidebar/COPEMember';

export const SubmitPage: React.FC = () => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (MAINTENANCE_MODE) {
    return (
      <div className="max-w-5xl mx-auto px-4 lg:px-8 py-12">
        <MaintenanceAnnouncement />
      </div>
    );
  }

  // Normal mode: require auth
  if (loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <img src="/LOGO2.png" alt="Loading" className="w-9 h-9 animate-pulse" />
      </div>
    );
  }
  if (!user) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  return (
    <div className="max-w-5xl mx-auto px-4 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          <SubmissionForm />
        </div>
        <aside className="space-y-8">
          <SubmissionGuidelines />
          <JournalMetrics compact />
          <COPEMember />
        </aside>
      </div>
    </div>
  );
};
