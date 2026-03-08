import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { API } from '../../lib/api';
import { renderWithProviders } from '../../test/renderWithProviders';
import { AuthorDashboard } from './AuthorDashboard';

async function loginAsReader() {
  await API.auth.login('reader@shitjournal.org', 'mock123456');
}

describe('AuthorDashboard', () => {
  it('disables favorites tab and still shows rated articles for a regular user', async () => {
    await loginAsReader();
    const user = userEvent.setup();

    renderWithProviders(<AuthorDashboard />, {
      initialEntries: ['/dashboard'],
      routes: [{ path: '/dashboard', element: <AuthorDashboard /> }],
    });

    await waitFor(() => {
      expect(screen.getByText('My Excretions')).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText('No submissions yet.')).toBeInTheDocument();
    });

    expect(screen.getByRole('button', { name: 'Favorites / 我的收藏' })).toBeDisabled();

    await user.click(screen.getByRole('button', { name: 'Rated / 我的评价' }));

    await waitFor(() => {
      expect(screen.getByText('Benchmarking Latrine Throughput Under Conference Deadline Stress')).toBeInTheDocument();
    });

    expect(screen.getAllByText('Rated 5/5 / 已评价 5/5').length).toBeGreaterThan(0);
  });
});
