import { SupportTicketSubmission, SupportTicketResponse } from '../types';

/**
 * Service to handle Guest Support Ticket submissions to Super Admin.
 * Fully API-ready: when a backend support endpoint is connected,
 * replace the simulated dispatch with `fetch('/api/v1/support/tickets', { ... })`.
 */
export const submitSupportTicket = async (
  payload: SupportTicketSubmission
): Promise<SupportTicketResponse> => {
  // Simulate network latency (400-700ms)
  await new Promise((resolve) => setTimeout(resolve, 550));

  // Basic API-level safety validation
  if (!payload.name?.trim() || !payload.email?.trim() || !payload.message?.trim()) {
    return {
      success: false,
      error: 'Please fill in all mandatory fields before submitting your ticket.',
    };
  }

  // Simulated server error test hook (can be triggered with test email "error@test.com")
  if (payload.email.toLowerCase() === 'error@test.com') {
    return {
      success: false,
      error: "We couldn't submit your request right now due to a temporary service disruption. Please try again.",
    };
  }

  // Generate an authentic tracking ticket ID
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  const ticketId = `TKT-${new Date().getFullYear()}-${randomSuffix}`;

  return {
    success: true,
    ticketId,
    message: 'Your request has been submitted successfully to the academic administration team.',
    submittedAt: new Date().toISOString(),
  };
};
